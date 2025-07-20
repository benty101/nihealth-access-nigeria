import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Groq is FREE and very fast for AI inference
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Handle GET requests (when someone visits the URL directly)
  if (req.method === 'GET') {
    return new Response(JSON.stringify({ 
      message: 'MeddyPal AI Health Chat API is running',
      usage: 'Send POST request with { message: "your question", conversationHistory: [] }',
      status: 'healthy'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  try {
    const body = await req.text()
    if (!body) {
      return new Response(JSON.stringify({ 
        error: 'Request body is required. Please send a JSON object with message field.' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { message, conversationHistory = [] } = JSON.parse(body)
    
    // Get Groq API key from Supabase secrets (free tier available)
    const groqApiKey = Deno.env.get('GROQ_API_KEY')
    
    if (!groqApiKey) {
      return new Response(JSON.stringify({ 
        error: 'Groq API key not configured. Please add GROQ_API_KEY to Supabase secrets.' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Healthcare-specific system prompt
    const systemPrompt = `You are MeddyPal AI, a healthcare assistant for Nigeria. You provide:

1. SYMPTOM ANALYSIS: Analyze symptoms and provide preliminary health insights
2. HEALTH EDUCATION: Share medical knowledge in simple terms
3. URGENT CARE GUIDANCE: Identify when immediate medical attention is needed
4. NIGERIAN CONTEXT: Understand local health challenges and resources

CRITICAL SAFETY RULES:
- Always include disclaimer that this is not a substitute for professional medical advice
- For serious symptoms, immediately recommend consulting a healthcare provider
- Be culturally sensitive to Nigerian healthcare context
- Provide information in clear, accessible language
- Never diagnose specific conditions definitively

RESPONSE FORMAT:
- Keep responses concise but comprehensive
- Use bullet points for recommendations
- Include urgency level (Low/Medium/High)
- Suggest next steps (self-care, clinic visit, emergency)

Focus on being helpful while maintaining safety and encouraging proper medical care when needed.`

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ]

    console.log('Sending request to Groq API...')
    
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Free, fast, and capable model
        messages: messages,
        temperature: 0.3, // Lower temperature for more consistent medical advice
        max_tokens: 1000,
        stream: false
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Groq API error:', errorText)
      return new Response(JSON.stringify({ 
        error: 'AI service temporarily unavailable. Please try again.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    console.log('AI response generated successfully')

    // Parse response to extract structured information
    const analysisResult = {
      response: aiResponse,
      timestamp: new Date().toISOString(),
      model: 'llama-3.1-8b-instant',
      urgent: aiResponse.toLowerCase().includes('emergency') || 
              aiResponse.toLowerCase().includes('urgent') ||
              aiResponse.toLowerCase().includes('immediate'),
      recommendations: extractRecommendations(aiResponse)
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error in AI health chat:', error)
    return new Response(JSON.stringify({ 
      error: 'An error occurred while processing your request.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

function extractRecommendations(text: string): string[] {
  const recommendations: string[] = []
  
  // Look for bullet points or numbered lists
  const bulletPattern = /(?:•|\*|-|\d+\.)\s*(.+?)(?:\n|$)/g
  let match
  
  while ((match = bulletPattern.exec(text)) !== null) {
    const recommendation = match[1].trim()
    if (recommendation.length > 10) { // Filter out very short matches
      recommendations.push(recommendation)
    }
  }
  
  // If no bullets found, look for sentences with action words
  if (recommendations.length === 0) {
    const actionPattern = /(consider|try|avoid|take|drink|rest|apply|monitor|seek|call|visit).+?[.!]/gi
    const actionMatches = text.match(actionPattern)
    
    if (actionMatches) {
      recommendations.push(...actionMatches.slice(0, 5)) // Limit to 5 recommendations
    }
  }
  
  return recommendations
}