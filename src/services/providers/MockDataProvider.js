/**
 * Mock Data Provider
 * 
 * Provides mock data that matches the standard interface.
 * Used as fallback when APIs are unavailable or for development/testing.
 */

class MockDataProvider {
  constructor() {
    this.mockDelay = 500; // Simulate API delay
  }

  /**
   * Simulate API delay
   */
  async simulateDelay() {
    await new Promise(resolve => setTimeout(resolve, this.mockDelay));
  }

  // ==================== MOCK DATA ====================

  getMockArtists() {
    return [
      {
        id: 1,
        name: 'Dua Lipa',
        country: 'United Kingdom',
        countryCode: '🇬🇧',
        genre: 'Pop',
        platformRank: 1,
        platformScore: 95,
        followers: '46.6M',
        streams: 1600000000,
        weeklyStreams: 45200000,
        monthlyStreams: 180800000,
        socialBuzz: 92,
        momentum: 'very high',
        growth: '+12.5%',
        weeklyGrowth: 12.5,
        monthlyGrowth: 8.3,
        verified: true,
        label: 'Warner Records',
        photo: '/artists/b7bGmztiAnEw.webp',
        spotifyId: '6M2wZ9GZgrQXHCFfjv46we',
        appleMusicId: '1061293024',
        youtubeId: 'UC-J-S5eKuZey9l3biz6ydxw'
      },
      {
        id: 2,
        name: 'Rita Ora',
        country: 'United Kingdom',
        countryCode: '🇬🇧',
        genre: 'Pop',
        platformRank: 2,
        platformScore: 78,
        followers: '6.1M',
        streams: 565600000,
        weeklyStreams: 12400000,
        monthlyStreams: 52800000,
        socialBuzz: 75,
        momentum: 'medium',
        growth: '+8.7%',
        weeklyGrowth: 8.7,
        monthlyGrowth: 5.2,
        verified: true,
        label: 'Atlantic Records',
        photo: '/artists/949XoW4ceFqV.jpg',
        spotifyId: '5CCwRZC6euC8Odo6y9X8jr',
        appleMusicId: '278873078',
        youtubeId: 'UC2l6LmTCGRJVqjO9Uj8NNKA'
      },
      {
        id: 3,
        name: 'Noizy',
        country: 'Albania',
        countryCode: '🇦🇱',
        genre: 'Hip Hop',
        platformRank: 3,
        platformScore: 85,
        followers: '1.2M',
        streams: 128500000,
        weeklyStreams: 8500000,
        monthlyStreams: 32100000,
        socialBuzz: 88,
        momentum: 'very high',
        growth: '+32.8%',
        weeklyGrowth: 32.8,
        monthlyGrowth: 18.5,
        verified: true,
        label: 'OTR Records',
        photo: '/artists/i51cNWgZ4EFP.jpeg',
        spotifyId: '4dpARuHxo51G3z768sgnrY',
        appleMusicId: '1234567890',
        youtubeId: 'UCabcdefghijklmnopqrstuvw'
      },
      {
        id: 4,
        name: 'Elvana Gjata',
        country: 'Albania',
        countryCode: '🇦🇱',
        genre: 'Pop',
        platformRank: 4,
        platformScore: 78,
        followers: '2.1M',
        streams: 95200000,
        weeklyStreams: 3200000,
        monthlyStreams: 14800000,
        socialBuzz: 82,
        momentum: 'high',
        growth: '+18.3%',
        weeklyGrowth: 18.3,
        monthlyGrowth: 12.7,
        verified: true,
        label: 'Independent',
        photo: '/artists/BDGuB4y4GFBt.png',
        spotifyId: '5dpARuHxo51G3z768sgnrZ',
        appleMusicId: '1234567891',
        youtubeId: 'UCabcdefghijklmnopqrstuvx'
      },
      {
        id: 5,
        name: 'Tayna',
        country: 'Kosovo',
        countryCode: '🇽🇰',
        genre: 'Hip Hop',
        platformRank: 5,
        platformScore: 75,
        followers: '1.8M',
        streams: 82100000,
        weeklyStreams: 2800000,
        monthlyStreams: 12400000,
        socialBuzz: 85,
        momentum: 'high',
        growth: '+25.7%',
        weeklyGrowth: 25.7,
        monthlyGrowth: 16.2,
        verified: true,
        label: 'Independent',
        photo: '/artists/0zZQcV1fbemw.jpg',
        spotifyId: '6dpARuHxo51G3z768sgnrA',
        appleMusicId: '1234567892',
        youtubeId: 'UCabcdefghijklmnopqrstuvy'
      },
      {
        id: 6,
        name: 'Bebe Rexha',
        country: 'United States',
        countryCode: '🇺🇸',
        genre: 'Pop',
        platformRank: 6,
        platformScore: 82,
        followers: '8.5M',
        streams: 2100000000,
        weeklyStreams: 50000000,
        monthlyStreams: 200000000,
        socialBuzz: 79,
        momentum: 'high',
        growth: '+15.2%',
        weeklyGrowth: 15.2,
        monthlyGrowth: 10.5,
        verified: true,
        label: 'Warner Records',
        photo: '/artists/4DosREkzX7Rr.jpg',
        spotifyId: '64M6ah0SkkRsnPGtGiRAbb',
        appleMusicId: '1061293025',
        youtubeId: 'UC-J-S5eKuZey9l3biz6ydxy'
      },
      {
        id: 7,
        name: 'Ava Max',
        country: 'United States',
        countryCode: '🇺🇸',
        genre: 'Pop',
        platformRank: 7,
        platformScore: 76,
        followers: '4.2M',
        streams: 1800000000,
        weeklyStreams: 35000000,
        monthlyStreams: 140000000,
        socialBuzz: 74,
        momentum: 'medium',
        growth: '+9.8%',
        weeklyGrowth: 9.8,
        monthlyGrowth: 6.1,
        verified: true,
        label: 'Atlantic Records',
        photo: '/artists/l16OqbL8nnO9.jpg',
        spotifyId: '4npEfmQ6YuiwW1GpUmaq3F',
        appleMusicId: '1061293026',
        youtubeId: 'UC-J-S5eKuZey9l3biz6ydxz'
      },
      {
        id: 8,
        name: 'Mozzik',
        country: 'Kosovo',
        countryCode: '🇽🇰',
        genre: 'Hip Hop',
        platformRank: 8,
        platformScore: 72,
        followers: '1.5M',
        streams: 75300000,
        weeklyStreams: 2500000,
        monthlyStreams: 10000000,
        socialBuzz: 81,
        momentum: 'high',
        growth: '+22.1%',
        weeklyGrowth: 22.1,
        monthlyGrowth: 15.0,
        verified: true,
        label: 'Independent',
        photo: '/artists/GAj4GW2oD8fI.jpg',
        spotifyId: '7dpARuHxo51G3z768sgnrB',
        appleMusicId: '1234567893',
        youtubeId: 'UCabcdefghijklmnopqrstuvz'
      },
      {
        id: 9,
        name: 'Gjiko',
        country: 'Kosovo',
        countryCode: '🇽🇰',
        genre: 'Hip Hop',
        platformRank: 9,
        platformScore: 69,
        followers: '980K',
        streams: 58700000,
        weeklyStreams: 1800000,
        monthlyStreams: 7500000,
        socialBuzz: 77,
        momentum: 'medium',
        growth: '+16.4%',
        weeklyGrowth: 16.4,
        monthlyGrowth: 11.0,
        verified: true,
        label: 'Independent',
        photo: '/artists/M967KpW7wHPY.jpg',
        spotifyId: '8dpARuHxo51G3z768sgnrC',
        appleMusicId: '1234567894',
        youtubeId: 'UCabcdefghijklmnopqrstuva'
      },
      {
        id: 10,
        name: 'Butrint Imeri',
        country: 'Albania',
        countryCode: '🇦🇱',
        genre: 'Pop',
        platformRank: 10,
        platformScore: 65,
        followers: '750K',
        streams: 42800000,
        weeklyStreams: 1500000,
        monthlyStreams: 6000000,
        socialBuzz: 73,
        momentum: 'medium',
        growth: '+11.9%',
        weeklyGrowth: 11.9,
        monthlyGrowth: 8.0,
        verified: true,
        label: 'Independent',
        photo: '/artists/0YVZhy06U1Nn.jpg',
        spotifyId: '9dpARuHxo51G3z768sgnrD',
        appleMusicId: '1234567895',
        youtubeId: 'UCabcdefghijklmnopqrstuvb'
      },
      {
        id: 11,
        name: 'MC Kresha',
        country: 'Kosovo',
        countryCode: '🇽🇰',
        genre: 'Hip Hop',
        platformRank: 11,
        platformScore: 63,
        followers: '650K',
        streams: 38200000,
        weeklyStreams: 1200000,
        monthlyStreams: 5000000,
        socialBuzz: 70,
        momentum: 'medium',
        growth: '+8.5%',
        weeklyGrowth: 8.5,
        monthlyGrowth: 6.0,
        verified: true,
        label: 'Independent',
        photo: '/artists/Aapyf9BbihYT.jpg',
        spotifyId: '0dpARuHxo51G3z768sgnrE',
        appleMusicId: '1234567896',
        youtubeId: 'UCabcdefghijklmnopqrstuvc'
      },
      {
        id: 12,
        name: '2Ton',
        country: 'Kosovo',
        countryCode: '🇽🇰',
        genre: 'Hip Hop',
        platformRank: 12,
        platformScore: 61,
        followers: '580K',
        streams: 34500000,
        weeklyStreams: 1000000,
        monthlyStreams: 4000000,
        socialBuzz: 68,
        momentum: 'stable',
        growth: '+5.2%',
        weeklyGrowth: 5.2,
        monthlyGrowth: 3.5,
        verified: true,
        label: 'Independent',
        photo: '/artists/NJmkyrEJgTcu.jpg',
        spotifyId: '1dpARuHxo51G3z768sgnrF',
        appleMusicId: '1234567897',
        youtubeId: 'UCabcdefghijklmnopqrstuvd'
      }
    ];
  }

