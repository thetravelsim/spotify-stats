import React, { useState } from 'react';

const MobileOptimizedAlbanianMusicPlatform = () => {
  const [activeTab, setActiveTab] = useState('weekly-artists');
  const [selectedArtist, setSelectedArtist] = useState(null);

  const artists = [
    {
      id: 1,
      name: "Dua Lipa",
      country: "Albania/UK",
      category: "international",
      genre: "Pop",
      weeklyStreams: "45.2M",
      monthlyListeners: "75.4M",
      growth: "+8.5%",
      momentum: "explosive",
      platformScore: 95,
      avatar: "D",
      rank: 1,
      spotifyFollowers: "87.2M",
      youtubeSubscribers: "25.8M",
      instagramFollowers: "88.7M",
      tiktokFollowers: "12.4M",
      overallRank: 2447,
      albaniaRank: 1,
      genreRank: 433
    },
    {
      id: 2,
      name: "Rita Ora",
      country: "Albania/UK", 
      category: "international",
      genre: "Pop",
      weeklyStreams: "18.5M",
      monthlyListeners: "28.9M",
      growth: "+4.2%",
      momentum: "rising",
      platformScore: 78,
      avatar: "R",
      rank: 2,
      spotifyFollowers: "12.5M",
      youtubeSubscribers: "8.9M",
      instagramFollowers: "16.2M",
      tiktokFollowers: "3.8M",
      overallRank: 5892,
      albaniaRank: 2,
      genreRank: 1205
    },
    {
      id: 3,
      name: "Noizy",
      country: "Albania",
      category: "local", 
      genre: "Hip Hop",
      weeklyStreams: "8.9M",
      monthlyListeners: "3.2M",
      growth: "+12.3%",
      momentum: "rising",
      platformScore: 75,
      avatar: "N",
      rank: 3,
      spotifyFollowers: "2.1M",
      youtubeSubscribers: "1.8M",
      instagramFollowers: "2.9M",
      tiktokFollowers: "890K",
      overallRank: 12450,
      albaniaRank: 3,
      genreRank: 2890
    }
  ];

  const songs = [
    {
      id: 1,
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      weeklyStreams: "15.2M",
      monthlyStreams: "58.2M",
      growth: "+12.5%",
      momentum: "explosive",
      rank: 1,
      weeksOnChart: 156,
      peakPosition: 1
    },
    {
      id: 2,
      title: "OTR",
      artist: "Noizy",
      album: "Single",
      weeklyStreams: "8.9M", 
      monthlyStreams: "28.9M",
      growth: "-5.2%",
      momentum: "declining",
      rank: 2,
      weeksOnChart: 32,
      peakPosition: 1
    },
    {
      id: 3,
      title: "Don't Start Now",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      weeklyStreams: "7.8M",
      monthlyStreams: "32.1M", 
      growth: "+8.3%",
      momentum: "rising",
      rank: 3,
      weeksOnChart: 189,
      peakPosition: 1
    }
  ];

  const getMomentumColor = (momentum) => {
    switch(momentum) {
      case 'explosive': return 'bg-green-500';
      case 'rising': return 'bg-blue-500';
      case 'stable': return 'bg-orange-500';
      case 'declining': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const ArtistModal = ({ artist, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
                {artist.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{artist.name}</h2>
                <p className="text-blue-100">{artist.country} • {artist.genre}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white text-2xl">×</button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Platform Rankings */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Platform Rankings</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Overall Rank</span>
                <span className="text-xl font-bold text-blue-600">#{artist.overallRank.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="font-medium">Albania Rank</span>
                <span className="text-xl font-bold text-red-600">#{artist.albaniaRank}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="font-medium">{artist.genre} Rank</span>
                <span className="text-xl font-bold text-purple-600">#{artist.genreRank}</span>
              </div>
            </div>
          </div>

          {/* Social Media Stats */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Social Media Following</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-600 font-medium">Spotify Followers</div>
                <div className="text-2xl font-bold text-green-700">{artist.spotifyFollowers}</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-sm text-red-600 font-medium">YouTube Subscribers</div>
                <div className="text-2xl font-bold text-red-700">{artist.youtubeSubscribers}</div>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <div className="text-sm text-pink-600 font-medium">Instagram Followers</div>
                <div className="text-2xl font-bold text-pink-700">{artist.instagramFollowers}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-purple-600 font-medium">TikTok Followers</div>
                <div className="text-2xl font-bold text-purple-700">{artist.tiktokFollowers}</div>
              </div>
            </div>
          </div>

          {/* Streaming Stats */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Streaming Performance</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600 font-medium">Weekly Streams</div>
                <div className="text-2xl font-bold text-blue-700">{artist.weeklyStreams}</div>
                <div className="text-sm text-green-600">{artist.growth}</div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="text-sm text-indigo-600 font-medium">Monthly Listeners</div>
                <div className="text-2xl font-bold text-indigo-700">{artist.monthlyListeners}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 font-medium">Platform Score</div>
                <div className="text-2xl font-bold text-gray-700">{artist.platformScore}/100</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{width: `${artist.platformScore}%`}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArtistCard = (artist) => (
    <div 
      key={artist.id}
      className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => setSelectedArtist(artist)}
    >
      <div className="flex items-center space-x-4 mb-3">
        <div className="text-2xl">{getRankIcon(artist.rank)}</div>
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-lg">
          {artist.avatar}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">{artist.name}</h3>
          <p className="text-sm text-gray-600">{artist.country}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-xs text-blue-600 font-medium">Weekly Streams</div>
          <div className="text-lg font-bold text-blue-700">{artist.weeklyStreams}</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="text-xs text-purple-600 font-medium">Monthly Listeners</div>
          <div className="text-lg font-bold text-purple-700">{artist.monthlyListeners}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getMomentumColor(artist.momentum)}`}>
            {artist.momentum}
          </span>
          <span className="text-sm font-medium text-green-600">{artist.growth}</span>
        </div>
        <div className="text-sm font-medium text-gray-600">Score: {artist.platformScore}</div>
      </div>
    </div>
  );

  const renderSongCard = (song) => (
    <div key={song.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center space-x-4 mb-3">
        <div className="text-2xl">{getRankIcon(song.rank)}</div>
        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-2xl">🎵</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">{song.title}</h3>
          <p className="text-sm text-gray-600">{song.artist}</p>
          <p className="text-xs text-gray-500">{song.album}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-xs text-green-600 font-medium">Weekly Streams</div>
          <div className="text-lg font-bold text-green-700">{song.weeklyStreams}</div>
        </div>
        <div className="bg-indigo-50 p-3 rounded-lg">
          <div className="text-xs text-indigo-600 font-medium">Monthly Streams</div>
          <div className="text-lg font-bold text-indigo-700">{song.monthlyStreams}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getMomentumColor(song.momentum)}`}>
            {song.momentum}
          </span>
          <span className="text-sm font-medium text-green-600">{song.growth}</span>
        </div>
        <div className="text-xs text-gray-500">{song.weeksOnChart} weeks on chart</div>
      </div>
    </div>
  );

  const getTabData = () => {
    switch(activeTab) {
      case 'weekly-artists':
        return { title: 'Weekly Artists Chart', data: artists, type: 'artists' };
      case 'monthly-artists':
        return { title: 'Monthly Artists Chart', data: artists, type: 'artists' };
      case 'weekly-songs':
        return { title: 'Weekly Songs Chart', data: songs, type: 'songs' };
      case 'monthly-songs':
        return { title: 'Monthly Songs Chart', data: songs, type: 'songs' };
      default:
        return { title: 'Weekly Artists Chart', data: artists, type: 'artists' };
    }
  };

  const tabData = getTabData();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-red-600 text-center">Albanian Music Analytics</h1>
        <p className="text-sm text-gray-600 text-center mt-1">Mobile-Optimized Platform</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="flex overflow-x-auto">
          {[
            { id: 'weekly-artists', label: 'Weekly Artists', icon: '🏆' },
            { id: 'monthly-artists', label: 'Monthly Artists', icon: '📅' },
            { id: 'weekly-songs', label: 'Weekly Songs', icon: '🎵' },
            { id: 'monthly-songs', label: 'Monthly Songs', icon: '🎧' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === tab.id 
                  ? 'border-blue-500 text-blue-600 bg-blue-50' 
                  : 'border-transparent text-gray-500'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600">{tabData.data.length}</div>
            <div className="text-sm text-gray-600">Charting {tabData.type === 'artists' ? 'Artists' : 'Songs'}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">119.1M</div>
            <div className="text-sm text-gray-600">Total Streams</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-purple-600">2</div>
            <div className="text-sm text-gray-600">Rising</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-orange-600">8%</div>
            <div className="text-sm text-gray-600">Avg Growth</div>
          </div>
        </div>

        {/* Chart Title */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800">{tabData.title}</h2>
          <p className="text-sm text-gray-600">Complete database from Viberate research</p>
        </div>

        {/* Content */}
        <div>
          {tabData.type === 'artists' 
            ? tabData.data.map(renderArtistCard)
            : tabData.data.map(renderSongCard)
          }
        </div>
      </div>

      {/* Artist Modal */}
      {selectedArtist && (
        <ArtistModal 
          artist={selectedArtist} 
          onClose={() => setSelectedArtist(null)} 
        />
      )}
    </div>
  );
};

export default MobileOptimizedAlbanianMusicPlatform;
