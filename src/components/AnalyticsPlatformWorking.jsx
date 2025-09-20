import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EnhancedArtistProfile from './EnhancedArtistProfile';

const AnalyticsPlatformWorking = () => {
  const [activeTab, setActiveTab] = useState('artists');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  // Mock data for artists
  const artists = [
    {
      id: 1,
      name: 'Dua Lipa',
      country: 'United Kingdom',
      countryCode: '🇬🇧',
      genre: 'Pop',
      platformRank: 1,
      platformScore: 95,
      followers: '46.6M',
      streams: '1.6B',
      socialBuzz: 92,
      momentum: 'very high',
      growth: '+12.5%',
      initials: 'DL',
      verified: true,
      label: 'Warner Records',
      photo: '/dua-lipa.jpg'
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
      streams: '565.6M',
      socialBuzz: 75,
      momentum: 'medium',
      growth: '+8.7%',
      initials: 'RO',
      verified: true,
      label: 'Atlantic Records',
      photo: '/rita-ora.jpg'
    },
    {
      id: 3,
      name: 'Noizy',
      country: 'Albania',
      countryCode: '🇦🇱',
      genre: 'Albanian Pop',
      platformRank: 4,
      platformScore: 75,
      followers: '812.3K',
      streams: '28.5M',
      socialBuzz: 80,
      momentum: 'very high',
      growth: '+32.8%',
      initials: 'N',
      verified: true,
      label: 'OTR Records',
      photo: '/noizy.jpg'
    }
  ];

  // Mock data for top songs
  const topSongs = [
    {
      rank: 1,
      title: 'Flowers',
      artist: 'Miley Cyrus',
      streams: '45.8M',
      growth: '+15.2%',
      momentum: 'rising',
      change: '+2'
    },
    {
      rank: 2,
      title: 'Anti-Hero',
      artist: 'Taylor Swift', 
      streams: '42.3M',
      growth: '-2.8%',
      momentum: 'stable',
      change: '-1'
    },
    {
      rank: 4,
      title: 'Pronto',
      artist: 'Noizy',
      streams: '28.5M',
      growth: '+25.8%',
      momentum: 'explosive',
      change: '+2'
    }
  ];

  // Streaming data for charts
  const streamingData = [
    { day: 'Mon', streams: 1200000 },
    { day: 'Tue', streams: 1350000 },
    { day: 'Wed', streams: 1180000 },
    { day: 'Thu', streams: 1420000 },
    { day: 'Fri', streams: 1580000 },
    { day: 'Sat', streams: 1650000 },
    { day: 'Sun', streams: 1480000 }
  ];

  const platformData = [
    { name: 'Spotify', value: 45, color: '#1DB954' },
    { name: 'Apple Music', value: 25, color: '#FA243C' },
    { name: 'YouTube Music', value: 15, color: '#FF0000' },
    { name: 'Amazon Music', value: 8, color: '#FF9900' },
    { name: 'Others', value: 7, color: '#8884d8' }
  ];

  const renderArtistsTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-medium text-gray-900">Artists</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Advanced Filters
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                Export CSV
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Showing 1-3 of 3 results
          </div>
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genres</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Pop</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Albanian Pop</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Countries</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">🇦🇱 Albania</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">🇬🇧 United Kingdom</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Momentum</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>All</option>
                <option>Very High</option>
                <option>High</option>
                <option>Medium</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Artist
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Followers
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Streams
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Momentum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Growth
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {artists.map((artist) => (
              <tr key={artist.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #{artist.platformRank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden">
                      {artist.photo ? (
                        <img src={artist.photo} alt={artist.name} className="w-full h-full object-cover" />
                      ) : (
                        artist.initials
                      )}
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
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{artist.countryCode} {artist.country}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-blue-600">{artist.platformScore}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {artist.followers}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {artist.streams}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    artist.momentum === 'very high' ? 'bg-red-100 text-red-800' :
                    artist.momentum === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {artist.momentum}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  {artist.growth}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTopSongs = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Top Songs - This Week</h2>
        <div className="space-y-4">
          {topSongs.map((song) => (
            <div key={song.rank} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">#{song.rank}</span>
                  {song.rank <= 3 && (
                    <span className="text-lg">
                      {song.rank === 1 ? '👑' : song.rank === 2 ? '🥈' : '🥉'}
                    </span>
                  )}
                </div>
                <div className="w-12 h-12 bg-gray-300 rounded"></div>
                <div>
                  <div className="font-medium text-gray-900">{song.title}</div>
                  <div className="text-sm text-gray-500">{song.artist}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-medium text-gray-900">{song.streams}</div>
                  <div className={`text-sm ${song.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {song.growth}
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  song.momentum === 'explosive' ? 'bg-red-100 text-red-800' :
                  song.momentum === 'rising' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {song.momentum}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Streaming Analytics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Weekly Streams</h4>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={streamingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="streams" stroke="#dc2626" fill="#dc2626" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Platform Distribution</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
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
      </div>
    </div>
  );
      <div className="min-h-screen bg-gray-50 flex viberate-theme">
        {/* Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} viberate-sidebar transition-all duration-300 flex flex-col`}>className="p-4">
          <div className="flex items-center justify-between">
            <div className={`${sidebarCollapsed ? 'hidden' : 'block'}`}>
              <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
                🇦🇱 Albanian Music Analytics
              </div>
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              ☰
            </button>
          </div>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <button
              onClick={() => setActiveTab('artists')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'artists' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">👥</span>
              {!sidebarCollapsed && 'Artists'}
            </button>
            <button
              onClick={() => setActiveTab('tracks')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'tracks' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">🎵</span>
              {!sidebarCollapsed && 'Tracks'}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  {activeTab === 'artists' ? 'Artist Analytics' : 'Top Songs'}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, URL, Spotify ID, or ISRC"
                    className="w-80 px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  🔔
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === 'artists' && renderArtistsTable()}
          {activeTab === 'tracks' && renderTopSongs()}
        </main>
      </div>

      {/* Artist Profile Modal */}
      {selectedArtist && (
        <EnhancedArtistProfile 
          artist={selectedArtist} 
          onClose={() => setSelectedArtist(null)} 
        />
      )}
      {false && selectedArtist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold">
                    {selectedArtist.initials}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedArtist.name}</h2>
                    <p className="text-gray-600">{selectedArtist.countryCode} {selectedArtist.country} • {selectedArtist.genre}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArtist(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Platform Score</div>
                  <div className="text-2xl font-bold text-blue-600">{selectedArtist.platformScore}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Followers</div>
                  <div className="text-2xl font-bold text-gray-900">{selectedArtist.followers}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Total Streams</div>
                  <div className="text-2xl font-bold text-gray-900">{selectedArtist.streams}</div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Comprehensive artist profile with detailed analytics, audience insights, 
                  top tracks, and platform-specific metrics coming soon.
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">S</div>
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">Y</div>
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white">I</div>
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">T</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPlatformWorking;
