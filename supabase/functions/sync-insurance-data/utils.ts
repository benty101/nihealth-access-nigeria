
// CORS headers for all requests
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to handle insertion or update of records
export async function insertOrUpdate(supabase, tableName, record, identifiers) {
  console.log(`Inserting ${tableName}: ${record.name || record.provider_name}`);
  
  const { error: insertError } = await supabase
    .from(tableName)
    .insert(record);

  if (insertError) {
    console.error(`Error inserting ${tableName} ${record.name || record.provider_name}:`, insertError);
    
    // Build update query with conditions
    let query = supabase
      .from(tableName)
      .update({
        ...record,
        updated_at: new Date().toISOString()
      });
    
    // Add equality conditions for each identifier
    identifiers.forEach(identifier => {
      query = query.eq(identifier, record[identifier]);
    });
    
    const { error: updateError } = await query;
    
    if (updateError) {
      console.error(`Error updating ${tableName} ${record.name || record.provider_name}:`, updateError);
      return { success: false, error: updateError };
    } else {
      console.log(`Successfully updated ${tableName}: ${record.name || record.provider_name}`);
      return { success: true, operation: 'update' };
    }
  } else {
    console.log(`Successfully inserted ${tableName}: ${record.name || record.provider_name}`);
    return { success: true, operation: 'insert' };
  }
}
