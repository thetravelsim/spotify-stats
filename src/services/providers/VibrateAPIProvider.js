/**
 * Viberate API Provider
 * 
 * Implementation of music data provider interface for Viberate API.
 * Handles authentication, rate limiting, and data transformation.
 */

class VibrateAPIProvider {
  constructor() {
    this.baseURL = 'https://data.viberate.com/api/v1'; // Corrected base URL
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
      'Access-Key': `${this.apiKey}`, // Corrected API key header
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
      id: vibrateArtist.uuid,
      name: vibrateArtist.name,
      country: vibrateArtist.country?.name || 'Unknown',
      countryCode: vibrateArtist.country?.alpha2 || '🌍',
      genre: vibrateArtist.genre?.name || 'Unknown',
      platformRank: vibrateArtist.rank || 0,
      platformScore: vibrateArtist.score || 0,
      followers: this.formatNumber(vibrateArtist.followers?.total || vibrateArtist.followers || 0),
      streams: this.formatNumber(vibrateArtist.streams?.total || vibrateArtist.streams || 0),
      monthlyListeners: this.formatNumber(vibrateArtist.charts?.spotify?.overall?.listeners?.total || vibrateArtist.spotify_listeners || 0),
      socialBuzz: vibrateArtist.social_buzz || 0,
      momentum: this.calculateMomentum(vibrateArtist),
      growth: this.formatGrowth(vibrateArtist.growth || 0),
      verified: vibrateArtist.verified || false,
      label: vibrateArtist.label?.name || 'Independent',
      photo: vibrateArtist.image || null,
      spotifyId: vibrateArtist.spotifyId || null, // Use the spotifyId passed from getArtistProfile
      appleMusicId: vibrateArtist.apple_music_id,
      youtubeId: vibrateArtist.youtube_id,
      socialPlatforms: {
        instagram: vibrateArtist.charts?.social?.instagram?.followers?.total || vibrateArtist.instagram_followers || 0,
        twitter: vibrateArtist.charts?.social?.twitter?.followers?.total || vibrateArtist.twitter_followers || 0,
        facebook: vibrateArtist.charts?.social?.facebook?.followers?.total || vibrateArtist.facebook_followers || 0,
        tiktok: vibrateArtist.charts?.social?.tiktok?.followers?.total || vibrateArtist.tiktok_followers || 0,
        youtube: vibrateArtist.charts?.youtube?.overall?.subscribers_official?.total || vibrateArtist.youtube_subscribers_official || 0
      }
    };
  }

  /**
   * Transform Viberate track data to standard format
   */
  transformTrackData(vibrateTrack) {
    return {
      id: vibrateTrack.uuid,
      title: vibrateTrack.name,
      artist: vibrateTrack.artist?.name || 'Unknown Artist',
      artistId: vibrateTrack.artist?.uuid,
      album: vibrateTrack.album?.name || 'Unknown Album',
      cover: vibrateTrack.album?.image || vibrateTrack.image,
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
      
      if (filters.country) params.append('countries', filters.country);
      if (filters.genre) params.append('genres', filters.genre);
      if (filters.limit) params.append('limit', filters.limit);
      if (filters.offset) params.append('offset', filters.offset);
      
      const endpoint = `/artist/viberate/chart?${params.toString()}`;
      const response = await this.makeRequest(endpoint);
      
      return response.data?.map(artist => this.transformArtistData(artist)) || [];
    } catch (error) {
      console.error('Failed to fetch artists from Viberate:', error);
      throw error;
    }
  }

  async getArtistProfile(artistIdentifier) {
    try {
      let artistId = artistIdentifier;
      let spotifyId = null;
      let artistData;

      // Check if artistIdentifier is a UUID format
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(artistIdentifier);

      if (!isUUID) {
        // If not a UUID, assume it's a name and search for it to get the UUID
        const searchResult = await this.makeRequest(`/artist/search?q=${artistIdentifier}`);
        const basicArtistInfo = searchResult.data?.[0]; // Take the first result
        if (basicArtistInfo) {
          artistId = basicArtistInfo.uuid; // Update artistId to the found UUID
        } else {
          throw new Error(`Artist with name ${artistIdentifier} not found.`);
        }

        // Now, use advanced search to get the spotifyId if available
        const advancedSearchResult = await this.makeRequest(`/artist/advanced/search?q=${artistIdentifier}`);
        const advancedArtistInfo = advancedSearchResult.data?.[0];
        if (advancedArtistInfo) {
          spotifyId = advancedArtistInfo.spotify_id;
        }
      }

      // Now fetch detailed data using the UUID from the chart endpoint
      const chartResult = await this.makeRequest(`/artist/viberate/chart?uuid=${artistId}`);
      artistData = chartResult.data?.[0];

      if (!artistData) {
        throw new Error(`Detailed profile for artist with ID ${artistId} not found in chart data.`);
      }

      // Add spotifyId to the artistData before transforming
      artistData.spotifyId = spotifyId;

      return this.transformArtistData(artistData);
    } catch (error) {
      console.error(`Failed to fetch comprehensive artist profile for ${artistIdentifier} from Viberate:`, error);
      throw error;
    }
  }

  // The following methods are no longer directly used by getArtistProfile but kept for potential future use
  async getArtistStreams(artistId, timeRange = '30d') {
    console.warn('getArtistStreams is not currently integrated into getArtistProfile due to API limitations. Data might be available via chart endpoint.');
    return { total: 0, daily: [], growth: 0, timeRange };
  }

  async getArtistAudience(artistId) {
    console.warn('getArtistAudience is not currently integrated into getArtistProfile due to API limitations. Data might be available via chart endpoint.');
    return { countries: [], demographics: {}, totalListeners: 0 };
  }

  async getArtistSocial(artistId) {
    console.warn('getArtistSocial is not currently integrated into getArtistProfile due to API limitations. Data might be available via chart endpoint.');
    return { platforms: {}, totalFollowers: 0, engagement: 0 };
  }

  // ==================== TRACK METHODS ====================

  async getTopTracks(options = {}) {
    try {
      const params = new URLSearchParams();
      
      if (options.timeRange) params.append('period', options.timeRange);
      if (options.country) params.append('country', options.country);
      if (options.genre) params.append('genre', options.genre);
      if (options.limit) params.append('limit', options.limit);
      
      const endpoint = `/track/charts?${params.toString()}`;
      const response = await this.makeRequest(endpoint);
      
      return response.data?.map(track => this.transformTrackData(track)) || [];
    } catch (error) {
      console.error('Failed to fetch top tracks from Viberate:', error);
      throw error;
    }
  }

  async getTrackDetails(trackId) {
    try {
      const response = await this.makeRequest(`/track/${trackId}`);
      return this.transformTrackData(response.data);
    } catch (error) {
      console.error(`Failed to fetch track details ${trackId} from Viberate:`, error);
      throw error;
    }
  }

  async getTrackStreams(trackId, timeRange = '30d') {
    try {
      const response = await this.makeRequest(`/track/${trackId}/streams?period=${timeRange}`);
      return { total: response.data?.total || 0, daily: response.data?.daily || [], growth: response.data?.growth || 0, timeRange };
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
      
      const endpoint = `/artist/${artistId}/tracks?${params.toString()}`;
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
      const response = await this.makeRequest(`/playlist/${playlistId}/analytics`);
      return response.data || {};
    } catch (error) {
      console.error(`Failed to fetch playlist analytics for ${playlistId}:`, error);
      throw error;
    }
  }

  async getArtistPlaylists(artistId) {
    try {
      const response = await this.makeRequest(`/artist/${artistId}/playlists`);
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
      
      if (options.limit) params.append('limit', options.limit);
      
      const endpoint = `/artist/search?${params.toString()}`;
      const response = await this.makeRequest(endpoint);
      
      return {
        artists: response.data?.map(artist => this.transformArtistData(artist)) || [],
        tracks: [], 
        albums: [] 
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
      const response = await this.makeRequest('/rate-limit/status');
      return {
        status: response.data?.status === 'UNDER_LIMIT' ? 'healthy' : 'unhealthy',
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

