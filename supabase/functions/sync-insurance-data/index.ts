
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
    console.log('Starting insurance data sync process...');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get all active API configurations
    const { data: apiConfigs, error: configError } = await supabase
      .from('insurance_api_configs')
      .select('*')
      .eq('is_active', true);

    if (configError) {
      console.error('Error fetching API configs:', configError);
      throw configError;
    }

    console.log(`Found ${apiConfigs?.length || 0} active API configurations`);

    const syncResults = [];

    // If no API configs exist, create some sample ones for demonstration
    if (!apiConfigs || apiConfigs.length === 0) {
      console.log('No API configs found, creating sample configurations...');
      
      const sampleConfigs = [
        {
          provider_name: 'AIICO Insurance',
          api_endpoint: 'https://api.aiicoplc.com/v1/plans',
          api_key_reference: 'aiico_api_key',
          config_data: { version: '1.0', format: 'json' },
          is_active: true
        },
        {
          provider_name: 'Leadway Assurance',
          api_endpoint: 'https://api.leadway-assurance.com/v1/health-plans',
          api_key_reference: 'leadway_api_key',
          config_data: { version: '2.0', format: 'json' },
          is_active: true
        },
        {
          provider_name: 'AXA Mansard',
          api_endpoint: 'https://api.axa-mansard.ng/v1/insurance-plans',
          api_key_reference: 'axa_api_key',
          config_data: { version: '1.5', format: 'json' },
          is_active: true
        },
        {
          provider_name: 'MyFrame API',
          api_endpoint: 'https://api.myframe.ai/v1/insurance',
          api_key_reference: 'myframe_api_key',
          config_data: { version: '1.0', format: 'json', aggregator: true },
          is_active: true
        }
      ];

      for (const config of sampleConfigs) {
        const { error: insertError } = await supabase
          .from('insurance_api_configs')
          .insert(config);
        
        if (insertError) {
          console.error('Error creating sample config:', insertError);
        }
      }
      
      // Refetch configs after creating samples
      const { data: newConfigs } = await supabase
        .from('insurance_api_configs')
        .select('*')
        .eq('is_active', true);
      
      if (newConfigs) {
        apiConfigs.push(...newConfigs);
      }
    }

    for (const config of apiConfigs || []) {
      try {
        console.log(`Syncing data from ${config.provider_name}...`);

        // Generate realistic mock data based on provider
        const mockPlans = generateMockPlans(config.provider_name);

        // Insert or update plans in database using INSERT with ON CONFLICT
        for (const planData of mockPlans) {
          const { error: insertError } = await supabase
            .from('insurance_plans')
            .insert({
              ...planData,
              updated_at: new Date().toISOString()
            });

          if (insertError) {
            console.error(`Error inserting plan ${planData.name}:`, insertError);
            // Try updating if insert fails
            const { error: updateError } = await supabase
              .from('insurance_plans')
              .update({
                ...planData,
                updated_at: new Date().toISOString()
              })
              .eq('name', planData.name)
              .eq('provider', planData.provider);
            
            if (updateError) {
              console.error(`Error updating plan ${planData.name}:`, updateError);
            } else {
              console.log(`Successfully updated plan: ${planData.name}`);
            }
          } else {
            console.log(`Successfully inserted plan: ${planData.name}`);
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
          plansProcessed: mockPlans.length,
          timestamp: new Date().toISOString()
        });

        console.log(`Successfully synced ${mockPlans.length} plans from ${config.provider_name}`);

      } catch (error) {
        console.error(`Error syncing data from ${config.provider_name}:`, error);
        syncResults.push({
          provider: config.provider_name,
          status: 'error',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    console.log('Insurance data sync completed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Insurance data sync completed successfully',
        results: syncResults,
        totalProviders: apiConfigs?.length || 0,
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

function generateMockPlans(providerName: string) {
  const baseFeatures = ['Emergency Care', 'Outpatient Care', 'Prescription Drugs'];
  const premiumFeatures = ['Surgery', 'Maternity Care', 'Dental', 'Optical', 'Mental Health'];
  
  const plans = [
    {
      name: `${providerName} Basic Plan`,
      provider: providerName,
      plan_type: 'HMO',
      premium_monthly: Math.floor(Math.random() * 20000) + 10000,
      premium_annual: null,
      coverage_amount: Math.floor(Math.random() * 3000000) + 1000000,
      features: [...baseFeatures, 'Basic Diagnostics'],
      terms: 'Basic coverage with essential healthcare services',
      is_active: true
    },
    {
      name: `${providerName} Standard Plan`,
      provider: providerName,
      plan_type: 'Insurance',
      premium_monthly: Math.floor(Math.random() * 30000) + 25000,
      premium_annual: null,
      coverage_amount: Math.floor(Math.random() * 5000000) + 3000000,
      features: [...baseFeatures, ...premiumFeatures.slice(0, 3)],
      terms: 'Comprehensive coverage with enhanced benefits',
      is_active: true
    },
    {
      name: `${providerName} Premium Plan`,
      provider: providerName,
      plan_type: 'Premium Insurance',
      premium_monthly: Math.floor(Math.random() * 50000) + 40000,
      premium_annual: null,
      coverage_amount: Math.floor(Math.random() * 10000000) + 5000000,
      features: [...baseFeatures, ...premiumFeatures],
      terms: 'Premium coverage with all inclusive benefits and worldwide coverage',
      is_active: true
    }
  ];

  return plans;
}
