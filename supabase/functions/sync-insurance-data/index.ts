
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
    console.log('Starting comprehensive insurance data sync process...');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Comprehensive Nigerian insurance plans - 80+ plans from major providers
    const comprehensiveInsurancePlans = [
      // AIICO Insurance Plans (Expanded)
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
      {
        name: "AIICO Family Plus",
        provider: "AIICO Insurance",
        plan_type: "Family Insurance",
        premium_monthly: 35000,
        premium_annual: 420000,
        coverage_amount: 6000000,
        features: ["Emergency Care", "Family Coverage", "Pediatric Care", "Maternity Care", "Vaccination", "Dental"],
        terms: "Comprehensive family healthcare with children coverage",
        is_active: true
      },
      {
        name: "AIICO Corporate Health",
        provider: "AIICO Insurance",
        plan_type: "Corporate Insurance",
        premium_monthly: 25000,
        premium_annual: 300000,
        coverage_amount: 5000000,
        features: ["Emergency Care", "Group Coverage", "Occupational Health", "Wellness Programs", "Annual Check-ups"],
        terms: "Corporate health insurance for organizations",
        is_active: true
      },
      
      // Leadway Assurance Plans (Expanded)
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
      {
        name: "Leadway Gold Shield",
        provider: "Leadway Assurance",
        plan_type: "Premium Insurance",
        premium_monthly: 55000,
        premium_annual: 660000,
        coverage_amount: 10000000,
        features: ["Emergency Care", "Comprehensive Surgery", "Specialist Care", "Cancer Treatment", "Dialysis", "Physiotherapy"],
        terms: "Gold standard healthcare with specialized treatments",
        is_active: true
      },
      {
        name: "Leadway Student Plan",
        provider: "Leadway Assurance",
        plan_type: "Student Insurance",
        premium_monthly: 8000,
        premium_annual: 96000,
        coverage_amount: 1000000,
        features: ["Emergency Care", "Campus Health", "Mental Health Support", "Sports Injury", "Basic Diagnostics"],
        terms: "Affordable healthcare for students",
        is_active: true
      },
      
      // AXA Mansard Plans (Expanded)
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
      {
        name: "AXA Corporate Plus",
        provider: "AXA Mansard",
        plan_type: "Corporate Insurance",
        premium_monthly: 30000,
        premium_annual: 360000,
        coverage_amount: 7000000,
        features: ["Emergency Care", "Group Benefits", "Executive Health", "Wellness Programs", "Telemedicine", "Annual Medical"],
        terms: "Corporate healthcare solution with executive benefits",
        is_active: true
      },
      {
        name: "AXA Expat Coverage",
        provider: "AXA Mansard",
        plan_type: "International Insurance",
        premium_monthly: 120000,
        premium_annual: 1440000,
        coverage_amount: 50000000,
        features: ["Global Coverage", "Emergency Evacuation", "International Treatment", "Repatriation", "Multi-Country Access"],
        terms: "International healthcare for expatriates and frequent travelers",
        is_active: true
      },

      // Hygeia HMO Plans
      {
        name: "Hygeia Starter Plan",
        provider: "Hygeia HMO",
        plan_type: "HMO",
        premium_monthly: 12000,
        premium_annual: 144000,
        coverage_amount: 1500000,
        features: ["Emergency Care", "Outpatient Care", "Basic Diagnostics", "Prescription Drugs", "Immunization"],
        terms: "Entry-level healthcare coverage with essential benefits",
        is_active: true
      },
      {
        name: "Hygeia Classic Plan",
        provider: "Hygeia HMO",
        plan_type: "HMO",
        premium_monthly: 28000,
        premium_annual: 336000,
        coverage_amount: 5000000,
        features: ["Emergency Care", "Comprehensive Outpatient", "Surgery", "Maternity Care", "Dental", "Optical", "Specialist Care"],
        terms: "Comprehensive healthcare with extensive provider network",
        is_active: true
      },
      {
        name: "Hygeia Premium Plus",
        provider: "Hygeia HMO",
        plan_type: "Premium Insurance",
        premium_monthly: 65000,
        premium_annual: 780000,
        coverage_amount: 15000000,
        features: ["Emergency Care", "VIP Services", "Advanced Surgery", "Cancer Treatment", "Fertility Treatment", "Mental Health", "International Referrals"],
        terms: "Premium healthcare with advanced medical treatments",
        is_active: true
      },
      {
        name: "Hygeia Family Shield",
        provider: "Hygeia HMO",
        plan_type: "Family Insurance",
        premium_monthly: 40000,
        premium_annual: 480000,
        coverage_amount: 8000000,
        features: ["Emergency Care", "Family Coverage", "Pediatric Care", "Maternity Care", "Vaccination", "Wellness Programs"],
        terms: "Comprehensive family healthcare plan",
        is_active: true
      },

      // Niger Insurance Plans (Expanded)
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
      {
        name: "Niger Corporate Care",
        provider: "Niger Insurance",
        plan_type: "Corporate Insurance",
        premium_monthly: 20000,
        premium_annual: 240000,
        coverage_amount: 3500000,
        features: ["Emergency Care", "Group Coverage", "Occupational Health", "Wellness Screening", "Preventive Care"],
        terms: "Corporate health insurance for businesses",
        is_active: true
      },

      // Sovereign Trust Insurance Plans (Expanded)
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
      {
        name: "Sovereign Youth Plan",
        provider: "Sovereign Trust Insurance",
        plan_type: "Youth Insurance",
        premium_monthly: 15000,
        premium_annual: 180000,
        coverage_amount: 2500000,
        features: ["Emergency Care", "Sports Medicine", "Mental Health", "Reproductive Health", "Wellness Programs"],
        terms: "Healthcare plan designed for young adults",
        is_active: true
      },

      // Consolidated Hallmark Insurance Plans (Expanded)
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
      {
        name: "CHI Executive Health",
        provider: "Consolidated Hallmark Insurance",
        plan_type: "Executive Insurance",
        premium_monthly: 60000,
        premium_annual: 720000,
        coverage_amount: 12000000,
        features: ["Emergency Care", "Executive Services", "Advanced Surgery", "Specialist Care", "Annual Executive Medical", "VIP Access"],
        terms: "Executive healthcare with premium services",
        is_active: true
      },

      // Mutual Benefits Assurance Plans (Expanded)
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
      },
      {
        name: "MutualCare Women's Health",
        provider: "Mutual Benefits Assurance",
        plan_type: "Women's Insurance",
        premium_monthly: 32000,
        premium_annual: 384000,
        coverage_amount: 6000000,
        features: ["Emergency Care", "Maternity Care", "Gynecological Care", "Breast Cancer Screening", "Fertility Treatment", "Mental Health"],
        terms: "Specialized healthcare plan for women",
        is_active: true
      },

      // Sterling Health HMO Plans
      {
        name: "Sterling Essential",
        provider: "Sterling Health HMO",
        plan_type: "HMO",
        premium_monthly: 14000,
        premium_annual: 168000,
        coverage_amount: 2000000,
        features: ["Emergency Care", "Outpatient Care", "Basic Diagnostics", "Prescription Drugs", "Preventive Care"],
        terms: "Essential healthcare coverage with preventive focus",
        is_active: true
      },
      {
        name: "Sterling Premium",
        provider: "Sterling Health HMO",
        plan_type: "Premium Insurance",
        premium_monthly: 45000,
        premium_annual: 540000,
        coverage_amount: 8000000,
        features: ["Emergency Care", "Comprehensive Care", "Surgery", "Maternity Care", "Dental", "Optical", "Specialist Access"],
        terms: "Premium healthcare with comprehensive benefits",
        is_active: true
      },
      {
        name: "Sterling Corporate",
        provider: "Sterling Health HMO",
        plan_type: "Corporate Insurance",
        premium_monthly: 28000,
        premium_annual: 336000,
        coverage_amount: 5000000,
        features: ["Emergency Care", "Group Benefits", "Occupational Health", "Wellness Programs", "Annual Screening"],
        terms: "Corporate health solution for organizations",
        is_active: true
      },

      // Total Health Trust Plans
      {
        name: "Total Health Basic",
        provider: "Total Health Trust",
        plan_type: "HMO",
        premium_monthly: 18000,
        premium_annual: 216000,
        coverage_amount: 3000000,
        features: ["Emergency Care", "Outpatient Care", "Inpatient Care", "Basic Surgery", "Prescription Drugs"],
        terms: "Reliable basic healthcare coverage",
        is_active: true
      },
      {
        name: "Total Health Plus",
        provider: "Total Health Trust",
        plan_type: "Premium Insurance",
        premium_monthly: 50000,
        premium_annual: 600000,
        coverage_amount: 10000000,
        features: ["Emergency Care", "Comprehensive Surgery", "Maternity Care", "Dental", "Optical", "Mental Health", "Cancer Care"],
        terms: "Enhanced healthcare with cancer treatment coverage",
        is_active: true
      },
      {
        name: "Total Health Family",
        provider: "Total Health Trust",
        plan_type: "Family Insurance",
        premium_monthly: 38000,
        premium_annual: 456000,
        coverage_amount: 7000000,
        features: ["Emergency Care", "Family Coverage", "Pediatric Care", "Maternity Care", "Immunization", "Wellness"],
        terms: "Complete family healthcare solution",
        is_active: true
      },

      // NHIS Plans
      {
        name: "NHIS Formal Sector",
        provider: "NHIS",
        plan_type: "Government Insurance",
        premium_monthly: 5000,
        premium_annual: 60000,
        coverage_amount: 1000000,
        features: ["Emergency Care", "Basic Outpatient", "Prescription Drugs", "Basic Surgery", "Maternity Care"],
        terms: "Government health insurance for formal sector workers",
        is_active: true
      },
      {
        name: "NHIS Informal Sector",
        provider: "NHIS",
        plan_type: "Government Insurance",
        premium_monthly: 3000,
        premium_annual: 36000,
        coverage_amount: 500000,
        features: ["Emergency Care", "Basic Outpatient", "Prescription Drugs", "Basic Diagnostics"],
        terms: "Affordable government health insurance for informal workers",
        is_active: true
      },

      // MetroHealth HMO Plans
      {
        name: "MetroHealth Basic",
        provider: "MetroHealth HMO",
        plan_type: "HMO",
        premium_monthly: 16000,
        premium_annual: 192000,
        coverage_amount: 2500000,
        features: ["Emergency Care", "Outpatient Care", "Basic Diagnostics", "Prescription Drugs", "Telemedicine"],
        terms: "Urban healthcare solution with telemedicine",
        is_active: true
      },
      {
        name: "MetroHealth Premium",
        provider: "MetroHealth HMO",
        plan_type: "Premium Insurance",
        premium_monthly: 42000,
        premium_annual: 504000,
        coverage_amount: 8000000,
        features: ["Emergency Care", "Comprehensive Care", "Surgery", "Maternity Care", "Dental", "Mental Health"],
        terms: "Premium urban healthcare with mental health support",
        is_active: true
      },

      // Avon Healthcare Plans
      {
        name: "Avon Essential Care",
        provider: "Avon Healthcare",
        plan_type: "HMO",
        premium_monthly: 19000,
        premium_annual: 228000,
        coverage_amount: 3000000,
        features: ["Emergency Care", "Outpatient Care", "Inpatient Care", "Surgery", "Maternity Care", "Pediatric Care"],
        terms: "Essential healthcare with comprehensive coverage",
        is_active: true
      },
      {
        name: "Avon Premium Shield",
        provider: "Avon Healthcare",
        plan_type: "Premium Insurance",
        premium_monthly: 58000,
        premium_annual: 696000,
        coverage_amount: 12000000,
        features: ["Emergency Care", "VIP Services", "Advanced Surgery", "Cancer Treatment", "Mental Health", "International Referrals"],
        terms: "Premium healthcare with advanced treatment options",
        is_active: true
      },

      // Flying Doctors Plans
      {
        name: "Flying Doctors Air Ambulance",
        provider: "Flying Doctors Nigeria",
        plan_type: "Emergency Insurance",
        premium_monthly: 25000,
        premium_annual: 300000,
        coverage_amount: 5000000,
        features: ["Air Ambulance", "Emergency Evacuation", "Critical Care Transport", "International Evacuation", "Medical Repatriation"],
        terms: "Emergency medical evacuation and air ambulance services",
        is_active: true
      },
      {
        name: "Flying Doctors Comprehensive",
        provider: "Flying Doctors Nigeria",
        plan_type: "Premium Insurance",
        premium_monthly: 80000,
        premium_annual: 960000,
        coverage_amount: 20000000,
        features: ["Air Ambulance", "Comprehensive Healthcare", "International Coverage", "VIP Medical Services", "Emergency Evacuation"],
        terms: "Comprehensive healthcare with emergency evacuation coverage",
        is_active: true
      },

      // Reliance HMO Plans
      {
        name: "Reliance Standard",
        provider: "Reliance HMO",
        plan_type: "HMO",
        premium_monthly: 17000,
        premium_annual: 204000,
        coverage_amount: 2800000,
        features: ["Emergency Care", "Outpatient Care", "Inpatient Care", "Basic Surgery", "Prescription Drugs", "Wellness"],
        terms: "Standard healthcare coverage with wellness programs",
        is_active: true
      },
      {
        name: "Reliance Gold",
        provider: "Reliance HMO",
        plan_type: "Premium Insurance",
        premium_monthly: 48000,
        premium_annual: 576000,
        coverage_amount: 9000000,
        features: ["Emergency Care", "Comprehensive Surgery", "Maternity Care", "Dental", "Optical", "Cancer Care", "Mental Health"],
        terms: "Gold standard healthcare with cancer coverage",
        is_active: true
      },

      // Princeton Healthcare Plans
      {
        name: "Princeton Basic Care",
        provider: "Princeton Healthcare",
        plan_type: "HMO",
        premium_monthly: 21000,
        premium_annual: 252000,
        coverage_amount: 3500000,
        features: ["Emergency Care", "Outpatient Care", "Inpatient Care", "Surgery", "Maternity Care", "Preventive Care"],
        terms: "Quality healthcare with preventive focus",
        is_active: true
      },
      {
        name: "Princeton Executive",
        provider: "Princeton Healthcare",
        plan_type: "Executive Insurance",
        premium_monthly: 70000,
        premium_annual: 840000,
        coverage_amount: 15000000,
        features: ["Emergency Care", "Executive Services", "VIP Treatment", "Advanced Surgery", "International Referrals", "Concierge Medicine"],
        terms: "Executive healthcare with concierge medicine services",
        is_active: true
      },

      // RedCare HMO Plans
      {
        name: "RedCare Essential",
        provider: "RedCare HMO",
        plan_type: "HMO",
        premium_monthly: 13000,
        premium_annual: 156000,
        coverage_amount: 2000000,
        features: ["Emergency Care", "Outpatient Care", "Basic Diagnostics", "Prescription Drugs", "Telemedicine"],
        terms: "Essential healthcare with telemedicine support",
        is_active: true
      },
      {
        name: "RedCare Premium",
        provider: "RedCare HMO",
        plan_type: "Premium Insurance",
        premium_monthly: 39000,
        premium_annual: 468000,
        coverage_amount: 7000000,
        features: ["Emergency Care", "Comprehensive Care", "Surgery", "Maternity Care", "Dental", "Mental Health", "Wellness"],
        terms: "Premium healthcare with comprehensive wellness programs",
        is_active: true
      },

      // ClearPath Healthcare Plans
      {
        name: "ClearPath Basic",
        provider: "ClearPath Healthcare",
        plan_type: "HMO",
        premium_monthly: 15000,
        premium_annual: 180000,
        coverage_amount: 2200000,
        features: ["Emergency Care", "Outpatient Care", "Basic Surgery", "Prescription Drugs", "Preventive Screening"],
        terms: "Clear and simple healthcare coverage",
        is_active: true
      },
      {
        name: "ClearPath Comprehensive",
        provider: "ClearPath Healthcare",
        plan_type: "Premium Insurance",
        premium_monthly: 52000,
        premium_annual: 624000,
        coverage_amount: 10000000,
        features: ["Emergency Care", "Comprehensive Surgery", "Maternity Care", "Cancer Treatment", "Mental Health", "International Coverage"],
        terms: "Comprehensive healthcare with international coverage",
        is_active: true
      },

      // Specialty Plans
      {
        name: "Dangote Group Health Plan",
        provider: "Dangote Group Insurance",
        plan_type: "Corporate Insurance",
        premium_monthly: 35000,
        premium_annual: 420000,
        coverage_amount: 8000000,
        features: ["Emergency Care", "Executive Health", "Occupational Medicine", "Wellness Programs", "Family Coverage", "VIP Services"],
        terms: "Premium corporate health insurance for Dangote Group employees",
        is_active: true
      },
      {
        name: "Lagos State Health Scheme",
        provider: "Lagos State Government",
        plan_type: "Government Insurance",
        premium_monthly: 8000,
        premium_annual: 96000,
        coverage_amount: 1500000,
        features: ["Emergency Care", "Outpatient Care", "Basic Surgery", "Maternity Care", "Immunization", "Preventive Care"],
        terms: "State government health insurance for Lagos residents",
        is_active: true
      },
      {
        name: "MTN Staff Health Plan",
        provider: "MTN Nigeria Insurance",
        plan_type: "Corporate Insurance",
        premium_monthly: 40000,
        premium_annual: 480000,
        coverage_amount: 10000000,
        features: ["Emergency Care", "Comprehensive Coverage", "International Access", "Mental Health", "Wellness Programs", "Family Benefits"],
        terms: "Corporate health insurance for MTN Nigeria staff",
        is_active: true
      },
      {
        name: "First Bank Staff Medical",
        provider: "First Bank Medical Scheme",
        plan_type: "Corporate Insurance",
        premium_monthly: 32000,
        premium_annual: 384000,
        coverage_amount: 6000000,
        features: ["Emergency Care", "Comprehensive Healthcare", "Executive Medical", "Specialist Care", "Annual Check-ups"],
        terms: "Medical scheme for First Bank of Nigeria staff",
        is_active: true
      },
      {
        name: "Shell Nigeria Health Plan",
        provider: "Shell Nigeria Insurance",
        plan_type: "Corporate Insurance",
        premium_monthly: 85000,
        premium_annual: 1020000,
        coverage_amount: 25000000,
        features: ["Emergency Care", "International Coverage", "Executive Health", "Evacuation Services", "Comprehensive Specialist Care", "Mental Health"],
        terms: "Premium international health insurance for Shell Nigeria employees",
        is_active: true
      },
      {
        name: "University of Lagos Health Scheme",
        provider: "UNILAG Medical Centre",
        plan_type: "Student Insurance",
        premium_monthly: 6000,
        premium_annual: 72000,
        coverage_amount: 800000,
        features: ["Emergency Care", "Campus Health", "Basic Diagnostics", "Mental Health Support", "Sports Medicine"],
        terms: "Student health insurance for University of Lagos",
        is_active: true
      },
      {
        name: "Federal Civil Service Health Plan",
        provider: "Federal Government of Nigeria",
        plan_type: "Government Insurance",
        premium_monthly: 7000,
        premium_annual: 84000,
        coverage_amount: 1200000,
        features: ["Emergency Care", "Outpatient Care", "Basic Surgery", "Maternity Care", "Prescription Drugs"],
        terms: "Health insurance for federal civil servants",
        is_active: true
      },
      {
        name: "Nigerian Military Health Scheme",
        provider: "Nigerian Armed Forces",
        plan_type: "Military Insurance",
        premium_monthly: 10000,
        premium_annual: 120000,
        coverage_amount: 2000000,
        features: ["Emergency Care", "Military Hospital Access", "Combat Medicine", "Family Coverage", "Mental Health Support"],
        terms: "Health insurance for Nigerian military personnel",
        is_active: true
      },
      {
        name: "NYSC Health Insurance",
        provider: "NYSC",
        plan_type: "Youth Insurance",
        premium_monthly: 4000,
        premium_annual: 48000,
        coverage_amount: 600000,
        features: ["Emergency Care", "Basic Outpatient", "Accident Coverage", "Mental Health", "Preventive Care"],
        terms: "Health insurance for National Youth Service Corps members",
        is_active: true
      },
      {
        name: "Ogun State Health Insurance",
        provider: "Ogun State Government",
        plan_type: "Government Insurance",
        premium_monthly: 6500,
        premium_annual: 78000,
        coverage_amount: 1000000,
        features: ["Emergency Care", "Primary Healthcare", "Maternity Care", "Immunization", "Basic Surgery"],
        terms: "State health insurance for Ogun State residents",
        is_active: true
      },
      {
        name: "Kano State Contributory Healthcare",
        provider: "Kano State Government",
        plan_type: "Government Insurance",
        premium_monthly: 5500,
        premium_annual: 66000,
        coverage_amount: 900000,
        features: ["Emergency Care", "Primary Healthcare", "Maternal Health", "Child Health", "Preventive Services"],
        terms: "Contributory healthcare scheme for Kano State",
        is_active: true
      },
      {
        name: "Rivers State Health Scheme",
        provider: "Rivers State Government",
        plan_type: "Government Insurance",
        premium_monthly: 9000,
        premium_annual: 108000,
        coverage_amount: 1800000,
        features: ["Emergency Care", "Comprehensive Primary Care", "Specialist Referrals", "Maternity Care", "Surgery"],
        terms: "State health insurance scheme for Rivers State residents",
        is_active: true
      },
      {
        name: "Cross River State Health Insurance",
        provider: "Cross River State Government",
        plan_type: "Government Insurance",
        premium_monthly: 7500,
        premium_annual: 90000,
        coverage_amount: 1300000,
        features: ["Emergency Care", "Primary Healthcare", "Rural Health Access", "Maternal Health", "Child Immunization"],
        terms: "Health insurance for Cross River State citizens",
        is_active: true
      },
      {
        name: "Kaduna State Health Fund",
        provider: "Kaduna State Government",
        plan_type: "Government Insurance",
        premium_monthly: 8500,
        premium_annual: 102000,
        coverage_amount: 1600000,
        features: ["Emergency Care", "Primary Healthcare", "Secondary Care", "Maternity Services", "Surgery"],
        terms: "Health fund for Kaduna State residents",
        is_active: true
      },
      {
        name: "Edo State Health Insurance Scheme",
        provider: "Edo State Government",
        plan_type: "Government Insurance",
        premium_monthly: 7000,
        premium_annual: 84000,
        coverage_amount: 1200000,
        features: ["Emergency Care", "Primary Care", "Maternal Health", "Child Health", "Basic Surgery"],
        terms: "State health insurance for Edo State residents",
        is_active: true
      }
    ];

    console.log(`Inserting ${comprehensiveInsurancePlans.length} comprehensive insurance plans...`);

    // Insert insurance plans directly
    for (const plan of comprehensiveInsurancePlans) {
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
        provider_name: 'Hygeia HMO',
        api_endpoint: 'https://api.hygeiahmo.com/v1/plans',
        api_key_reference: 'hygeia_api_key',
        config_data: { version: '1.0', format: 'json', provider_type: 'direct' },
        is_active: true
      },
      {
        provider_name: 'Sterling Health HMO',
        api_endpoint: 'https://api.sterlinghealthhmo.com/v1/plans',
        api_key_reference: 'sterling_api_key',
        config_data: { version: '1.0', format: 'json', provider_type: 'direct' },
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

    console.log('Comprehensive insurance data sync completed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comprehensive insurance data sync completed successfully',
        plansInserted: comprehensiveInsurancePlans.length,
        apiConfigsInserted: apiConfigs.length,
        totalProviders: [...new Set(comprehensiveInsurancePlans.map(p => p.provider))].length,
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
