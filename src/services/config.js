/**
 * API Configuration
 * 
 * Centralized configuration for all API providers and settings.
 * Environment variables should be set in .env file.
 */

const config = {
  // Default provider selection
  defaultProvider: process.env.REACT_APP_DEFAULT_PROVIDER || 'mock',
  
  // Fallback settings
  fallbackToMock: process.env.REACT_APP_FALLBACK_TO_MOCK !== 'false',
  
  // Cache settings
  cacheEnabled: process.env.REACT_APP_CACHE_ENABLED !== 'false',
  cacheDuration: parseInt(process.env.REACT_APP_CACHE_DURATION) || 300000, // 5 minutes
  
  // Retry settings
  retryAttempts: parseInt(process.env.REACT_APP_RETRY_ATTEMPTS) || 3,
  retryDelay: parseInt(process.env.REACT_APP_RETRY_DELAY) || 1000,
  
  // Viberate API Configuration
  viberate: {
    baseURL: process.env.REACT_APP_VIBERATE_BASE_URL || 'https://api.viberate.com/v1',
    apiKey: process.env.REACT_APP_VIBERATE_API_KEY || 'JjeDtsAttDAT1pAAXL5YC7Dk_ad-aaqW',
    rateLimitDelay: parseInt(process.env.REACT_APP_VIBERATE_RATE_LIMIT) || 1000,
    timeout: parseInt(process.env.REACT_APP_VIBERATE_TIMEOUT) || 10000,
    enabled: process.env.REACT_APP_VIBERATE_ENABLED !== 'false'
  },
  
  // Songstats API Configuration
  songstats: {
    baseURL: process.env.REACT_APP_SONGSTATS_BASE_URL || 'https://api.songstats.com/v1',
    apiKey: process.env.REACT_APP_SONGSTATS_API_KEY || '',
    rateLimitDelay: parseInt(process.env.REACT_APP_SONGSTATS_RATE_LIMIT) || 500,
    timeout: parseInt(process.env.REACT_APP_SONGSTATS_TIMEOUT) || 10000,
    enabled: process.env.REACT_APP_SONGSTATS_ENABLED === 'true'
  },
  
  // Mock Data Configuration
  mock: {
    delay: parseInt(process.env.REACT_APP_MOCK_DELAY) || 500,
    enabled: true // Mock is always enabled as fallback
  },
  
  // Feature flags
  features: {
    realTimeUpdates: process.env.REACT_APP_REAL_TIME_UPDATES === 'true',
    advancedAnalytics: process.env.REACT_APP_ADVANCED_ANALYTICS === 'true',
    exportFunctionality: process.env.REACT_APP_EXPORT_FUNCTIONALITY !== 'false',
    socialMediaIntegration: process.env.REACT_APP_SOCIAL_MEDIA_INTEGRATION === 'true'
  },
  
  // UI Configuration
  ui: {
    itemsPerPage: parseInt(process.env.REACT_APP_ITEMS_PER_PAGE) || 20,
    chartRefreshInterval: parseInt(process.env.REACT_APP_CHART_REFRESH_INTERVAL) || 60000, // 1 minute
    animationDuration: parseInt(process.env.REACT_APP_ANIMATION_DURATION) || 300
  },
  
  // Development settings
  development: {
    enableLogging: process.env.NODE_ENV === 'development' || process.env.REACT_APP_ENABLE_LOGGING === 'true',
    enableDebugMode: process.env.REACT_APP_DEBUG_MODE === 'true',
    mockDataOnly: process.env.REACT_APP_MOCK_DATA_ONLY === 'true'
  }
};

/**
 * Get the current environment
 */
export const getEnvironment = () => {
  return process.env.NODE_ENV || 'development';
};

/**
 * Check if we're in development mode
 */
export const isDevelopment = () => {
  return getEnvironment() === 'development';
};

/**
 * Check if we're in production mode
 */
export const isProduction = () => {
  return getEnvironment() === 'production';
};

/**
 * Get API configuration for a specific provider
 */
export const getProviderConfig = (provider) => {
  return config[provider] || null;
};

/**
 * Check if a provider is enabled
 */
export const isProviderEnabled = (provider) => {
  const providerConfig = getProviderConfig(provider);
  return providerConfig && providerConfig.enabled !== false;
};

/**
 * Get the list of available providers
 */
export const getAvailableProviders = () => {
  return Object.keys(config).filter(key => 
    ['viberate', 'songstats', 'mock'].includes(key) && isProviderEnabled(key)
  );
};

/**
 * Get the best available provider based on configuration
 */
export const getBestProvider = () => {
  // If mock data only is enabled, return mock
  if (config.development.mockDataOnly) {
    return 'mock';
  }
  
  // Check if default provider is available
  if (isProviderEnabled(config.defaultProvider)) {
    return config.defaultProvider;
  }
  
  // Fallback to first available provider
  const availableProviders = getAvailableProviders();
  if (availableProviders.length > 0) {
    return availableProviders[0];
  }
  
  // Last resort: mock
  return 'mock';
};

/**
 * Validate configuration
 */
export const validateConfig = () => {
  const errors = [];
  
  // Check if at least one provider is enabled
  const availableProviders = getAvailableProviders();
  if (availableProviders.length === 0) {
    errors.push('No API providers are enabled');
  }
  
  // Check Viberate configuration if enabled
  if (isProviderEnabled('viberate') && !config.viberate.apiKey) {
    errors.push('Viberate API key is missing');
  }
  
  // Check Songstats configuration if enabled
  if (isProviderEnabled('songstats') && !config.songstats.apiKey) {
    errors.push('Songstats API key is missing');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Log configuration status (development only)
 */
export const logConfigStatus = () => {
  if (!config.development.enableLogging) return;
  
  console.group('🔧 API Configuration Status');
  console.log('Environment:', getEnvironment());
  console.log('Default Provider:', config.defaultProvider);
  console.log('Available Providers:', getAvailableProviders());
  console.log('Best Provider:', getBestProvider());
  console.log('Fallback to Mock:', config.fallbackToMock);
  console.log('Cache Enabled:', config.cacheEnabled);
  
  const validation = validateConfig();
  if (validation.isValid) {
    console.log('✅ Configuration is valid');
  } else {
    console.warn('⚠️ Configuration issues:', validation.errors);
  }
  console.groupEnd();
};

export default config;
