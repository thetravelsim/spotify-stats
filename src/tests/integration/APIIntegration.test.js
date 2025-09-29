/**
 * Integration Tests for API Services
 * 
 * Tests the complete flow from MusicDataService through providers
 * to ensure proper integration and data flow.
 */

import MusicDataService from '../../services/MusicDataService';
import config from '../../services/config';
import { 
  mockFetch, 
  mockFetchWithStatus,
  wait,
  createMockArtist,
  createMockTrack,
  validateArtistData,
  validateTrackData,
  measurePerformance
} from '../utils/testUtils';

describe('API Integration Tests', () => {
  beforeEach(() => {
    // Reset service state
    MusicDataService.clearCache();
    MusicDataService.config.currentProvider = 'viberate';
    MusicDataService.config.fallbackToMock = true;
    MusicDataService.config.cacheEnabled = true;
    MusicDataService.config.retryAttempts = 2;
    
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (global.fetch && global.fetch.mockRestore) {
      global.fetch.mockRestore();
    }
  });

  describe('End-to-End Artist Data Flow', () => {
    test('should successfully fetch and transform artist data', async () => {
      const mockVibrateResponse = {
        data: [{
          id: 123,
          name: 'Dua Lipa',
          country: { name: 'United Kingdom', code: 'GB' },
          genres: [{ name: 'Pop' }],
          rank: 1,
          score: 95,
          followers: { total: 46600000 },
          streams: { total: 1600000000 },
          social_buzz: 92,
          growth: 12.5,
          verified: true,
          label: { name: 'Warner Records' },
          image_url: 'https://example.com/dua-lipa.jpg',
          spotify_id: '6M2wZ9GZgrQXHCFfjv46we'
        }]
      };

      mockFetch(mockVibrateResponse);

      const result = await MusicDataService.getArtists({ country: 'GB' });

      expect(result).toHaveLength(1);
      const artist = result[0];
      
      validateArtistData(artist);
      expect(artist.name).toBe('Dua Lipa');
      expect(artist.country).toBe('United Kingdom');
      expect(artist.countryCode).toBe('GB');
      expect(artist.platformScore).toBe(95);
      expect(artist.followers).toBe('46.6M');
      expect(artist.streams).toBe('1.6B');
      expect(artist.momentum).toBe('very high');
    });

    test('should handle provider failure and fallback to mock', async () => {
      // Mock Viberate API failure
      mockFetch({}, true);

      const result = await MusicDataService.getArtists();

      // Should get mock data
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      
      result.forEach(validateArtistData);
    });

    test('should cache results across multiple calls', async () => {
      const mockResponse = {
        data: {
          id: 123,
          name: 'Test Artist',
          country: { name: 'Albania' }
        }
      };

      mockFetch(mockResponse);

      // First call
      const start1 = Date.now();
      const result1 = await MusicDataService.getArtistProfile('123');
      const time1 = Date.now() - start1;

      // Second call (should be cached)
      const start2 = Date.now();
      const result2 = await MusicDataService.getArtistProfile('123');
      const time2 = Date.now() - start2;

      expect(result1).toEqual(result2);
      expect(time2).toBeLessThan(time1); // Cached call should be faster
      expect(global.fetch).toHaveBeenCalledTimes(1); // Only one API call
    });
  });

  describe('End-to-End Track Data Flow', () => {
    test('should successfully fetch and transform track data', async () => {
      const mockVibrateResponse = {
        data: [{
          id: 456,
          name: 'Houdini',
          artist: { id: 123, name: 'Dua Lipa' },
          album: { name: 'Radical Optimism', image_url: 'https://example.com/album.jpg' },
          duration: 186, // 3:06
          streams: { total: 2100000000, weekly: 45200000 },
          growth: 15.3,
          rank: 1,
          rank_change: 2,
          release_date: '2023-11-09',
          isrc: 'GBAHT2300123',
          spotify_id: '7lPN2DXiMsVn7XUKtOW1CS'
        }]
      };

      mockFetch(mockVibrateResponse);

      const result = await MusicDataService.getTopTracks({ timeRange: 'weekly' });

      expect(result).toHaveLength(1);
      const track = result[0];
      
      validateTrackData(track);
      expect(track.title).toBe('Houdini');
      expect(track.artist).toBe('Dua Lipa');
      expect(track.duration).toBe('3:06');
      expect(track.streams).toBe('2.1B');
      expect(track.weeklyStreams).toBe('45.2M');
      expect(track.momentum).toBe('rising');
    });

    test('should handle search across multiple content types', async () => {
      const mockSearchResponse = {
        data: {
          artists: [{
            id: 123,
            name: 'Dua Lipa',
            country: { name: 'United Kingdom' }
          }],
          tracks: [{
            id: 456,
            name: 'Houdini',
            artist: { name: 'Dua Lipa' }
          }],
          albums: []
        }
      };

      mockFetch(mockSearchResponse);

      const result = await MusicDataService.search('Dua Lipa', 'all');

      expect(result.artists).toHaveLength(1);
      expect(result.tracks).toHaveLength(1);
      expect(result.albums).toHaveLength(0);
      
      result.artists.forEach(validateArtistData);
      result.tracks.forEach(validateTrackData);
    });
  });

  describe('Provider Switching Integration', () => {
    test('should switch providers and maintain functionality', async () => {
      // Test with Viberate
      const vibrateResponse = { data: [{ id: 1, name: 'Artist 1' }] };
      mockFetch(vibrateResponse);

      MusicDataService.switchProvider('viberate');
      const vibrateResult = await MusicDataService.getArtists();
      expect(vibrateResult).toBeDefined();

      // Switch to mock
      MusicDataService.switchProvider('mock');
      const mockResult = await MusicDataService.getArtists();
      expect(mockResult).toBeDefined();
      expect(Array.isArray(mockResult)).toBe(true);
    });

    test('should handle provider-specific configurations', async () => {
      // Test rate limiting with different providers
      const mockResponse = { data: [] };
      mockFetch(mockResponse);

      // Viberate has 1000ms rate limit
      MusicDataService.switchProvider('viberate');
      const vibrateProvider = MusicDataService.getCurrentProvider();
      expect(vibrateProvider.rateLimitDelay).toBe(1000);

      // Switch to Songstats (500ms rate limit)
      MusicDataService.switchProvider('songstats');
      const songstatsProvider = MusicDataService.getCurrentProvider();
      expect(songstatsProvider.rateLimitDelay).toBe(500);
    });
  });

  describe('Error Handling Integration', () => {
    test('should handle cascading failures gracefully', async () => {
      // Simulate Viberate API being down
      mockFetchWithStatus(503, { error: 'Service Unavailable' });

      // Should fallback to mock data
      const result = await MusicDataService.getArtists();
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      result.forEach(validateArtistData);
    });

    test('should retry failed requests before fallback', async () => {
      let callCount = 0;
      global.fetch = jest.fn(() => {
        callCount++;
        if (callCount < 2) {
          return Promise.reject(new Error('Network Error'));
        }
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ data: [createMockArtist()] })
        });
      });

      MusicDataService.config.retryAttempts = 2;
      const result = await MusicDataService.getArtists();

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(result).toBeDefined();
    });

    test('should handle rate limiting gracefully', async () => {
      // First call succeeds
      mockFetch({ data: [] });
      await MusicDataService.getArtists();

      // Second call gets rate limited
      mockFetchWithStatus(429, { error: 'Rate limit exceeded' });
      
      // Should fallback to mock
      const result = await MusicDataService.getArtists();
      expect(result).toBeDefined();
    });
  });

  describe('Performance Integration', () => {
    test('should meet performance requirements', async () => {
      const mockResponse = { data: [createMockArtist()] };
      mockFetch(mockResponse);

      const { duration } = await measurePerformance(
        () => MusicDataService.getArtists(),
        'Get Artists'
      );

      // Should complete within reasonable time (including rate limiting)
      expect(duration).toBeLessThan(2000); // 2 seconds max
    });

    test('should handle concurrent requests efficiently', async () => {
      const mockResponse = { data: [createMockArtist()] };
      mockFetch(mockResponse);

      const promises = Array(5).fill().map((_, i) => 
        MusicDataService.getArtistProfile(`artist-${i}`)
      );

      const results = await Promise.all(promises);
      
      expect(results).toHaveLength(5);
      results.forEach(result => {
        expect(result).toBeDefined();
        validateArtistData(result);
      });
    });

    test('should cache effectively under load', async () => {
      const mockResponse = { data: createMockArtist() };
      mockFetch(mockResponse);

      // Make multiple calls for same data
      const promises = Array(10).fill().map(() => 
        MusicDataService.getArtistProfile('123')
      );

      await Promise.all(promises);

      // Should only make one API call due to caching
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Data Consistency Integration', () => {
    test('should maintain data consistency across providers', async () => {
      // Test that both providers return data in the same format
      const mockVibrateData = {
        data: {
          id: 123,
          name: 'Test Artist',
          country: { name: 'Albania' },
          score: 85
        }
      };

      mockFetch(mockVibrateData);
      
      // Get data from Viberate
      MusicDataService.switchProvider('viberate');
      const vibrateResult = await MusicDataService.getArtistProfile('123');

      // Get data from Mock
      MusicDataService.switchProvider('mock');
      const mockResult = await MusicDataService.getArtistProfile('123');

      // Both should have the same structure
      expect(vibrateResult).toHaveProperty('id');
      expect(vibrateResult).toHaveProperty('name');
      expect(vibrateResult).toHaveProperty('platformScore');
      
      expect(mockResult).toHaveProperty('id');
      expect(mockResult).toHaveProperty('name');
      expect(mockResult).toHaveProperty('platformScore');
    });

    test('should handle missing data fields consistently', async () => {
      const incompleteData = {
        data: {
          id: 123,
          name: 'Incomplete Artist'
          // Missing many fields
        }
      };

      mockFetch(incompleteData);
      
      const result = await MusicDataService.getArtistProfile('123');
      
      // Should have default values for missing fields
      expect(result.country).toBeDefined();
      expect(result.genre).toBeDefined();
      expect(result.platformScore).toBeDefined();
      expect(result.followers).toBeDefined();
      expect(result.streams).toBeDefined();
    });
  });

  describe('Configuration Integration', () => {
    test('should respect configuration settings', async () => {
      // Test with caching disabled
      MusicDataService.config.cacheEnabled = false;
      
      const mockResponse = { data: createMockArtist() };
      mockFetch(mockResponse);

      await MusicDataService.getArtistProfile('123');
      await MusicDataService.getArtistProfile('123');

      // Should make two API calls since caching is disabled
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    test('should handle environment-specific configurations', async () => {
      // Test that configuration is properly loaded
      expect(config.viberate.baseURL).toBeDefined();
      expect(config.viberate.apiKey).toBeDefined();
      expect(config.fallbackToMock).toBeDefined();
      expect(config.cacheEnabled).toBeDefined();
    });
  });
});
