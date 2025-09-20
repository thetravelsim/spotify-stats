import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';

const EnhancedArtistProfile = ({ artist, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('30d');
  const [engagementTab, setEngagementTab] = useState('fanbase');

  // Enhanced mock data based on Viberate screenshots
  const artistData = {
    name: 'Noizy',
    photo: '/noizy.jpg',
    ranks: {
      overall: { rank: 2447, change: '+299', label: 'Overall' },
      alb: { rank: 1, change: '+', label: 'ALB', flag: '🇦🇱' },
      hipHop: { rank: 433, change: '+45', label: 'Hip Hop' },
      contemporary: { rank: 278, change: '+28', label: 'Contemporary Hip...' }
    },
    socialLinks: [
      { platform: 'spotify', icon: '🎵', color: 'green' },
      { platform: 'apple', icon: '🍎', color: 'gray' },
      { platform: 'youtube', icon: '📺', color: 'red' },
      { platform: 'amazon', icon: '📦', color: 'orange' },
      { platform: 'deezer', icon: '🎶', color: 'purple' },
      { platform: 'discord', icon: '💬', color: 'indigo' },
      { platform: 'instagram', icon: '📷', color: 'pink' },
      { platform: 'tiktok', icon: '🎬', color: 'black' },
      { platform: 'twitter', icon: '🐦', color: 'blue' },
      { platform: 'facebook', icon: '👥', color: 'blue' },
      { platform: 'linkedin', icon: '💼', color: 'blue' },
      { platform: 'website', icon: '🌐', color: 'gray' }
    ]
  };

  // Platform metrics for engagement tracking
  const platformMetrics = [
    { platform: 'Spotify', icon: '🎵', followers: '36.4K', change: '+13.3%', color: 'green' },
    { platform: 'TikTok', icon: '🎬', followers: '31.2K', change: '', color: 'black' },
    { platform: 'YouTube', icon: '📺', followers: '30K', change: '+25%', color: 'red' },
    { platform: 'Instagram', icon: '📷', followers: '12.7K', change: '+343.8%', color: 'pink' },
    { platform: 'Facebook', icon: '👥', followers: '-324', change: '', color: 'blue' },
    { platform: 'Twitch', icon: '🎮', followers: '957', change: '+1.6%', color: 'purple' }
  ];

  // Engagement chart data
  const engagementData = [
    { date: '30 Jun', spotify: 8000, tiktok: 0, youtube: 5000, instagram: 2000, facebook: 0, twitch: 0 },
    { date: '07 Jul', spotify: 0, tiktok: 4500, youtube: 5000, instagram: 2500, facebook: 0, twitch: 0 },
    { date: '14 Jul', spotify: 2000, tiktok: 0, youtube: 4500, instagram: 0, facebook: 0, twitch: 0 },
    { date: '21 Jul', spotify: 2500, tiktok: 6000, youtube: 2000, instagram: 1500, facebook: 0, twitch: 0 },
    { date: '28 Jul', spotify: 3000, tiktok: 1500, youtube: 3500, instagram: 0, facebook: 0, twitch: 0 },
    { date: '04 Aug', spotify: 3500, tiktok: 0, youtube: 0, instagram: 4500, facebook: 0, twitch: 0 },
    { date: '11 Aug', spotify: 1500, tiktok: 5500, youtube: 1500, instagram: 0, facebook: 0, twitch: 0 },
    { date: '18 Aug', spotify: 2000, tiktok: 2000, youtube: 3000, instagram: 0, facebook: 0, twitch: 0 },
    { date: '25 Aug', spotify: 0, tiktok: 0, youtube: 0, instagram: 8500, facebook: 0, twitch: 0 },
    { date: '01 Sep', spotify: 1000, tiktok: 1500, youtube: 0, instagram: 0, facebook: 0, twitch: 0 },
    { date: '08 Sep', spotify: 3500, tiktok: 0, youtube: 1000, instagram: 0, facebook: 0, twitch: 0 },
    { date: '15 Sep', spotify: 4000, tiktok: 2500, youtube: 0, instagram: 0, facebook: 0, twitch: 0 }
  ];

  // Fanbase vs Engagement data
  const fanbaseGrowthData = [
    { month: 'Oct', fanbaseGrowth: 40000, fansEngagement: -60000 },
    { month: 'Nov', fanbaseGrowth: 60000, fansEngagement: -50000 },
    { month: 'Dec', fanbaseGrowth: 35000, fansEngagement: -45000 },
    { month: 'Jan', fanbaseGrowth: 30000, fansEngagement: -40000 },
    { month: 'Feb', fanbaseGrowth: 35000, fansEngagement: -35000 },
    { month: 'Mar', fanbaseGrowth: 25000, fansEngagement: -30000 },
    { month: 'Apr', fanbaseGrowth: 40000, fansEngagement: -25000 },
    { month: 'May', fanbaseGrowth: 45000, fansEngagement: -20000 },
    { month: 'Jun', fanbaseGrowth: 40000, fansEngagement: -25000 },
    { month: 'Jul', fanbaseGrowth: 35000, fansEngagement: -30000 },
    { month: 'Aug', fanbaseGrowth: 40000, fansEngagement: -35000 }
  ];

  const fanbaseSizeData = [
    { month: 'Oct', fanbaseSize: 25000000, fansEngagement: 60000000 },
    { month: 'Nov', fanbaseSize: 30000000, fansEngagement: 65000000 },
    { month: 'Dec', fanbaseSize: 35000000, fansEngagement: 45000000 },
    { month: 'Jan', fanbaseSize: 40000000, fansEngagement: 42000000 },
    { month: 'Feb', fanbaseSize: 42000000, fansEngagement: 40000000 },
    { month: 'Mar', fanbaseSize: 45000000, fansEngagement: 65000000 },
    { month: 'Apr', fanbaseSize: 48000000, fansEngagement: 45000000 },
    { month: 'May', fanbaseSize: 50000000, fansEngagement: 42000000 },
    { month: 'Jun', fanbaseSize: 52000000, fansEngagement: 60000000 },
    { month: 'Jul', fanbaseSize: 55000000, fansEngagement: 45000000 },
    { month: 'Aug', fanbaseSize: 58000000, fansEngagement: 42000000 }
  ];

  // Audience map data
  const audienceData = [
    { rank: 1, country: 'ALB', flag: '🇦🇱', percentage: '24.66%' },
    { rank: 2, country: 'DEU', flag: '🇩🇪', percentage: '19.28%' },
    { rank: 3, country: 'ITA', flag: '🇮🇹', percentage: '10.12%' },
    { rank: 4, country: 'USA', flag: '🇺🇸', percentage: '8.45%' },
    { rank: 5, country: 'CHE', flag: '🇨🇭', percentage: '6.23%' },
    { rank: 6, country: 'AUT', flag: '🇦🇹', percentage: '5.78%' },
    { rank: 7, country: 'GBR', flag: '🇬🇧', percentage: '4.92%' },
    { rank: 8, country: 'FRA', flag: '🇫🇷', percentage: '3.67%' }
  ];

  // Engagement rate comparison data
  const engagementComparison = [
    {
      platform: 'SPOTIFY',
      icon: '🎵',
      industryAverage: '1.4M',
      artistMetric: '3.4M',
      label: 'Monthly Listeners',
      comparison: 'above',
      color: 'green'
    },
    {
      platform: 'INSTAGRAM', 
      icon: '📷',
      industryAverage: '1.8%',
      artistMetric: '1.4%',
      label: "Artist's Engagement Rate",
      comparison: 'below',
      color: 'yellow'
    },
    {
      platform: 'TIKTOK',
      icon: '🎬', 
      industryAverage: '3.3%',
      artistMetric: '3.6%',
      label: "Artist's Engagement Rate",
      comparison: 'above',
      color: 'green'
    }
  ];

  const platformTabs = [
    { id: 'overview', label: 'Overview', icon: '📊', active: true },
    { id: 'audience', label: 'Audience', icon: '👥' },
    { id: 'tracks', label: 'Tracks', icon: '🎵' },
    { id: 'spotify', label: 'Spotify', icon: '🎵', color: 'green' },
    { id: 'playlists', label: 'Playlists', icon: '📋', color: 'green' },
    { id: 'playlists2', label: 'Playlists', icon: '📋', color: 'pink' },
    { id: 'youtube', label: 'YouTube', icon: '📺', color: 'red' },
    { id: 'radio', label: 'Radio Airplay', icon: '📻', color: 'orange' }
  ];

  const renderEngagementMetrics = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Engagement And Fanbase Metrics</h2>
        <div className="flex items-center gap-4">
          <button className="text-blue-600 hover:underline text-sm">Export CSV</button>
          <button className="text-blue-600 hover:underline text-sm">Save</button>
        </div>
      </div>

      {/* Tab selector */}
      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => setEngagementTab('fanbase')}
          className={`px-4 py-2 rounded ${engagementTab === 'fanbase' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
        >
          Fanbase
        </button>
        <button 
          onClick={() => setEngagementTab('engagement')}
          className={`px-4 py-2 rounded ${engagementTab === 'engagement' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
        >
          Engagement
        </button>
      </div>

      {/* Time filter */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-600">⏱</span>
        {['30d', '3m', '12m', 'Custom'].map((period) => (
          <button
            key={period}
            onClick={() => setTimeFilter(period)}
            className={`px-3 py-1 text-sm rounded ${
              timeFilter === period ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {period}
          </button>
        ))}
        <span className="text-sm text-gray-500 ml-4">18 Jun - 17 Sep</span>
      </div>

      {/* Platform metrics cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {platformMetrics.map((metric, index) => (
          <div key={index} className="bg-white border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-gray-600">Followers</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.followers}</div>
            {metric.change && (
              <div className={`text-sm ${metric.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Multi-line chart */}
      <div className="bg-white border rounded-lg p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="spotify" stroke="#1DB954" strokeWidth={2} />
            <Line type="monotone" dataKey="tiktok" stroke="#000000" strokeWidth={2} />
            <Line type="monotone" dataKey="youtube" stroke="#FF0000" strokeWidth={2} />
            <Line type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={2} />
            <Line type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={2} />
            <Line type="monotone" dataKey="twitch" stroke="#9146FF" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderFanbaseVsEngagement = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Fanbase vs. Engagement</h2>
        <button className="text-blue-600 hover:underline text-sm">Save</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Fanbase Growth vs. Engagement */}
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Fanbase Growth vs. Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={fanbaseGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="fanbaseGrowth" stackId="1" stroke="#E91E63" fill="#E91E63" />
              <Area type="monotone" dataKey="fansEngagement" stackId="1" stroke="#00BCD4" fill="#00BCD4" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Fanbase Growth</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Fans' Engagement</span>
            </div>
          </div>
        </div>

        {/* Fanbase Size vs. Engagement */}
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Fanbase Size vs. Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fanbaseSizeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="fanbaseSize" stroke="#E91E63" strokeWidth={2} />
              <Line type="monotone" dataKey="fansEngagement" stroke="#00BCD4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Fanbase size</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Fans' Engagement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Rate Comparison */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6">Engagement Rate Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engagementComparison.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-medium text-gray-600">{item.platform}</span>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="flex-1 bg-gray-100 rounded p-3 text-center">
                  <div className="text-2xl font-bold text-gray-900">{item.industryAverage}</div>
                  <div className="text-xs text-gray-500">Industry Average*</div>
                </div>
                <div className={`flex-1 rounded p-3 text-center ${
                  item.comparison === 'above' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  <div className="text-2xl font-bold text-gray-900">{item.artistMetric}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                *Artists between 200K and 1M {item.platform.toLowerCase()} followers.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAudienceMap = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Audience Map</h2>
        <div className="flex items-center gap-4">
          <button className="text-blue-600 hover:underline text-sm">Export CSV</button>
          <button className="text-blue-600 hover:underline text-sm">Save</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audience table */}
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center gap-4 mb-4">
            <select className="border rounded px-3 py-2 text-sm">
              <option>📊 Overall Audience</option>
            </select>
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="🔍 Search" 
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-sm font-medium text-gray-600">Rank</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Country</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">📊 Overall Audience</th>
              </tr>
            </thead>
            <tbody>
              {audienceData.slice(0, 3).map((item) => (
                <tr key={item.rank} className="border-b">
                  <td className="py-2 text-sm">{item.rank}</td>
                  <td className="py-2 text-sm">
                    <span className="mr-2">{item.flag}</span>
                    {item.country}
                  </td>
                  <td className="py-2 text-sm font-medium">{item.percentage}</td>
                </tr>
              ))}
              {/* Blurred rows for premium feature */}
              {[4, 5, 6, 7, 8].map((rank) => (
                <tr key={rank} className="border-b opacity-30 blur-sm">
                  <td className="py-2 text-sm">{rank}</td>
                  <td className="py-2 text-sm">🏳️ XXX</td>
                  <td className="py-2 text-sm">XX.XX%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Buy Now To See All
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button className="text-blue-600 hover:underline text-sm">View More</button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Page</span>
              <button className="w-8 h-8 bg-blue-600 text-white rounded text-sm">1</button>
              <button className="w-8 h-8 border rounded text-sm hover:bg-gray-50">2</button>
              <button className="w-8 h-8 border rounded text-sm hover:bg-gray-50">3</button>
              <button className="text-gray-400">→</button>
            </div>
          </div>
        </div>

        {/* World map placeholder */}
        <div className="bg-white border rounded-lg p-4 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-6xl mb-4">🗺️</div>
            <div className="text-lg font-medium">World Map Visualization</div>
            <div className="text-sm">Interactive audience geography map</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-100 flex z-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r flex flex-col">
        {/* Artist Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <img src={artistData.photo} alt={artistData.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{artistData.name}</h1>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 mt-2">
                + Follow for Priority Sync
              </button>
            </div>
            <button className="text-gray-400 hover:text-gray-600 ml-auto">
              ⋯
            </button>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-6 gap-2">
            {artistData.socialLinks.map((link, index) => (
              <button
                key={index}
                className={`w-10 h-10 rounded flex items-center justify-center text-white text-sm ${
                  link.color === 'green' ? 'bg-green-500' :
                  link.color === 'red' ? 'bg-red-500' :
                  link.color === 'pink' ? 'bg-pink-500' :
                  link.color === 'blue' ? 'bg-blue-500' :
                  link.color === 'purple' ? 'bg-purple-500' :
                  link.color === 'indigo' ? 'bg-indigo-500' :
                  link.color === 'black' ? 'bg-black' :
                  'bg-gray-500'
                }`}
              >
                {link.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Viberate Ranks */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-red-600 font-bold">V</span>
            <span className="font-medium">Platform Ranks</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{artistData.ranks.overall.rank}</div>
                <div className="text-green-600 text-sm">{artistData.ranks.overall.change}</div>
              </div>
              <div className="text-sm text-gray-600">{artistData.ranks.overall.label}</div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold">{artistData.ranks.alb.rank}</div>
                <div className="text-green-600 text-sm">{artistData.ranks.alb.change}</div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>{artistData.ranks.alb.flag}</span>
                <span className="text-gray-600">{artistData.ranks.alb.label}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold">{artistData.ranks.hipHop.rank}</div>
                <div className="text-green-600 text-sm">{artistData.ranks.hipHop.change}</div>
              </div>
              <div className="text-sm text-gray-600">{artistData.ranks.hipHop.label}</div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold">{artistData.ranks.contemporary.rank}</div>
                <div className="text-green-600 text-sm">{artistData.ranks.contemporary.change}</div>
              </div>
              <div className="text-sm text-gray-600">{artistData.ranks.contemporary.label}</div>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="p-6 space-y-3">
          <button className="w-full text-left text-blue-600 text-sm hover:underline">
            Compare this artist →
          </button>
          <button className="w-full text-left text-blue-600 text-sm hover:underline flex items-center gap-2">
            <span>⬇</span>
            Download PDF
          </button>
          <button className="w-full text-left text-blue-600 text-sm hover:underline flex items-center gap-2">
            <span>⬇</span>
            Download CSV
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white overflow-y-auto">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-gray-600">
              🔄 Refresh Data
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-blue-600 hover:underline text-sm">Save</button>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="border-b">
          <div className="flex overflow-x-auto px-4">
            {platformTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className={`w-6 h-6 rounded text-xs flex items-center justify-center text-white ${
                  tab.color === 'green' ? 'bg-green-500' :
                  tab.color === 'red' ? 'bg-red-500' :
                  tab.color === 'pink' ? 'bg-pink-500' :
                  tab.color === 'orange' ? 'bg-orange-500' :
                  'bg-gray-500'
                }`}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              {renderEngagementMetrics()}
              {renderFanbaseVsEngagement()}
            </div>
          )}
          
          {activeTab === 'audience' && (
            <div>
              {renderAudienceMap()}
            </div>
          )}
          
          {/* Other tabs content can be added here */}
        </div>
      </div>
    </div>
  );
};

export default EnhancedArtistProfile;
