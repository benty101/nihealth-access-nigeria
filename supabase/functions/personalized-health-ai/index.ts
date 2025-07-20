import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, conversationHistory = [] } = await req.json()
    
    // Get API keys
    const groqApiKey = Deno.env.get('GROQ_API_KEY')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!groqApiKey || !supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ 
        error: 'Required API keys not configured' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Get user from JWT
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ 
        error: 'Authentication required' 
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      global: {
        headers: {
          Authorization: authHeader
        }
      }
    })

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ 
        error: 'Invalid authentication' 
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Fetch comprehensive patient data
    console.log('Fetching patient data for user:', user.id)
    
    const [
      profileResult,
      consultationsResult,
      labOrdersResult,
      medicationOrdersResult,
      healthTimelineResult,
      familyHealthResult
    ] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('consultations').select('*').eq('patient_id', user.id).order('created_at', { ascending: false }).limit(5),
      supabase.from('lab_test_orders').select('*, lab_test_order_items(*, lab_tests(*))').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3),
      supabase.from('medication_orders').select('*, medication_order_items(*, medications(*))').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3),
      supabase.from('health_timeline_events').select('*').eq('user_id', user.id).order('event_date', { ascending: false }).limit(10),
      supabase.from('family_health_records').select('*').eq('user_id', user.id)
    ])

    // Compile patient data summary
    const patientData = {
      profile: profileResult.data,
      recentConsultations: consultationsResult.data || [],
      recentLabTests: labOrdersResult.data || [],
      recentMedications: medicationOrdersResult.data || [],
      healthTimeline: healthTimelineResult.data || [],
      familyHistory: familyHealthResult.data || []
    }

    console.log('Patient data compiled successfully')

    // Create personalized system prompt
    const personalizedPrompt = `You are MeddyPal AI, a sophisticated healthcare assistant specifically for ${patientData.profile?.full_name || 'this patient'}.

PATIENT CONTEXT:
${patientData.profile ? `
- Name: ${patientData.profile.full_name}
- Age: ${patientData.profile.date_of_birth ? calculateAge(patientData.profile.date_of_birth) : 'Unknown'}
- Gender: ${patientData.profile.gender || 'Not specified'}
- Blood Group: ${patientData.profile.blood_group || 'Not specified'}
- Allergies: ${patientData.profile.allergies?.join(', ') || 'None recorded'}
- Chronic Conditions: ${patientData.profile.chronic_conditions?.join(', ') || 'None recorded'}
- Location: ${patientData.profile.state_of_residence}, ${patientData.profile.lga}
` : 'Profile incomplete'}

RECENT MEDICAL HISTORY:
${patientData.recentConsultations.length > 0 ? `
Recent Consultations:
${patientData.recentConsultations.map(c => `- ${c.consultation_type} consultation (${new Date(c.scheduled_at).toLocaleDateString()}): ${c.chief_complaint || 'General consultation'}`).join('\n')}
` : 'No recent consultations'}

${patientData.recentLabTests.length > 0 ? `
Recent Lab Tests:
${patientData.recentLabTests.map(test => `- ${test.order_number} (${new Date(test.created_at).toLocaleDateString()}): ${test.status}`).join('\n')}
` : 'No recent lab tests'}

${patientData.familyHistory.length > 0 ? `
Family Health History:
${patientData.familyHistory.map(fh => `- ${fh.relationship}: ${fh.medical_conditions?.join(', ') || 'No conditions'}`).join('\n')}
` : 'No family history recorded'}

INSTRUCTIONS:
1. Provide PERSONALIZED insights based on the patient's specific data
2. Reference their medical history when relevant
3. Consider their location (Nigeria) for healthcare recommendations
4. Flag any concerning patterns or gaps in care
5. Suggest appropriate follow-ups based on their history
6. Be empathetic and culturally sensitive
7. Always recommend professional medical consultation for serious concerns

RESPONSE REQUIREMENTS:
- Start with personalized greeting using their name
- Provide context-aware insights
- Include actionable recommendations
- Maintain professional yet caring tone
- Flag urgency levels appropriately`

    const messages = [
      { role: 'system', content: personalizedPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ]

    console.log('Sending personalized request to Groq API...')
    
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: messages,
        temperature: 0.3,
        max_tokens: 1000,
        stream: false
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Groq API error:', errorText)
      return new Response(JSON.stringify({ 
        error: 'AI service temporarily unavailable' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    console.log('Personalized AI response generated successfully')

    // Generate insights based on patient data
    const insights = generateHealthInsights(patientData)

    const result = {
      response: aiResponse,
      insights: insights,
      timestamp: new Date().toISOString(),
      model: 'llama-3.1-8b-instant',
      personalized: true,
      urgent: aiResponse.toLowerCase().includes('urgent') || 
              aiResponse.toLowerCase().includes('emergency') ||
              aiResponse.toLowerCase().includes('immediate'),
      recommendations: extractRecommendations(aiResponse),
      patientSummary: {
        profileComplete: !!patientData.profile?.full_name,
        recentActivity: patientData.recentConsultations.length + patientData.recentLabTests.length,
        lastConsultation: patientData.recentConsultations[0]?.scheduled_at || null
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error in personalized health AI:', error)
    return new Response(JSON.stringify({ 
      error: 'An error occurred while processing your request' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

function calculateAge(birthDate: string): number {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

function generateHealthInsights(patientData: any) {
  const insights = []
  
  // Profile completion insights
  if (!patientData.profile?.full_name) {
    insights.push({
      type: 'profile',
      priority: 'high',
      message: 'Complete your health profile to receive more personalized insights'
    })
  }
  
  // Recent activity insights
  if (patientData.recentConsultations.length === 0) {
    insights.push({
      type: 'consultation',
      priority: 'medium',
      message: 'Consider scheduling a routine health checkup - no recent consultations found'
    })
  }
  
  // Lab test insights
  if (patientData.recentLabTests.length === 0) {
    insights.push({
      type: 'lab',
      priority: 'medium',
      message: 'Regular health screenings are recommended - consider booking lab tests'
    })
  }
  
  // Chronic conditions monitoring
  if (patientData.profile?.chronic_conditions?.length > 0) {
    insights.push({
      type: 'monitoring',
      priority: 'high',
      message: `Monitor your ${patientData.profile.chronic_conditions.join(', ')} regularly with healthcare providers`
    })
  }
  
  return insights
}

function extractRecommendations(text: string): string[] {
  const recommendations: string[] = []
  
  const bulletPattern = /(?:•|\*|-|\d+\.)\s*(.+?)(?:\n|$)/g
  let match
  
  while ((match = bulletPattern.exec(text)) !== null) {
    const recommendation = match[1].trim()
    if (recommendation.length > 10) {
      recommendations.push(recommendation)
    }
  }
  
  if (recommendations.length === 0) {
    const actionPattern = /(consider|try|avoid|take|drink|rest|apply|monitor|seek|call|visit|schedule|book).+?[.!]/gi
    const actionMatches = text.match(actionPattern)
    
    if (actionMatches) {
      recommendations.push(...actionMatches.slice(0, 5))
    }
  }
  
  return recommendations
}