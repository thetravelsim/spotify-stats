/**
 * Test Utilities
 * 
 * Common utilities and helpers for testing the Albanian Music Analytics Platform.
 */

/**
 * Mock fetch function for testing API calls
 */
export const mockFetch = (mockResponse, shouldFail = false) => {
  global.fetch = jest.fn(() => {
    if (shouldFail) {
      return Promise.reject(new Error('Network error'));
    }
    
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
      text: () => Promise.resolve(JSON.stringify(mockResponse))
    });
  });
};

/**
 * Mock fetch with specific status code
 */
export const mockFetchWithStatus = (status, response = {}) => {
  global.fetch = jest.fn(() => 
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      statusText: getStatusText(status),
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response))
    })
  );
};

/**
 * Get status text for HTTP status codes
 */
const getStatusText = (status) => {
  const statusTexts = {
    200: 'OK',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    503: 'Service Unavailable'
  };
  return statusTexts[status] || 'Unknown';
};

/**
 * Create mock artist data
 */
export const createMockArtist = (overrides = {}) => ({
  id: 1,
  name: 'Test Artist',
  country: 'Albania',
  countryCode: '🇦🇱',
  genre: 'Pop',
  platformRank: 1,
  platformScore: 85,
  followers: '1.2M',
  streams: '45.6M',
  socialBuzz: 78,
  momentum: 'high',
  growth: '+15.3%',
  verified: true,
  label: 'Test Records',
  photo: '/test-artist.jpg',
  spotifyId: 'test-spotify-id',
  appleMusicId: 'test-apple-id',
  youtubeId: 'test-youtube-id',
  ...overrides
});

/**
 * Create mock track data
 */
export const createMockTrack = (overrides = {}) => ({
  id: 1,
  rank: 1,
  title: 'Test Song',
  artist: 'Test Artist',
  artistId: 1,
  album: 'Test Album',
  cover: '/test-album.jpg',
  duration: '3:30',
  streams: '12.5M',
  weeklyStreams: '2.1M',
  growth: '+8.7%',
  momentum: 'rising',
  change: '+2',
  releaseDate: '2023-09-01',
  isrc: 'TEST1234567',
  spotifyId: 'test-track-spotify-id',
  ...overrides
});

/**
 * Create mock stream data
 */
export const createMockStreamData = (days = 30) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    data.push({
      date: date.toISOString().split('T')[0],
      streams: Math.floor(Math.random() * 1000000) + 500000,
      listeners: Math.floor(Math.random() * 100000) + 50000
    });
  }
  return data;
};

/**
 * Create mock audience data
 */
export const createMockAudienceData = () => ({
  countries: [
    { country: 'Albania', code: 'AL', percentage: 35.5, listeners: 177500 },
    { country: 'Germany', code: 'DE', percentage: 20.2, listeners: 101000 },
    { country: 'Italy', code: 'IT', percentage: 15.8, listeners: 79000 }
  ],
  demographics: {
    ageGroups: [
      { age: '18-24', percentage: 40.2 },
      { age: '25-34', percentage: 32.1 },
      { age: '35-44', percentage: 18.7 },
      { age: '45+', percentage: 9.0 }
    ],
    gender: {
      male: 55.3,
      female: 44.7
    }
  },
  totalListeners: 500000
});

/**
 * Create mock social data
 */
export const createMockSocialData = () => ({
  platforms: {
    spotify: { followers: 1500000, growth: 10.5 },
    instagram: { followers: 980000, growth: 15.2 },
    youtube: { followers: 750000, growth: 8.7 },
    tiktok: { followers: 1200000, growth: 25.8 }
  },
  totalFollowers: 4430000,
  engagement: 5.2
});

/**
 * Wait for a specified amount of time
 */
export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Wait for next tick
 */
export const waitForNextTick = () => new Promise(resolve => process.nextTick(resolve));

/**
 * Create a mock console to capture logs
 */
export const createMockConsole = () => {
  const logs = [];
  const warnings = [];
  const errors = [];
  
  const mockConsole = {
    log: jest.fn((...args) => logs.push(args)),
    warn: jest.fn((...args) => warnings.push(args)),
    error: jest.fn((...args) => errors.push(args)),
    getLogs: () => logs,
    getWarnings: () => warnings,
    getErrors: () => errors,
    clear: () => {
      logs.length = 0;
      warnings.length = 0;
      errors.length = 0;
    }
  };
  
  return mockConsole;
};

