
export const apiConfigsData = [
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
