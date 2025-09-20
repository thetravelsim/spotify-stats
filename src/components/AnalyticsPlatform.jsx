import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ArtistProfile from './ArtistProfile';

const AnalyticsPlatform = () => {
  const [activeTab, setActiveTab] = useState('artists');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('30d');
  const [selectedRegion, setSelectedRegion] = useState('Worldwide');
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [chartView, setChartView] = useState('streams');

  // Time period options
  const timePeriods = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '1y', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];

  // Generate streaming data for different time periods
  const generateStreamingData = (period, trackName = 'Pronto') => {
    const baseStreams = trackName === 'Pronto' ? 28500000 : 45800000;
    const data = [];
    
    switch (period) {
      case '24h':
        for (let i = 0; i < 24; i++) {
          data.push({
            time: `${i}:00`,
            streams: Math.floor(baseStreams / 24 + Math.random() * 50000),
            listeners: Math.floor(baseStreams / 30 + Math.random() * 20000),
            saves: Math.floor(Math.random() * 5000),
            shares: Math.floor(Math.random() * 2000)
          });
        }
        break;
      case '7d':
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        days.forEach((day, i) => {
          data.push({
            time: day,
            streams: Math.floor(baseStreams / 7 + Math.random() * 200000),
            listeners: Math.floor(baseStreams / 10 + Math.random() * 100000),
            saves: Math.floor(Math.random() * 15000),
            shares: Math.floor(Math.random() * 8000)
          });
        });
        break;
      case '30d':
        for (let i = 1; i <= 30; i++) {
          data.push({
            time: `Day ${i}`,
            streams: Math.floor(baseStreams / 30 + Math.random() * 100000),
            listeners: Math.floor(baseStreams / 40 + Math.random() * 50000),
            saves: Math.floor(Math.random() * 10000),
            shares: Math.floor(Math.random() * 5000)
          });
        }
        break;
      case '90d':
        for (let i = 1; i <= 12; i++) {
          data.push({
            time: `Week ${i}`,
            streams: Math.floor(baseStreams * 7 / 90 + Math.random() * 500000),
            listeners: Math.floor(baseStreams * 7 / 120 + Math.random() * 200000),
            saves: Math.floor(Math.random() * 30000),
            shares: Math.floor(Math.random() * 15000)
          });
        }
        break;
      case '6m':
        const months6 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        months6.forEach((month, i) => {
          data.push({
            time: month,
            streams: Math.floor(baseStreams * 30 / 180 + Math.random() * 2000000),
            listeners: Math.floor(baseStreams * 30 / 240 + Math.random() * 800000),
            saves: Math.floor(Math.random() * 100000),
            shares: Math.floor(Math.random() * 50000)
          });
        });
        break;
      case '1y':
        const months12 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        months12.forEach((month, i) => {
          data.push({
            time: month,
            streams: Math.floor(baseStreams * 30 / 365 + Math.random() * 3000000),
            listeners: Math.floor(baseStreams * 30 / 480 + Math.random() * 1000000),
            saves: Math.floor(Math.random() * 150000),
            shares: Math.floor(Math.random() * 75000)
          });
        });
        break;
      default:
        for (let i = 2020; i <= 2024; i++) {
          data.push({
            time: i.toString(),
            streams: Math.floor(baseStreams * 365 / 1825 + Math.random() * 10000000),
            listeners: Math.floor(baseStreams * 365 / 2400 + Math.random() * 5000000),
            saves: Math.floor(Math.random() * 500000),
            shares: Math.floor(Math.random() * 250000)
          });
        }
    }
    
    return data;
  };

  // Artist data with enhanced metrics
  const artistsData = [
    {
      rank: 1, rankChange: 1, artist: 'Taylor Swift', country: '🇺🇸', countryCode: 'USA', genre: 'Pop, Mainstream Pop', 
      fireRank: 1, fireRankChange: 1, followers: '78.2M', followersChange: '+11.85%', 
      streams: '1.6B', streamsChange: '+10.65%', weeklyStreams: '143M', weeklyStreamsChange: '+11.85%',
      monthlyListeners: '88M', monthlyListenersChange: '+3M', playlistReach: '529.3M', playlistReachChange: '+130.50%',
      momentum: 'very high', label: 'Republic Records', verified: true, city: 'Nashville'
    },
    {
      rank: 2, rankChange: 1, artist: 'Ed Sheeran', country: '🇬🇧', countryCode: 'GBR', genre: 'Pop, Mainstream Pop',
      fireRank: 2, fireRankChange: 1, followers: '68.2M', followersChange: '+8.14%',
      streams: '565.6M', streamsChange: '+8.7%', weeklyStreams: '122.1M', weeklyStreamsChange: '+8.14%',
      monthlyListeners: '59.2M', monthlyListenersChange: '-5.2M', playlistReach: '672.9M', playlistReachChange: '+66.89%',
      momentum: 'high', label: 'Atlantic Records', verified: true, city: 'London'
    },
    {
      rank: 3, rankChange: 0, artist: 'Billie Eilish', country: '🇺🇸', countryCode: 'USA', genre: 'Pop, Mainstream Pop, Indie Pop',
      fireRank: 3, fireRankChange: 0, followers: '72.3M', followersChange: '+1.18%',
      streams: '685.9M', streamsChange: '+9.76%', weeklyStreams: '117M', weeklyStreamsChange: '+1.18%',
      monthlyListeners: '67.0M', monthlyListenersChange: '-2.9M', playlistReach: '548.3M', playlistReachChange: '-1.5M',
      momentum: 'medium', label: 'Interscope Records', verified: true, city: 'Los Angeles'
    },
    {
      rank: 4, rankChange: 1, artist: 'The Weeknd', country: '🇨🇦', countryCode: 'CAN', genre: 'Pop, Mainstream Pop, Contemporary R&B',
      fireRank: 1, fireRankChange: 1, followers: '81.8M', followersChange: '+3.79%',
      streams: '1.4B', streamsChange: '+8.05%', weeklyStreams: '110.9M', weeklyStreamsChange: '+3.79%',
      monthlyListeners: '111.4M', monthlyListenersChange: '-49K', playlistReach: '615.4M', playlistReachChange: '-2.4M',
      momentum: 'high', label: 'XO/Republic Records', verified: true, city: 'Toronto'
    },
    {
      rank: 5, rankChange: 1, artist: 'Justin Bieber', country: '🇨🇦', countryCode: 'CAN', genre: 'Pop, Mainstream Pop',
      fireRank: 10, fireRankChange: 1, followers: '58.8M', followersChange: '+4%',
      streams: '938.1M', streamsChange: '+15.88%', weeklyStreams: '84.9M', weeklyStreamsChange: '+4%',
      monthlyListeners: '100.4M', monthlyListenersChange: '-563.6K', playlistReach: '552.3M', playlistReachChange: '+5.3M',
      momentum: 'medium', label: 'Def Jam Recordings', verified: true, city: 'Toronto'
    },
    {
      rank: 6, rankChange: 5, artist: 'Ariana Grande', country: '🇺🇸', countryCode: 'USA', genre: 'Pop, Mainstream Pop, Contemporary R&B',
      fireRank: 12, fireRankChange: 5, followers: '53.7M', followersChange: '+21.78%',
      streams: '730M', streamsChange: '+12.58%', weeklyStreams: '108.7M', weeklyStreamsChange: '+21.78%',
      monthlyListeners: '78.4M', monthlyListenersChange: '+1.9M', playlistReach: '432.4M', playlistReachChange: '+1.6M',
      momentum: 'high', label: 'Republic Records', verified: true, city: 'Los Angeles'
    },
    {
      rank: 7, rankChange: 2, artist: 'Dua Lipa', country: '🇬🇧', countryCode: 'GBR', genre: 'Pop, Dance Pop',
      fireRank: 22, fireRankChange: 2, followers: '46.6M', followersChange: '+6.15%',
      streams: '518.3M', streamsChange: '+14.35%', weeklyStreams: '59.4M', weeklyStreamsChange: '+6.15%',
      monthlyListeners: '50.2M', monthlyListenersChange: '-2.7M', playlistReach: '428M', playlistReachChange: '-5.4M',
      momentum: 'very high', label: 'Warner Records', verified: true, city: 'London'
    },
    {
      rank: 8, rankChange: 1, artist: 'Lady Gaga', country: '🇺🇸', countryCode: 'USA', genre: 'Pop, Mainstream Pop, Indie Pop',
      fireRank: 14, fireRankChange: 1, followers: '53.2M', followersChange: '+2.7%',
      streams: '690.1M', streamsChange: '+3.8%', weeklyStreams: '41.2M', weeklyStreamsChange: '+2.7%',
      monthlyListeners: '99.6M', monthlyListenersChange: '+1.4M', playlistReach: '483.3M', playlistReachChange: '+23.2M',
      momentum: 'medium', label: 'Interscope Records', verified: true, city: 'New York'
    },
    {
      rank: 9, rankChange: 15, artist: 'Noizy', country: '🇦🇱', countryCode: 'ALB', genre: 'Albanian Hip Hop, Rap',
      fireRank: 45, fireRankChange: 15, followers: '812.3K', followersChange: '+25.8%',
      streams: '28.5M', streamsChange: '+32.8%', weeklyStreams: '2.8M', weeklyStreamsChange: '+25.8%',
      monthlyListeners: '3.2M', monthlyListenersChange: '+850K', playlistReach: '15.2M', playlistReachChange: '+4.8M',
      momentum: 'explosive', label: 'Threedots Records', verified: true, city: 'Tirana'
    },
    {
      rank: 10, rankChange: 8, artist: 'Era Istrefi', country: '🇦🇱', countryCode: 'ALB', genre: 'Albanian Pop, Dance Pop',
      fireRank: 38, fireRankChange: 8, followers: '512.3K', followersChange: '+18.5%',
      streams: '24.2M', streamsChange: '+22.1%', weeklyStreams: '2.1M', weeklyStreamsChange: '+18.5%',
      monthlyListeners: '2.8M', monthlyListenersChange: '+620K', playlistReach: '12.8M', playlistReachChange: '+3.2M',
      momentum: 'rising', label: 'Ultra Records', verified: true, city: 'Pristina'
    }
  ];

  // Top tracks data
  const topTracksWeek = [
    { rank: 1, rankChange: 2, track: 'Flowers', artist: 'Miley Cyrus', genre: 'Pop', duration: '3:20', streams: '45.8M', growth: '+15.2%', momentum: 'rising', label: 'Columbia Records' },
    { rank: 2, rankChange: -1, track: 'Anti-Hero', artist: 'Taylor Swift', genre: 'Pop', duration: '3:20', streams: '42.3M', growth: '-2.8%', momentum: 'stable', label: 'Republic Records' },
    { rank: 3, rankChange: -1, track: 'As It Was', artist: 'Harry Styles', genre: 'Pop Rock', duration: '2:47', streams: '38.9M', growth: '-5.1%', momentum: 'declining', label: 'Columbia Records' },
    { rank: 4, rankChange: 2, track: 'Pronto', artist: 'Noizy', genre: 'Albanian Hip Hop', duration: '3:45', streams: '28.5M', growth: '+25.8%', momentum: 'explosive', label: 'Threedots Records' },
    { rank: 5, rankChange: -1, track: 'Unholy', artist: 'Sam Smith ft. Kim Petras', genre: 'Pop', duration: '2:36', streams: '26.8M', growth: '-8.2%', momentum: 'declining', label: 'Capitol Records' },
    { rank: 6, rankChange: 2, track: 'Bonbon', artist: 'Era Istrefi', genre: 'Albanian Pop', duration: '3:12', streams: '24.2M', growth: '+18.5%', momentum: 'rising', label: 'Ultra Records' },
    { rank: 7, rankChange: -2, track: 'Calm Down', artist: 'Rema & Selena Gomez', genre: 'Afrobeats', duration: '3:59', streams: '22.8M', growth: '-12.5%', momentum: 'declining', label: 'Mavin Records' },
    { rank: 8, rankChange: 4, track: 'Gjynah', artist: 'Elvana Gjata', genre: 'Albanian Pop', duration: '3:28', streams: '21.5M', growth: '+32.8%', momentum: 'explosive', label: 'Albanian Music Group' },
    { rank: 9, rankChange: -2, track: 'Shivers', artist: 'Ed Sheeran', genre: 'Pop', duration: '3:27', streams: '20.1M', growth: '-15.2%', momentum: 'declining', label: 'Atlantic Records' },
    { rank: 10, rankChange: 1, track: 'Bad Habit', artist: 'Steve Lacy', genre: 'Alternative R&B', duration: '3:51', streams: '19.8M', growth: '+5.3%', momentum: 'stable', label: 'RCA Records' }
  ];

  // Chart data for detailed analytics
  const streamingData = useMemo(() => generateStreamingData(selectedTimePeriod, selectedTrack), [selectedTimePeriod, selectedTrack]);

  // Platform distribution data
  const platformData = [
    { name: 'Spotify', value: 45, color: '#1DB954' },
    { name: 'Apple Music', value: 25, color: '#FA243C' },
    { name: 'YouTube Music', value: 15, color: '#FF0000' },
    { name: 'Amazon Music', value: 8, color: '#FF9900' },
    { name: 'Others', value: 7, color: '#8884d8' }
  ];

  // Geographic data
  const geoData = [
    { country: 'Albania', streams: 8500000, percentage: 35 },
    { country: 'Kosovo', streams: 4200000, percentage: 18 },
    { country: 'North Macedonia', streams: 2800000, percentage: 12 },
    { country: 'Montenegro', streams: 1900000, percentage: 8 },
    { country: 'Germany', streams: 2100000, percentage: 9 },
    { country: 'Switzerland', streams: 1500000, percentage: 6 },
    { country: 'Others', streams: 2900000, percentage: 12 }
  ];

  const renderMiniChart = (data, color = '#10b981') => (
    <div className="w-16 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.slice(-7)}>
          <Line type="monotone" dataKey="streams" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderArtistAnalytics = () => (
    <div className="space-y-6">
      {/* Time Period and Chart Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Streaming Analytics</h3>
          <div className="flex flex-wrap items-center gap-3">
            <select 
              value={selectedTimePeriod} 
              onChange={(e) => setSelectedTimePeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {timePeriods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
            <select 
              value={chartView} 
              onChange={(e) => setChartView(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="streams">Streams</option>
              <option value="listeners">Listeners</option>
              <option value="saves">Saves</option>
              <option value="shares">Shares</option>
            </select>
          </div>
        </div>

        {/* Main Chart */}
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={streamingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <Tooltip 
                formatter={(value, name) => [`${(value / 1000000).toFixed(2)}M`, name.charAt(0).toUpperCase() + name.slice(1)]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey={chartView} 
                stroke="#dc2626" 
                fill="#dc2626" 
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Metrics Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Total Streams</div>
            <div className="text-xl font-bold text-gray-900">
              {streamingData.reduce((sum, item) => sum + item.streams, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Avg Daily</div>
            <div className="text-xl font-bold text-gray-900">
              {Math.round(streamingData.reduce((sum, item) => sum + item.streams, 0) / streamingData.length).toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Peak Day</div>
            <div className="text-xl font-bold text-gray-900">
              {Math.max(...streamingData.map(item => item.streams)).toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Growth Rate</div>
            <div className="text-xl font-bold text-green-600">+{((Math.random() * 20) + 5).toFixed(1)}%</div>
          </div>
        </div>
      </div>

      {/* Platform Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={geoData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                <YAxis dataKey="country" type="category" width={80} />
                <Tooltip formatter={(value) => [`${(value / 1000000).toFixed(2)}M streams`, 'Streams']} />
                <Bar dataKey="streams" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Artists Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Artists</h2>
            <span className="text-sm text-gray-500">{artistsData.length} results</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              Export CSV
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              Save Chart
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              Saved Charts
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artist</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">🔥 Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">👥 Followers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">🎵 Streams</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Momentum</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {artistsData.map((artist, index) => (
                <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedArtist(artist)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-900">#{artist.rank}</span>
                      {artist.rankChange > 0 && (
                        <span className="ml-2 text-xs text-green-600 flex items-center">
                          ↗ +{artist.rankChange}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                        {artist.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setSelectedArtist(artist)}
                            className="font-medium text-gray-900 hover:text-blue-600 hover:underline cursor-pointer"
                          >
                            {artist.name}
                          </button>
                          {artist.verified && <span className="text-blue-500">✓</span>}
                        </div>
                        <div className="text-xs text-gray-500">{artist.label}</div>
                      </div>
                    </div>                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{artist.country}</div>
                    <div className="text-sm text-gray-500">{artist.countryCode}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{artist.genre}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-red-600">{artist.fireRank}</span>
                      {artist.fireRankChange > 0 && (
                        <span className="ml-2 text-xs text-green-600 flex items-center">
                          ↗ +{artist.fireRankChange}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{artist.followers}</div>
                    <div className="text-sm text-green-600">{artist.followersChange}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{artist.streams}</div>
                    <div className="text-sm text-green-600">{artist.streamsChange}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderMiniChart(generateStreamingData('7d', artist.artist))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      artist.momentum === 'explosive' ? 'bg-red-100 text-red-800' :
                      artist.momentum === 'very high' ? 'bg-orange-100 text-orange-800' :
                      artist.momentum === 'high' ? 'bg-yellow-100 text-yellow-800' :
                      artist.momentum === 'rising' ? 'bg-green-100 text-green-800' :
                      artist.momentum === 'medium' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {artist.momentum}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTracksAnalytics = () => (
    <div className="space-y-6">
      {/* Track Analytics Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Track Performance Analytics</h3>
          <div className="flex flex-wrap items-center gap-3">
            <select 
              value={selectedTimePeriod} 
              onChange={(e) => setSelectedTimePeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {timePeriods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
            <select 
              value={selectedTrack || 'Pronto'} 
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="Pronto">Pronto - Noizy</option>
              <option value="Flowers">Flowers - Miley Cyrus</option>
              <option value="Anti-Hero">Anti-Hero - Taylor Swift</option>
              <option value="Bonbon">Bonbon - Era Istrefi</option>
            </select>
          </div>
        </div>

        {/* Track Performance Chart */}
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={streamingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <Tooltip 
                formatter={(value, name) => [`${(value / 1000000).toFixed(2)}M`, name.charAt(0).toUpperCase() + name.slice(1)]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Legend />
              <Line type="monotone" dataKey="streams" stroke="#dc2626" strokeWidth={3} name="Streams" />
              <Line type="monotone" dataKey="listeners" stroke="#059669" strokeWidth={2} name="Listeners" />
              <Line type="monotone" dataKey="saves" stroke="#7c3aed" strokeWidth={2} name="Saves" />
              <Line type="monotone" dataKey="shares" stroke="#ea580c" strokeWidth={2} name="Shares" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="text-sm text-red-600">Total Streams</div>
            <div className="text-xl font-bold text-red-700">
              {streamingData.reduce((sum, item) => sum + item.streams, 0).toLocaleString()}
            </div>
            <div className="text-sm text-red-600">+{((Math.random() * 15) + 5).toFixed(1)}% vs last period</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-green-600">Unique Listeners</div>
            <div className="text-xl font-bold text-green-700">
              {streamingData.reduce((sum, item) => sum + item.listeners, 0).toLocaleString()}
            </div>
            <div className="text-sm text-green-600">+{((Math.random() * 12) + 3).toFixed(1)}% vs last period</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-sm text-purple-600">Total Saves</div>
            <div className="text-xl font-bold text-purple-700">
              {streamingData.reduce((sum, item) => sum + item.saves, 0).toLocaleString()}
            </div>
            <div className="text-sm text-purple-600">+{((Math.random() * 25) + 8).toFixed(1)}% vs last period</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="text-sm text-orange-600">Total Shares</div>
            <div className="text-xl font-bold text-orange-700">
              {streamingData.reduce((sum, item) => sum + item.shares, 0).toLocaleString()}
            </div>
            <div className="text-sm text-orange-600">+{((Math.random() * 30) + 10).toFixed(1)}% vs last period</div>
          </div>
        </div>
      </div>

      {/* Top Tracks Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Top Songs - This Week</h2>
          <p className="text-sm text-gray-500 mt-1">{topTracksWeek.length} tracks</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Track</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artist</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Streams</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Momentum</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topTracksWeek.map((track, index) => (
                <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedTrack(track.track)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-900">#{track.rank}</span>
                      {track.rank <= 3 && (
                        <span className="ml-2">
                          {track.rank === 1 ? '👑' : track.rank === 2 ? '🥈' : '🥉'}
                        </span>
                      )}
                      {track.rankChange > 0 && (
                        <span className="ml-2 text-xs text-green-600 flex items-center">
                          ↗ +{track.rankChange}
                        </span>
                      )}
                      {track.rankChange < 0 && (
                        <span className="ml-2 text-xs text-red-600 flex items-center">
                          ↘ {track.rankChange}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded bg-gray-300 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-700">🎵</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{track.track}</div>
                        <div className="text-sm text-gray-500">{track.genre} • {track.duration}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{track.artist}</div>
                    <div className="text-sm text-gray-500">{track.label}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{track.streams}</div>
                    <div className="text-sm text-gray-500">This week</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${track.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {track.growth}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderMiniChart(generateStreamingData('7d', track.track), track.growth.startsWith('+') ? '#10b981' : '#ef4444')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      track.momentum === 'explosive' ? 'bg-red-100 text-red-800' :
                      track.momentum === 'rising' ? 'bg-green-100 text-green-800' :
                      track.momentum === 'stable' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {track.momentum}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">AM</span>
              </div>
              <span className="font-semibold text-gray-900">ALBANIAN MUSIC</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button className={`px-3 py-2 rounded-md text-sm font-medium ${selectedTimePeriod === '30d' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                30d
              </button>
              <button className={`px-3 py-2 rounded-md text-sm font-medium ${selectedRegion === 'Worldwide' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                Worldwide
              </button>
            </div>
            <div className="text-sm text-gray-600">10 results</div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-sm border-r border-gray-200 transition-all duration-300`}>
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              {[
                { id: 'home', label: 'Home', icon: '🏠', badge: '2' },
                { id: 'feed', label: 'Feed', icon: '⚡', badge: null },
                { id: 'artists', label: 'Artists', icon: '👤', badge: '4' },
                { id: 'tracks', label: 'Tracks', icon: '🎵', badge: '5' },
                { id: 'most-listened', label: 'Most Listened', icon: '🎧', badge: '6' },
                { id: 'playlists', label: 'Playlists', icon: '📋', badge: '7' },
                { id: 'festivals', label: 'Festivals', icon: '🎪', badge: '8' },
                { id: 'cities', label: 'Cities', icon: '🏙️', badge: '9' },
                { id: 'countries', label: 'Countries', icon: '🌍', badge: '10' },
                { id: 'labels', label: 'Labels', icon: '🏷️', badge: '11' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === item.id
                      ? 'bg-red-100 text-red-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!sidebarCollapsed && (
                    <>
                      <span className="ml-3">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'artists' && renderArtistAnalytics()}
          {activeTab === 'tracks' && renderTracksAnalytics()}
          {activeTab === 'most-listened' && renderArtistAnalytics()}
          {(activeTab === 'home' || activeTab === 'feed') && renderArtistAnalytics()}
        </main>
      </div>
      
      {/* Artist Profile Modal */}
      {selectedArtist && (
        <ArtistProfile 
          artist={selectedArtist} 
          onClose={() => setSelectedArtist(null)} 
        />
      )}
    </div>
  );
};

export default AnalyticsPlatform;
