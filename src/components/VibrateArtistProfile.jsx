import React, { useState } from 'react';

const VibrateArtistProfile = ({ artist, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data based on Noizy screenshot
  const artistData = {
    name: 'Noizy',
    photo: '/api/placeholder/300/300', // Large circular photo
    ranks: {
      overall: { rank: 2447, change: '+299', label: 'Overall' },
      alb: { rank: 1, change: '+', label: 'ALB', flag: '🇦🇱' },
      hipHop: { rank: 433, change: '+45', label: 'Hip Hop' },
      contemporary: { rank: 278, change: '+28', label: 'Contemporary Hip...' }
    },
    topTracks: [
      {
        title: 'Follow You',
        artist: 'Noizy',
        streams: '1.2M',
        period: '7-day streams',
        thumbnail: '/api/placeholder/200/150',
        hasPlayButton: true
      },
      {
        title: 'Nero',
        artist: 'Konstantinos Argiros, Noizy',
        streams: '852.6K',
        period: '7-day streams',
        thumbnail: '/api/placeholder/200/150',
        hasPlayButton: true
      },
      {
        title: 'Toto (feat. RAF Camora)',
        artist: 'Noizy, Raf Camora',
        streams: '505.6K',
        period: '7-day streams',
        thumbnail: '/api/placeholder/200/150',
        hasPlayButton: true
      },
      {
        title: 'Noizy - Icon (Official Video)',
        artist: 'thisisnoiszy',
        streams: '764.9K',
        period: '7-day views',
        thumbnail: '/api/placeholder/200/150',
        hasPlayButton: true,
        uploadDate: 'Uploaded on Jun 14, 2029'
      }
    ],
    careerHealth: [
      { label: 'FAIR', value: 65, color: 'yellow' },
      { label: 'FAIR', value: 70, color: 'yellow' },
      { label: 'GOOD', value: 85, color: 'green' }
    ],
    socialLinks: [
      { platform: 'spotify', icon: '🎵' },
      { platform: 'apple', icon: '🍎' },
      { platform: 'youtube', icon: '📺' },
      { platform: 'amazon', icon: '📦' },
      { platform: 'deezer', icon: '🎶' },
      { platform: 'discord', icon: '💬' },
      { platform: 'instagram', icon: '📷' },
      { platform: 'tiktok', icon: '🎬' },
      { platform: 'twitter', icon: '🐦' },
      { platform: 'facebook', icon: '👥' },
      { platform: 'linkedin', icon: '💼' },
      { platform: 'website', icon: '🌐' }
    ]
  };

  const platformTabs = [
    { id: 'overview', label: 'Overview', icon: '📊', active: true },
    { id: 'audience', label: 'Audience', icon: '👥' },
    { id: 'tracks', label: 'Tracks', icon: '🎵' },
    { id: 'spotify', label: 'Spotify', icon: '🎵', color: 'green' },
    { id: 'playlists', label: 'Playlists', icon: '📋', color: 'green' },
    { id: 'playlists2', label: 'Playlists', icon: '📋', color: 'pink' },
    { id: 'youtube', label: 'YouTube', icon: '📺', color: 'red' },
    { id: 'radio', label: 'Radio Airplay', icon: '📻', color: 'orange' },
    { id: 'tiktok', label: 'TikTok', icon: '🎬', color: 'black' },
    { id: 'instagram', label: 'Instagram', icon: '📷', color: 'pink' },
    { id: 'social', label: 'Social Media', icon: '👥', color: 'blue' },
    { id: 'network', label: 'Network', icon: '🔗', color: 'gray' },
    { id: 'beatport', label: 'Beatport', icon: '🎧', color: 'green' },
    { id: 'soundcloud', label: 'SoundCloud', icon: '☁️', color: 'orange' },
    { id: 'more', label: 'More', icon: '⋯' }
  ];

  const renderGaugeChart = (value, label, color) => {
    const circumference = 2 * Math.PI * 40;
    const strokeDasharray = `${(value / 100) * circumference} ${circumference}`;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={color === 'green' ? '#10b981' : color === 'yellow' ? '#f59e0b' : '#ef4444'}
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold">{value}%</span>
          </div>
        </div>
        <span className="text-xs text-gray-600 mt-2">{label}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r overflow-y-auto">
        <div className="p-6">
          {/* Artist Photo and Name */}
          <div className="text-center mb-6">
            <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
              <img 
                src={artistData.photo} 
                alt={artistData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{artistData.name}</h1>
            
            {/* Follow Button and Menu */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                <span>+</span>
                Follow for Priority Sync
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                ⋯
              </button>
            </div>
          </div>

          {/* Viberate Ranks */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-red-600 text-white text-xs font-bold flex items-center justify-center">
                V
              </div>
              <span className="font-medium text-gray-900">Viberate Ranks</span>
              <span className="text-gray-400">ⓘ</span>
            </div>
            
            <div className="space-y-3">
              {Object.entries(artistData.ranks).map(([key, rank]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{rank.rank.toLocaleString()}</span>
                    <span className="text-sm text-green-600">{rank.change}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {rank.flag && <span>{rank.flag}</span>}
                    <span className="text-sm text-gray-600">{rank.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Links</h3>
            <div className="grid grid-cols-6 gap-2">
              {artistData.socialLinks.map((link, index) => (
                <button
                  key={index}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm hover:bg-gray-200"
                >
                  {link.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="space-y-3">
            <button className="w-full text-left text-blue-600 text-sm hover:underline flex items-center justify-between">
              Compare this artist
              <span>→</span>
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
                  tab.color === 'black' ? 'bg-black' :
                  tab.color === 'blue' ? 'bg-blue-500' :
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
              {/* Top 100 Chart Positions */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Top 100 Chart Positions</h2>
                  <button className="text-blue-600 hover:underline text-sm">Save</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-green-500 text-white p-6 rounded-lg relative overflow-hidden">
                    <div className="text-4xl font-bold mb-2">1<sup className="text-lg">st</sup></div>
                    <div className="text-sm mb-4">Spotify Followers<br />in Albania</div>
                    <div className="absolute bottom-4 right-4">
                      <div className="w-12 h-12 border-4 border-white border-opacity-30 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-500 text-white p-6 rounded-lg relative overflow-hidden">
                    <div className="text-4xl font-bold mb-2">1<sup className="text-lg">st</sup></div>
                    <div className="text-sm mb-4">Youtube<br />Subscribers in<br />Albania</div>
                    <div className="absolute bottom-4 right-4">
                      <div className="w-12 h-12 border-4 border-white border-opacity-30 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-600 text-white p-6 rounded-lg relative overflow-hidden">
                    <div className="text-4xl font-bold mb-2">1<sup className="text-lg">st</sup></div>
                    <div className="text-sm mb-4">Youtube Video<br />Views in Albania</div>
                    <div className="absolute bottom-4 right-4">
                      <div className="w-12 h-12 border-4 border-white border-opacity-30 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-red-700 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-pink-500 text-white p-6 rounded-lg relative overflow-hidden">
                    <div className="text-4xl font-bold mb-2">1<sup className="text-lg">st</sup></div>
                    <div className="text-sm mb-4">Instagram Post<br />Likes in Albania</div>
                    <div className="absolute bottom-4 right-4">
                      <div className="w-12 h-12 border-4 border-white border-opacity-30 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Fanbase Distribution */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Total Fanbase Distribution</h2>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:underline text-sm">Export CSV</button>
                    <button className="text-blue-600 hover:underline text-sm">Save</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Pie Chart */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <svg width="300" height="300" viewBox="0 0 300 300">
                        {/* Spotify - Green */}
                        <path d="M 150,150 L 150,50 A 100,100 0 0,1 220,80 Z" fill="#1DB954" />
                        {/* YouTube - Red */}
                        <path d="M 150,150 L 220,80 A 100,100 0 0,1 250,150 Z" fill="#FF0000" />
                        {/* Instagram - Pink */}
                        <path d="M 150,150 L 250,150 A 100,100 0 1,1 80,220 Z" fill="#E4405F" />
                        {/* TikTok - Black */}
                        <path d="M 150,150 L 80,220 A 100,100 0 0,1 50,150 Z" fill="#000000" />
                        {/* Other platforms */}
                        <path d="M 150,150 L 50,150 A 100,100 0 0,1 150,50 Z" fill="#8B5CF6" />
                        
                        {/* Center circle */}
                        <circle cx="150" cy="150" r="60" fill="white" />
                        <text x="150" y="140" textAnchor="middle" className="text-2xl font-bold" fill="#1f2937">5.8M</text>
                        <text x="150" y="160" textAnchor="middle" className="text-sm" fill="#6b7280">Total Fanbase Size</text>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Platform Stats */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase">SPOTIFY</div>
                          <div className="text-2xl font-bold">837.3K</div>
                          <div className="text-xs text-gray-500">Followers</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase">YOUTUBE</div>
                          <div className="text-2xl font-bold">1.8M</div>
                          <div className="text-xs text-gray-500">Subscribers</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase">INSTAGRAM</div>
                          <div className="text-2xl font-bold">2.2M</div>
                          <div className="text-xs text-gray-500">Followers</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase">FACEBOOK</div>
                          <div className="text-2xl font-bold">54.7K</div>
                          <div className="text-xs text-gray-500">Followers</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase">DEEZER</div>
                          <div className="text-2xl font-bold">62.3K</div>
                          <div className="text-xs text-gray-500">Fans</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase">TIKTOK</div>
                          <div className="text-2xl font-bold">740.9K</div>
                          <div className="text-xs text-gray-500">Followers</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Tracks And Video */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Tracks And Video</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {artistData.topTracks.map((track, index) => (
                    <div key={index} className="bg-white border rounded-lg overflow-hidden">
                      <div className="relative">
                        <img 
                          src={track.thumbnail} 
                          alt={track.title}
                          className="w-full h-32 object-cover"
                        />
                        {track.hasPlayButton && (
                          <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                              <span className="text-black text-xl">▶</span>
                            </div>
                          </button>
                        )}
                        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                          <div className="flex items-center gap-1">
                            <span className="text-green-400">●</span>
                            {track.streams}
                          </div>
                          <div className="text-xs opacity-75">{track.period}</div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-gray-900 text-sm mb-1">{track.title}</h3>
                        <p className="text-gray-600 text-xs">{track.artist}</p>
                        {track.uploadDate && (
                          <p className="text-gray-500 text-xs mt-1">{track.uploadDate}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Health */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Career Health</h2>
                <div className="flex justify-center gap-12">
                  {artistData.careerHealth.map((health, index) => (
                    <div key={index}>
                      {renderGaugeChart(health.value, health.label, health.color)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VibrateArtistProfile;
