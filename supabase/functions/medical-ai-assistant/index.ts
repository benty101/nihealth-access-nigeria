import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium"

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const HUGGING_FACE_TOKEN = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')
    console.log('Checking Hugging Face token availability:', HUGGING_FACE_TOKEN ? 'Token found' : 'Token missing')
    
    if (!HUGGING_FACE_TOKEN) {
      console.error('HUGGING_FACE_ACCESS_TOKEN environment variable is not set')
      return new Response(
        JSON.stringify({ error: "Hugging Face API token is not configured. Please check your environment variables." }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

    const body = await req.json()
    console.log('Request body received:', JSON.stringify(body, null, 2))
    
    const { prompt, context, type } = body
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    console.log(`Processing ${type || 'general'} medical query`)

    // Construct the medical prompt with proper context
    let medicalPrompt = ""
    
    switch (type) {
      case 'consultation_summary':
        medicalPrompt = `As a medical AI assistant, please analyze the following consultation notes and provide a concise summary with key findings, diagnosis, and treatment recommendations:

${prompt}

Please structure your response with:
1. Chief Complaint
2. Key Findings
3. Assessment/Diagnosis
4. Treatment Plan
5. Follow-up Recommendations`
        break;
        
      case 'medical_record_analysis':
        medicalPrompt = `As a medical AI assistant, please analyze the following medical record data and provide insights:

${prompt}

Context: ${context || 'No additional context provided'}

Please provide:
1. Key medical insights
2. Risk factors identified
3. Recommendations for care
4. Areas requiring attention`
        break;
        
      case 'clinical_decision_support':
        medicalPrompt = `As a medical AI assistant, please provide clinical decision support for the following case:

${prompt}

Please provide:
1. Differential diagnosis considerations
2. Recommended diagnostic tests
3. Treatment options
4. Risk stratification
5. Follow-up recommendations

Note: This is for decision support only and should not replace clinical judgment.`
        break;
        
      case 'patient_education':
        medicalPrompt = `As a medical AI assistant, please explain the following medical topic in patient-friendly language:

${prompt}

Please provide:
1. Simple explanation of the condition/treatment
2. What patients should expect
3. Important care instructions
4. When to seek medical attention
5. Lifestyle recommendations if applicable`
        break;
        
      default:
        medicalPrompt = `As a medical AI assistant specialized in healthcare, please provide a helpful and accurate response to the following medical query:

${prompt}

${context ? `Additional context: ${context}` : ''}

Please ensure your response is evidence-based and includes appropriate medical disclaimers.`
    }

    // Call Hugging Face API
    const response = await fetch(HUGGING_FACE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGING_FACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: medicalPrompt,
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true,
          return_full_text: false
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Hugging Face API error:', errorText)
      
      // Handle specific error cases
      if (errorText.toLowerCase().includes('shutdown')) {
        return new Response(
          JSON.stringify({ 
            error: "AI service is temporarily unavailable (shutdown). Please try again later or use a different model.",
            retry_after: 60 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 503 
          }
        )
      }
      
      if (response.status === 503) {
        return new Response(
          JSON.stringify({ 
            error: "Model is loading, please try again in a few moments",
            retry_after: 20 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 503 
          }
        )
      }
      
      throw new Error(`Hugging Face API error: ${response.status} ${errorText}`)
    }

    const result = await response.json()
    console.log('Hugging Face API response received')

    // Extract the generated text
    let generatedText = ""
    if (Array.isArray(result) && result.length > 0) {
      generatedText = result[0].generated_text || result[0].text || ""
    } else if (result.generated_text) {
      generatedText = result.generated_text
    } else {
      generatedText = JSON.stringify(result)
    }

    // Add medical disclaimer
    const disclaimer = "\n\n⚠️ Medical Disclaimer: This AI-generated response is for informational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical decisions."
    
    return new Response(
      JSON.stringify({ 
        response: generatedText + disclaimer,
        type: type || 'general',
        model: 'DialoGPT-medium'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in medical-ai-assistant function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred while processing your request',
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})