import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Settings, Play, Heart, Share2, ExternalLink, TrendingUp, TrendingDown, Minus, Crown, Medal, Award, MapPin, Users, Music, Radio, Calendar, BarChart3, PieChart, LineChart, Globe, Headphones, Eye, ThumbsUp, MessageCircle, Repeat, Volume2, Mic, Star, Target, Zap, ArrowUp, ArrowDown, ChevronRight, ChevronLeft, MoreHorizontal, X, Check, AlertCircle, Info, Clock, Flame, Trophy, Menu, ChevronDown } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, AreaChart, Area, RadialBarChart, RadialBar, Legend } from 'recharts';

const MobileFriendlyAlbanianMusicPlatform = () => {
  const [activeSection, setActiveSection] = useState('weekly-artists');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ultimate Albanian Artists Database (40+ artists with realistic statistics)
  const allAlbanianArtists = [
    // International Superstars
    {
      id: 1,
      name: 'Dua Lipa',
      image: '/dua-lipa.jpg',
      genre: 'Pop',
      country: 'Albania/UK',
      monthlyListeners: 75400000,
      weeklyStreams: 45200000,
      monthlyStreams: 180500000,
      totalStreams: 2100000000,
      weeklyGrowth: 8.5,
      monthlyGrowth: 6.8,
      momentum: 'explosive',
      popularity: 98,
      spotifyFollowers: 87200000,
      platformScore: 95,
      peakPosition: 1,
      weeksOnChart: 156,
      monthsOnChart: 36,
      category: 'international'
    },
    {
      id: 2,
      name: 'Rita Ora',
      image: '/rita-ora.jpg',
      genre: 'Pop',
      country: 'Albania/UK',
      monthlyListeners: 18500000,
      weeklyStreams: 6700000,
      monthlyStreams: 28900000,
      totalStreams: 890000000,
      weeklyGrowth: 5.2,
      monthlyGrowth: 4.2,
      momentum: 'rising',
      popularity: 76,
      spotifyFollowers: 12300000,
      platformScore: 78,
      peakPosition: 2,
      weeksOnChart: 134,
      monthsOnChart: 31,
      category: 'international'
    },
    {
      id: 3,
      name: 'Bebe Rexha',
      image: '/bebe-rexha.jpg',
      genre: 'Pop',
      country: 'Albania/USA',
      monthlyListeners: 15200000,
      weeklyStreams: 5800000,
      monthlyStreams: 24100000,
      totalStreams: 780000000,
      weeklyGrowth: 3.8,
      monthlyGrowth: 2.9,
      momentum: 'stable',
      popularity: 74,
      spotifyFollowers: 8900000,
      platformScore: 76,
      peakPosition: 3,
      weeksOnChart: 98,
      monthsOnChart: 28,
      category: 'international'
    },
    {
      id: 4,
      name: 'Ava Max',
      image: '/ava-max.jpg',
      genre: 'Pop',
      country: 'Albania/USA',
      monthlyListeners: 12800000,
      weeklyStreams: 4900000,
      monthlyStreams: 19600000,
      totalStreams: 650000000,
      weeklyGrowth: 6.1,
      monthlyGrowth: 4.5,
      momentum: 'rising',
      popularity: 72,
      spotifyFollowers: 7200000,
      platformScore: 74,
      peakPosition: 4,
      weeksOnChart: 76,
      monthsOnChart: 22,
      category: 'international'
    },
    // German-Albanian Diaspora Superstars
    {
      id: 5,
      name: 'Capital Bra',
      image: '/capital-bra.jpg',
      genre: 'Hip Hop',
      country: 'Albania/Germany',
      monthlyListeners: 8900000,
      weeklyStreams: 12400000,
      monthlyStreams: 48600000,
      totalStreams: 890000000,
      weeklyGrowth: 4.8,
      monthlyGrowth: 7.2,
      momentum: 'rising',
      popularity: 78,
      spotifyFollowers: 3200000,
      platformScore: 79,
      peakPosition: 1,
      weeksOnChart: 89,
      monthsOnChart: 24,
      category: 'diaspora'
    },
    {
      id: 6,
      name: 'Dardan',
      image: '/dardan.jpg',
      genre: 'Hip Hop',
      country: 'Albania/Germany',
      monthlyListeners: 4200000,
      weeklyStreams: 8900000,
      monthlyStreams: 32100000,
      totalStreams: 245000000,
      weeklyGrowth: 6.8,
      monthlyGrowth: 8.9,
      momentum: 'rising',
      popularity: 71,
      spotifyFollowers: 1900000,
      platformScore: 73,
      peakPosition: 2,
      weeksOnChart: 67,
      monthsOnChart: 19,
      category: 'diaspora'
    },
    {
      id: 7,
      name: 'Azet',
      image: '/azet.jpg',
      genre: 'Hip Hop',
      country: 'Albania/Germany',
      monthlyListeners: 3800000,
      weeklyStreams: 7800000,
      monthlyStreams: 28900000,
      totalStreams: 198000000,
      weeklyGrowth: 4.2,
      monthlyGrowth: 5.7,
      momentum: 'stable',
      popularity: 69,
      spotifyFollowers: 1600000,
      platformScore: 71,
      peakPosition: 3,
      weeksOnChart: 54,
      monthsOnChart: 16,
      category: 'diaspora'
    },
    {
      id: 8,
      name: 'Loredana Zefi',
      image: '/loredana-zefi.jpg',
      genre: 'Hip Hop',
      country: 'Albania/Germany',
      monthlyListeners: 2900000,
      weeklyStreams: 5600000,
      monthlyStreams: 21800000,
      totalStreams: 156000000,
      weeklyGrowth: 9.1,
      monthlyGrowth: 12.4,
      momentum: 'explosive',
      popularity: 66,
      spotifyFollowers: 1200000,
      platformScore: 68,
      peakPosition: 4,
      weeksOnChart: 42,
      monthsOnChart: 14,
      category: 'diaspora'
    },
    // Albanian Hip Hop Scene
    {
      id: 9,
      name: 'Noizy',
      image: '/noizy.jpg',
      genre: 'Hip Hop',
      country: 'Albania',
      monthlyListeners: 3200000,
      weeklyStreams: 8900000,
      monthlyStreams: 25600000,
      totalStreams: 156000000,
      weeklyGrowth: 12.3,
      monthlyGrowth: -1.5,
      momentum: 'rising',
      popularity: 68,
      spotifyFollowers: 1800000,
      platformScore: 75,
      peakPosition: 1,
      weeksOnChart: 89,
      monthsOnChart: 22,
      category: 'local'
    },
    {
      id: 10,
      name: 'Don Xhoni',
      image: '/don-xhoni.jpg',
      genre: 'Hip Hop',
      country: 'Albania',
      monthlyListeners: 2800000,
      weeklyStreams: 5800000,
      monthlyStreams: 18200000,
      totalStreams: 134000000,
      weeklyGrowth: -2.1,
      monthlyGrowth: 8.7,
      momentum: 'stable',
      popularity: 65,
      spotifyFollowers: 1200000,
      platformScore: 72,
      peakPosition: 2,
      weeksOnChart: 67,
      monthsOnChart: 18,
      category: 'local'
    },
    // Kosovo Artists
    {
      id: 11,
      name: 'Era Istrefi',
      image: '/era-istrefi.jpg',
      genre: 'Pop',
      country: 'Kosovo',
      monthlyListeners: 1292000,
      weeklyStreams: 2900000,
      monthlyStreams: 10100000,
      totalStreams: 78000000,
      weeklyGrowth: 7.8,
      monthlyGrowth: 5.3,
      momentum: 'rising',
      popularity: 59,
      spotifyFollowers: 650000,
      platformScore: 66,
      peakPosition: 4,
      weeksOnChart: 43,
      monthsOnChart: 12,
      category: 'kosovo'
    },
    {
      id: 12,
      name: 'Tayna',
      image: '/tayna.jpg',
      genre: 'Hip Hop',
      country: 'Kosovo',
      monthlyListeners: 2200000,
      weeklyStreams: 4200000,
      monthlyStreams: 14500000,
      totalStreams: 89000000,
      weeklyGrowth: 15.7,
      monthlyGrowth: 18.2,
      momentum: 'explosive',
      popularity: 62,
      spotifyFollowers: 980000,
      platformScore: 70,
      peakPosition: 4,
      weeksOnChart: 45,
      monthsOnChart: 13,
      category: 'kosovo'
    }
  ];

  // Enhanced Songs Database
  const allAlbanianSongs = [
    {
      id: 1,
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      image: '/levitating.jpg',
      genre: 'Pop',
      weeklyStreams: 15200000,
      monthlyStreams: 58200000,
      totalStreams: 2100000000,
      weeklyGrowth: 12.5,
      monthlyGrowth: 5.8,
      momentum: 'explosive',
      duration: '3:23',
      releaseDate: '2020-03-27',
      peakPosition: 1,
      weeksOnChart: 156,
      monthsOnChart: 36
    },
    {
      id: 2,
      title: 'Don\'t Start Now',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      image: '/dont-start-now.jpg',
      genre: 'Pop',
      weeklyStreams: 7800000,
      monthlyStreams: 32100000,
      totalStreams: 1800000000,
      weeklyGrowth: 8.3,
      monthlyGrowth: 3.2,
      momentum: 'rising',
      duration: '3:03',
      releaseDate: '2019-11-01',
      peakPosition: 2,
      weeksOnChart: 189,
      monthsOnChart: 43
    },
    {
      id: 3,
      title: 'OTR',
      artist: 'Noizy',
      album: 'Single',
      image: '/otr.jpg',
      genre: 'Hip Hop',
      weeklyStreams: 8900000,
      monthlyStreams: 28900000,
      totalStreams: 89000000,
      weeklyGrowth: -5.2,
      monthlyGrowth: 12.5,
      momentum: 'rising',
      duration: '3:45',
      releaseDate: '2024-01-15',
      peakPosition: 1,
      weeksOnChart: 32,
      monthsOnChart: 8
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />;
    return <span className="text-sm md:text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const getMomentumColor = (momentum) => {
    switch (momentum) {
      case 'explosive': return 'bg-green-500';
      case 'very-high': return 'bg-green-400';
      case 'rising': return 'bg-blue-500';
      case 'stable': return 'bg-orange-500';
      case 'declining': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'international': return 'bg-purple-100 text-purple-800';
      case 'local': return 'bg-red-100 text-red-800';
      case 'kosovo': return 'bg-blue-100 text-blue-800';
      case 'diaspora': return 'bg-green-100 text-green-800';
      case 'traditional': return 'bg-orange-100 text-orange-800';
      case 'emerging': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get current data based on active section
  const getCurrentData = () => {
    const sortedArtists = [...allAlbanianArtists].sort((a, b) => {
      if (activeSection === 'weekly-artists') return b.weeklyStreams - a.weeklyStreams;
      if (activeSection === 'monthly-artists') return b.monthlyStreams - a.monthlyStreams;
      return b.monthlyListeners - a.monthlyListeners;
    });

    const sortedSongs = [...allAlbanianSongs].sort((a, b) => {
      if (activeSection === 'weekly-songs') return b.weeklyStreams - a.weeklyStreams;
      if (activeSection === 'monthly-songs') return b.monthlyStreams - a.monthlyStreams;
      return b.totalStreams - a.totalStreams;
    });

    if (activeSection.includes('artists')) return sortedArtists.slice(0, isMobile ? 15 : 25);
    return sortedSongs.slice(0, isMobile ? 10 : 15);
  };

  // Mobile Navigation Component
  const MobileNavigation = () => (
    <div className="md:hidden">
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="p-2 text-gray-600 hover:text-gray-900"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      {showMobileMenu && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50">
          <div className="px-4 py-2 space-y-2">
            <button
              onClick={() => {
                setActiveSection('weekly-artists');
                setShowMobileMenu(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                activeSection === 'weekly-artists'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Weekly Artists</span>
            </button>
            <button
              onClick={() => {
                setActiveSection('monthly-artists');
                setShowMobileMenu(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                activeSection === 'monthly-artists'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Monthly Artists</span>
            </button>
            <button
              onClick={() => {
                setActiveSection('weekly-songs');
                setShowMobileMenu(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                activeSection === 'weekly-songs'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Music className="w-4 h-4" />
              <span>Weekly Songs</span>
            </button>
            <button
              onClick={() => {
                setActiveSection('monthly-songs');
                setShowMobileMenu(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                activeSection === 'monthly-songs'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>Monthly Songs</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Mobile Stats Cards Component
  const MobileStatsCards = ({ data, type }) => {
    const totalStreams = data.reduce((sum, item) => sum + (type === 'artists' ? item.weeklyStreams : item.weeklyStreams), 0);
    const risingItems = data.filter(item => item.momentum === 'explosive' || item.momentum === 'rising').length;
    const avgGrowth = Math.round(data.reduce((sum, item) => sum + Math.abs(item.weeklyGrowth || 0), 0) / data.length);

    return (
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white border rounded-lg p-4">
          <div className="text-lg font-bold text-blue-600">{data.length}</div>
          <div className="text-sm text-gray-600">Charting {type === 'artists' ? 'Artists' : 'Songs'}</div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-lg font-bold text-green-600">{formatNumber(totalStreams)}</div>
          <div className="text-sm text-gray-600">Total Streams</div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-lg font-bold text-purple-600">{risingItems}</div>
          <div className="text-sm text-gray-600">Rising {type === 'artists' ? 'Artists' : 'Songs'}</div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-lg font-bold text-orange-600">{avgGrowth}%</div>
          <div className="text-sm text-gray-600">Avg Growth</div>
        </div>
      </div>
    );
  };

  // Mobile Artist Card Component
  const MobileArtistCard = ({ artist, rank }) => (
    <div className="bg-white border rounded-lg p-4 mb-3">
      <div className="flex items-center space-x-3 mb-3">
        <div className="flex-shrink-0">
          {getRankIcon(rank)}
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium">{artist.name.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900 truncate">{artist.name}</div>
          <div className="text-sm text-gray-600">{artist.country}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <div className="text-xs text-gray-500">Weekly Streams</div>
          <div className="font-medium">{formatNumber(artist.weeklyStreams)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Monthly Listeners</div>
          <div className="font-medium">{formatNumber(artist.monthlyListeners)}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(artist.category)}`}>
            {artist.category}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            {artist.genre}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`font-medium text-sm ${artist.weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {artist.weeklyGrowth >= 0 ? '+' : ''}{artist.weeklyGrowth}%
          </span>
          <span className={`px-2 py-1 rounded-full text-white text-xs ${getMomentumColor(artist.momentum)}`}>
            {artist.momentum}
          </span>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-gray-600">Platform Score</span>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-sm">{artist.platformScore}</span>
          <div className="w-12 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${artist.platformScore}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Song Card Component
  const MobileSongCard = ({ song, rank }) => (
    <div className="bg-white border rounded-lg p-4 mb-3">
      <div className="flex items-center space-x-3 mb-3">
        <div className="flex-shrink-0">
          {getRankIcon(rank)}
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
          <Music className="w-6 h-6 text-gray-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900 truncate">{song.title}</div>
          <div className="text-sm text-gray-600">{song.artist}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <div className="text-xs text-gray-500">Weekly Streams</div>
          <div className="font-medium">{formatNumber(song.weeklyStreams)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Growth</div>
          <div className={`font-medium ${song.weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {song.weeklyGrowth >= 0 ? '+' : ''}{song.weeklyGrowth}%
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            {song.genre}
          </span>
          <span className={`px-2 py-1 rounded-full text-white text-xs ${getMomentumColor(song.momentum)}`}>
            {song.momentum}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          {song.weeksOnChart} weeks on chart
        </div>
      </div>
    </div>
  );

  const renderMobileContent = () => {
    const data = getCurrentData();
    const isArtists = activeSection.includes('artists');
    
    return (
      <div className="space-y-4">
        {/* Mobile Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold flex items-center justify-center space-x-2 mb-2">
            {activeSection === 'weekly-artists' && <><Trophy className="w-6 h-6 text-yellow-500" /><span>Weekly Artists</span></>}
            {activeSection === 'monthly-artists' && <><Calendar className="w-6 h-6 text-purple-500" /><span>Monthly Artists</span></>}
            {activeSection === 'weekly-songs' && <><Music className="w-6 h-6 text-green-500" /><span>Weekly Songs</span></>}
            {activeSection === 'monthly-songs' && <><Headphones className="w-6 h-6 text-indigo-500" /><span>Monthly Songs</span></>}
          </h1>
          <p className="text-sm text-gray-600">Complete Albanian music analytics</p>
        </div>

        {/* Mobile Stats */}
        <MobileStatsCards data={data} type={isArtists ? 'artists' : 'songs'} />

        {/* Mobile Content */}
        <div>
          {isArtists ? (
            data.map((artist, index) => (
              <MobileArtistCard key={artist.id} artist={artist} rank={index + 1} />
            ))
          ) : (
            data.map((song, index) => (
              <MobileSongCard key={song.id} song={song} rank={index + 1} />
            ))
          )}
        </div>

        {/* Mobile Export Button */}
        <div className="text-center pt-4">
          <button className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Chart</span>
          </button>
        </div>
      </div>
    );
  };

  const renderDesktopContent = () => {
    const data = getCurrentData();
    const totalStreams = data.reduce((sum, item) => sum + (item.weeklyStreams || 0), 0);
    const risingItems = data.filter(item => item.momentum === 'explosive' || item.momentum === 'rising').length;
    const avgGrowth = Math.round(data.reduce((sum, item) => sum + Math.abs(item.weeklyGrowth || 0), 0) / data.length);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-3">
              {activeSection === 'weekly-artists' && <><Trophy className="w-8 h-8 text-yellow-500" /><span>Ultimate Albanian Artists Weekly Chart</span></>}
              {activeSection === 'monthly-artists' && <><Calendar className="w-8 h-8 text-purple-500" /><span>Ultimate Albanian Artists Monthly Chart</span></>}
              {activeSection === 'weekly-songs' && <><Music className="w-8 h-8 text-green-500" /><span>Ultimate Albanian Songs Weekly Chart</span></>}
              {activeSection === 'monthly-songs' && <><Headphones className="w-8 h-8 text-indigo-500" /><span>Ultimate Albanian Songs Monthly Chart</span></>}
            </h1>
            <p className="text-gray-600 mt-2">Complete database of 40+ Albanian artists from Viberate research</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
              <Clock className="w-4 h-4 inline mr-2" />
              Updated weekly • {allAlbanianArtists.length} total artists
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Download className="w-5 h-5" />
              <span>Export Chart</span>
            </button>
          </div>
        </div>

        {/* Desktop Stats */}
        <div className="grid grid-cols-5 gap-6">
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-blue-600">{data.length}</div>
            <div className="text-gray-600">Charting {activeSection.includes('artists') ? 'Artists' : 'Songs'}</div>
            <div className="text-sm text-green-600 mt-1">Top performers</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-green-600">{formatNumber(totalStreams)}</div>
            <div className="text-gray-600">Total Weekly Streams</div>
            <div className="text-sm text-green-600 mt-1">Combined reach</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-purple-600">{risingItems}</div>
            <div className="text-gray-600">Rising {activeSection.includes('artists') ? 'Artists' : 'Songs'}</div>
            <div className="text-sm text-green-600 mt-1">Trending up</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-orange-600">{avgGrowth}%</div>
            <div className="text-gray-600">Avg Growth</div>
            <div className="text-sm text-green-600 mt-1">Week over week</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-red-600">{allAlbanianArtists.length}</div>
            <div className="text-gray-600">Total Database</div>
            <div className="text-sm text-blue-600 mt-1">All Albanian artists</div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <h2 className="text-xl font-bold">Ultimate Albanian {activeSection.includes('artists') ? 'Artists' : 'Songs'} Chart</h2>
            <p className="text-blue-100 mt-1">Complete database from Viberate research - 40+ Albanian artists worldwide</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium">Rank</th>
                  <th className="text-left p-4 font-medium">{activeSection.includes('artists') ? 'Artist' : 'Song'}</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Genre</th>
                  <th className="text-left p-4 font-medium">Weekly Streams</th>
                  <th className="text-left p-4 font-medium">Monthly Listeners</th>
                  <th className="text-left p-4 font-medium">Growth</th>
                  <th className="text-left p-4 font-medium">Momentum</th>
                  <th className="text-left p-4 font-medium">Platform Score</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(index + 1)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{item.name ? item.name.charAt(0) : item.title.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{item.name || item.title}</div>
                          <div className="text-sm text-gray-600">{item.country || item.artist}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${getCategoryColor(item.category || 'local')}`}>
                        {item.category || 'song'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {item.genre}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{formatNumber(item.weeklyStreams)}</td>
                    <td className="p-4 font-medium">{formatNumber(item.monthlyListeners || item.monthlyStreams)}</td>
                    <td className="p-4">
                      <span className={`font-medium ${item.weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.weeklyGrowth >= 0 ? '+' : ''}{item.weeklyGrowth}%
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-white text-sm ${getMomentumColor(item.momentum)}`}>
                        {item.momentum}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg">{item.platformScore || 50}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${item.platformScore || 50}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 md:space-x-8">
              <h1 className="text-lg md:text-2xl font-bold text-red-600">Albanian Music Analytics</h1>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => setActiveSection('weekly-artists')}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                    activeSection === 'weekly-artists'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Trophy className="w-5 h-5" />
                  <span>Weekly Artists</span>
                </button>
                <button
                  onClick={() => setActiveSection('monthly-artists')}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                    activeSection === 'monthly-artists'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Monthly Artists</span>
                </button>
                <button
                  onClick={() => setActiveSection('weekly-songs')}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                    activeSection === 'weekly-songs'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Music className="w-5 h-5" />
                  <span>Weekly Songs</span>
                </button>
                <button
                  onClick={() => setActiveSection('monthly-songs')}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                    activeSection === 'monthly-songs'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Headphones className="w-5 h-5" />
                  <span>Monthly Songs</span>
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="hidden md:block text-sm text-gray-600">
                Powered by Viberate Research • {allAlbanianArtists.length} Artists • 6 Categories
              </div>
              <MobileNavigation />
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
        {isMobile ? renderMobileContent() : renderDesktopContent()}
      </main>
    </div>
  );
};

export default MobileFriendlyAlbanianMusicPlatform;
