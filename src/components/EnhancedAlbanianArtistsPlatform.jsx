import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Settings, Play, Heart, Share2, ExternalLink, TrendingUp, TrendingDown, Minus, Crown, Medal, Award, MapPin, Users, Music, Radio, Calendar, BarChart3, PieChart, LineChart, Globe, Headphones, Eye, ThumbsUp, MessageCircle, Repeat, Volume2, Mic, Star, Target, Zap, ArrowUp, ArrowDown, ChevronRight, ChevronLeft, MoreHorizontal, X, Check, AlertCircle, Info } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, AreaChart, Area, RadialBarChart, RadialBar, Legend } from 'recharts';

const EnhancedAlbanianArtistsPlatform = () => {
  const [activeSection, setActiveSection] = useState('artists');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredArtists, setFilteredArtists] = useState([]);

  // Comprehensive Albanian artists data based on Spotify research
  const albanianArtists = [
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
      monthlyListeners: 75400000,
      spotifyFollowers: 87200000,
      isAlbanian: true,
      popularity: 98
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
      monthlyListeners: 18500000,
      spotifyFollowers: 12800000,
      isAlbanian: true,
      popularity: 76
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
      monthlyListeners: 3200000,
      spotifyFollowers: 2100000,
      isAlbanian: true,
      popularity: 68
    },
    {
      id: 4,
      name: 'Don Xhoni',
      image: '/don-xhoni.jpg',
      platformRank: 3200,
      platformScore: 72,
      genre: 'Hip Hop',
      country: 'Albania',
      momentum: 'high',
      fanbase: '1.8M',
      streaming: '134M',
      social: '6.2M',
      monthlyListeners: 2800000,
      spotifyFollowers: 1800000,
      isAlbanian: true,
      popularity: 65
    },
    {
      id: 5,
      name: 'Tayna',
      image: '/tayna.jpg',
      platformRank: 3500,
      platformScore: 70,
      genre: 'Hip Hop',
      country: 'Albania',
      momentum: 'rising',
      fanbase: '1.5M',
      streaming: '89M',
      social: '4.8M',
      monthlyListeners: 2200000,
      spotifyFollowers: 1500000,
      isAlbanian: true,
      popularity: 62
    },
    {
      id: 6,
      name: 'Butrint Imeri',
      image: '/butrint-imeri.jpg',
      platformRank: 4200,
      platformScore: 68,
      genre: 'Pop',
      country: 'Albania',
      momentum: 'rising',
      fanbase: '1.4M',
      streaming: '78M',
      social: '3.9M',
      monthlyListeners: 1900000,
      spotifyFollowers: 1426036,
      isAlbanian: true,
      popularity: 59
    },
    {
      id: 7,
      name: 'Era Istrefi',
      image: '/era-istrefi.jpg',
      platformRank: 4800,
      platformScore: 65,
      genre: 'Pop',
      country: 'Albania/Kosovo',
      momentum: 'stable',
      fanbase: '1.3M',
      streaming: '67M',
      social: '3.2M',
      monthlyListeners: 1600000,
      spotifyFollowers: 1292016,
      isAlbanian: true,
      popularity: 56
    },
    {
      id: 8,
      name: 'Kidda',
      image: '/kidda.jpg',
      platformRank: 5100,
      platformScore: 63,
      genre: 'Hip Hop',
      country: 'Albania',
      momentum: 'rising',
      fanbase: '1.3M',
      streaming: '58M',
      social: '2.8M',
      monthlyListeners: 1450000,
      spotifyFollowers: 1256157,
      isAlbanian: true,
      popularity: 54
    },
    {
      id: 9,
      name: 'Dafina Zeqiri',
      image: '/dafina-zeqiri.jpg',
      platformRank: 5600,
      platformScore: 61,
      genre: 'Pop',
      country: 'Albania/Kosovo',
      momentum: 'stable',
      fanbase: '1.1M',
      streaming: '52M',
      social: '2.5M',
      monthlyListeners: 1300000,
      spotifyFollowers: 1134028,
      isAlbanian: true,
      popularity: 52
    },
    {
      id: 10,
      name: 'Yll Limani',
      image: '/yll-limani.jpg',
      platformRank: 6200,
      platformScore: 58,
      genre: 'Hip Hop',
      country: 'Albania',
      momentum: 'rising',
      fanbase: '980K',
      streaming: '45M',
      social: '2.1M',
      monthlyListeners: 1100000,
      spotifyFollowers: 980000,
      isAlbanian: true,
      popularity: 49
    },
    {
      id: 11,
      name: 'Finem',
      image: '/finem.jpg',
      platformRank: 6800,
      platformScore: 55,
      genre: 'Hip Hop',
      country: 'Albania',
      momentum: 'rising',
      fanbase: '850K',
      streaming: '38M',
      social: '1.8M',
      monthlyListeners: 950000,
      spotifyFollowers: 850000,
      isAlbanian: true,
      popularity: 46
    },
    {
      id: 12,
      name: 'Stealth',
      image: '/stealth.jpg',
      platformRank: 7200,
      platformScore: 53,
      genre: 'Hip Hop',
      country: 'Albania',
      momentum: 'stable',
      fanbase: '720K',
      streaming: '32M',
      social: '1.5M',
      monthlyListeners: 820000,
      spotifyFollowers: 720000,
      isAlbanian: true,
      popularity: 43
    },
    {
      id: 13,
      name: 'DJ Gimi-O',
      image: '/dj-gimi-o.jpg',
      platformRank: 7800,
      platformScore: 51,
      genre: 'Electronic',
      country: 'Albania',
      momentum: 'explosive',
      fanbase: '650K',
      streaming: '89M',
      social: '1.2M',
      monthlyListeners: 1800000,
      spotifyFollowers: 650000,
      isAlbanian: true,
      popularity: 58
    },
    {
      id: 14,
      name: 'Elvana Gjata',
      image: '/elvana-gjata.jpg',
      platformRank: 8200,
      platformScore: 49,
      genre: 'Pop',
      country: 'Albania',
      momentum: 'stable',
      fanbase: '580K',
      streaming: '28M',
      social: '1.1M',
      monthlyListeners: 750000,
      spotifyFollowers: 580000,
      isAlbanian: true,
      popularity: 41
    },
    {
      id: 15,
      name: 'Çelik Lipa',
      image: '/celik-lipa.jpg',
      platformRank: 8600,
      platformScore: 47,
      genre: 'Hip Hop',
      country: 'Albania',
      momentum: 'rising',
      fanbase: '520K',
      streaming: '25M',
      social: '980K',
      monthlyListeners: 680000,
      spotifyFollowers: 520000,
      isAlbanian: true,
      popularity: 39
    }
  ];

  const genres = ['All Genres', 'Pop', 'Hip Hop', 'Electronic', 'R&B', 'Folk', 'Rock'];
  const countries = ['All Countries', 'Albania', 'Albania/UK', 'Albania/Kosovo'];
  const momentumTypes = ['All', 'explosive', 'very-high', 'high', 'rising', 'stable', 'declining'];

  const timeFilters = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '3m', label: '3 Months' },
    { value: '12m', label: '12 Months' },
    { value: 'total', label: 'All Time' }
  ];

  // Filter artists based on search and filters
  useEffect(() => {
    let filtered = albanianArtists;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(artist => 
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Genre filter
    if (selectedGenres.length > 0 && !selectedGenres.includes('All Genres')) {
      filtered = filtered.filter(artist => selectedGenres.includes(artist.genre));
    }

    // Country filter
    if (selectedCountries.length > 0 && !selectedCountries.includes('All Countries')) {
      filtered = filtered.filter(artist => selectedCountries.includes(artist.country));
    }

    setFilteredArtists(filtered);
  }, [searchQuery, selectedGenres, selectedCountries]);

  // Initialize with all artists
  useEffect(() => {
    setFilteredArtists(albanianArtists);
  }, []);

  const getMomentumColor = (momentum) => {
    switch (momentum) {
      case 'explosive': return 'bg-green-500';
      case 'very-high': return 'bg-green-400';
      case 'high': return 'bg-blue-500';
      case 'rising': return 'bg-blue-400';
      case 'stable': return 'bg-orange-500';
      case 'medium': return 'bg-orange-400';
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

  const handleGenreFilter = (genre) => {
    if (genre === 'All Genres') {
      setSelectedGenres([]);
    } else {
      setSelectedGenres(prev => 
        prev.includes(genre) 
          ? prev.filter(g => g !== genre)
          : [...prev, genre]
      );
    }
  };

  const handleCountryFilter = (country) => {
    if (country === 'All Countries') {
      setSelectedCountries([]);
    } else {
      setSelectedCountries(prev => 
        prev.includes(country) 
          ? prev.filter(c => c !== country)
          : [...prev, country]
      );
    }
  };

  const renderArtistsSection = () => (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Top Albanian Artists on Spotify</h1>
          <p className="text-gray-600 mt-2">Discover and analyze the most popular Albanian musicians with advanced filtering</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Albanian artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            <span>Advanced Filters</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Filter Albanian Artists</h3>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Genre</label>
              <div className="space-y-2">
                {genres.map(genre => (
                  <label key={genre} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre) || (genre === 'All Genres' && selectedGenres.length === 0)}
                      onChange={() => handleGenreFilter(genre)}
                      className="mr-2"
                    />
                    <span className="text-sm">{genre}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Country/Region</label>
              <div className="space-y-2">
                {countries.map(country => (
                  <label key={country} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(country) || (country === 'All Countries' && selectedCountries.length === 0)}
                      onChange={() => handleCountryFilter(country)}
                      className="mr-2"
                    />
                    <span className="text-sm">{country}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time Period</label>
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                {timeFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Momentum</label>
              <select className="w-full border rounded-lg px-3 py-2">
                {momentumTypes.map(momentum => (
                  <option key={momentum} value={momentum}>{momentum}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredArtists.length} of {albanianArtists.length} Albanian artists
            </div>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedGenres([]);
                setSelectedCountries([]);
                setTimeFilter('30d');
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Statistics Summary */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-blue-600">{filteredArtists.length}</div>
          <div className="text-gray-600">Albanian Artists</div>
          <div className="text-sm text-green-600 mt-1">Active on Spotify</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-green-600">
            {formatNumber(filteredArtists.reduce((sum, artist) => sum + artist.monthlyListeners, 0))}
          </div>
          <div className="text-gray-600">Total Monthly Listeners</div>
          <div className="text-sm text-green-600 mt-1">Combined reach</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-purple-600">
            {filteredArtists.filter(artist => artist.momentum === 'rising' || artist.momentum === 'explosive').length}
          </div>
          <div className="text-gray-600">Rising Artists</div>
          <div className="text-sm text-green-600 mt-1">Trending upward</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-orange-600">
            {Math.round(filteredArtists.reduce((sum, artist) => sum + artist.popularity, 0) / filteredArtists.length)}
          </div>
          <div className="text-gray-600">Average Popularity</div>
          <div className="text-sm text-green-600 mt-1">Spotify score</div>
        </div>
      </div>

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
                <th className="text-left p-4 font-medium">Monthly Listeners</th>
                <th className="text-left p-4 font-medium">Spotify Followers</th>
                <th className="text-left p-4 font-medium">Popularity</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArtists.map((artist, index) => (
                <tr key={artist.id} className="border-b hover:bg-gray-50 cursor-pointer">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(index + 1)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{artist.name.charAt(0)}</span>
                      </div>
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
                  <td className="p-4 font-medium">{formatNumber(artist.monthlyListeners)}</td>
                  <td className="p-4 font-medium">{formatNumber(artist.spotifyFollowers)}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{artist.popularity}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${artist.popularity}%` }}
                        />
                      </div>
                    </div>
                  </td>
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

      {/* No Results Message */}
      {filteredArtists.length === 0 && (
        <div className="bg-white border rounded-lg p-12 text-center">
          <Music className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No artists found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedGenres([]);
              setSelectedCountries([]);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Clear Filters
          </button>
        </div>
      )}
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
                  Albanian Artists
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Powered by Spotify Data
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderArtistsSection()}
      </main>
    </div>
  );
};

export default EnhancedAlbanianArtistsPlatform;
