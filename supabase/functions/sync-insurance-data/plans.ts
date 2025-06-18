
import { insurancePlansData } from './plans-data.ts';
import { insertOrUpdate } from './utils.ts';

export async function syncInsurancePlans(supabase) {
  console.log(`Inserting ${insurancePlansData.length} comprehensive insurance plans...`);
  
  let successCount = 0;
  const providers = new Set();

  // Insert insurance plans directly
  for (const plan of insurancePlansData) {
    const result = await insertOrUpdate(
      supabase,
      'insurance_plans',
      plan,
      ['name', 'provider']
    );
    
    if (result.success) {
      successCount++;
      providers.add(plan.provider);
    }
  }

  return {
    count: successCount,
    uniqueProviders: providers.size
  };
}
