
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from './utils.ts'
import { syncInsurancePlans } from './plans.ts'
import { syncApiConfigurations } from './api-configs.ts'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting comprehensive insurance data sync process...');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Sync insurance plans
    const plansResult = await syncInsurancePlans(supabase);

    // Create API configurations
    const apiConfigsResult = await syncApiConfigurations(supabase);

    // Verify the data was inserted
    const { data: verifyPlans, error: verifyError } = await supabase
      .from('insurance_plans')
      .select('*')
      .limit(5);

    if (verifyError) {
      console.error('Error verifying plans:', verifyError);
    } else {
      console.log(`Verification: Found ${verifyPlans?.length || 0} plans in database`);
    }

    console.log('Comprehensive insurance data sync completed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comprehensive insurance data sync completed successfully',
        plansInserted: plansResult.count,
        apiConfigsInserted: apiConfigsResult.count,
        totalProviders: plansResult.uniqueProviders,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Sync function error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