  getMockTracks() {
    return [
      {
        id: 1,
        rank: 1,
        title: "Houdini",
        artist: "Dua Lipa",
        artistId: 1,
        album: "Radical Optimism",
        cover: "/album1.jpg",
        duration: "3:06",
        streams: "2.1B",
        weeklyStreams: "45.2M",
        growth: "+15.3%",
        weeklyGrowth: 15.0,
        monthlyGrowth: 10.0,
        momentum: "explosive",
        change: "+2",
        releaseDate: "2023-11-09",
        isrc: "GBAHT2300123",
        spotifyId: "7lPN2DXiMsVn7XUKtOW1CS"
      },
      {
        id: 2,
        rank: 2,
        title: "Praising You",
        artist: "Rita Ora ft. Fatboy Slim",
        artistId: 2,
        album: "You & I",
        cover: "/album2.jpg",
        duration: "3:24",
        streams: "890M",
        weeklyStreams: "28.7M",
        growth: "+8.9%",
        weeklyGrowth: 15.0,
        monthlyGrowth: 10.0,
        momentum: "rising",
        change: "+1",
        releaseDate: "2023-08-15",
        isrc: "GBAHT2300124",
        spotifyId: "8lPN2DXiMsVn7XUKtOW1CT"
      },
      {
        id: 3,
        rank: 3,
        title: "100 Kile",
        artist: "Noizy",
        artistId: 3,
        album: "Alpha",
        cover: "/album3.jpg",
        duration: "3:45",
        streams: "156M",
        weeklyStreams: "12.4M",
        growth: "+22.1%",
        weeklyGrowth: 15.0,
        monthlyGrowth: 10.0,
        momentum: "explosive",
        change: "+5",
        releaseDate: "2023-09-20",
        isrc: "GBAHT2300125",
        spotifyId: "9lPN2DXiMsVn7XUKtOW1CU"
      },
      {
        id: 4,
        rank: 4,
        title: "Me Tana",
        artist: "Elvana Gjata",
        artistId: 4,
        album: "Afër & Larg",
        cover: "/album4.jpg",
        duration: "3:28",
        streams: "89M",
        weeklyStreams: "8.9M",
        growth: "+14.2%",
        weeklyGrowth: 15.0,
        monthlyGrowth: 10.0,
        momentum: "rising",
        change: "+3",
        releaseDate: "2023-07-12",
        isrc: "GBAHT2300126",
        spotifyId: "0lPN2DXiMsVn7XUKtOW1CV"
      },
      {
        id: 5,
        rank: 5,
        title: "Columbiana",
        artist: "Tayna",
        artistId: 5,
        album: "Single",
        cover: "/album5.jpg",
        duration: "3:15",
        streams: "67M",
        weeklyStreams: "6.7M",
        growth: "+19.8%",
        weeklyGrowth: 15.0,
        monthlyGrowth: 10.0,
        momentum: "rising",
        change: "+7",
        releaseDate: "2023-06-05",
        isrc: "GBAHT2300127",
        spotifyId: "1lPN2DXiMsVn7XUKtOW1CW"
      }
    ];
  }

