import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const ArtistProfile = ({ artist, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for comprehensive artist analytics
  const streamingData = [
    { month: 'Oct', streams: 2.1 },
    { month: 'Nov', streams: 3.8 },
    { month: 'Dec', streams: 4.2 },
    { month: 'Jan', streams: 3.5 },
    { month: 'Feb', streams: 2.8 },
    { month: 'Mar', streams: 3.2 },
    { month: 'Apr', streams: 1.8 },
    { month: 'May', streams: 1.2 },
    { month: 'Jun', streams: 1.0 },
    { month: 'Jul', streams: 0.8 },
    { month: 'Aug', streams: 0.9 },
    { month: 'Sep', streams: 1.1 }
  ];

  const audienceData = [
    { country: 'Albania', percentage: 24.66, flag: '🇦🇱' },
    { country: 'Germany', percentage: 19.28, flag: '🇩🇪' },
    { country: 'Italy', percentage: 10.12, flag: '🇮🇹' },
    { country: 'Switzerland', percentage: 8.45, flag: '🇨🇭' },
    { country: 'Austria', percentage: 6.23, flag: '🇦🇹' },
    { country: 'Kosovo', percentage: 5.89, flag: '🇽🇰' },
    { country: 'North Macedonia', percentage: 4.12, flag: '🇲🇰' },
    { country: 'Montenegro', percentage: 3.45, flag: '🇲🇪' }
  ];

  const topTracks = [
    { rank: 1, title: 'Follow You', artist: 'Noizy', streams: '3.6M', platform: 'spotify', releaseDate: 'Nov 08, 2024', trend: 'up' },
    { rank: 2, title: 'Toto (feat. RAF Camora)', artist: 'Noizy, Raf Camora', streams: '1.5M', platform: 'spotify', releaseDate: 'Jun 15, 2018', trend: 'up' },
    { rank: 3, title: 'Nero', artist: 'Konstantinos Argiros, Noizy', streams: '932.5K', platform: 'spotify', releaseDate: 'Sep 05, 2025', trend: 'up' },
    { rank: 4, title: 'MAMA', artist: 'KIDA, Noizy, Roman, Saliboy, Roman', streams: '884.9K', platform: 'spotify', releaseDate: 'Aug 01, 2025', trend: 'up' },
    { rank: 5, title: 'Mama ja dola', artist: 'Noizy, Morad', streams: '871.9K', platform: 'spotify', releaseDate: 'Jul 18, 2025', trend: 'up' },
    { rank: 6, title: 'Icon', artist: 'Noizy', streams: '786.6K', platform: 'spotify', releaseDate: 'Jun 06, 2025', trend: 'up' },
    { rank: 7, title: 'We Back', artist: 'Aset, Noizy', streams: '726.7K', platform: 'spotify', releaseDate: 'May 29, 2025', trend: 'up' },
    { rank: 8, title: 'Shoqe', artist: 'Noizy, KIDA', streams: '681K', platform: 'spotify', releaseDate: 'May 28, 2025', trend: 'up' },
    { rank: 9, title: 'Netet e vona', artist: 'Noizy, Yll Limani', streams: '516K', platform: 'spotify', releaseDate: 'Jun 06, 2025', trend: 'up' },
    { rank: 10, title: 'Number 1', artist: 'Zuna, Aset, Noizy', streams: '512.3K', platform: 'spotify', releaseDate: 'Apr 14, 2017', trend: 'up' }
  ];

  const socialMediaData = [
    { platform: 'YouTube', followers: '6.5M', growth: '+3.4%', color: '#FF0000' },
    { platform: 'Instagram', followers: '2.4K', growth: '+440.3%', color: '#E4405F' },
    { platform: 'TikTok', followers: '100.4K', growth: '+94.7%', color: '#000000' },
    { platform: 'Spotify', followers: '3.4M', growth: '+88.6%', color: '#1DB954' },
    { platform: 'Facebook', followers: '54.7K', growth: '-36', color: '#1877F2' }
  ];

  const engagementData = [
    { name: 'Fanbase Growth', value: 85, color: '#FF69B4' },
    { name: 'Fans Engagement', value: 65, color: '#00CED1' }
  ];

  const platformDistribution = [
    { name: 'Spotify', value: 837.3, color: '#1DB954' },
    { name: 'YouTube', value: 1800, color: '#FF0000' },
    { name: 'Instagram', value: 2200, color: '#E4405F' },
    { name: 'Facebook', value: 547, color: '#1877F2' },
    { name: 'TikTok', value: 740.9, color: '#000000' },
    { name: 'Deezer', value: 623, color: '#A238FF' }
  ];

  const careerHealthData = [
    { name: 'Performance', value: 75, color: '#4CAF50' },
    { name: 'Growth', value: 85, color: '#2196F3' },
    { name: 'Engagement', value: 65, color: '#FF9800' }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Top Tracks on Music Channels */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Tracks on Music Channels</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded">Export CSV</button>
            <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded">Save</button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">SPOTIFY</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">22.6M</div>
            <div className="text-sm text-gray-500">Streams past 30 days</div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">YOUTUBE</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">27.8M</div>
            <div className="text-sm text-gray-500">Views past 30 days</div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">RADIO AIRPLAY</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">3.3K</div>
            <div className="text-sm text-gray-500">Spins past 30 days</div>
          </div>
        </div>

        {/* Top Tracks Table */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-4">Top Tracks on Spotify</h4>
          <div className="flex gap-2 mb-4">
            <button className="px-3 py-1 text-sm bg-gray-100 rounded">7d</button>
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded">30d</button>
            <button className="px-3 py-1 text-sm bg-gray-100 rounded">Total</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Rank</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Channel</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Title</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Artist</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">🟢 Streams</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Release Date</th>
                </tr>
              </thead>
              <tbody>
                {topTracks.slice(0, 6).map((track, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 text-sm">{track.rank}</td>
                    <td className="py-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">♪</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm font-medium">{track.title}</td>
                    <td className="py-3 text-sm text-gray-600">{track.artist}</td>
                    <td className="py-3 text-sm font-medium">{track.streams}</td>
                    <td className="py-3 text-sm text-gray-500">{track.releaseDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Compare Tracks Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Compare Tracks</h3>
          <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded">Save</button>
        </div>
        
        <div className="flex gap-2 mb-4">
          <button className="px-3 py-1 text-sm bg-gray-100 rounded">30d</button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded">3m</button>
          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded">12m</button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded">Custom</button>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={streamingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="streams" stroke="#FF6B35" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-blue-600 text-sm">View More</button>
        </div>
      </div>
    </div>
  );

  const renderAudienceTab = () => (
    <div className="space-y-6">
      {/* Audience Map */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Audience Map</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded">Export CSV</button>
            <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded">Save</button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Rank</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Country</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">🔴 Overall Audience</th>
                </tr>
              </thead>
              <tbody>
                {audienceData.map((country, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 text-sm">{index + 1}</td>
                    <td className="py-2 text-sm">
                      <span className="mr-2">{country.flag}</span>
                      {country.country}
                    </td>
                    <td className="py-2 text-sm font-medium">{country.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="mt-4 text-center">
              <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Buy Now To See All</button>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🗺️</div>
              <div className="text-sm">Interactive World Map</div>
              <div className="text-xs">Showing audience distribution</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fanbase vs Engagement */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Fanbase vs. Engagement</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-semibold mb-4">Fanbase Growth vs. Engagement</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={streamingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="streams" stackId="1" stroke="#FF69B4" fill="#FF69B4" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="streams" stackId="2" stroke="#00CED1" fill="#00CED1" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Fanbase Size vs. Engagement</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={streamingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="streams" stroke="#FF69B4" strokeWidth={2} />
                  <Line type="monotone" dataKey="streams" stroke="#00CED1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Engagement Rate Comparison */}
        <div className="mt-8">
          <h4 className="text-md font-semibold mb-4">Engagement Rate Comparison</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">SPOTIFY</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">3.4M</div>
              <div className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">Monthly Listeners</div>
              <div className="text-xs text-gray-500 mt-1">*Artists between 200K and 1M Spotify followers.</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                <span className="text-sm text-gray-600">INSTAGRAM</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">1.4%</div>
              <div className="text-sm text-yellow-600 bg-yellow-50 px-2 py-1 rounded">Artist's Engagement Rate</div>
              <div className="text-xs text-gray-500 mt-1">*Artists above 1M Instagram followers.</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-4 h-4 bg-black rounded-full"></div>
                <span className="text-sm text-gray-600">TIKTOK</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">3.6%</div>
              <div className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">Artist's Engagement Rate</div>
              <div className="text-xs text-gray-500 mt-1">*Artists between 200K and 1M TikTok followers.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTracksTab = () => (
    <div className="space-y-6">
      {/* Social Media Analytics */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Media Performance</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {socialMediaData.slice(0, 3).map((platform, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-gray-600 mb-1">{platform.platform}</div>
              <div className="text-2xl font-bold text-gray-900">{platform.followers}</div>
              <div className={`text-sm ${platform.growth.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                {platform.growth}
              </div>
              <div className="text-xs text-gray-500">3 Months</div>
              
              <div className="mt-2 h-16 bg-gray-50 rounded flex items-center justify-center">
                <div className="text-xs text-gray-400">Chart</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {socialMediaData.slice(3).map((platform, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-gray-600 mb-1">{platform.platform}</div>
              <div className="text-2xl font-bold text-gray-900">{platform.followers}</div>
              <div className={`text-sm ${platform.growth.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                {platform.growth}
              </div>
              <div className="text-xs text-gray-500">3 Months</div>
              
              <div className="mt-2 h-16 bg-gray-50 rounded flex items-center justify-center">
                <div className="text-xs text-gray-400">Chart</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement and Fanbase Metrics */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Engagement And Fanbase Metrics</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded">Export CSV</button>
            <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded">Save</button>
          </div>
        </div>
        
        <div className="flex gap-2 mb-4">
          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded">Fanbase</button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded">Engagement</button>
        </div>
        
        <div className="flex gap-2 mb-6">
          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded">30d</button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded">3m</button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded">12m</button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded">Custom</button>
        </div>
        
        <div className="grid grid-cols-6 gap-4 mb-6">
          {socialMediaData.map((platform, index) => (
            <div key={index} className="text-center p-3 border rounded">
              <div className="flex items-center justify-center gap-1 mb-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-gray-600">{platform.platform}</span>
              </div>
              <div className="text-lg font-bold text-gray-900">{platform.followers}</div>
              <div className={`text-sm ${platform.growth.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                {platform.growth}
              </div>
            </div>
          ))}
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={streamingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="streams" stroke="#1DB954" strokeWidth={2} />
              <Line type="monotone" dataKey="streams" stroke="#FF0000" strokeWidth={2} />
              <Line type="monotone" dataKey="streams" stroke="#E4405F" strokeWidth={2} />
              <Line type="monotone" dataKey="streams" stroke="#000000" strokeWidth={2} />
              <Line type="monotone" dataKey="streams" stroke="#1877F2" strokeWidth={2} />
              <Line type="monotone" dataKey="streams" stroke="#A238FF" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderSpotifyTab = () => (
    <div className="space-y-6">
      {/* Top 100 Chart Positions */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top 100 Chart Positions</h3>
          <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded">Save</button>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-green-500 text-white p-6 rounded-lg text-center">
            <div className="text-3xl font-bold">1st</div>
            <div className="text-sm mt-2">Spotify Followers in Albania</div>
            <div className="mt-4 flex justify-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xs">🎵</span>
              </div>
            </div>
          </div>
          
          <div className="bg-red-500 text-white p-6 rounded-lg text-center">
            <div className="text-3xl font-bold">1st</div>
            <div className="text-sm mt-2">Youtube Subscribers in Albania</div>
            <div className="mt-4 flex justify-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xs">📺</span>
              </div>
            </div>
          </div>
          
          <div className="bg-red-600 text-white p-6 rounded-lg text-center">
            <div className="text-3xl font-bold">1st</div>
            <div className="text-sm mt-2">Youtube Video Views in Albania</div>
            <div className="mt-4 flex justify-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xs">▶️</span>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-500 text-white p-6 rounded-lg text-center">
            <div className="text-3xl font-bold">1st</div>
            <div className="text-sm mt-2">Instagram Post Likes in Albania</div>
            <div className="mt-4 flex justify-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xs">❤️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Fanbase Distribution */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-semibold">Total Fanbase Distribution</h4>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded">Export CSV</button>
              <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded">Save</button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-gradient-to-r from-green-400 via-red-400 to-purple-400 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold">5.8M</div>
                      <div className="text-xs text-gray-500">Total Fanbase Size</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {platformDistribution.map((platform, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: platform.color }}></div>
                    <span className="text-sm text-gray-600">{platform.name}</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{platform.value}K</div>
                  <div className="text-xs text-gray-500">
                    {platform.name === 'Spotify' ? 'Followers' : 
                     platform.name === 'YouTube' ? 'Subscribers' : 'Followers'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Tracks and Video */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Tracks And Video</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded">🔄 Refresh Data</button>
            <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded">Save</button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">1.2M</div>
            <div className="text-sm text-green-600">🟢 7-day streams</div>
            <div className="bg-gray-900 rounded-lg p-4 mt-2 relative">
              <div className="text-white text-center">
                <div className="text-xs mb-2">Follow You</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white">▶️</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">Noizy</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">852.6K</div>
            <div className="text-sm text-green-600">🟢 7-day streams</div>
            <div className="bg-blue-500 rounded-lg p-4 mt-2 relative">
              <div className="text-white text-center">
                <div className="text-xs mb-2">Nero</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white">🎵</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">Konstantinos Argiros, Noizy</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">505.6K</div>
            <div className="text-sm text-red-600">🔴 7-day streams</div>
            <div className="bg-orange-500 rounded-lg p-4 mt-2 relative">
              <div className="text-white text-center">
                <div className="text-xs mb-2">Toto (feat. RAF Camora)</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white">🎤</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">Noizy, Raf Camora</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">764.9K</div>
            <div className="text-sm text-red-600">🔴 7-day views</div>
            <div className="bg-gray-800 rounded-lg p-4 mt-2 relative">
              <div className="text-white text-center">
                <div className="text-xs mb-2">Noizy - Icon (Official Video)</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white">📺</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">thisisnoiszy</div>
            <div className="text-xs text-gray-400">Uploaded Jun 14, 2025</div>
          </div>
        </div>

        {/* Career Health */}
        <div className="mt-8">
          <h4 className="text-md font-semibold mb-4">Career Health</h4>
          <div className="grid grid-cols-3 gap-6">
            {careerHealthData.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-2">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
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
                      stroke={metric.color}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${metric.value * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold">{metric.value}%</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">{metric.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const platformTabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'audience', name: 'Audience', icon: '👥' },
    { id: 'tracks', name: 'Tracks', icon: '🎵' },
    { id: 'spotify', name: 'Spotify', icon: '🟢' },
    { id: 'playlists', name: 'Playlists', icon: '📋' },
    { id: 'youtube', name: 'YouTube', icon: '📺' },
    { id: 'radio', name: 'Radio Airplay', icon: '📻' },
    { id: 'tiktok', name: 'TikTok', icon: '🎬' },
    { id: 'instagram', name: 'Instagram', icon: '📷' },
    { id: 'social', name: 'Social Media', icon: '🌐' },
    { id: 'network', name: 'Network', icon: '🔗' },
    { id: 'beatport', name: 'Beatport', icon: '🎧' },
    { id: 'soundcloud', name: 'SoundCloud', icon: '☁️' },
    { id: 'shazam', name: 'Shazam', icon: '🎼' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl h-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{artist.name}</h2>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded text-sm">
                + Follow for Priority Sync
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Sidebar and Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
            {/* Viberate Ranks */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span className="font-semibold text-sm">Viberate Ranks</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-600 font-bold">2,447</span>
                  <span className="text-red-500">+299</span>
                  <span>Overall</span>
                </div>
                <div className="flex justify-between">
                  <span>1</span>
                  <span className="text-green-500">↗</span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-2 bg-red-600"></span>
                    ALB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>433</span>
                  <span className="text-red-500">+45</span>
                  <span>Hip Hop</span>
                </div>
                <div className="flex justify-between">
                  <span>278</span>
                  <span className="text-red-500">+28</span>
                  <span>Contemporary Hip...</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3">Links</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs">♪</div>
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs">🍎</div>
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs">📺</div>
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs">🛒</div>
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs">💜</div>
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs">🎵</div>
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs">📱</div>
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs">🎧</div>
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs">🌐</div>
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs">🎬</div>
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs">📷</div>
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs">📘</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 text-sm">
              <button className="w-full text-left text-blue-600 hover:underline">Compare this artist →</button>
              <button className="w-full text-left text-blue-600 hover:underline">Download PDF ⬇</button>
              <button className="w-full text-left text-blue-600 hover:underline">Download CSV ⬇</button>
              <button className="w-full text-left text-blue-600 hover:underline">Go to public page →</button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Platform Tabs */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex gap-1 overflow-x-auto">
                {platformTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 text-sm rounded whitespace-nowrap flex items-center gap-1 ${
                      activeTab === tab.id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'overview' && renderOverviewTab()}
              {activeTab === 'audience' && renderAudienceTab()}
              {activeTab === 'tracks' && renderTracksTab()}
              {activeTab === 'spotify' && renderSpotifyTab()}
              {(activeTab === 'playlists' || activeTab === 'youtube' || activeTab === 'radio' || 
                activeTab === 'tiktok' || activeTab === 'instagram' || activeTab === 'social' || 
                activeTab === 'network' || activeTab === 'beatport' || activeTab === 'soundcloud' || 
                activeTab === 'shazam') && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🚧</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {platformTabs.find(tab => tab.id === activeTab)?.name} Analytics
                  </h3>
                  <p className="text-gray-600">
                    Comprehensive {platformTabs.find(tab => tab.id === activeTab)?.name.toLowerCase()} analytics and insights coming soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
