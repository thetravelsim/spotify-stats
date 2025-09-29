/**
 * Unit Tests for MusicDataService
 * 
 * Tests the main API abstraction layer functionality including
 * provider switching, caching, error handling, and fallback mechanisms.
 */

import MusicDataService from '../../services/MusicDataService';
import { 
  createMockProvider, 
  createMockArtist, 
  createMockTrack,
  wait,
  expectError,
  validateArtistData,
  validateTrackData
} from '../utils/testUtils';

// Mock the providers
jest.mock('../../services/providers/VibrateAPIProvider');
jest.mock('../../services/providers/SongstatsAPIProvider');
jest.mock('../../services/providers/MockDataProvider');

describe('MusicDataService', () => {
  let mockVibrateProvider;
  let mockSongstatsProvider;
  let mockDataProvider;

  beforeEach(() => {
    // Reset the service state
    MusicDataService.clearCache();
    MusicDataService.config.currentProvider = 'viberate';
    MusicDataService.config.fallbackToMock = true;
    MusicDataService.config.retryAttempts = 3;
    MusicDataService.config.cacheEnabled = true;

    // Create mock providers
    mockVibrateProvider = createMockProvider();
    mockSongstatsProvider = createMockProvider();
    mockDataProvider = createMockProvider();

    // Replace providers in the service
    MusicDataService.providers = {
      viberate: mockVibrateProvider,
      songstats: mockSongstatsProvider,
      mock: mockDataProvider
    };

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('Provider Management', () => {
    test('should switch providers correctly', () => {
      expect(MusicDataService.config.currentProvider).toBe('viberate');
      
      MusicDataService.switchProvider('songstats');
      expect(MusicDataService.config.currentProvider).toBe('songstats');
      
      MusicDataService.switchProvider('mock');
      expect(MusicDataService.config.currentProvider).toBe('mock');
    });

    test('should throw error for invalid provider', () => {
      expect(() => {
        MusicDataService.switchProvider('invalid');
      }).toThrow('Provider invalid not found');
    });

    test('should get current provider correctly', () => {
      MusicDataService.switchProvider('songstats');
      const provider = MusicDataService.getCurrentProvider();
      expect(provider).toBe(mockSongstatsProvider);
    });
  });

  describe('Caching', () => {
    test('should cache successful responses', async () => {
      const mockArtist = createMockArtist();
      mockVibrateProvider.getArtistProfile.mockResolvedValue(mockArtist);

      // First call
      const result1 = await MusicDataService.getArtistProfile('123');
      expect(mockVibrateProvider.getArtistProfile).toHaveBeenCalledTimes(1);
      expect(result1).toEqual(mockArtist);

      // Second call should use cache
      const result2 = await MusicDataService.getArtistProfile('123');
      expect(mockVibrateProvider.getArtistProfile).toHaveBeenCalledTimes(1); // Still 1
      expect(result2).toEqual(mockArtist);
    });

    test('should respect cache duration', async () => {
      // Set short cache duration for testing
      MusicDataService.config.cacheDuration = 100;
      
      const mockArtist = createMockArtist();
      mockVibrateProvider.getArtistProfile.mockResolvedValue(mockArtist);

      // First call
      await MusicDataService.getArtistProfile('123');
      expect(mockVibrateProvider.getArtistProfile).toHaveBeenCalledTimes(1);

      // Wait for cache to expire
      await wait(150);

      // Second call should make new request
      await MusicDataService.getArtistProfile('123');
      expect(mockVibrateProvider.getArtistProfile).toHaveBeenCalledTimes(2);
    });

    test('should clear cache correctly', async () => {
      const mockArtist = createMockArtist();
      mockVibrateProvider.getArtistProfile.mockResolvedValue(mockArtist);

      // Make cached call
      await MusicDataService.getArtistProfile('123');
      expect(mockVibrateProvider.getArtistProfile).toHaveBeenCalledTimes(1);

      // Clear cache
      MusicDataService.clearCache();

      // Next call should make new request
      await MusicDataService.getArtistProfile('123');
      expect(mockVibrateProvider.getArtistProfile).toHaveBeenCalledTimes(2);
    });

    test('should provide cache statistics', () => {
      const stats = MusicDataService.getCacheStats();
      expect(stats).toHaveProperty('size');
      expect(stats).toHaveProperty('provider');
      expect(stats).toHaveProperty('cacheEnabled');
      expect(stats.provider).toBe('viberate');
      expect(stats.cacheEnabled).toBe(true);
    });
  });

  describe('Error Handling and Fallback', () => {
    test('should fallback to mock when primary provider fails', async () => {
      const mockArtist = createMockArtist();
      mockVibrateProvider.getArtistProfile.mockRejectedValue(new Error('API Error'));
      mockDataProvider.getArtistProfile.mockResolvedValue(mockArtist);

      const result = await MusicDataService.getArtistProfile('123');
      
      expect(mockVibrateProvider.getArtistProfile).toHaveBeenCalledTimes(1);
      expect(mockDataProvider.getArtistProfile).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockArtist);
    });

    test('should retry failed requests', async () => {
      MusicDataService.config.retryAttempts = 2;
      
      mockVibrateProvider.getArtistProfile
        .mockRejectedValueOnce(new Error('Network Error'))
        .mockResolvedValue(createMockArtist());

      const result = await MusicDataService.getArtistProfile('123');
      
      expect(mockVibrateProvider.getArtistProfile).toHaveBeenCalledTimes(2);
      expect(result).toBeDefined();
    });

    test('should throw error when all providers fail and fallback disabled', async () => {
      MusicDataService.config.fallbackToMock = false;
      
      mockVibrateProvider.getArtistProfile.mockRejectedValue(new Error('API Error'));

      await expectError(
        () => MusicDataService.getArtistProfile('123'),
        'API Error'
      );
    });

    test('should throw error when all providers including mock fail', async () => {
      mockVibrateProvider.getArtistProfile.mockRejectedValue(new Error('Primary Error'));
      mockDataProvider.getArtistProfile.mockRejectedValue(new Error('Mock Error'));

      await expectError(
        () => MusicDataService.getArtistProfile('123'),
        'Primary Error'
      );
    });
  });

  describe('Artist Methods', () => {
    test('should get artists with filters', async () => {
      const mockArtists = [createMockArtist()];
      mockVibrateProvider.getArtists.mockResolvedValue(mockArtists);

      const filters = { country: 'Albania', genre: 'Pop' };
      const result = await MusicDataService.getArtists(filters);

      expect(mockVibrateProvider.getArtists).toHaveBeenCalledWith(filters);
      expect(result).toEqual(mockArtists);
      result.forEach(validateArtistData);
    });

    test('should get artist profile', async () => {
      const mockArtist = createMockArtist();
      mockVibrateProvider.getArtistProfile.mockResolvedValue(mockArtist);

      const result = await MusicDataService.getArtistProfile('123');

      expect(mockVibrateProvider.getArtistProfile).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockArtist);
      validateArtistData(result);
    });

    test('should get artist streams', async () => {
      const mockStreams = {
        total: 1000000,
        daily: [],
        growth: 15.3,
        timeRange: '30d'
      };
      mockVibrateProvider.getArtistStreams.mockResolvedValue(mockStreams);

      const result = await MusicDataService.getArtistStreams('123', '30d');

      expect(mockVibrateProvider.getArtistStreams).toHaveBeenCalledWith('123', '30d');
      expect(result).toEqual(mockStreams);
      expect(result.total).toBeGreaterThan(0);
      expect(Array.isArray(result.daily)).toBe(true);
    });

    test('should get artist audience', async () => {
      const mockAudience = {
        countries: [{ country: 'Albania', percentage: 50 }],
        demographics: {},
        totalListeners: 100000
      };
      mockVibrateProvider.getArtistAudience.mockResolvedValue(mockAudience);

      const result = await MusicDataService.getArtistAudience('123');

      expect(mockVibrateProvider.getArtistAudience).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockAudience);
      expect(Array.isArray(result.countries)).toBe(true);
    });

    test('should get artist social data', async () => {
      const mockSocial = {
        platforms: { spotify: { followers: 1000000 } },
        totalFollowers: 1000000,
        engagement: 5.2
      };
      mockVibrateProvider.getArtistSocial.mockResolvedValue(mockSocial);

      const result = await MusicDataService.getArtistSocial('123');

      expect(mockVibrateProvider.getArtistSocial).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockSocial);
      expect(typeof result.totalFollowers).toBe('number');
    });
  });

  describe('Track Methods', () => {
    test('should get top tracks', async () => {
      const mockTracks = [createMockTrack()];
      mockVibrateProvider.getTopTracks.mockResolvedValue(mockTracks);

      const options = { timeRange: 'weekly', country: 'AL' };
      const result = await MusicDataService.getTopTracks(options);

      expect(mockVibrateProvider.getTopTracks).toHaveBeenCalledWith(options);
      expect(result).toEqual(mockTracks);
      result.forEach(validateTrackData);
    });

    test('should get track details', async () => {
      const mockTrack = createMockTrack();
      mockVibrateProvider.getTrackDetails.mockResolvedValue(mockTrack);

      const result = await MusicDataService.getTrackDetails('456');

      expect(mockVibrateProvider.getTrackDetails).toHaveBeenCalledWith('456');
      expect(result).toEqual(mockTrack);
      validateTrackData(result);
    });

    test('should get track streams', async () => {
      const mockStreams = {
        total: 500000,
        daily: [],
        growth: 8.7,
        timeRange: '7d'
      };
      mockVibrateProvider.getTrackStreams.mockResolvedValue(mockStreams);

      const result = await MusicDataService.getTrackStreams('456', '7d');

      expect(mockVibrateProvider.getTrackStreams).toHaveBeenCalledWith('456', '7d');
      expect(result).toEqual(mockStreams);
    });

    test('should get artist tracks', async () => {
      const mockTracks = [createMockTrack()];
      mockVibrateProvider.getArtistTracks.mockResolvedValue(mockTracks);

      const options = { sort: 'streams', limit: 10 };
      const result = await MusicDataService.getArtistTracks('123', options);

      expect(mockVibrateProvider.getArtistTracks).toHaveBeenCalledWith('123', options);
      expect(result).toEqual(mockTracks);
    });
  });

  describe('Search Methods', () => {
    test('should search for content', async () => {
      const mockResults = {
        artists: [createMockArtist()],
        tracks: [createMockTrack()],
        albums: []
      };
      mockVibrateProvider.search.mockResolvedValue(mockResults);

      const result = await MusicDataService.search('test query', 'all', { limit: 10 });

      expect(mockVibrateProvider.search).toHaveBeenCalledWith('test query', 'all', { limit: 10 });
      expect(result).toEqual(mockResults);
      expect(Array.isArray(result.artists)).toBe(true);
      expect(Array.isArray(result.tracks)).toBe(true);
    });
  });

  describe('Utility Methods', () => {
    test('should get countries', async () => {
      const mockCountries = [{ code: 'AL', name: 'Albania' }];
      mockVibrateProvider.getCountries.mockResolvedValue(mockCountries);

      const result = await MusicDataService.getCountries();

      expect(mockVibrateProvider.getCountries).toHaveBeenCalled();
      expect(result).toEqual(mockCountries);
    });

    test('should get genres', async () => {
      const mockGenres = [{ id: 'pop', name: 'Pop' }];
      mockVibrateProvider.getGenres.mockResolvedValue(mockGenres);

      const result = await MusicDataService.getGenres();

      expect(mockVibrateProvider.getGenres).toHaveBeenCalled();
      expect(result).toEqual(mockGenres);
    });

    test('should get health status', async () => {
      const mockHealth = {
        status: 'healthy',
        provider: 'viberate',
        timestamp: new Date().toISOString()
      };
      mockVibrateProvider.getHealthStatus.mockResolvedValue(mockHealth);

      const result = await MusicDataService.getHealthStatus();

      expect(mockVibrateProvider.getHealthStatus).toHaveBeenCalled();
      expect(result).toEqual(mockHealth);
      expect(result.status).toBe('healthy');
    });
  });

  describe('Configuration', () => {
    test('should handle disabled caching', async () => {
      MusicDataService.config.cacheEnabled = false;
      
      const mockArtist = createMockArtist();
      mockVibrateProvider.getArtistProfile.mockResolvedValue(mockArtist);

      // Make two calls
      await MusicDataService.getArtistProfile('123');
      await MusicDataService.getArtistProfile('123');

      // Both should hit the provider since caching is disabled
      expect(mockVibrateProvider.getArtistProfile).toHaveBeenCalledTimes(2);
    });

    test('should handle zero retry attempts', async () => {
      MusicDataService.config.retryAttempts = 0;
      
      mockVibrateProvider.getArtistProfile.mockRejectedValue(new Error('API Error'));
      mockDataProvider.getArtistProfile.mockResolvedValue(createMockArtist());

      const result = await MusicDataService.getArtistProfile('123');

      // Should only try once, then fallback
      expect(mockVibrateProvider.getArtistProfile).toHaveBeenCalledTimes(1);
      expect(mockDataProvider.getArtistProfile).toHaveBeenCalledTimes(1);
      expect(result).toBeDefined();
    });
  });
});