  getMockStreamData(timeRange) {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
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
  }

  getMockAudienceData() {
    return {
      countries: [
        { country: 'Albania', code: 'AL', percentage: 24.66, listeners: 123300 },
        { country: 'Germany', code: 'DE', percentage: 19.28, listeners: 96400 },
        { country: 'Italy', code: 'IT', percentage: 10.12, listeners: 50600 },
        { country: 'United States', code: 'US', percentage: 8.45, listeners: 42250 },
        { country: 'United Kingdom', code: 'GB', percentage: 7.23, listeners: 36150 },
        { country: 'Switzerland', code: 'CH', percentage: 6.89, listeners: 34450 },
        { country: 'Austria', code: 'AT', percentage: 5.67, listeners: 28350 },
        { country: 'France', code: 'FR', percentage: 4.23, listeners: 21150 },
        { country: 'Netherlands', code: 'NL', percentage: 3.78, listeners: 18900 },
        { country: 'Belgium', code: 'BE', percentage: 2.89, listeners: 14450 }
      ],
      demographics: {
        ageGroups: [
          { age: '18-24', percentage: 35.2 },
          { age: '25-34', percentage: 28.7 },
          { age: '35-44', percentage: 18.9 },
          { age: '45-54', percentage: 12.1 },
          { age: '55+', percentage: 5.1 }
        ],
        gender: {
          male: 52.3,
          female: 47.7
        }
      },
      totalListeners: 500000
    };
  }

