/**
 * Music Data Service - API Abstraction Layer
 * 
 * This service provides a unified interface for accessing music data from different providers.
 * Currently supports Viberate API with planned migration to Songstats API.
 * 
 * Features:
 * - Provider switching without code changes
 * - Fallback to mock data when APIs are unavailable
 * - Consistent data format across all providers
 * - Error handling and retry logic
 * - Rate limiting and caching support
 */

import VibrateAPIProvider from './providers/VibrateAPIProvider';
import SongstatsAPIProvider from './providers/SongstatsAPIProvider';
import MockDataProvider from './providers/MockDataProvider';
import SpotifyAPIProvider from './providers/SpotifyAPIProvider';

class MusicDataService {
  constructor() {
    // Configuration for API providers
    this.config = {
      currentProvider: process.env.REACT_APP_DEFAULT_PROVIDER || 'viberate', // Use Viberate API for live data
      fallbackToMock: true,
      retryAttempts: 1, // Reduce retries for faster fallback
      cacheEnabled: true,
      cacheDuration: 300000, // 5 minutes
    };

    // Initialize providers
    this.providers = {
      viberate: new VibrateAPIProvider(),
      songstats: new SongstatsAPIProvider(),
      mock: new MockDataProvider(),
      spotify: SpotifyAPIProvider
    };

    // Method to get artist image from Spotify
    this.getArtistImageFromSpotify = async (spotifyId) => {
      return this.providers.spotify.getArtistImage(spotifyId);
    };

    // Cache for API responses
    this.cache = new Map();
  }

  /**
   * Switch to a different API provider
   * @param {string} providerName - 'viberate', 'songstats', or 'mock'
   */
  switchProvider(providerName) {
    if (this.providers[providerName]) {
      this.config.currentProvider = providerName;
      console.log(`Switched to ${providerName} provider`);
    } else {
      throw new Error(`Provider ${providerName} not found`);
    }
  }

  /**
   * Get current provider instance
   */
  getCurrentProvider() {
    return this.providers[this.config.currentProvider];
  }

  /**
   * Generic method to make API calls with fallback and caching
   */
  async makeRequest(method, ...args) {
    const cacheKey = `${method}_${JSON.stringify(args)}`;
    
    // Check cache first
    if (this.config.cacheEnabled && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.config.cacheDuration) {
        console.log(`Cache hit for ${method}`);
        return cached.data;
      }
    }

    let lastError = null;
    
    // Try current provider
    for (let attempt = 0; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const provider = this.getCurrentProvider();
        const result = await provider[method](...args);
        
        // Cache successful result
        if (this.config.cacheEnabled) {
          this.cache.set(cacheKey, {
            data: result,
            timestamp: Date.now()
          });
        }
        
        return result;
      } catch (error) {
        lastError = error;
        console.warn(`${this.config.currentProvider} provider failed (attempt ${attempt + 1}):`, error.message);
        if (attempt < this.config.retryAttempts) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          console.log(`Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    // Fallback to mock data if enabled
    if (this.config.fallbackToMock && this.config.currentProvider !== 'mock') {
      try {
        console.log('Falling back to mock data');
        const mockProvider = this.providers.mock;
        return await mockProvider[method](...args);
      } catch (mockError) {
        console.error('Mock provider also failed:', mockError.message);
      }
    }

    throw lastError || new Error(`All providers failed for method: ${method}`);
  }

  // ==================== ARTIST METHODS ====================

  /**
   * Get list of artists with analytics data
   * @param {Object} filters - Search and filter parameters
   * @returns {Promise<Array>} Array of artist objects
   */
  async getArtists(filters = {}) {
    return this.makeRequest('getArtists', filters);
  }

  /**
   * Get detailed artist profile data
   * @param {string} artistId - Artist identifier (name or UUID)
   * @returns {Promise<Object>} Artist profile object with comprehensive data
   */
  async getArtistProfile(artistId) {
    return this.makeRequest('getArtistProfile', artistId);
  }

  // Removed getArtistStreams, getArtistAudience, getArtistSocial as data is now in getArtistProfile

  // ==================== TRACK METHODS ====================

  /**
   * Get top tracks/charts
   * @param {Object} options - Chart options (timeRange, country, genre)
   * @returns {Promise<Array>} Array of track objects
   */
  async getTopTracks(options = {}) {
    return this.makeRequest('getTopTracks', options);
  }

  /**
   * Get detailed track information
   * @param {string} trackId - Track identifier
   * @returns {Promise<Object>} Track details
   */
  async getTrackDetails(trackId) {
    return this.makeRequest('getTrackDetails', trackId);
  }

  /**
   * Get track streaming analytics
   * @param {string} trackId - Track identifier
   * @param {string} timeRange - '7d', '30d', '90d', '1y'
   * @returns {Promise<Object>} Track streaming data
   */
  async getTrackStreams(trackId, timeRange = '30d') {
    return this.makeRequest('getTrackStreams', trackId, timeRange);
  }

  /**
   * Get artist's tracks
   * @param {string} artistId - Artist identifier
   * @param {Object} options - Sorting and filtering options
   * @returns {Promise<Array>} Array of artist's tracks
   */
  async getArtistTracks(artistId, options = {}) {
    return this.makeRequest('getArtistTracks', artistId, options);
  }

  // ==================== PLAYLIST METHODS ====================

  /**
   * Get playlist analytics
   * @param {string} playlistId - Playlist identifier
   * @returns {Promise<Object>} Playlist analytics data
   */
  async getPlaylistAnalytics(playlistId) {
    return this.makeRequest('getPlaylistAnalytics', playlistId);
  }

  /**
   * Get artist's playlist placements
   * @param {string} artistId - Artist identifier
   * @returns {Promise<Array>} Array of playlist placements
   */
  async getArtistPlaylists(artistId) {
    return this.makeRequest('getArtistPlaylists', artistId);
  }

  // ==================== SEARCH METHODS ====================

  /**
   * Search for artists, tracks, or albums
   * @param {string} query - Search query
   * @param {string} type - 'artist', 'track', 'album', or 'all'
   * @param {Object} options - Additional search options
   * @returns {Promise<Object>} Search results
   */
  async search(query, type = 'all', options = {}) {
    return this.makeRequest('search', query, type, options);
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Get available countries for filtering
   * @returns {Promise<Array>} Array of country objects
   */
  async getCountries() {
    return this.makeRequest('getCountries');
  }

  /**
   * Get available genres for filtering
   * @returns {Promise<Array>} Array of genre objects
   */
  async getGenres() {
    return this.makeRequest('getGenres');
  }

  /**
   * Get platform health status
   * @returns {Promise<Object>} Health status of current provider
   */
  async getHealthStatus() {
    return this.makeRequest('getHealthStatus');
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    console.log('Cache cleared');
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      provider: this.config.currentProvider,
      cacheEnabled: this.config.cacheEnabled
    };
  }
}

// Export singleton instance
export default new MusicDataService();

