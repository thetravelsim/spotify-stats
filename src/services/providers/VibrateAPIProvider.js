/**
 * Viberate API Provider
 * 
 * Implementation of music data provider interface for Viberate API.
 * Handles authentication, rate limiting, and data transformation.
 */

class VibrateAPIProvider {
  constructor() {
    this.baseURL = 'https://api.viberate.com/v1';
    this.apiKey = process.env.REACT_APP_VIBERATE_API_KEY || 'JjeDtsAttDAT1pAAXL5YC7Dk_ad-aaqW';
    this.rateLimitDelay = 1000; // 1 second between requests
    this.lastRequestTime = 0;
  }

  /**
   * Make authenticated request to Viberate API
   */
  async makeRequest(endpoint, options = {}) {
    // Rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.rateLimitDelay) {
      await new Promise(resolve => 
        setTimeout(resolve, this.rateLimitDelay - timeSinceLastRequest)
      );
    }
    this.lastRequestTime = Date.now();

    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers
    };

    console.log(`Viberate API Request: ${url}`);

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        throw new Error(`Viberate API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Viberate API request failed:', error);
      throw error;
    }
  }

  /**
   * Transform Viberate artist data to standard format
   */
  transformArtistData(vibrateArtist) {
    return {
      id: vibrateArtist.id,
      name: vibrateArtist.name,
      country: vibrateArtist.country?.name || 'Unknown',
      countryCode: vibrateArtist.country?.code || '🌍',
      genre: vibrateArtist.genres?.[0]?.name || 'Unknown',
      platformRank: vibrateArtist.rank || 0,
      platformScore: vibrateArtist.score || 0,
      followers: this.formatNumber(vibrateArtist.followers?.total || 0),
      streams: this.formatNumber(vibrateArtist.streams?.total || 0),
      socialBuzz: vibrateArtist.social_buzz || 0,
      momentum: this.calculateMomentum(vibrateArtist),
      growth: this.formatGrowth(vibrateArtist.growth || 0),
      verified: vibrateArtist.verified || false,
      label: vibrateArtist.label?.name || 'Independent',
      photo: vibrateArtist.image_url || null,
      spotifyId: vibrateArtist.spotify_id,
      appleMusicId: vibrateArtist.apple_music_id,
      youtubeId: vibrateArtist.youtube_id
    };
  }

  /**
   * Transform Viberate track data to standard format
   */
  transformTrackData(vibrateTrack) {
    return {
      id: vibrateTrack.id,
      title: vibrateTrack.name,
      artist: vibrateTrack.artist?.name || 'Unknown Artist',
      artistId: vibrateTrack.artist?.id,
      album: vibrateTrack.album?.name || 'Unknown Album',
      cover: vibrateTrack.album?.image_url || vibrateTrack.image_url,
      duration: this.formatDuration(vibrateTrack.duration || 0),
      streams: this.formatNumber(vibrateTrack.streams?.total || 0),
      weeklyStreams: this.formatNumber(vibrateTrack.streams?.weekly || 0),
      growth: this.formatGrowth(vibrateTrack.growth || 0),
      momentum: this.calculateTrackMomentum(vibrateTrack),
      rank: vibrateTrack.rank || 0,
      change: vibrateTrack.rank_change || 0,
      releaseDate: vibrateTrack.release_date,
      isrc: vibrateTrack.isrc,
      spotifyId: vibrateTrack.spotify_id
    };
  }

  // ==================== ARTIST METHODS ====================

  async getArtists(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.country) params.append('country', filters.country);
      if (filters.genre) params.append('genre', filters.genre);
      if (filters.limit) params.append('limit', filters.limit);
      if (filters.offset) params.append('offset', filters.offset);
      
      const endpoint = `/artists?${params.toString()}`;
      const response = await this.makeRequest(endpoint);
      
      return response.data?.map(artist => this.transformArtistData(artist)) || [];
    } catch (error) {
      console.error('Failed to fetch artists from Viberate:', error);
      throw error;
    }
  }

  async getArtistProfile(artistId) {
    try {
      const response = await this.makeRequest(`/artists/${artistId}`);
      return this.transformArtistData(response.data);
    } catch (error) {
      console.error(`Failed to fetch artist profile ${artistId} from Viberate:`, error);
      throw error;
    }
  }

  async getArtistStreams(artistId, timeRange = '30d') {
    try {
      const response = await this.makeRequest(`/artists/${artistId}/streams?period=${timeRange}`);
      return {
        total: response.data?.total || 0,
        daily: response.data?.daily || [],
        growth: response.data?.growth || 0,
        timeRange
      };
    } catch (error) {
      console.error(`Failed to fetch artist streams for ${artistId}:`, error);
      throw error;
    }
  }

  async getArtistAudience(artistId) {
    try {
      const response = await this.makeRequest(`/artists/${artistId}/audience`);
      return {
        countries: response.data?.countries || [],
        demographics: response.data?.demographics || {},
        totalListeners: response.data?.total_listeners || 0
      };
    } catch (error) {
      console.error(`Failed to fetch artist audience for ${artistId}:`, error);
      throw error;
    }
  }

  async getArtistSocial(artistId) {
    try {
      const response = await this.makeRequest(`/artists/${artistId}/social`);
      return {
        platforms: response.data?.platforms || {},
        totalFollowers: response.data?.total_followers || 0,
        engagement: response.data?.engagement || 0
      };
    } catch (error) {
      console.error(`Failed to fetch artist social data for ${artistId}:`, error);
      throw error;
    }
  }

  // ==================== TRACK METHODS ====================

  async getTopTracks(options = {}) {
    try {
      const params = new URLSearchParams();
      
      if (options.timeRange) params.append('period', options.timeRange);
      if (options.country) params.append('country', options.country);
      if (options.genre) params.append('genre', options.genre);
      if (options.limit) params.append('limit', options.limit);
      
      const endpoint = `/tracks/charts?${params.toString()}`;
      const response = await this.makeRequest(endpoint);
      
      return response.data?.map(track => this.transformTrackData(track)) || [];
    } catch (error) {
      console.error('Failed to fetch top tracks from Viberate:', error);
      throw error;
    }
  }

  async getTrackDetails(trackId) {
    try {
      const response = await this.makeRequest(`/tracks/${trackId}`);
      return this.transformTrackData(response.data);
    } catch (error) {
      console.error(`Failed to fetch track details ${trackId} from Viberate:`, error);
      throw error;
    }
  }

  async getTrackStreams(trackId, timeRange = '30d') {
    try {
      const response = await this.makeRequest(`/tracks/${trackId}/streams?period=${timeRange}`);
      return {
        total: response.data?.total || 0,
        daily: response.data?.daily || [],
        growth: response.data?.growth || 0,
        timeRange
      };
    } catch (error) {
      console.error(`Failed to fetch track streams for ${trackId}:`, error);
      throw error;
    }
  }

  async getArtistTracks(artistId, options = {}) {
    try {
      const params = new URLSearchParams();
      
      if (options.sort) params.append('sort', options.sort);
      if (options.limit) params.append('limit', options.limit);
      
      const endpoint = `/artists/${artistId}/tracks?${params.toString()}`;
      const response = await this.makeRequest(endpoint);
      
      return response.data?.map(track => this.transformTrackData(track)) || [];
    } catch (error) {
      console.error(`Failed to fetch tracks for artist ${artistId}:`, error);
      throw error;
    }
  }

  // ==================== PLAYLIST METHODS ====================

  async getPlaylistAnalytics(playlistId) {
    try {
      const response = await this.makeRequest(`/playlists/${playlistId}/analytics`);
      return response.data || {};
    } catch (error) {
      console.error(`Failed to fetch playlist analytics for ${playlistId}:`, error);
      throw error;
    }
  }

  async getArtistPlaylists(artistId) {
    try {
      const response = await this.makeRequest(`/artists/${artistId}/playlists`);
      return response.data || [];
    } catch (error) {
      console.error(`Failed to fetch playlists for artist ${artistId}:`, error);
      throw error;
    }
  }

  // ==================== SEARCH METHODS ====================

  async search(query, type = 'all', options = {}) {
    try {
      const params = new URLSearchParams();
      params.append('q', query);
      params.append('type', type);
      
      if (options.limit) params.append('limit', options.limit);
      
      const endpoint = `/search?${params.toString()}`;
      const response = await this.makeRequest(endpoint);
      
      return {
        artists: response.data?.artists?.map(artist => this.transformArtistData(artist)) || [],
        tracks: response.data?.tracks?.map(track => this.transformTrackData(track)) || [],
        albums: response.data?.albums || []
      };
    } catch (error) {
      console.error(`Failed to search for "${query}":`, error);
      throw error;
    }
  }

  // ==================== UTILITY METHODS ====================

  async getCountries() {
    try {
      const response = await this.makeRequest('/countries');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      throw error;
    }
  }

  async getGenres() {
    try {
      const response = await this.makeRequest('/genres');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch genres:', error);
      throw error;
    }
  }

  async getHealthStatus() {
    try {
      const response = await this.makeRequest('/health');
      return {
        status: 'healthy',
        provider: 'viberate',
        timestamp: new Date().toISOString(),
        ...response.data
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        provider: 'viberate',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  // ==================== HELPER METHODS ====================

  formatNumber(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  formatGrowth(growth) {
    const sign = growth >= 0 ? '+' : '';
    return `${sign}${growth.toFixed(1)}%`;
  }

  formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  calculateMomentum(artist) {
    const score = artist.momentum_score || artist.score || 0;
    if (score >= 80) return 'very high';
    if (score >= 60) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  }

  calculateTrackMomentum(track) {
    const growth = track.growth || 0;
    if (growth >= 20) return 'explosive';
    if (growth >= 10) return 'rising';
    if (growth >= 0) return 'stable';
    return 'declining';
  }
}

export default VibrateAPIProvider;
