import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const ComprehensiveArtistProfile = ({ artist, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timePeriod, setTimePeriod] = useState('30d');

  // Mock data for comprehensive analytics
  const streamingData = [
    { date: 'Oct', streams: 2800000, listeners: 1200000 },
    { date: 'Nov', streams: 3200000, listeners: 1400000 },
    { date: 'Dec', streams: 4100000, listeners: 1800000 },
    { date: 'Jan', streams: 3800000, listeners: 1600000 },
    { date: 'Feb', streams: 3500000, listeners: 1500000 },
    { date: 'Mar', streams: 4200000, listeners: 1900000 },
    { date: 'Apr', streams: 3900000, listeners: 1700000 },
  ];

  const platformData = [
    { name: 'Spotify', value: 45, color: '#1DB954' },
    { name: 'Apple Music', value: 25, color: '#FA243C' },
    { name: 'YouTube Music', value: 15, color: '#FF0000' },
    { name: 'Amazon Music', value: 8, color: '#FF9900' },
    { name: 'Others', value: 7, color: '#8884d8' }
  ];

  const audienceData = [
    { country: 'Albania', flag: '🇦🇱', percentage: 24.66 },
    { country: 'Germany', flag: '🇩🇪', percentage: 19.28 },
    { country: 'Italy', flag: '🇮🇹', percentage: 10.12 },
    { country: 'Switzerland', flag: '🇨🇭', percentage: 8.45 },
    { country: 'Austria', flag: '🇦🇹', percentage: 6.23 },
  ];

  const topTracks = [
    { rank: 1, title: 'Follow You', streams: '3.6M', growth: '+15.2%', releaseDate: 'Nov 08, 2024' },
    { rank: 2, title: 'Toto (feat. RAF Camora)', streams: '1.5M', growth: '+8.7%', releaseDate: 'Jun 15, 2018' },
    { rank: 3, title: 'Nero', streams: '932.5K', growth: '+12.3%', releaseDate: 'Sep 05, 2025' },
    { rank: 4, title: 'MAMA', streams: '884.9K', growth: '+5.8%', releaseDate: 'Aug 01, 2025' },
    { rank: 5, title: 'Icon', streams: '786.6K', growth: '+18.9%', releaseDate: 'Jun 06, 2025' },
  ];

  const socialMetrics = [
    { platform: 'Spotify', followers: '837.3K', growth: '+88.6%', color: '#1DB954' },
    { platform: 'YouTube', subscribers: '1.8M', growth: '+25%', color: '#FF0000' },
    { platform: 'Instagram', followers: '2.2M', growth: '+343.8%', color: '#E4405F' },
    { platform: 'TikTok', followers: '740.9K', growth: '+68.7%', color: '#000000' },
    { platform: 'Facebook', followers: '54.7K', growth: '-5.2%', color: '#1877F2' },
  ];

  const engagementData = [
    { month: 'Oct', fanbaseGrowth: 85000, engagement: 45000 },
    { month: 'Nov', fanbaseGrowth: 92000, engagement: 52000 },
    { month: 'Dec', fanbaseGrowth: 78000, engagement: 38000 },
    { month: 'Jan', fanbaseGrowth: 95000, engagement: 48000 },
    { month: 'Feb', fanbaseGrowth: 88000, engagement: 42000 },
    { month: 'Mar', fanbaseGrowth: 102000, engagement: 55000 },
  ];

  const careerHealthData = [
    { metric: 'Popularity', value: 85, fullMark: 100 },
    { metric: 'Growth', value: 92, fullMark: 100 },
    { metric: 'Engagement', value: 78, fullMark: 100 },
    { metric: 'Reach', value: 88, fullMark: 100 },
    { metric: 'Consistency', value: 75, fullMark: 100 },
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Top 100 Chart Positions */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Top 100 Chart Positions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-500 text-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">1st</div>
            <div className="text-sm">Spotify Followers in Albania</div>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">1st</div>
            <div className="text-sm">YouTube Subscribers in Albania</div>
          </div>
          <div className="bg-red-600 text-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">1st</div>
            <div className="text-sm">YouTube Video Views in Albania</div>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">1st</div>
            <div className="text-sm">Instagram Post Likes in Albania</div>
          </div>
        </div>
      </div>

      {/* Total Fanbase Distribution */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Total Fanbase Distribution</h3>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <div className="text-2xl font-bold">5.8M</div>
              <div className="text-gray-600">Total Fanbase Size</div>
            </div>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            {socialMetrics.map((metric, index) => (
              <div key={index} className="text-center p-3 border rounded-lg">
                <div className="text-sm text-gray-600">{metric.platform}</div>
                <div className="text-lg font-bold">{metric.followers}</div>
                <div className={`text-sm ${metric.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.growth}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Health */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Career Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-2 relative">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="48" cy="48" r="40" 
                  stroke="#10b981" strokeWidth="8" fill="none"
                  strokeDasharray={`${85 * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">85%</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">Popularity</div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-2 relative">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="48" cy="48" r="40" 
                  stroke="#3b82f6" strokeWidth="8" fill="none"
                  strokeDasharray={`${92 * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">92%</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">Growth</div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-2 relative">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="48" cy="48" r="40" 
                  stroke="#f59e0b" strokeWidth="8" fill="none"
                  strokeDasharray={`${78 * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">78%</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">Engagement</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAudienceTab = () => (
    <div className="space-y-6">
      {/* Audience Map */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Audience Map</h3>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <div className="text-gray-600">Interactive World Map</div>
                <div className="text-sm text-gray-500">Showing audience distribution</div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Rank</th>
                  <th className="text-left py-2">Country</th>
                  <th className="text-left py-2">Overall Audience</th>
                </tr>
              </thead>
              <tbody>
                {audienceData.map((country, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">
                      <span className="mr-2">{country.flag}</span>
                      {country.country}
                    </td>
                    <td className="py-2 font-semibold">{country.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
              Buy Now To See All
            </button>
          </div>
        </div>
      </div>

      {/* Fanbase vs Engagement */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Fanbase vs. Engagement</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium mb-2">Fanbase Growth vs. Engagement</h4>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="fanbaseGrowth" stackId="1" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
                <Area type="monotone" dataKey="engagement" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="text-md font-medium mb-2">Fanbase Size vs. Engagement</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="fanbaseGrowth" stroke="#ec4899" strokeWidth={2} />
                <Line type="monotone" dataKey="engagement" stroke="#06b6d4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Rate Comparison */}
        <div className="mt-6">
          <h4 className="text-md font-medium mb-4">Engagement Rate Comparison</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-green-600 text-2xl mb-2">🎵</div>
              <div className="text-sm text-gray-600">SPOTIFY</div>
              <div className="text-lg font-bold">1.4M</div>
              <div className="text-sm text-gray-500">Industry Average</div>
              <div className="text-lg font-bold text-green-600">3.4M</div>
              <div className="text-sm text-green-600">Monthly Listeners</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-pink-600 text-2xl mb-2">📷</div>
              <div className="text-sm text-gray-600">INSTAGRAM</div>
              <div className="text-lg font-bold">1.8%</div>
              <div className="text-sm text-gray-500">Industry Average</div>
              <div className="text-lg font-bold text-yellow-600">1.4%</div>
              <div className="text-sm text-yellow-600">Artist's Engagement Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-black text-2xl mb-2">🎵</div>
              <div className="text-sm text-gray-600">TIKTOK</div>
              <div className="text-lg font-bold">3.3%</div>
              <div className="text-sm text-gray-500">Industry Average</div>
              <div className="text-lg font-bold text-green-600">3.6%</div>
              <div className="text-sm text-green-600">Artist's Engagement Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTracksTab = () => (
    <div className="space-y-6">
      {/* Top Tracks on Music Channels */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Top Tracks on Music Channels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-green-600 text-2xl mb-2">🎵</div>
            <div className="text-sm text-gray-600">SPOTIFY</div>
            <div className="text-2xl font-bold">22.6M</div>
            <div className="text-sm text-gray-500">Streams past 30 days</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-red-600 text-2xl mb-2">📺</div>
            <div className="text-sm text-gray-600">YOUTUBE</div>
            <div className="text-2xl font-bold">27.8M</div>
            <div className="text-sm text-gray-500">Views past 30 days</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-orange-600 text-2xl mb-2">📻</div>
            <div className="text-sm text-gray-600">RADIO AIRPLAY</div>
            <div className="text-2xl font-bold">3.3K</div>
            <div className="text-sm text-gray-500">Spins past 30 days</div>
          </div>
        </div>

        {/* Top Tracks on Spotify */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-medium">Top Tracks on Spotify</h4>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border rounded">7d</button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">30d</button>
              <button className="px-3 py-1 text-sm border rounded">Total</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Rank</th>
                  <th className="text-left py-2">Channel</th>
                  <th className="text-left py-2">Title</th>
                  <th className="text-left py-2">Artist</th>
                  <th className="text-left py-2">🎵 Streams</th>
                  <th className="text-left py-2">Release Date</th>
                </tr>
              </thead>
              <tbody>
                {topTracks.map((track, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3">{track.rank}</td>
                    <td className="py-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">🎵</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded mr-3"></div>
                        {track.title}
                      </div>
                    </td>
                    <td className="py-3">{artist.name}</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <span className="mr-2">{track.streams}</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          📈
                        </span>
                      </div>
                    </td>
                    <td className="py-3">{track.releaseDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Compare Tracks */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Compare Tracks</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">30d</button>
            <button className="px-3 py-1 text-sm border rounded">3m</button>
            <button className="px-3 py-1 text-sm border rounded">12m</button>
            <button className="px-3 py-1 text-sm border rounded">Custom</button>
          </div>
          <select className="border rounded px-3 py-1">
            <option>🎵 Spotify Streams</option>
          </select>
          <button className="px-3 py-1 text-sm border rounded">🔍 Add Track</button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={streamingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="streams" stroke="#f97316" strokeWidth={2} name="Follow You" />
            <Line type="monotone" dataKey="listeners" stroke="#06b6d4" strokeWidth={2} name="Toto" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl h-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">{artist.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{artist.name}</h2>
              <p className="text-gray-600">🇦🇱 Albania • Hip Hop</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Platform Icons */}
        <div className="px-6 py-4 border-b">
          <div className="flex space-x-2 overflow-x-auto">
            {['Overview', 'Audience', 'Tracks', 'Spotify', 'Playlists', 'YouTube', 'Radio Airplay', 'TikTok', 'Instagram', 'Social Media'].map((platform) => (
              <button
                key={platform}
                onClick={() => setActiveTab(platform.toLowerCase().replace(' ', ''))}
                className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap ${
                  activeTab === platform.toLowerCase().replace(' ', '') 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 p-4 border-r">
              <div className="mb-6">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mb-2">
                  + Follow for Priority Sync
                </button>
                <button className="text-gray-600">⋯</button>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-red-600 font-bold mr-2">V</span>
                  <span className="font-semibold">Viberate Ranks</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>2,447</span>
                    <span className="text-red-600">+299</span>
                    <span>Overall</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1</span>
                    <span className="text-green-600">↗</span>
                    <span>🇦🇱 ALB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>433</span>
                    <span className="text-green-600">+45</span>
                    <span>Hip Hop</span>
                  </div>
                  <div className="flex justify-between">
                    <span>278</span>
                    <span className="text-green-600">+28</span>
                    <span>Contemporary Hip...</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <button className="text-blue-600 hover:underline">Compare this artist →</button>
                <button className="text-blue-600 hover:underline">Download PDF ⬇</button>
                <button className="text-blue-600 hover:underline">Download CSV ⬇</button>
                <button className="text-blue-600 hover:underline">Go to public page →</button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {activeTab === 'overview' && renderOverviewTab()}
              {activeTab === 'audience' && renderAudienceTab()}
              {activeTab === 'tracks' && renderTracksTab()}
              {!['overview', 'audience', 'tracks'].includes(activeTab) && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Analytics</h3>
                  <p className="text-gray-600">Comprehensive {activeTab} analytics and insights coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveArtistProfile;
