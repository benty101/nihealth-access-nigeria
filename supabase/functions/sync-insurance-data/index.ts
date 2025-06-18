
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Starting insurance data sync...');

    // Get all active API configurations
    const { data: apiConfigs, error: configError } = await supabase
      .from('insurance_api_configs')
      .select('*')
      .eq('is_active', true);

    if (configError) {
      throw configError;
    }

    console.log(`Found ${apiConfigs?.length || 0} active API configurations`);

    const syncResults = [];

    for (const config of apiConfigs || []) {
      try {
        console.log(`Syncing data from ${config.provider_name}...`);

        // This is where you would implement the actual API calls
        // For now, we'll simulate the sync process
        
        // Example: Fetch data from external API
        // const apiKey = await getSecretValue(config.api_key_reference);
        // const response = await fetch(config.api_endpoint, {
        //   headers: {
        //     'Authorization': `Bearer ${apiKey}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        
        // Simulate successful sync
        const mockPlans = [
          {
            name: `${config.provider_name} Basic Plan`,
            provider: config.provider_name,
            plan_type: 'HMO',
            premium_monthly: 15000,
            coverage_amount: 2000000,
            features: ['Emergency Care', 'Outpatient Care', 'Prescription Drugs'],
            is_active: true
          },
          {
            name: `${config.provider_name} Premium Plan`,
            provider: config.provider_name,
            plan_type: 'Insurance',
            premium_monthly: 35000,
            coverage_amount: 5000000,
            features: ['Emergency Care', 'Outpatient Care', 'Surgery', 'Maternity Care', 'Dental'],
            is_active: true
          }
        ];

        // Insert or update plans in database
        for (const planData of mockPlans) {
          const { error: insertError } = await supabase
            .from('insurance_plans')
            .upsert(planData, {
              onConflict: 'name,provider'
            });

          if (insertError) {
            console.error(`Error inserting plan ${planData.name}:`, insertError);
          }
        }

        // Update last sync timestamp
        await supabase
          .from('insurance_api_configs')
          .update({ last_sync: new Date().toISOString() })
          .eq('id', config.id);

        syncResults.push({
          provider: config.provider_name,
          status: 'success',
          plansProcessed: mockPlans.length
        });

        console.log(`Successfully synced ${mockPlans.length} plans from ${config.provider_name}`);

      } catch (error) {
        console.error(`Error syncing data from ${config.provider_name}:`, error);
        syncResults.push({
          provider: config.provider_name,
          status: 'error',
          error: error.message
        });
      }
    }

    console.log('Insurance data sync completed');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Insurance data sync completed',
        results: syncResults
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
        error: error.message
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
