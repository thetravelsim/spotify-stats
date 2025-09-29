/**
 * Songstats API Provider
 * 
 * Implementation of music data provider interface for Songstats API.
 * This provider will be used when migrating from Viberate to Songstats.
 */

class SongstatsAPIProvider {
  constructor() {
    this.baseURL = 'https://api.songstats.com/v1';
    this.apiKey = process.env.REACT_APP_SONGSTATS_API_KEY || '';
    this.rateLimitDelay = 500; // 500ms between requests (higher rate limit than Viberate)
    this.lastRequestTime = 0;
  }

  /**
   * Make authenticated request to Songstats API
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
      'X-API-Key': this.apiKey,
      'Content-Type': 'application/json',
      ...options.headers
    };

    console.log(`Songstats API Request: ${url}`);

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        throw new Error(`Songstats API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Songstats API request failed:', error);
      throw error;
    }
  }

  /**
   * Transform Songstats artist data to standard format
   */
  transformArtistData(songstatsArtist) {
    return {
      id: songstatsArtist.id,
      name: songstatsArtist.name,
      country: songstatsArtist.country || 'Unknown',
      countryCode: this.getCountryFlag(songstatsArtist.country),
      genre: songstatsArtist.genre || 'Unknown',
      platformRank: songstatsArtist.rank || 0,
      platformScore: this.calculatePlatformScore(songstatsArtist),
      followers: this.formatNumber(songstatsArtist.followers || 0),
      streams: this.formatNumber(songstatsArtist.total_streams || 0),
      socialBuzz: songstatsArtist.social_score || 0,
      momentum: this.calculateMomentum(songstatsArtist),
      growth: this.formatGrowth(songstatsArtist.growth_rate || 0),
      verified: songstatsArtist.verified || false,
      label: songstatsArtist.label || 'Independent',
      photo: songstatsArtist.image_url || null,
      spotifyId: songstatsArtist.spotify_id,
      appleMusicId: songstatsArtist.apple_music_id,
      youtubeId: songstatsArtist.youtube_id
    };
  }

  /**
   * Transform Songstats track data to standard format
   */
  transformTrackData(songstatsTrack) {
    return {
      id: songstatsTrack.id,
      title: songstatsTrack.title,
      artist: songstatsTrack.artist_name || 'Unknown Artist',
      artistId: songstatsTrack.artist_id,
      album: songstatsTrack.album_name || 'Unknown Album',
      cover: songstatsTrack.artwork_url || songstatsTrack.image_url,
      duration: this.formatDuration(songstatsTrack.duration_ms / 1000),
      streams: this.formatNumber(songstatsTrack.total_streams || 0),
      weeklyStreams: this.formatNumber(songstatsTrack.weekly_streams || 0),
      growth: this.formatGrowth(songstatsTrack.growth_rate || 0),
      momentum: this.calculateTrackMomentum(songstatsTrack),
      rank: songstatsTrack.chart_position || 0,
      change: songstatsTrack.position_change || 0,
      releaseDate: songstatsTrack.release_date,
      isrc: songstatsTrack.isrc,
      spotifyId: songstatsTrack.spotify_id
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
      
      return response.artists?.map(artist => this.transformArtistData(artist)) || [];
    } catch (error) {
      console.error('Failed to fetch artists from Songstats:', error);
      throw error;
    }
  }

  async getArtistProfile(artistId) {
    try {
      const response = await this.makeRequest(`/artists/${artistId}`);
      return this.transformArtistData(response.artist);
    } catch (error) {
      console.error(`Failed to fetch artist profile ${artistId} from Songstats:`, error);
      throw error;
    }
  }

