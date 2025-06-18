
import { apiConfigsData } from './api-configs-data.ts';
import { insertOrUpdate } from './utils.ts';

export async function syncApiConfigurations(supabase) {
  console.log(`Inserting ${apiConfigsData.length} API configurations...`);
  
  let successCount = 0;

  // Insert API configurations
  for (const config of apiConfigsData) {
    const result = await insertOrUpdate(
      supabase,
      'insurance_api_configs',
      config,
      ['provider_name']
    );
    
    if (result.success) {
      successCount++;
    }
  }

  return { count: successCount };
}
