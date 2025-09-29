/**
 * Unit Tests for VibrateAPIProvider
 * 
 * Tests the Viberate API provider implementation including
 * API calls, data transformation, rate limiting, and error handling.
 */

import VibrateAPIProvider from '../../services/providers/VibrateAPIProvider';
import { 
  mockFetch, 
  mockFetchWithStatus,
  wait,
  expectError,
  validateArtistData,
  validateTrackData
} from '../utils/testUtils';

describe('VibrateAPIProvider', () => {
  let provider;

  beforeEach(() => {
    provider = new VibrateAPIProvider();
    jest.clearAllMocks();
    
    // Reset rate limiting
    provider.lastRequestTime = 0;
  });

  afterEach(() => {
    // Restore fetch
    if (global.fetch && global.fetch.mockRestore) {
      global.fetch.mockRestore();
    }
  });

  describe('Constructor and Configuration', () => {
    test('should initialize with correct default values', () => {
      expect(provider.baseURL).toBe('https://api.viberate.com/v1');
      expect(provider.apiKey).toBeDefined();
      expect(provider.rateLimitDelay).toBe(1000);
      expect(provider.lastRequestTime).toBe(0);
    });

    test('should use environment variables when available', () => {
      const originalEnv = process.env;
      process.env.REACT_APP_VIBERATE_API_KEY = 'test-key';
      process.env.REACT_APP_VIBERATE_BASE_URL = 'https://test.api.com';
      
      const testProvider = new VibrateAPIProvider();
      expect(testProvider.apiKey).toBe('test-key');
      
      process.env = originalEnv;
    });
  });

  describe('Rate Limiting', () => {
    test('should enforce rate limiting between requests', async () => {
      mockFetch({ data: [] });
      
      const start = Date.now();
      
      // Make first request
      await provider.makeRequest('/test1');
      
      // Make second request immediately
      await provider.makeRequest('/test2');
      
      const elapsed = Date.now() - start;
      
      // Should take at least the rate limit delay
      expect(elapsed).toBeGreaterThanOrEqual(provider.rateLimitDelay);
    });

    test('should not delay if enough time has passed', async () => {
      mockFetch({ data: [] });
      
      // Make first request
      await provider.makeRequest('/test1');
      
      // Wait longer than rate limit
      await wait(provider.rateLimitDelay + 100);
      
      const start = Date.now();
      await provider.makeRequest('/test2');
      const elapsed = Date.now() - start;
      
      // Should not add additional delay
      expect(elapsed).toBeLessThan(500); // Allow for some processing time
    });
  });

  describe('API Request Handling', () => {
    test('should make successful API request', async () => {
      const mockResponse = { data: { id: 1, name: 'Test' } };
      mockFetch(mockResponse);

      const result = await provider.makeRequest('/test');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.viberate.com/v1/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': `Bearer ${provider.apiKey}`,
            'Content-Type': 'application/json'
          })
        })
      );
      expect(result).toEqual(mockResponse);
    });

    test('should handle API errors', async () => {
      mockFetchWithStatus(404, { error: 'Not Found' });

      await expectError(
        () => provider.makeRequest('/test'),
        'Viberate API Error: 404'
      );
    });

    test('should handle network errors', async () => {
      mockFetch({}, true); // shouldFail = true

      await expectError(
        () => provider.makeRequest('/test'),
        'Network error'
      );
    });

    test('should include custom headers', async () => {
      mockFetch({ data: [] });

      await provider.makeRequest('/test', {
        headers: { 'Custom-Header': 'value' }
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': `Bearer ${provider.apiKey}`,
            'Content-Type': 'application/json',
            'Custom-Header': 'value'
          })
        })
      );
    });
  });

  describe('Data Transformation', () => {
    test('should transform artist data correctly', () => {
      const vibrateArtist = {
        id: 123,
        name: 'Test Artist',
        country: { name: 'Albania', code: 'AL' },
        genres: [{ name: 'Pop' }],
        rank: 5,
        score: 85,
        followers: { total: 1500000 },
        streams: { total: 45000000 },
        social_buzz: 78,
        growth: 15.3,
        verified: true,
        label: { name: 'Test Records' },
        image_url: 'https://example.com/image.jpg',
        spotify_id: 'spotify123',
        apple_music_id: 'apple123',
        youtube_id: 'youtube123'
      };

      const transformed = provider.transformArtistData(vibrateArtist);

      expect(transformed).toEqual({
        id: 123,
        name: 'Test Artist',
        country: 'Albania',
        countryCode: 'AL',
        genre: 'Pop',
        platformRank: 5,
        platformScore: 85,
        followers: '1.5M',
        streams: '45.0M',
        socialBuzz: 78,
        momentum: 'very high',
        growth: '+15.3%',
        verified: true,
        label: 'Test Records',
        photo: 'https://example.com/image.jpg',
        spotifyId: 'spotify123',
        appleMusicId: 'apple123',
        youtubeId: 'youtube123'
      });

      validateArtistData(transformed);
    });

    test('should handle missing artist data fields', () => {
      const vibrateArtist = {
        id: 123,
        name: 'Test Artist'
        // Missing most fields
      };

      const transformed = provider.transformArtistData(vibrateArtist);

      expect(transformed.country).toBe('Unknown');
      expect(transformed.countryCode).toBe('🌍');
      expect(transformed.genre).toBe('Unknown');
      expect(transformed.platformRank).toBe(0);
      expect(transformed.platformScore).toBe(0);
      expect(transformed.followers).toBe('0');
      expect(transformed.streams).toBe('0');
      expect(transformed.label).toBe('Independent');
      expect(transformed.verified).toBe(false);
    });

    test('should transform track data correctly', () => {
      const vibrateTrack = {
        id: 456,
        name: 'Test Song',
        artist: { id: 123, name: 'Test Artist' },
        album: { name: 'Test Album', image_url: 'https://example.com/album.jpg' },
        duration: 210, // 3:30 in seconds
        streams: { total: 12500000, weekly: 2100000 },
        growth: 8.7,
        rank: 3,
        rank_change: 2,
        release_date: '2023-09-01',
        isrc: 'TEST1234567',
        spotify_id: 'track123'
      };

      const transformed = provider.transformTrackData(vibrateTrack);

      expect(transformed).toEqual({
        id: 456,
        title: 'Test Song',
        artist: 'Test Artist',
        artistId: 123,
        album: 'Test Album',
        cover: 'https://example.com/album.jpg',
        duration: '3:30',
        streams: '12.5M',
        weeklyStreams: '2.1M',
        growth: '+8.7%',
        momentum: 'stable',
        rank: 3,
        change: 2,
        releaseDate: '2023-09-01',
        isrc: 'TEST1234567',
        spotifyId: 'track123'
      });

      validateTrackData(transformed);
    });
  });

  describe('Helper Methods', () => {
    test('should format numbers correctly', () => {
      expect(provider.formatNumber(1500000000)).toBe('1.5B');
      expect(provider.formatNumber(45000000)).toBe('45.0M');
      expect(provider.formatNumber(1500)).toBe('1.5K');
      expect(provider.formatNumber(500)).toBe('500');
    });

    test('should format growth correctly', () => {
      expect(provider.formatGrowth(15.3)).toBe('+15.3%');
      expect(provider.formatGrowth(-5.7)).toBe('-5.7%');
      expect(provider.formatGrowth(0)).toBe('+0.0%');
    });

    test('should format duration correctly', () => {
      expect(provider.formatDuration(210)).toBe('3:30');
      expect(provider.formatDuration(65)).toBe('1:05');
      expect(provider.formatDuration(3661)).toBe('61:01');
    });

    test('should calculate momentum correctly', () => {
      expect(provider.calculateMomentum({ momentum_score: 85 })).toBe('very high');
      expect(provider.calculateMomentum({ momentum_score: 65 })).toBe('high');
      expect(provider.calculateMomentum({ momentum_score: 45 })).toBe('medium');
      expect(provider.calculateMomentum({ momentum_score: 25 })).toBe('low');
      expect(provider.calculateMomentum({})).toBe('low');
    });

    test('should calculate track momentum correctly', () => {
      expect(provider.calculateTrackMomentum({ growth: 25 })).toBe('explosive');
      expect(provider.calculateTrackMomentum({ growth: 15 })).toBe('rising');
      expect(provider.calculateTrackMomentum({ growth: 5 })).toBe('stable');
      expect(provider.calculateTrackMomentum({ growth: -5 })).toBe('declining');
    });
  });

  describe('Artist API Methods', () => {
    test('should get artists with filters', async () => {
      const mockResponse = {
        data: [{
          id: 1,
          name: 'Test Artist',
          country: { name: 'Albania' }
        }]
      };
      mockFetch(mockResponse);

      const filters = { country: 'AL', genre: 'pop', limit: 10 };
      const result = await provider.getArtists(filters);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/artists?country=AL&genre=pop&limit=10'),
        expect.any(Object)
      );
      expect(Array.isArray(result)).toBe(true);
    });

    test('should get artist profile', async () => {
      const mockResponse = {
        data: {
          id: 123,
          name: 'Test Artist'
        }
      };
      mockFetch(mockResponse);

      const result = await provider.getArtistProfile('123');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/artists/123'),
        expect.any(Object)
      );
      expect(result).toBeDefined();
    });

    test('should get artist streams', async () => {
      const mockResponse = {
        data: {
          total: 1000000,
          daily: [],
          growth: 15.3
        }
      };
      mockFetch(mockResponse);

      const result = await provider.getArtistStreams('123', '30d');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/artists/123/streams?period=30d'),
        expect.any(Object)
      );
      expect(result.timeRange).toBe('30d');
    });

    test('should get artist audience', async () => {
      const mockResponse = {
        data: {
          countries: [],
          demographics: {},
          total_listeners: 100000
        }
      };
      mockFetch(mockResponse);

      const result = await provider.getArtistAudience('123');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/artists/123/audience'),
        expect.any(Object)
      );
      expect(result.totalListeners).toBe(100000);
    });
  });

  describe('Track API Methods', () => {
    test('should get top tracks', async () => {
      const mockResponse = {
        data: [{
          id: 1,
          name: 'Test Song',
          artist: { name: 'Test Artist' }
        }]
      };
      mockFetch(mockResponse);

      const options = { timeRange: 'weekly', country: 'AL' };
      const result = await provider.getTopTracks(options);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/tracks/charts?period=weekly&country=AL'),
        expect.any(Object)
      );
      expect(Array.isArray(result)).toBe(true);
    });

    test('should get track details', async () => {
      const mockResponse = {
        data: {
          id: 456,
          name: 'Test Song'
        }
      };
      mockFetch(mockResponse);

      const result = await provider.getTrackDetails('456');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/tracks/456'),
        expect.any(Object)
      );
      expect(result).toBeDefined();
    });
  });

  describe('Search Methods', () => {
    test('should search for content', async () => {
      const mockResponse = {
        data: {
          artists: [{ id: 1, name: 'Test Artist' }],
          tracks: [{ id: 1, name: 'Test Song' }],
          albums: []
        }
      };
      mockFetch(mockResponse);

      const result = await provider.search('test query', 'all', { limit: 10 });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/search?q=test+query&type=all&limit=10'),
        expect.any(Object)
      );
      expect(result.artists).toBeDefined();
      expect(result.tracks).toBeDefined();
    });
  });

  describe('Utility Methods', () => {
    test('should get health status', async () => {
      const mockResponse = { status: 'ok' };
      mockFetch(mockResponse);

      const result = await provider.getHealthStatus();

      expect(result.status).toBe('healthy');
      expect(result.provider).toBe('viberate');
      expect(result.timestamp).toBeDefined();
    });

    test('should handle health check failure', async () => {
      mockFetch({}, true); // Network error

      const result = await provider.getHealthStatus();

      expect(result.status).toBe('unhealthy');
      expect(result.provider).toBe('viberate');
      expect(result.error).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    test('should handle API rate limit errors', async () => {
      mockFetchWithStatus(429, { error: 'Rate limit exceeded' });

      await expectError(
        () => provider.getArtists(),
        'Viberate API Error: 429'
      );
    });

    test('should handle authentication errors', async () => {
      mockFetchWithStatus(401, { error: 'Unauthorized' });

      await expectError(
        () => provider.getArtists(),
        'Viberate API Error: 401'
      );
    });

    test('should handle server errors', async () => {
      mockFetchWithStatus(500, { error: 'Internal Server Error' });

      await expectError(
        () => provider.getArtists(),
        'Viberate API Error: 500'
      );
    });
  });
});
