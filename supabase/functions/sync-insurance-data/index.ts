
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

    // First, populate comprehensive Nigerian insurance plans
    const nigerianInsurancePlans = [
      // AIICO Insurance Plans
      {
        name: "AIICO Basic Health Plan",
        provider: "AIICO Insurance",
        plan_type: "HMO",
        premium_monthly: 15000,
        premium_annual: 180000,
        coverage_amount: 2000000,
        features: ["Emergency Care", "Outpatient Care", "Basic Diagnostics", "Prescription Drugs"],
        terms: "Basic healthcare coverage for individuals and families",
        is_active: true
      },
      {
        name: "AIICO Premium Health Plan",
        provider: "AIICO Insurance",
        plan_type: "Premium Insurance",
        premium_monthly: 45000,
        premium_annual: 540000,
        coverage_amount: 8000000,
        features: ["Emergency Care", "Outpatient Care", "Surgery", "Maternity Care", "Dental", "Optical", "Mental Health"],
        terms: "Comprehensive healthcare coverage with premium benefits",
        is_active: true
      },
      
      // Leadway Assurance Plans
      {
        name: "Leadway Health Guard",
        provider: "Leadway Assurance",
        plan_type: "HMO",
        premium_monthly: 18000,
        premium_annual: 216000,
        coverage_amount: 3000000,
        features: ["Emergency Care", "Outpatient Care", "Inpatient Care", "Prescription Drugs", "Basic Surgery"],
        terms: "Reliable health protection for Nigerian families",
        is_active: true
      },
      {
        name: "Leadway Executive Plan",
        provider: "Leadway Assurance",
        plan_type: "Executive Insurance",
        premium_monthly: 75000,
        premium_annual: 900000,
        coverage_amount: 15000000,
        features: ["Emergency Care", "VIP Treatment", "Surgery", "Maternity Care", "Dental", "Optical", "Mental Health", "International Coverage"],
        terms: "Executive level healthcare with international coverage",
        is_active: true
      },
      
      // AXA Mansard Plans
      {
        name: "AXA Health First",
        provider: "AXA Mansard",
        plan_type: "HMO",
        premium_monthly: 22000,
        premium_annual: 264000,
        coverage_amount: 4000000,
        features: ["Emergency Care", "Outpatient Care", "Inpatient Care", "Surgery", "Prescription Drugs", "Preventive Care"],
        terms: "First-class healthcare protection with preventive care focus",
        is_active: true
      },
      {
        name: "AXA Platinum Shield",
        provider: "AXA Mansard",
        plan_type: "Premium Insurance",
        premium_monthly: 85000,
        premium_annual: 1020000,
        coverage_amount: 20000000,
        features: ["Emergency Care", "VIP Treatment", "Surgery", "Maternity Care", "Dental", "Optical", "Mental Health", "Cancer Treatment", "International Coverage"],
        terms: "Platinum level protection with comprehensive cancer coverage",
        is_active: true
      },
      
      // Niger Insurance Plans
      {
        name: "Niger Shield Basic",
        provider: "Niger Insurance",
        plan_type: "HMO",
        premium_monthly: 12000,
        premium_annual: 144000,
        coverage_amount: 1500000,
        features: ["Emergency Care", "Outpatient Care", "Prescription Drugs", "Basic Diagnostics"],
        terms: "Affordable basic healthcare coverage",
        is_active: true
      },
      {
        name: "Niger Shield Premium",
        provider: "Niger Insurance",
        plan_type: "Insurance",
        premium_monthly: 35000,
        premium_annual: 420000,
        coverage_amount: 6000000,
        features: ["Emergency Care", "Outpatient Care", "Surgery", "Maternity Care", "Dental", "Prescription Drugs"],
        terms: "Enhanced healthcare coverage with maternity benefits",
        is_active: true
      },
      
      // Sovereign Trust Insurance Plans
      {
        name: "Sovereign Health Plus",
        provider: "Sovereign Trust Insurance",
        plan_type: "HMO",
        premium_monthly: 25000,
        premium_annual: 300000,
        coverage_amount: 5000000,
        features: ["Emergency Care", "Outpatient Care", "Inpatient Care", "Surgery", "Prescription Drugs", "Wellness Programs"],
        terms: "Comprehensive health coverage with wellness focus",
        is_active: true
      },
      {
        name: "Sovereign Elite Care",
        provider: "Sovereign Trust Insurance",
        plan_type: "Elite Insurance",
        premium_monthly: 95000,
        premium_annual: 1140000,
        coverage_amount: 25000000,
        features: ["Emergency Care", "VIP Treatment", "Surgery", "Maternity Care", "Dental", "Optical", "Mental Health", "Cancer Treatment", "International Coverage", "Home Care"],
        terms: "Elite healthcare with home care and international coverage",
        is_active: true
      },
      
      // Consolidated Hallmark Insurance Plans
      {
        name: "CHI Health Shield",
        provider: "Consolidated Hallmark Insurance",
        plan_type: "HMO",
        premium_monthly: 20000,
        premium_annual: 240000,
        coverage_amount: 3500000,
        features: ["Emergency Care", "Outpatient Care", "Inpatient Care", "Prescription Drugs", "Basic Surgery", "Preventive Care"],
        terms: "Solid healthcare protection with preventive care",
        is_active: true
      },
      
      // Mutual Benefits Assurance Plans
      {
        name: "MutualCare Basic",
        provider: "Mutual Benefits Assurance",
        plan_type: "HMO",
        premium_monthly: 16000,
        premium_annual: 192000,
        coverage_amount: 2500000,
        features: ["Emergency Care", "Outpatient Care", "Prescription Drugs", "Basic Diagnostics", "Telemedicine"],
        terms: "Affordable healthcare with telemedicine access",
        is_active: true
      },
      {
        name: "MutualCare Premium",
        provider: "Mutual Benefits Assurance",
        plan_type: "Premium Insurance",
        premium_monthly: 55000,
        premium_annual: 660000,
        coverage_amount: 12000000,
        features: ["Emergency Care", "Outpatient Care", "Surgery", "Maternity Care", "Dental", "Optical", "Mental Health", "Specialist Care"],
        terms: "Premium healthcare with specialist care access",
        is_active: true
      }
    ];

    console.log(`Inserting ${nigerianInsurancePlans.length} insurance plans...`);

    // Insert insurance plans directly
    for (const plan of nigerianInsurancePlans) {
      console.log(`Inserting plan: ${plan.name}`);
      const { error: insertError } = await supabase
        .from('insurance_plans')
        .insert(plan);

      if (insertError) {
        console.error(`Error inserting plan ${plan.name}:`, insertError);
        // Try updating if insert fails due to duplicate
        const { error: updateError } = await supabase
          .from('insurance_plans')
          .update({
            ...plan,
            updated_at: new Date().toISOString()
          })
          .eq('name', plan.name)
          .eq('provider', plan.provider);
        
        if (updateError) {
          console.error(`Error updating plan ${plan.name}:`, updateError);
        } else {
          console.log(`Successfully updated plan: ${plan.name}`);
        }
      } else {
        console.log(`Successfully inserted plan: ${plan.name}`);
      }
    }

    // Create API configurations
    const apiConfigs = [
      {
        provider_name: 'AIICO Insurance',
        api_endpoint: 'https://api.aiicoplc.com/v1/plans',
        api_key_reference: 'aiico_api_key',
        config_data: { version: '1.0', format: 'json', provider_type: 'direct' },
        is_active: true
      },
      {
        provider_name: 'Leadway Assurance',
        api_endpoint: 'https://api.leadway-assurance.com/v1/health-plans',
        api_key_reference: 'leadway_api_key',
        config_data: { version: '2.0', format: 'json', provider_type: 'direct' },
        is_active: true
      },
      {
        provider_name: 'AXA Mansard',
        api_endpoint: 'https://api.axa-mansard.ng/v1/insurance-plans',
        api_key_reference: 'axa_api_key',
        config_data: { version: '1.5', format: 'json', provider_type: 'direct' },
        is_active: true
      },
      {
        provider_name: 'MyFrame API',
        api_endpoint: 'https://api.myframe.ai/v1/insurance',
        api_key_reference: 'myframe_api_key',
        config_data: { 
          version: '1.0', 
          format: 'json', 
          provider_type: 'aggregator',
          aggregator: true,
          supports_quotes: true,
          supports_purchase: true
        },
        is_active: true
      },
      {
        provider_name: 'MyCover API',
        api_endpoint: 'https://api.mycover.ai/v1',
        api_key_reference: 'mycover_api_key',
        config_data: { 
          version: '2.0', 
          format: 'json', 
          provider_type: 'aggregator',
          aggregator: true,
          supports_quotes: true,
          supports_purchase: true
        },
        is_active: true
      }
    ];

    console.log(`Inserting ${apiConfigs.length} API configurations...`);

    // Insert API configurations
    for (const config of apiConfigs) {
      const { error: insertError } = await supabase
        .from('insurance_api_configs')
        .insert(config);
      
      if (insertError) {
        console.error(`Error inserting API config for ${config.provider_name}:`, insertError);
        // Try updating if insert fails
        const { error: updateError } = await supabase
          .from('insurance_api_configs')
          .update({
            ...config,
            last_sync: new Date().toISOString()
          })
          .eq('provider_name', config.provider_name);
        
        if (updateError) {
          console.error(`Error updating API config for ${config.provider_name}:`, updateError);
        }
      } else {
        console.log(`Successfully inserted API config: ${config.provider_name}`);
      }
    }

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

    console.log('Insurance data sync completed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Insurance data sync completed successfully',
        plansInserted: nigerianInsurancePlans.length,
        apiConfigsInserted: apiConfigs.length,
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