  getMockSocialData() {
    return {
      platforms: {
        spotify: { followers: 2500000, growth: 12.5 },
        weeklyGrowth: 15.0,
        monthlyGrowth: 10.0,
        weeklyStreams: 5000000,
        monthlyStreams: 20000000,
        instagram: { followers: 1800000, growth: 8.7 },
        weeklyGrowth: 15.0,
        monthlyGrowth: 10.0,
        weeklyStreams: 5000000,
        monthlyStreams: 20000000,
        youtube: { followers: 950000, growth: 15.2 },
        weeklyGrowth: 15.0,
        monthlyGrowth: 10.0,
        weeklyStreams: 5000000,
        monthlyStreams: 20000000,
        tiktok: { followers: 1200000, growth: 25.8 },
        weeklyGrowth: 15.0,
        monthlyGrowth: 10.0,
        weeklyStreams: 5000000,
        monthlyStreams: 20000000,
        twitter: { followers: 450000, growth: 5.3 },
        weeklyGrowth: 15.0,
        monthlyGrowth: 10.0,
        weeklyStreams: 5000000,
        monthlyStreams: 20000000,
        facebook: { followers: 800000, growth: 3.2 }
      },
      totalFollowers: 7700000,
      engagement: 4.8
    };
  }

  // ==================== ARTIST METHODS ====================

