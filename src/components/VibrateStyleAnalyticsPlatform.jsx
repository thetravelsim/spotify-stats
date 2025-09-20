import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Settings, Play, Heart, Share2, ExternalLink, TrendingUp, TrendingDown, Minus, Crown, Medal, Award, MapPin, Users, Music, Radio, Calendar, BarChart3, PieChart, LineChart, Globe, Headphones, Eye, ThumbsUp, MessageCircle, Repeat, Volume2, Mic, Star, Target, Zap, ArrowUp, ArrowDown, ChevronRight, ChevronLeft, MoreHorizontal, X, Check, AlertCircle, Info } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, AreaChart, Area, RadialBarChart, RadialBar, Legend } from 'recharts';

const VibrateStyleAnalyticsPlatform = () => {
  const [activeSection, setActiveSection] = useState('artists');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced mock data with comprehensive Viberate-style metrics
  const artists = [
    {
      id: 1,
      name: 'Dua Lipa',
      image: '/dua-lipa.jpg',
      platformRank: 2,
      platformScore: 95,
      genre: 'Pop',
      country: 'Albania/UK',
      momentum: 'very-high',
      fanbase: '87.2M',
      streaming: '2.1B',
      social: '156M',
      radio: '8.5K',
      live: '45',
      followers: {
        spotify: 87200000,
        instagram: 89500000,
        tiktok: 12300000,
        youtube: 25600000,
        facebook: 15800000,
        twitter: 8900000
      },
      monthlyListeners: 75400000,
      totalStreams: 21000000000,
      popularity: 98,
      careerHealth: 92,
      topTracks: [
        { name: 'Levitating', streams: 2100000000, growth: 5.2 },
        { name: 'Don\'t Start Now', streams: 1800000000, growth: 3.1 },
        { name: 'Physical', streams: 1200000000, growth: 2.8 }
      ],
      audienceGeo: [
        { country: 'United States', percentage: 22.5, listeners: 16900000 },
        { country: 'United Kingdom', percentage: 18.3, listeners: 13800000 },
        { country: 'Germany', percentage: 12.1, listeners: 9100000 },
        { country: 'Brazil', percentage: 8.7, listeners: 6600000 },
        { country: 'Albania', percentage: 6.2, listeners: 4700000 }
      ]
    },
    {
      id: 2,
      name: 'Rita Ora',
      image: '/rita-ora.jpg',
      platformRank: 78,
      platformScore: 78,
      genre: 'Pop',
      country: 'Albania/UK',
      momentum: 'medium',
      fanbase: '12.8M',
      streaming: '890M',
      social: '45M',
      radio: '3.2K',
      live: '28',
      followers: {
        spotify: 12800000,
        instagram: 16200000,
        tiktok: 3400000,
        youtube: 8900000,
        facebook: 5600000,
        twitter: 3200000
      },
      monthlyListeners: 18500000,
      totalStreams: 8900000000,
      popularity: 76,
      careerHealth: 78,
      topTracks: [
        { name: 'Anywhere', streams: 450000000, growth: 2.1 },
        { name: 'Let You Love Me', streams: 380000000, growth: 1.8 },
        { name: 'Your Song', streams: 320000000, growth: 1.2 }
      ],
      audienceGeo: [
        { country: 'United Kingdom', percentage: 28.5, listeners: 5300000 },
        { country: 'United States', percentage: 19.2, listeners: 3600000 },
        { country: 'Germany', percentage: 11.8, listeners: 2200000 },
        { country: 'Albania', percentage: 9.4, listeners: 1700000 },
        { country: 'Australia', percentage: 7.1, listeners: 1300000 }
      ]
    },
    {
      id: 3,
      name: 'Noizy',
      image: '/noizy.jpg',
      platformRank: 2447,
      platformScore: 75,
      genre: 'Hip Hop',
      country: 'Albania',
      momentum: 'high',
      fanbase: '2.1M',
      streaming: '156M',
      social: '8.9M',
      radio: '890',
      live: '15',
      followers: {
        spotify: 2100000,
        instagram: 4200000,
        tiktok: 890000,
        youtube: 1800000,
        facebook: 1200000,
        twitter: 450000
      },
      monthlyListeners: 3200000,
      totalStreams: 1560000000,
      popularity: 68,
      careerHealth: 82,
      topTracks: [
        { name: 'OTR', streams: 89000000, growth: 8.5 },
        { name: 'Histori', streams: 67000000, growth: 6.2 },
        { name: 'Gjynah', streams: 54000000, growth: 4.8 }
      ],
      audienceGeo: [
        { country: 'Albania', percentage: 45.2, listeners: 1450000 },
        { country: 'Kosovo', percentage: 18.7, listeners: 600000 },
        { country: 'Germany', percentage: 12.3, listeners: 390000 },
        { country: 'Switzerland', percentage: 8.9, listeners: 285000 },
        { country: 'United States', percentage: 6.1, listeners: 195000 }
      ]
    }
  ];

  const tracks = [
    {
      id: 1,
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      image: '/levitating.jpg',
      rank: 1,
      rankChange: 0,
      totalStreams: 2100000000,
      weeklyStreams: 45200000,
      growth: 5.2,
      momentum: 'explosive',
      duration: '3:23',
      genre: 'Pop',
      releaseDate: '2020-03-27'
    },
    {
      id: 2,
      title: 'Don\'t Start Now',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      image: '/dont-start-now.jpg',
      rank: 2,
      rankChange: 1,
      totalStreams: 1800000000,
      weeklyStreams: 38900000,
      growth: 3.1,
      momentum: 'rising',
      duration: '3:03',
      genre: 'Pop',
      releaseDate: '2019-11-01'
    },
    {
      id: 3,
      title: 'OTR',
      artist: 'Noizy',
      album: 'Single',
      image: '/otr.jpg',
      rank: 3,
      rankChange: 2,
      totalStreams: 89000000,
      weeklyStreams: 2100000,
      growth: 8.5,
      momentum: 'explosive',
      duration: '3:45',
      genre: 'Hip Hop',
      releaseDate: '2023-06-15'
    }
  ];

  const playlists = [
    {
      id: 1,
      name: 'Today\'s Top Hits',
      curator: 'Spotify',
      followers: 34800000,
      type: 'Editorial',
      genre: 'Pop',
      tracks: 50,
      growth: -1.2
    },
    {
      id: 2,
      name: 'Top 50 - Global',
      curator: 'Spotify',
      followers: 17000000,
      type: 'Charts',
      genre: 'Pop',
      tracks: 50,
      growth: -5.3
    },
    {
      id: 3,
      name: 'RapCaviar',
      curator: 'Spotify',
      followers: 15900000,
      type: 'Editorial',
      genre: 'Hip Hop',
      tracks: 65,
      growth: -4.8
    }
  ];

  const genres = [
    'Pop', 'Hip Hop', 'Rock', 'Electronic', 'R&B', 'Country', 'Jazz', 'Classical',
    'Reggae', 'Blues', 'Folk', 'Punk', 'Metal', 'Alternative', 'Indie', 'Latin'
  ];

  const countries = [
    'Albania', 'United States', 'United Kingdom', 'Germany', 'France', 'Italy',
    'Spain', 'Brazil', 'Canada', 'Australia', 'Netherlands', 'Sweden', 'Norway'
  ];

  const timeFilters = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '3m', label: '3 Months' },
    { value: '12m', label: '12 Months' },
    { value: 'total', label: 'All Time' }
  ];

  // Enhanced streaming data for charts
  const streamingData = [
    { date: 'Sep 13', streams: 42000000, listeners: 18500000 },
    { date: 'Sep 14', streams: 45200000, listeners: 19200000 },
    { date: 'Sep 15', streams: 43800000, listeners: 18900000 },
    { date: 'Sep 16', streams: 47100000, listeners: 20100000 },
    { date: 'Sep 17', streams: 48900000, listeners: 20800000 },
    { date: 'Sep 18', streams: 46700000, listeners: 19900000 },
    { date: 'Sep 19', streams: 50200000, listeners: 21300000 }
  ];

  const fanbaseData = [
    { platform: 'Spotify', value: 35, color: '#1DB954' },
    { platform: 'Instagram', value: 28, color: '#E4405F' },
    { platform: 'YouTube', value: 18, color: '#FF0000' },
    { platform: 'TikTok', value: 12, color: '#000000' },
    { platform: 'Facebook', value: 7, color: '#1877F2' }
  ];

  const getMomentumColor = (momentum) => {
    switch (momentum) {
      case 'explosive': return 'bg-green-500';
      case 'very-high': return 'bg-green-400';
      case 'high': return 'bg-blue-500';
      case 'rising': return 'bg-blue-400';
      case 'medium': return 'bg-orange-500';
      case 'stable': return 'bg-gray-500';
      case 'declining': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="text-sm font-bold text-gray-600">#{rank}</span>;
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const renderArtistProfile = () => {
    if (!selectedArtist) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          {/* Artist Header */}
          <div className="relative h-64 bg-gradient-to-r from-purple-600 to-blue-600">
            <button
              onClick={() => setSelectedArtist(null)}
              className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="absolute bottom-6 left-6 flex items-end space-x-6">
              <img
                src={selectedArtist.image}
                alt={selectedArtist.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">{selectedArtist.name}</h1>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    {selectedArtist.genre}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedArtist.country}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {formatNumber(selectedArtist.monthlyListeners)} monthly listeners
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Rankings Sidebar */}
          <div className="flex">
            <div className="w-64 bg-gray-50 p-6 border-r">
              <h3 className="font-bold text-lg mb-4">Platform Ranks</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">#{selectedArtist.platformRank}</div>
                  <div className="text-sm text-gray-600">Overall</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600">#1</div>
                  <div className="text-sm text-gray-600">ALB</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">#{selectedArtist.platformRank + 5}</div>
                  <div className="text-sm text-gray-600">{selectedArtist.genre}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-orange-600">{selectedArtist.platformScore}</div>
                  <div className="text-sm text-gray-600">Platform Score</div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {/* Navigation Tabs */}
              <div className="flex space-x-6 border-b mb-6">
                {['overview', 'audience', 'tracks', 'playlists'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-1 border-b-2 font-medium capitalize ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Time Filter */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Engagement And Fanbase Metrics</h2>
                    <div className="flex space-x-2">
                      {timeFilters.map((filter) => (
                        <button
                          key={filter.value}
                          onClick={() => setTimeFilter(filter.value)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            timeFilter === filter.value
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Platform Metrics Grid */}
                  <div className="grid grid-cols-3 gap-6">
                    {Object.entries(selectedArtist.followers).map(([platform, count]) => (
                      <div key={platform} className="bg-white border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600 capitalize">{platform}</span>
                          <span className="text-xs text-green-600 font-medium">+2.4%</span>
                        </div>
                        <div className="text-2xl font-bold">{formatNumber(count)}</div>
                        <div className="text-xs text-gray-500">followers</div>
                      </div>
                    ))}
                  </div>

                  {/* Engagement Chart */}
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Engagement Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsLineChart data={streamingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="streams" stroke="#3B82F6" strokeWidth={2} />
                        <Line type="monotone" dataKey="listeners" stroke="#10B981" strokeWidth={2} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Fanbase vs Engagement */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white border rounded-lg p-6">
                      <h3 className="text-lg font-bold mb-4">Fanbase Distribution</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <RechartsPieChart>
                          <Pie
                            data={fanbaseData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                          >
                            {fanbaseData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-white border rounded-lg p-6">
                      <h3 className="text-lg font-bold mb-4">Career Health</h3>
                      <div className="flex items-center justify-center h-64">
                        <div className="relative w-48 h-48">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="#E5E7EB"
                              strokeWidth="8"
                              fill="none"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="#10B981"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={`${selectedArtist.careerHealth * 2.51} 251`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-green-600">{selectedArtist.careerHealth}</div>
                              <div className="text-sm text-gray-600">Health Score</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'audience' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold">Audience Analytics</h2>
                  
                  {/* Geographic Distribution */}
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Top Countries</h3>
                    <div className="space-y-4">
                      {selectedArtist.audienceGeo.map((country, index) => (
                        <div key={country.country} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                            <span className="font-medium">{country.country}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${country.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">{country.percentage}%</span>
                            <span className="text-sm text-gray-600 w-20 text-right">
                              {formatNumber(country.listeners)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Premium Feature Blur */}
                  <div className="relative bg-white border rounded-lg p-6">
                    <div className="absolute inset-0 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                      <div className="text-center">
                        <div className="text-lg font-bold mb-2">Premium Feature</div>
                        <div className="text-gray-600 mb-4">Unlock detailed demographic insights</div>
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                          Buy Now To See All
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-4">Age & Gender Demographics</h3>
                    <div className="grid grid-cols-2 gap-6 blur-sm">
                      <div>
                        <h4 className="font-medium mb-2">Age Groups</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>18-24</span>
                            <span>32%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>25-34</span>
                            <span>28%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>35-44</span>
                            <span>22%</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Gender Split</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Female</span>
                            <span>58%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Male</span>
                            <span>42%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tracks' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Top Tracks</h2>
                  <div className="space-y-4">
                    {selectedArtist.topTracks.map((track, index) => (
                      <div key={track.name} className="bg-white border rounded-lg p-4 flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8">
                          {getRankIcon(index + 1)}
                        </div>
                        <div className="w-12 h-12 bg-gray-200 rounded"></div>
                        <div className="flex-1">
                          <div className="font-medium">{track.name}</div>
                          <div className="text-sm text-gray-600">{selectedArtist.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatNumber(track.streams)}</div>
                          <div className="text-sm text-green-600">+{track.growth}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'playlists' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Playlist Placements</h2>
                  <div className="bg-white border rounded-lg p-6">
                    <div className="text-center text-gray-500">
                      <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Playlist analytics available in premium version</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderArtistsSection = () => (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Artists</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border rounded-lg p-6">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Genre</label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option>All Genres</option>
                {genres.map(genre => (
                  <option key={genre}>{genre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option>All Countries</option>
                {countries.map(country => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time Period</label>
              <select className="w-full border rounded-lg px-3 py-2">
                {timeFilters.map(filter => (
                  <option key={filter.value}>{filter.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Momentum</label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option>All</option>
                <option>Explosive</option>
                <option>Very High</option>
                <option>High</option>
                <option>Rising</option>
                <option>Medium</option>
                <option>Stable</option>
                <option>Declining</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Artists Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium">Rank</th>
                <th className="text-left p-4 font-medium">Artist</th>
                <th className="text-left p-4 font-medium">Genre</th>
                <th className="text-left p-4 font-medium">Platform Score</th>
                <th className="text-left p-4 font-medium">Momentum</th>
                <th className="text-left p-4 font-medium">Fanbase</th>
                <th className="text-left p-4 font-medium">Streaming</th>
                <th className="text-left p-4 font-medium">Social</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist, index) => (
                <tr key={artist.id} className="border-b hover:bg-gray-50 cursor-pointer">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(index + 1)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{artist.name}</div>
                        <div className="text-sm text-gray-600">{artist.country}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {artist.genre}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">{artist.platformScore}</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${getMomentumColor(artist.momentum)}`}>
                      {artist.momentum.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{artist.fanbase}</td>
                  <td className="p-4 font-medium">{artist.streaming}</td>
                  <td className="p-4 font-medium">{artist.social}</td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedArtist(artist)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTracksSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Top Songs</h1>
        <div className="flex items-center space-x-4">
          <select className="border rounded-lg px-3 py-2">
            <option>Weekly</option>
            <option>Monthly</option>
            <option>All Time</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-blue-600">3.1B</div>
          <div className="text-gray-600">Total Streams</div>
          <div className="text-sm text-green-600 mt-1">+12.4% vs last week</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-green-600">+15.4%</div>
          <div className="text-gray-600">Average Growth</div>
          <div className="text-sm text-green-600 mt-1">Above industry average</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-purple-600">3/3</div>
          <div className="text-gray-600">Rising Tracks</div>
          <div className="text-sm text-green-600 mt-1">All tracks trending up</div>
        </div>
      </div>

      {/* Tracks List */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Weekly Chart</h2>
        </div>
        <div className="space-y-4 p-6">
          {tracks.map((track) => (
            <div key={track.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center w-12">
                {getRankIcon(track.rank)}
              </div>
              <img
                src={track.image}
                alt={track.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="font-medium text-lg">{track.title}</div>
                <div className="text-gray-600">{track.artist}</div>
                <div className="text-sm text-gray-500">{track.album} • {track.duration}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatNumber(track.totalStreams)}</div>
                <div className="text-sm text-gray-600">Total Streams</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatNumber(track.weeklyStreams)}</div>
                <div className="text-sm text-gray-600">Weekly Streams</div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-white text-sm ${getMomentumColor(track.momentum)}`}>
                  {track.momentum}
                </span>
                <div className="text-sm text-green-600 mt-1">+{track.growth}%</div>
              </div>
              <div className="flex items-center space-x-2">
                {track.rankChange > 0 && (
                  <div className="flex items-center text-green-600">
                    <ArrowUp className="w-4 h-4" />
                    <span className="text-sm">+{track.rankChange}</span>
                  </div>
                )}
                {track.rankChange < 0 && (
                  <div className="flex items-center text-red-600">
                    <ArrowDown className="w-4 h-4" />
                    <span className="text-sm">{track.rankChange}</span>
                  </div>
                )}
                {track.rankChange === 0 && (
                  <div className="flex items-center text-gray-600">
                    <Minus className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlaylistsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Playlists</h1>
        <div className="flex items-center space-x-4">
          <select className="border rounded-lg px-3 py-2">
            <option>Spotify</option>
            <option>Apple Music</option>
            <option>All Platforms</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-lg p-6">
        <div className="grid grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Curator</label>
            <input
              type="text"
              placeholder="Search curator..."
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Genre</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>All Genres</option>
              {genres.map(genre => (
                <option key={genre}>{genre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Followers Range</label>
            <div className="flex space-x-2">
              <input type="number" placeholder="Min" className="w-full border rounded-lg px-3 py-2" />
              <input type="number" placeholder="Max" className="w-full border rounded-lg px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Playlist Type</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>All Types</option>
              <option>Editorial</option>
              <option>Charts</option>
              <option>User Generated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Playlists Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium">Rank</th>
              <th className="text-left p-4 font-medium">Playlist</th>
              <th className="text-left p-4 font-medium">Genre</th>
              <th className="text-left p-4 font-medium">Type</th>
              <th className="text-left p-4 font-medium">Followers</th>
              <th className="text-left p-4 font-medium">Growth</th>
            </tr>
          </thead>
          <tbody>
            {playlists.map((playlist, index) => (
              <tr key={playlist.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(index + 1)}
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium">{playlist.name}</div>
                    <div className="text-sm text-gray-600">{playlist.curator}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {playlist.genre}
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {playlist.type}
                  </span>
                </td>
                <td className="p-4 font-medium">{formatNumber(playlist.followers)}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    {playlist.growth > 0 ? (
                      <ArrowUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={playlist.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                      {playlist.growth > 0 ? '+' : ''}{playlist.growth}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-red-600">Albanian Music Analytics</h1>
              <nav className="flex space-x-6">
                <button
                  onClick={() => setActiveSection('artists')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeSection === 'artists'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Artists
                </button>
                <button
                  onClick={() => setActiveSection('tracks')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeSection === 'tracks'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Tracks
                </button>
                <button
                  onClick={() => setActiveSection('playlists')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeSection === 'playlists'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Playlists
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeSection === 'artists' && renderArtistsSection()}
        {activeSection === 'tracks' && renderTracksSection()}
        {activeSection === 'playlists' && renderPlaylistsSection()}
      </main>

      {/* Artist Profile Modal */}
      {selectedArtist && renderArtistProfile()}
    </div>
  );
};

export default VibrateStyleAnalyticsPlatform;
