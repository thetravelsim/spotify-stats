import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Settings, Play, Heart, Share2, ExternalLink, TrendingUp, TrendingDown, Minus, Crown, Medal, Award, MapPin, Users, Music, Radio, Calendar, BarChart3, PieChart, LineChart, Globe, Headphones, Eye, ThumbsUp, MessageCircle, Repeat, Volume2, Mic, Star, Target, Zap, ArrowUp, ArrowDown, ChevronRight, ChevronLeft, MoreHorizontal, X, Check, AlertCircle, Info, Clock, Flame, Trophy } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, AreaChart, Area, RadialBarChart, RadialBar, Legend } from 'recharts';

const AlbanianMusicChartsComplete = () => {
  const [activeSection, setActiveSection] = useState('weekly-artists');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  // Weekly Most Listened Artists
  const weeklyArtists = [
    {
      id: 1,
      name: 'Dua Lipa',
      image: '/dua-lipa.jpg',
      rank: 1,
      lastWeekRank: 2,
      genre: 'Pop',
      country: 'Albania/UK',
      weeklyStreams: 45200000,
      totalStreams: 2100000000,
      weeklyGrowth: 8.5,
      momentum: 'explosive',
      popularity: 98,
      peakPosition: 1,
      weeksOnChart: 156
    },
    {
      id: 2,
      name: 'Noizy',
      image: '/noizy.jpg',
      rank: 2,
      lastWeekRank: 1,
      genre: 'Hip Hop',
      country: 'Albania',
      weeklyStreams: 8900000,
      totalStreams: 156000000,
      weeklyGrowth: 12.3,
      momentum: 'rising',
      popularity: 68,
      peakPosition: 1,
      weeksOnChart: 89
    },
    {
      id: 3,
      name: 'Rita Ora',
      image: '/rita-ora.jpg',
      rank: 3,
      lastWeekRank: 4,
      genre: 'Pop',
      country: 'Albania/UK',
      weeklyStreams: 6700000,
      totalStreams: 890000000,
      weeklyGrowth: 5.2,
      momentum: 'rising',
      popularity: 76,
      peakPosition: 2,
      weeksOnChart: 134
    },
    {
      id: 4,
      name: 'Don Xhoni',
      image: '/don-xhoni.jpg',
      rank: 4,
      lastWeekRank: 3,
      genre: 'Hip Hop',
      country: 'Albania',
      weeklyStreams: 5800000,
      totalStreams: 134000000,
      weeklyGrowth: -2.1,
      momentum: 'stable',
      popularity: 65,
      peakPosition: 2,
      weeksOnChart: 67
    },
    {
      id: 5,
      name: 'Tayna',
      image: '/tayna.jpg',
      rank: 5,
      lastWeekRank: 6,
      genre: 'Hip Hop',
      country: 'Albania',
      weeklyStreams: 4200000,
      totalStreams: 89000000,
      weeklyGrowth: 15.7,
      momentum: 'explosive',
      popularity: 62,
      peakPosition: 4,
      weeksOnChart: 45
    }
  ];

  // Monthly Most Listened Artists
  const monthlyArtists = [
    {
      id: 1,
      name: 'Dua Lipa',
      image: '/dua-lipa.jpg',
      rank: 1,
      lastMonthRank: 1,
      genre: 'Pop',
      country: 'Albania/UK',
      monthlyStreams: 180500000,
      totalStreams: 2100000000,
      monthlyGrowth: 6.8,
      momentum: 'very-high',
      popularity: 98,
      peakPosition: 1,
      monthsOnChart: 36
    },
    {
      id: 2,
      name: 'Rita Ora',
      image: '/rita-ora.jpg',
      rank: 2,
      lastMonthRank: 3,
      genre: 'Pop',
      country: 'Albania/UK',
      monthlyStreams: 28900000,
      totalStreams: 890000000,
      monthlyGrowth: 4.2,
      momentum: 'rising',
      popularity: 76,
      peakPosition: 2,
      monthsOnChart: 31
    },
    {
      id: 3,
      name: 'Noizy',
      image: '/noizy.jpg',
      rank: 3,
      lastMonthRank: 2,
      genre: 'Hip Hop',
      country: 'Albania',
      monthlyStreams: 25600000,
      totalStreams: 156000000,
      monthlyGrowth: -1.5,
      momentum: 'stable',
      popularity: 68,
      peakPosition: 1,
      monthsOnChart: 22
    }
  ];

  // Weekly Most Listened Songs
  const weeklySongs = [
    {
      id: 1,
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      image: '/levitating.jpg',
      rank: 1,
      lastWeekRank: 2,
      genre: 'Pop',
      weeklyStreams: 15200000,
      totalStreams: 2100000000,
      weeklyGrowth: 12.5,
      momentum: 'explosive',
      duration: '3:23',
      releaseDate: '2020-03-27',
      peakPosition: 1,
      weeksOnChart: 156
    },
    {
      id: 2,
      title: 'OTR',
      artist: 'Noizy',
      album: 'Single',
      image: '/otr.jpg',
      rank: 2,
      lastWeekRank: 1,
      genre: 'Hip Hop',
      weeklyStreams: 8900000,
      totalStreams: 89000000,
      weeklyGrowth: -5.2,
      momentum: 'declining',
      duration: '3:45',
      releaseDate: '2024-01-15',
      peakPosition: 1,
      weeksOnChart: 32
    },
    {
      id: 3,
      title: 'Don\'t Start Now',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      image: '/dont-start-now.jpg',
      rank: 3,
      lastWeekRank: 4,
      genre: 'Pop',
      weeklyStreams: 7800000,
      totalStreams: 1800000000,
      weeklyGrowth: 8.3,
      momentum: 'rising',
      duration: '3:03',
      releaseDate: '2019-11-01',
      peakPosition: 2,
      weeksOnChart: 189
    },
    {
      id: 4,
      title: 'Lonely',
      artist: 'Butrint Imeri ft. Era Istrefi',
      album: 'Single',
      image: '/lonely.jpg',
      rank: 4,
      lastWeekRank: 3,
      genre: 'Pop',
      weeklyStreams: 6200000,
      totalStreams: 78000000,
      weeklyGrowth: -3.1,
      momentum: 'stable',
      duration: '3:28',
      releaseDate: '2024-02-14',
      peakPosition: 3,
      weeksOnChart: 28
    },
    {
      id: 5,
      title: 'Vaj',
      artist: 'Kida',
      album: 'Single',
      image: '/vaj.jpg',
      rank: 5,
      lastWeekRank: 7,
      genre: 'Hip Hop',
      weeklyStreams: 5100000,
      totalStreams: 45000000,
      weeklyGrowth: 18.9,
      momentum: 'explosive',
      duration: '2:58',
      releaseDate: '2024-03-10',
      peakPosition: 5,
      weeksOnChart: 24
    }
  ];

  // Monthly Most Listened Songs
  const monthlySongs = [
    {
      id: 1,
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      image: '/levitating.jpg',
      rank: 1,
      lastMonthRank: 1,
      genre: 'Pop',
      monthlyStreams: 58200000,
      totalStreams: 2100000000,
      monthlyGrowth: 5.8,
      momentum: 'very-high',
      duration: '3:23',
      releaseDate: '2020-03-27',
      peakPosition: 1,
      monthsOnChart: 36
    },
    {
      id: 2,
      title: 'Don\'t Start Now',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      image: '/dont-start-now.jpg',
      rank: 2,
      lastMonthRank: 2,
      genre: 'Pop',
      monthlyStreams: 32100000,
      totalStreams: 1800000000,
      monthlyGrowth: 3.2,
      momentum: 'stable',
      duration: '3:03',
      releaseDate: '2019-11-01',
      peakPosition: 1,
      monthsOnChart: 43
    },
    {
      id: 3,
      title: 'OTR',
      artist: 'Noizy',
      album: 'Single',
      image: '/otr.jpg',
      rank: 3,
      lastMonthRank: 4,
      genre: 'Hip Hop',
      monthlyStreams: 28900000,
      totalStreams: 89000000,
      monthlyGrowth: 12.5,
      momentum: 'rising',
      duration: '3:45',
      releaseDate: '2024-01-15',
      peakPosition: 1,
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
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const getRankChange = (currentRank, lastRank) => {
    if (lastRank === null) return <span className="text-blue-600 text-sm">NEW</span>;
    const change = lastRank - currentRank;
    if (change > 0) return <div className="flex items-center text-green-600"><ArrowUp className="w-4 h-4" /><span className="text-sm">+{change}</span></div>;
    if (change < 0) return <div className="flex items-center text-red-600"><ArrowDown className="w-4 h-4" /><span className="text-sm">{change}</span></div>;
    return <div className="flex items-center text-gray-600"><Minus className="w-4 h-4" /><span className="text-sm">-</span></div>;
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

  const renderWeeklyArtists = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span>Weekly Most Listened Albanian Artists</span>
          </h1>
          <p className="text-gray-600 mt-2">Top Albanian artists by weekly streaming numbers on Spotify</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
            <Clock className="w-4 h-4 inline mr-2" />
            Updated weekly
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Download className="w-5 h-5" />
            <span>Export Chart</span>
          </button>
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-blue-600">{weeklyArtists.length}</div>
          <div className="text-gray-600">Charting Artists</div>
          <div className="text-sm text-green-600 mt-1">This week</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-green-600">
            {formatNumber(weeklyArtists.reduce((sum, artist) => sum + artist.weeklyStreams, 0))}
          </div>
          <div className="text-gray-600">Total Weekly Streams</div>
          <div className="text-sm text-green-600 mt-1">Combined</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-purple-600">
            {weeklyArtists.filter(artist => artist.momentum === 'explosive' || artist.momentum === 'rising').length}
          </div>
          <div className="text-gray-600">Rising Artists</div>
          <div className="text-sm text-green-600 mt-1">Trending up</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-orange-600">
            {Math.round(weeklyArtists.reduce((sum, artist) => sum + Math.abs(artist.weeklyGrowth), 0) / weeklyArtists.length)}%
          </div>
          <div className="text-gray-600">Avg Growth</div>
          <div className="text-sm text-green-600 mt-1">Week over week</div>
        </div>
      </div>

      {/* Weekly Artists Chart */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <h2 className="text-xl font-bold">Albanian Weekly Artists Chart</h2>
          <p className="text-blue-100 mt-1">Most streamed Albanian artists this week</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium">Rank</th>
                <th className="text-left p-4 font-medium">Change</th>
                <th className="text-left p-4 font-medium">Artist</th>
                <th className="text-left p-4 font-medium">Genre</th>
                <th className="text-left p-4 font-medium">Weekly Streams</th>
                <th className="text-left p-4 font-medium">Growth</th>
                <th className="text-left p-4 font-medium">Momentum</th>
                <th className="text-left p-4 font-medium">Weeks on Chart</th>
                <th className="text-left p-4 font-medium">Peak</th>
              </tr>
            </thead>
            <tbody>
              {weeklyArtists.map((artist) => (
                <tr key={artist.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(artist.rank)}
                    </div>
                  </td>
                  <td className="p-4">
                    {getRankChange(artist.rank, artist.lastWeekRank)}
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
                  <td className="p-4 font-medium">{formatNumber(artist.weeklyStreams)}</td>
                  <td className="p-4">
                    <span className={`font-medium ${artist.weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {artist.weeklyGrowth >= 0 ? '+' : ''}{artist.weeklyGrowth}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${getMomentumColor(artist.momentum)}`}>
                      {artist.momentum}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{artist.weeksOnChart}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">#{artist.peakPosition}</span>
                      {artist.peakPosition === 1 && <Crown className="w-4 h-4 text-yellow-500" />}
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

  const renderMonthlyArtists = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-purple-500" />
            <span>Monthly Most Listened Albanian Artists</span>
          </h1>
          <p className="text-gray-600 mt-2">Top Albanian artists by monthly streaming numbers on Spotify</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600 bg-purple-50 px-3 py-2 rounded-lg">
            <Calendar className="w-4 h-4 inline mr-2" />
            Updated monthly
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            <Download className="w-5 h-5" />
            <span>Export Chart</span>
          </button>
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-purple-600">{monthlyArtists.length}</div>
          <div className="text-gray-600">Charting Artists</div>
          <div className="text-sm text-green-600 mt-1">This month</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-green-600">
            {formatNumber(monthlyArtists.reduce((sum, artist) => sum + artist.monthlyStreams, 0))}
          </div>
          <div className="text-gray-600">Total Monthly Streams</div>
          <div className="text-sm text-green-600 mt-1">Combined</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-blue-600">
            {monthlyArtists.filter(artist => artist.momentum === 'very-high' || artist.momentum === 'rising').length}
          </div>
          <div className="text-gray-600">Rising Artists</div>
          <div className="text-sm text-green-600 mt-1">Trending up</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-orange-600">
            {Math.round(monthlyArtists.reduce((sum, artist) => sum + Math.abs(artist.monthlyGrowth), 0) / monthlyArtists.length)}%
          </div>
          <div className="text-gray-600">Avg Growth</div>
          <div className="text-sm text-green-600 mt-1">Month over month</div>
        </div>
      </div>

      {/* Monthly Artists Chart */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6">
          <h2 className="text-xl font-bold">Albanian Monthly Artists Chart</h2>
          <p className="text-purple-100 mt-1">Most streamed Albanian artists this month</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium">Rank</th>
                <th className="text-left p-4 font-medium">Change</th>
                <th className="text-left p-4 font-medium">Artist</th>
                <th className="text-left p-4 font-medium">Genre</th>
                <th className="text-left p-4 font-medium">Monthly Streams</th>
                <th className="text-left p-4 font-medium">Growth</th>
                <th className="text-left p-4 font-medium">Momentum</th>
                <th className="text-left p-4 font-medium">Months on Chart</th>
                <th className="text-left p-4 font-medium">Peak</th>
              </tr>
            </thead>
            <tbody>
              {monthlyArtists.map((artist) => (
                <tr key={artist.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(artist.rank)}
                    </div>
                  </td>
                  <td className="p-4">
                    {getRankChange(artist.rank, artist.lastMonthRank)}
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
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {artist.genre}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{formatNumber(artist.monthlyStreams)}</td>
                  <td className="p-4">
                    <span className={`font-medium ${artist.monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {artist.monthlyGrowth >= 0 ? '+' : ''}{artist.monthlyGrowth}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${getMomentumColor(artist.momentum)}`}>
                      {artist.momentum}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{artist.monthsOnChart}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">#{artist.peakPosition}</span>
                      {artist.peakPosition === 1 && <Crown className="w-4 h-4 text-yellow-500" />}
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

  const renderWeeklySongs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <Music className="w-8 h-8 text-green-500" />
            <span>Weekly Most Listened Albanian Songs</span>
          </h1>
          <p className="text-gray-600 mt-2">Top Albanian songs by weekly streaming numbers on Spotify</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
            <Clock className="w-4 h-4 inline mr-2" />
            Updated weekly
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <Download className="w-5 h-5" />
            <span>Export Chart</span>
          </button>
        </div>
      </div>

      {/* Weekly Songs Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-green-600">{weeklySongs.length}</div>
          <div className="text-gray-600">Charting Songs</div>
          <div className="text-sm text-green-600 mt-1">This week</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-blue-600">
            {formatNumber(weeklySongs.reduce((sum, song) => sum + song.weeklyStreams, 0))}
          </div>
          <div className="text-gray-600">Total Weekly Streams</div>
          <div className="text-sm text-green-600 mt-1">Combined</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-purple-600">
            {weeklySongs.filter(song => song.momentum === 'explosive' || song.momentum === 'rising').length}
          </div>
          <div className="text-gray-600">Rising Songs</div>
          <div className="text-sm text-green-600 mt-1">Trending up</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-orange-600">
            {Math.round(weeklySongs.reduce((sum, song) => sum + Math.abs(song.weeklyGrowth), 0) / weeklySongs.length)}%
          </div>
          <div className="text-gray-600">Avg Growth</div>
          <div className="text-sm text-green-600 mt-1">Week over week</div>
        </div>
      </div>

      {/* Weekly Songs Chart */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6">
          <h2 className="text-xl font-bold">Albanian Weekly Songs Chart</h2>
          <p className="text-green-100 mt-1">Most streamed Albanian songs this week</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium">Rank</th>
                <th className="text-left p-4 font-medium">Change</th>
                <th className="text-left p-4 font-medium">Song</th>
                <th className="text-left p-4 font-medium">Artist</th>
                <th className="text-left p-4 font-medium">Weekly Streams</th>
                <th className="text-left p-4 font-medium">Growth</th>
                <th className="text-left p-4 font-medium">Momentum</th>
                <th className="text-left p-4 font-medium">Weeks on Chart</th>
                <th className="text-left p-4 font-medium">Peak</th>
              </tr>
            </thead>
            <tbody>
              {weeklySongs.map((song) => (
                <tr key={song.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(song.rank)}
                    </div>
                  </td>
                  <td className="p-4">
                    {getRankChange(song.rank, song.lastWeekRank)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <Music className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium">{song.title}</div>
                        <div className="text-sm text-gray-600">{song.album} • {song.duration}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">{song.artist}</div>
                    <div className="text-sm text-gray-600">{song.genre}</div>
                  </td>
                  <td className="p-4 font-medium">{formatNumber(song.weeklyStreams)}</td>
                  <td className="p-4">
                    <span className={`font-medium ${song.weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {song.weeklyGrowth >= 0 ? '+' : ''}{song.weeklyGrowth}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${getMomentumColor(song.momentum)}`}>
                      {song.momentum}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{song.weeksOnChart}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">#{song.peakPosition}</span>
                      {song.peakPosition === 1 && <Crown className="w-4 h-4 text-yellow-500" />}
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

  const renderMonthlySongs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <Headphones className="w-8 h-8 text-indigo-500" />
            <span>Monthly Most Listened Albanian Songs</span>
          </h1>
          <p className="text-gray-600 mt-2">Top Albanian songs by monthly streaming numbers on Spotify</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600 bg-indigo-50 px-3 py-2 rounded-lg">
            <Calendar className="w-4 h-4 inline mr-2" />
            Updated monthly
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
            <Download className="w-5 h-5" />
            <span>Export Chart</span>
          </button>
        </div>
      </div>

      {/* Monthly Songs Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-indigo-600">{monthlySongs.length}</div>
          <div className="text-gray-600">Charting Songs</div>
          <div className="text-sm text-green-600 mt-1">This month</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-blue-600">
            {formatNumber(monthlySongs.reduce((sum, song) => sum + song.monthlyStreams, 0))}
          </div>
          <div className="text-gray-600">Total Monthly Streams</div>
          <div className="text-sm text-green-600 mt-1">Combined</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-purple-600">
            {monthlySongs.filter(song => song.momentum === 'very-high' || song.momentum === 'rising').length}
          </div>
          <div className="text-gray-600">Rising Songs</div>
          <div className="text-sm text-green-600 mt-1">Trending up</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-2xl font-bold text-orange-600">
            {Math.round(monthlySongs.reduce((sum, song) => sum + Math.abs(song.monthlyGrowth), 0) / monthlySongs.length)}%
          </div>
          <div className="text-gray-600">Avg Growth</div>
          <div className="text-sm text-green-600 mt-1">Month over month</div>
        </div>
      </div>

      {/* Monthly Songs Chart */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
          <h2 className="text-xl font-bold">Albanian Monthly Songs Chart</h2>
          <p className="text-indigo-100 mt-1">Most streamed Albanian songs this month</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium">Rank</th>
                <th className="text-left p-4 font-medium">Change</th>
                <th className="text-left p-4 font-medium">Song</th>
                <th className="text-left p-4 font-medium">Artist</th>
                <th className="text-left p-4 font-medium">Monthly Streams</th>
                <th className="text-left p-4 font-medium">Growth</th>
                <th className="text-left p-4 font-medium">Momentum</th>
                <th className="text-left p-4 font-medium">Months on Chart</th>
                <th className="text-left p-4 font-medium">Peak</th>
              </tr>
            </thead>
            <tbody>
              {monthlySongs.map((song) => (
                <tr key={song.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(song.rank)}
                    </div>
                  </td>
                  <td className="p-4">
                    {getRankChange(song.rank, song.lastMonthRank)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <Music className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium">{song.title}</div>
                        <div className="text-sm text-gray-600">{song.album} • {song.duration}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">{song.artist}</div>
                    <div className="text-sm text-gray-600">{song.genre}</div>
                  </td>
                  <td className="p-4 font-medium">{formatNumber(song.monthlyStreams)}</td>
                  <td className="p-4">
                    <span className={`font-medium ${song.monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {song.monthlyGrowth >= 0 ? '+' : ''}{song.monthlyGrowth}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${getMomentumColor(song.momentum)}`}>
                      {song.momentum}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{song.monthsOnChart}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">#{song.peakPosition}</span>
                      {song.peakPosition === 1 && <Crown className="w-4 h-4 text-yellow-500" />}
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

  const renderContent = () => {
    switch (activeSection) {
      case 'weekly-artists': return renderWeeklyArtists();
      case 'monthly-artists': return renderMonthlyArtists();
      case 'weekly-songs': return renderWeeklySongs();
      case 'monthly-songs': return renderMonthlySongs();
      default: return renderWeeklyArtists();
    }
  };

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
        {renderContent()}
      </main>
    </div>
  );
};

export default AlbanianMusicChartsComplete;