  async getArtists(filters = {}) {
    await this.simulateDelay();
    
    let artists = this.getMockArtists();
    
    // Apply filters
    if (filters.country) {
      artists = artists.filter(artist => 
        artist.country.toLowerCase().includes(filters.country.toLowerCase())
      );
    }
    
    if (filters.genre) {
      artists = artists.filter(artist => 
        artist.genre.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }
    
    // Apply pagination
    const offset = filters.offset || 0;
    const limit = filters.limit || 10;
    
    return artists.slice(offset, offset + limit);
  }

  async getArtistProfile(artistId) {
    await this.simulateDelay();
    
    const artists = this.getMockArtists();
    const artist = artists.find(a => a.id == artistId);
    
    if (!artist) {
      throw new Error(`Artist with ID ${artistId} not found`);
    }
    
    return artist;
  }

  async getArtistStreams(artistId, timeRange = '30d') {
    await this.simulateDelay();
    
    const dailyData = this.getMockStreamData(timeRange);
    const total = dailyData.reduce((sum, day) => sum + day.streams, 0);
    const growth = Math.random() * 20 - 5; // Random growth between -5% and +15%
    
    return {
      total,
      daily: dailyData,
      growth,
      timeRange
    };
  }

  async getArtistAudience(artistId) {
    await this.simulateDelay();
    return this.getMockAudienceData();
  }

  async getArtistSocial(artistId) {
    await this.simulateDelay();
    return this.getMockSocialData();
  }

  // ==================== TRACK METHODS ====================

  async getTopTracks(options = {}) {
    await this.simulateDelay();
    
    let tracks = this.getMockTracks();
    
    // Apply filters
    if (options.country) {
      // In a real implementation, this would filter by country-specific charts
      tracks = tracks.slice(0, 3); // Simulate fewer results for specific countries
    }
    
    if (options.genre) {
      // Filter by genre would be implemented here
    }
    
    const limit = options.limit || 10;
    return tracks.slice(0, limit);
  }

  async getTrackDetails(trackId) {
    await this.simulateDelay();
    
    const tracks = this.getMockTracks();
    const track = tracks.find(t => t.id == trackId);
    
    if (!track) {
      throw new Error(`Track with ID ${trackId} not found`);
    }
    
    return track;
  }

  async getTrackStreams(trackId, timeRange = '30d') {
    await this.simulateDelay();
    
    const dailyData = this.getMockStreamData(timeRange);
    const total = dailyData.reduce((sum, day) => sum + day.streams, 0);
    const growth = Math.random() * 30 - 10; // Random growth between -10% and +20%
    
    return {
      total,
      daily: dailyData,
      growth,
      timeRange
    };
  }

  async getArtistTracks(artistId, options = {}) {
    await this.simulateDelay();
    
    const tracks = this.getMockTracks();
    const artistTracks = tracks.filter(track => track.artistId == artistId);
    
    // Apply sorting
    if (options.sort === 'streams') {
      artistTracks.sort((a, b) => 
        parseInt(b.streams.replace(/[^\d]/g, '')) - parseInt(a.streams.replace(/[^\d]/g, ''))
      );
    }
    
    const limit = options.limit || 10;
    return artistTracks.slice(0, limit);
  }

  // ==================== PLAYLIST METHODS ====================

  async getPlaylistAnalytics(playlistId) {
    await this.simulateDelay();
    
    return {
      id: playlistId,
      name: 'Albanian Hits 2023',
      followers: 125000,
        weeklyStreams: 5000000,
        monthlyStreams: 20000000,
      tracks: 50,
      totalStreams: 15000000,
      averageStreams: 300000,
      growth: 12.5
    };
  }

  async getArtistPlaylists(artistId) {
    await this.simulateDelay();
    
    return [
      {
        id: 'playlist1',
        name: 'Today\'s Top Hits',
        platform: 'Spotify',
        followers: 32000000,
        weeklyStreams: 5000000,
        monthlyStreams: 20000000,
        position: 15,
        addedDate: '2023-09-15'
      },
      {
        id: 'playlist2',
        name: 'Pop Rising',
        platform: 'Spotify',
        followers: 8500000,
        weeklyStreams: 5000000,
        monthlyStreams: 20000000,
        position: 8,
        addedDate: '2023-09-10'
      },
      {
        id: 'playlist3',
        name: 'Albanian Music',
        platform: 'Spotify',
        followers: 450000,
        weeklyStreams: 5000000,
        monthlyStreams: 20000000,
        position: 2,
        addedDate: '2023-09-05'
      }
    ];
  }

  // ==================== SEARCH METHODS ====================

  async search(query, type = 'all', options = {}) {
    await this.simulateDelay();
    
    const artists = this.getMockArtists();
    const tracks = this.getMockTracks();
    
    const searchResults = {
      artists: artists.filter(artist => 
        artist.name.toLowerCase().includes(query.toLowerCase())
      ),
      tracks: tracks.filter(track => 
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase())
      ),
      albums: []
    };
    
    if (type === 'artist') {
      return { artists: searchResults.artists, tracks: [], albums: [] };
    } else if (type === 'track') {
      return { artists: [], tracks: searchResults.tracks, albums: [] };
    }
    
    return searchResults;
  }

  // ==================== UTILITY METHODS ====================

  async getCountries() {
    await this.simulateDelay();
    
    return [
      { code: 'AL', name: 'Albania' },
      { code: 'US', name: 'United States' },
      { code: 'GB', name: 'United Kingdom' },
      { code: 'DE', name: 'Germany' },
      { code: 'IT', name: 'Italy' },
      { code: 'FR', name: 'France' },
      { code: 'ES', name: 'Spain' },
      { code: 'CA', name: 'Canada' },
      { code: 'AU', name: 'Australia' },
      { code: 'BR', name: 'Brazil' }
    ];
  }

  async getGenres() {
    await this.simulateDelay();
    
    return [
      { id: 'pop', name: 'Pop' },
      { id: 'hip-hop', name: 'Hip Hop' },
      { id: 'rock', name: 'Rock' },
      { id: 'electronic', name: 'Electronic' },
      { id: 'r-b', name: 'R&B' },
      { id: 'country', name: 'Country' },
      { id: 'folk', name: 'Folk' },
      { id: 'jazz', name: 'Jazz' },
      { id: 'classical', name: 'Classical' },
      { id: 'alternative', name: 'Alternative' }
    ];
  }

  async getHealthStatus() {
    await this.simulateDelay();
    
    return {
      status: 'healthy',
      provider: 'mock',
      timestamp: new Date().toISOString(),
      message: 'Mock data provider is always available'
    };
  }
}

export default MockDataProvider;