  async getArtistStreams(artistId, timeRange = '30d') {
    try {
      const response = await this.makeRequest(`/artists/${artistId}/streams?period=${timeRange}`);
      return {
        total: response.total_streams || 0,
        daily: response.daily_streams || [],
        growth: response.growth_rate || 0,
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
        countries: response.countries || [],
        demographics: response.demographics || {},
        totalListeners: response.total_listeners || 0
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
        platforms: response.platforms || {},
        totalFollowers: response.total_followers || 0,
        engagement: response.engagement_rate || 0
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
      
      const endpoint = `/charts/tracks?${params.toString()}`;
      const response = await this.makeRequest(endpoint);
      
      return response.tracks?.map(track => this.transformTrackData(track)) || [];
    } catch (error) {
      console.error('Failed to fetch top tracks from Songstats:', error);
      throw error;
    }
  }

  async getTrackDetails(trackId) {
    try {
      const response = await this.makeRequest(`/tracks/${trackId}`);
      return this.transformTrackData(response.track);
    } catch (error) {
      console.error(`Failed to fetch track details ${trackId} from Songstats:`, error);
      throw error;
    }
  }

  async getTrackStreams(trackId, timeRange = '30d') {
    try {
      const response = await this.makeRequest(`/tracks/${trackId}/streams?period=${timeRange}`);
      return {
        total: response.total_streams || 0,
        daily: response.daily_streams || [],
        growth: response.growth_rate || 0,
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
      
      return response.tracks?.map(track => this.transformTrackData(track)) || [];
    } catch (error) {
      console.error(`Failed to fetch tracks for artist ${artistId}:`, error);
      throw error;
    }
  }

  // ==================== PLAYLIST METHODS ====================

  async getPlaylistAnalytics(playlistId) {
    try {
      const response = await this.makeRequest(`/playlists/${playlistId}/analytics`);
      return response.analytics || {};
    } catch (error) {
      console.error(`Failed to fetch playlist analytics for ${playlistId}:`, error);
      throw error;
    }
  }

  async getArtistPlaylists(artistId) {
    try {
      const response = await this.makeRequest(`/artists/${artistId}/playlists`);
      return response.playlists || [];
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
        artists: response.artists?.map(artist => this.transformArtistData(artist)) || [],
        tracks: response.tracks?.map(track => this.transformTrackData(track)) || [],
        albums: response.albums || []
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
      return response.countries || [];
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      throw error;
    }
  }

  async getGenres() {
    try {
      const response = await this.makeRequest('/genres');
      return response.genres || [];
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
        provider: 'songstats',
        timestamp: new Date().toISOString(),
        ...response
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        provider: 'songstats',
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
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  calculatePlatformScore(artist) {
    // Calculate a platform score based on available metrics
    const streams = artist.total_streams || 0;
    const followers = artist.followers || 0;
    const socialScore = artist.social_score || 0;
    
    // Normalize and combine metrics (simplified algorithm)
    const streamScore = Math.min(streams / 10000000, 1) * 40; // Max 40 points for streams
    const followerScore = Math.min(followers / 1000000, 1) * 30; // Max 30 points for followers
    const socialScoreNormalized = Math.min(socialScore / 100, 1) * 30; // Max 30 points for social
    
    return Math.round(streamScore + followerScore + socialScoreNormalized);
  }

  calculateMomentum(artist) {
    const growthRate = artist.growth_rate || 0;
    const socialScore = artist.social_score || 0;
    
    const momentumScore = (growthRate * 2) + (socialScore / 2);
    
    if (momentumScore >= 80) return 'very high';
    if (momentumScore >= 60) return 'high';
    if (momentumScore >= 40) return 'medium';
    return 'low';
  }

  calculateTrackMomentum(track) {
    const growth = track.growth_rate || 0;
    if (growth >= 20) return 'explosive';
    if (growth >= 10) return 'rising';
    if (growth >= 0) return 'stable';
    return 'declining';
  }

  getCountryFlag(countryCode) {
    const flags = {
      'US': '🇺🇸', 'GB': '🇬🇧', 'AL': '🇦🇱', 'DE': '🇩🇪', 'FR': '🇫🇷',
      'IT': '🇮🇹', 'ES': '🇪🇸', 'CA': '🇨🇦', 'AU': '🇦🇺', 'BR': '🇧🇷',
      'MX': '🇲🇽', 'JP': '🇯🇵', 'KR': '🇰🇷', 'IN': '🇮🇳', 'CN': '🇨🇳'
    };
    return flags[countryCode] || '🌍';
  }
}

export default SongstatsAPIProvider;