/**
 * Mock environment variables
 */
export const mockEnvVars = (envVars) => {
  const originalEnv = process.env;
  
  beforeEach(() => {
    process.env = { ...originalEnv, ...envVars };
  });
  
  afterEach(() => {
    process.env = originalEnv;
  });
};

/**
 * Mock localStorage
 */
export const mockLocalStorage = () => {
  const store = {};
  
  const mockStorage = {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index) => Object.keys(store)[index] || null)
  };
  
  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
    writable: true
  });
  
  return mockStorage;
};

/**
 * Assert that an error is thrown with specific message
 */
export const expectError = async (fn, expectedMessage) => {
  let error;
  try {
    await fn();
  } catch (e) {
    error = e;
  }
  
  expect(error).toBeDefined();
  if (expectedMessage) {
    expect(error.message).toContain(expectedMessage);
  }
};

/**
 * Create a mock provider for testing
 */
export const createMockProvider = (methods = {}) => {
  const defaultMethods = {
    getArtists: jest.fn().mockResolvedValue([createMockArtist()]),
    getArtistProfile: jest.fn().mockResolvedValue(createMockArtist()),
    getArtistStreams: jest.fn().mockResolvedValue({
      total: 1000000,
      daily: createMockStreamData(),
      growth: 15.3,
      timeRange: '30d'
    }),
    getArtistAudience: jest.fn().mockResolvedValue(createMockAudienceData()),
    getArtistSocial: jest.fn().mockResolvedValue(createMockSocialData()),
    getTopTracks: jest.fn().mockResolvedValue([createMockTrack()]),
    getTrackDetails: jest.fn().mockResolvedValue(createMockTrack()),
    getTrackStreams: jest.fn().mockResolvedValue({
      total: 500000,
      daily: createMockStreamData(),
      growth: 8.7,
      timeRange: '30d'
    }),
    getArtistTracks: jest.fn().mockResolvedValue([createMockTrack()]),
    getPlaylistAnalytics: jest.fn().mockResolvedValue({}),
    getArtistPlaylists: jest.fn().mockResolvedValue([]),
    search: jest.fn().mockResolvedValue({
      artists: [createMockArtist()],
      tracks: [createMockTrack()],
      albums: []
    }),
    getCountries: jest.fn().mockResolvedValue([]),
    getGenres: jest.fn().mockResolvedValue([]),
    getHealthStatus: jest.fn().mockResolvedValue({
      status: 'healthy',
      provider: 'mock',
      timestamp: new Date().toISOString()
    })
  };
  
  return { ...defaultMethods, ...methods };
};

/**
 * Test data validation helper
 */
export const validateArtistData = (artist) => {
  expect(artist).toHaveProperty('id');
  expect(artist).toHaveProperty('name');
  expect(artist).toHaveProperty('country');
  expect(artist).toHaveProperty('genre');
  expect(artist).toHaveProperty('platformScore');
  expect(typeof artist.platformScore).toBe('number');
  expect(artist.platformScore).toBeGreaterThanOrEqual(0);
  expect(artist.platformScore).toBeLessThanOrEqual(100);
};

/**
 * Test data validation helper for tracks
 */
export const validateTrackData = (track) => {
  expect(track).toHaveProperty('id');
  expect(track).toHaveProperty('title');
  expect(track).toHaveProperty('artist');
  expect(track).toHaveProperty('duration');
  expect(track).toHaveProperty('streams');
  expect(track.duration).toMatch(/^\d+:\d{2}$/); // Format: "3:30"
};

/**
 * Performance testing helper
 */
export const measurePerformance = async (fn, label = 'Operation') => {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  const duration = end - start;
  
  console.log(`${label} took ${duration.toFixed(2)}ms`);
  
  return { result, duration };
};

/**
 * Retry helper for flaky tests
 */
export const retryTest = async (fn, maxAttempts = 3, delay = 100) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        await wait(delay);
      }
    }
  }
  
  throw lastError;
};
