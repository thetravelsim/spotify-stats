import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EnhancedArtistProfile from './EnhancedArtistProfile';

const AnalyticsPlatformWorkingFixed = () => {
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
      genre: 'Hip Hop',
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
      id: 1,
      rank: 1,
      title: "Houdini",
      artist: "Dua Lipa",
      album: "Radical Optimism",
      cover: "/album1.jpg",
      duration: "3:06",
      streams: "2.1B",
      weeklyStreams: "45.2M",
      growth: "+15.3%",
      momentum: "explosive",
      change: "+2"
    },
    {
      id: 2,
      rank: 2,
      title: "Praising You",
      artist: "Rita Ora ft. Fatboy Slim",
      album: "You & I",
      cover: "/album2.jpg",
      duration: "3:24",
      streams: "890M",
      weeklyStreams: "28.7M",
      growth: "+8.9%",
      momentum: "rising",
      change: "+1"
    },
    {
      id: 3,
      rank: 3,
      title: "100 Kile",
      artist: "Noizy",
      album: "Alpha",
      cover: "/album3.jpg",
      duration: "3:45",
      streams: "156M",
      weeklyStreams: "12.4M",
      growth: "+22.1%",
      momentum: "explosive",
      change: "+5"
    }
  ];

  const renderTopSongs = () => (
    <div className="viberate-card">
      <div className="viberate-card-header">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Top Songs - Weekly Chart</h2>
          <div className="flex space-x-2">
            <button className="viberate-btn-secondary text-sm">Weekly</button>
            <button className="viberate-btn-secondary text-sm">Monthly</button>
            <button className="viberate-btn-secondary text-sm">Export CSV</button>
          </div>
        </div>
      </div>

      <div className="viberate-table">
        <table className="min-w-full">
          <thead className="viberate-table-header">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Track
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Artist
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Streams
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weekly Streams
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
            {topSongs.map((song) => (
              <tr key={song.id} className="viberate-table-row">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="viberate-rank">#{song.rank}</span>
                    {song.rank === 1 && <span className="text-yellow-500">👑</span>}
                    {song.rank === 2 && <span className="text-gray-400">🥈</span>}
                    {song.rank === 3 && <span className="text-orange-600">🥉</span>}
                    <span className="viberate-rank-change-positive text-xs">
                      {song.change}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-300 rounded overflow-hidden">
                      <img src={song.cover} alt={song.album} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{song.title}</div>
                      <div className="text-xs text-gray-500">{song.album}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {song.artist}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {song.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {song.streams}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {song.weeklyStreams}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`viberate-badge-${
                    song.momentum === 'explosive' ? 'success' : 
                    song.momentum === 'rising' ? 'info' : 'warning'
                  }`}>
                    {song.momentum}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="viberate-rank-change-positive">
                    {song.growth}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            📊 Total Streams: <span className="font-medium">3.1B</span> • 
            🔥 Average Growth: <span className="font-medium">+15.4%</span> • 
            📈 Rising Tracks: <span className="font-medium">3/3</span>
          </div>
          <div className="text-xs">
            Updated 2 hours ago
          </div>
        </div>
      </div>
    </div>
  );

  const renderArtistsTable = () => (
    <div className="viberate-card">
      <div className="viberate-card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-medium text-gray-900">Artists</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="viberate-btn-secondary text-sm"
              >
                Advanced Filters
              </button>
              <button className="viberate-btn-secondary text-sm">
                Export CSV
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Showing 1-3 of 3 results
          </div>
        </div>
      </div>

      <div className="viberate-table">
        <table className="min-w-full">
          <thead className="viberate-table-header">
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
              <tr key={artist.id} className="viberate-table-row">
                <td className="px-6 py-4 whitespace-nowrap text-sm viberate-rank">
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
                          className="font-medium text-gray-900 hover:text-red-600 hover:underline cursor-pointer"
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
                  <div className="viberate-score">{artist.platformScore}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {artist.followers}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {artist.streams}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`viberate-badge-${
                    artist.momentum === 'very high' ? 'success' : 
                    artist.momentum === 'high' ? 'info' : 'warning'
                  }`}>
                    {artist.momentum}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="viberate-rank-change-positive">
                    {artist.growth}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex viberate-theme">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} viberate-sidebar transition-all duration-300 flex flex-col`}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className={`${sidebarCollapsed ? 'hidden' : 'block'}`}>
              <div className="viberate-logo">
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
              className={`viberate-sidebar-item w-full flex items-center ${
                activeTab === 'artists' ? 'active' : ''
              }`}
            >
              <span className="mr-3">👥</span>
              {!sidebarCollapsed && 'Artists'}
            </button>
            <button
              onClick={() => setActiveTab('tracks')}
              className={`viberate-sidebar-item w-full flex items-center ${
                activeTab === 'tracks' ? 'active' : ''
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
        <header className="viberate-header">
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
                    className="viberate-search w-80 px-4 py-2"
                  />
                </div>
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  🔔
                  <span className="viberate-notification absolute -top-1 -right-1">
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
    </div>
  );
};

export default AnalyticsPlatformWorkingFixed;
