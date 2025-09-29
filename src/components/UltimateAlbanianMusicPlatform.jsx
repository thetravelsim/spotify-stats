import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Settings, Play, Heart, Share2, ExternalLink, TrendingUp, TrendingDown, Minus, Crown, Medal, Award, MapPin, Users, Music, Radio, Calendar, BarChart3, PieChart, LineChart, Globe, Headphones, Eye, ThumbsUp, MessageCircle, Repeat, Volume2, Mic, Star, Target, Zap, ArrowUp, ArrowDown, ChevronRight, ChevronLeft, MoreHorizontal, X, Check, AlertCircle, Info, Clock, Flame, Trophy } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, AreaChart, Area, RadialBarChart, RadialBar, Legend } from 'recharts';
import MusicDataService from '../services/MusicDataService';

const UltimateAlbanianMusicPlatform = () => {
  const [activeSection, setActiveSection] = useState('weekly-artists');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const artists = await MusicDataService.getArtists({ country: 'AL', limit: 50 });
        setFilteredData(artists);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allAlbanianArtists = filteredData;

  const allAlbanianSongs = [];


  const genres = [...new Set(allAlbanianArtists.map(artist => artist.genre))];
  const countries = [...new Set(allAlbanianArtists.map(artist => artist.country))];

  useEffect(() => {
    let data = activeSection.includes('artists') ? allAlbanianArtists : allAlbanianSongs;

    if (searchQuery) {
      data = data.filter(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenres.length > 0) {
      data = data.filter(item => selectedGenres.includes(item.genre));
    }

    if (selectedCountries.length > 0) {
      data = data.filter(item => selectedCountries.includes(item.country));
    }

    setFilteredData(data);
  }, [searchQuery, selectedGenres, selectedCountries, activeSection, allAlbanianArtists, allAlbanianSongs]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSelectedArtist(null);
  };

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
  };

  const renderGrowthIcon = (growth) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (growth < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const renderMomentum = (momentum) => {
    const styles = {
      explosive: 'bg-red-500 text-white',
      rising: 'bg-green-500 text-white',
      stable: 'bg-blue-500 text-white',
      declining: 'bg-yellow-500 text-white',
      default: 'bg-gray-500 text-white'
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${(styles[momentum] || styles.default)}`}>{momentum}</span>;
  };

  const renderRanking = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-yellow-600" />;
    return <span className="text-lg font-bold">{rank}</span>;
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num;
  };

  const renderArtistList = (data) => (
    <div className="space-y-4">
      {data.map((artist, index) => (
        <div key={artist.id} className="flex items-center p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-200" onClick={() => handleArtistClick(artist)}>
          <div className="flex items-center w-1/12">
            {renderRanking(index + 1)}
          </div>
          <div className="flex items-center w-5/12">
            <img src={artist.photo || '/default-artist.png'} alt={artist.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
            <div>
              <p className="font-bold text-white">{artist.name}</p>
              <p className="text-sm text-gray-400">{artist.genre}</p>
            </div>
          </div>
          <div className="w-2/12 text-center">
            <p className="font-semibold text-white">{formatNumber(activeSection.includes('weekly') ? artist.weeklyStreams : artist.monthlyStreams)}</p>
            <p className="text-xs text-gray-400">Streams</p>
          </div>
          <div className="w-2/12 text-center flex items-center justify-center">
            {renderGrowthIcon(activeSection.includes('weekly') ? artist.weeklyGrowth : artist.monthlyGrowth)}
            <span className={`ml-2 ${activeSection.includes('weekly') ? (artist.weeklyGrowth > 0 ? 'text-green-500' : 'text-red-500') : (artist.monthlyGrowth > 0 ? 'text-green-500' : 'text-red-500')}`}>
              {activeSection.includes('weekly') ? artist.weeklyGrowth : artist.monthlyGrowth}%
            </span>
          </div>
          <div className="w-2/12 text-center">
            {renderMomentum(artist.momentum)}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSongList = (data) => (
    <div className="space-y-4">
      {data.map((song, index) => (
        <div key={song.id} className="flex items-center p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center w-1/12">
            {renderRanking(index + 1)}
          </div>
          <div className="flex items-center w-5/12">
            <img src={song.image} alt={song.title} className="w-12 h-12 rounded-lg mr-4 object-cover" />
            <div>
              <p className="font-bold text-white">{song.title}</p>
              <p className="text-sm text-gray-400">{song.artist}</p>
            </div>
          </div>
          <div className="w-2/12 text-center">
            <p className="font-semibold text-white">{formatNumber(activeSection.includes('weekly') ? song.weeklyStreams : song.monthlyStreams)}</p>
            <p className="text-xs text-gray-400">Streams</p>
          </div>
          <div className="w-2/12 text-center flex items-center justify-center">
            {renderGrowthIcon(activeSection.includes('weekly') ? song.weeklyGrowth : song.monthlyGrowth)}
            <span className={`ml-2 ${activeSection.includes('weekly') ? (song.weeklyGrowth > 0 ? 'text-green-500' : 'text-red-500') : (song.monthlyGrowth > 0 ? 'text-green-500' : 'text-red-500')}`}>
              {activeSection.includes('weekly') ? song.weeklyGrowth : song.monthlyGrowth}%
            </span>
          </div>
          <div className="w-2/12 text-center">
            {renderMomentum(song.momentum)}
          </div>
        </div>
      ))}
    </div>
  );

  const renderArtistProfile = () => {
    if (!selectedArtist) return null;

    const streamData = [
      { name: 'Jan', streams: 4000 },
      { name: 'Feb', streams: 3000 },
      { name: 'Mar', streams: 5000 },
      { name: 'Apr', streams: 4500 },
      { name: 'May', streams: 6000 },
      { name: 'Jun', streams: 5500 },
      { name: 'Jul', streams: 7000 },
    ];

    const audienceData = [
      { name: 'Albania', value: 400, color: '#8884d8' },
      { name: 'Kosovo', value: 300, color: '#82ca9d' },
      { name: 'Germany', value: 300, color: '#ffc658' },
      { name: 'Switzerland', value: 200, color: '#ff8042' },
      { name: 'Italy', value: 278, color: '#00C49F' },
      { name: 'USA', value: 189, color: '#FFBB28' },
    ];

    const demographicsData = [
      { name: '13-17', value: 15 },
      { name: '18-24', value: 45 },
      { name: '25-34', value: 30 },
      { name: '35-44', value: 8 },
      { name: '45+', value: 2 },
    ];

    const socialData = {
      spotify: { followers: selectedArtist.spotifyFollowers, growth: 5.2 },
      instagram: { followers: 12300000, growth: 3.1 },
      tiktok: { followers: 8900000, growth: 12.8 },
      youtube: { subscribers: 5400000, growth: 2.5 },
    };

    const topTracks = [
      { id: 1, title: 'Song One', streams: 12000000, release: '2023-05-12' },
      { id: 2, title: 'Song Two', streams: 9800000, release: '2023-02-28' },
      { id: 3, title: 'Song Three', streams: 7600000, release: '2022-11-10' },
      { id: 4, title: 'Song Four', streams: 5400000, release: '2023-08-01' },
      { id: 5, title: 'Song Five', streams: 3200000, release: '2022-07-15' },
    ];

    const playlistPlacements = [
      { id: 1, name: "Today's Top Hits", platform: 'Spotify', followers: 32000000, position: 5 },
      { id: 2, name: 'RapCaviar', platform: 'Spotify', followers: 15000000, position: 12 },
      { id: 3, name: 'Pop Rising', platform: 'Spotify', followers: 2000000, position: 3 },
      { id: 4, name: 'Global Top 50', platform: 'Apple Music', followers: 18000000, position: 8 },
    ];

    return (
      <div className="bg-gray-900 text-white p-8 rounded-lg">
        <div className="flex items-center mb-8">
          <button onClick={() => setSelectedArtist(null)} className="mr-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <img src={selectedArtist.photo || 
            (selectedArtist.category === 'international' && selectedArtist.name === 'Dua Lipa' ? '/dua-lipa.jpg' : 
            selectedArtist.category === 'international' && selectedArtist.name === 'Rita Ora' ? '/rita-ora.jpg' : 
            selectedArtist.category === 'international' && selectedArtist.name === 'Bebe Rexha' ? '/bebe-rexha.jpg' : 
            selectedArtist.category === 'international' && selectedArtist.name === 'Ava Max' ? '/ava-max.jpg' : 
            selectedArtist.category === 'diaspora' && selectedArtist.name === 'Capital Bra' ? '/capital-bra.jpg' : 
            selectedArtist.category === 'diaspora' && selectedArtist.name === 'Dardan' ? '/dardan.jpg' : 
            selectedArtist.category === 'diaspora' && selectedArtist.name === 'Azet' ? '/azet.jpg' : 
            selectedArtist.category === 'diaspora' && selectedArtist.name === 'Loredana Zefi' ? '/loredana-zefi.jpg' : 
            selectedArtist.category === 'local' && selectedArtist.name === 'Noizy' ? '/noizy.jpg' : 
            selectedArtist.category === 'local' && selectedArtist.name === 'Don Xhoni' ? '/don-xhoni.jpg' : 
            selectedArtist.category === 'local' && selectedArtist.name === 'Dhurata Dora' ? '/dhurata-dora.jpg' : 
            selectedArtist.category === 'local' && selectedArtist.name === 'Finem' ? '/finem.jpg' : 
            selectedArtist.category === 'local' && selectedArtist.name === 'Ghetto Geasy' ? '/ghetto-geasy.jpg' : 
            selectedArtist.category === 'local' && selectedArtist.name === 'Elai' ? '/elai.jpg' : 
            selectedArtist.category === 'kosovo' && selectedArtist.name === 'Era Istrefi' ? '/era-istrefi.jpg' : 
            selectedArtist.category === 'kosovo' && selectedArtist.name === 'Tayna' ? '/tayna.jpg' : 
            selectedArtist.category === 'kosovo' && selectedArtist.name === 'Dafina Zeqiri' ? '/dafina-zeqiri.jpg' : 
            selectedArtist.category === 'kosovo' && selectedArtist.name === 'Ledri Vula' ? '/ledri-vula.jpg' : 
            selectedArtist.category === 'kosovo' && selectedArtist.name === 'Mozzik' ? '/mozzik.jpg' : 
            selectedArtist.category === 'kosovo' && selectedArtist.name === 'Gjiko' ? '/gjiko.jpg' : 
            selectedArtist.category === 'kosovo' && selectedArtist.name === 'MC Kresha' ? '/mc-kresha.jpg' : 
            selectedArtist.category === 'kosovo' && selectedArtist.name === '2Ton' ? '/2ton.jpg' : 
            selectedArtist.category === 'local' && selectedArtist.name === 'Butrint Imeri' ? '/butrint-imeri.jpg' : 
            '/default-artist.png')} alt={selectedArtist.name} className="w-24 h-24 rounded-full mr-6 object-cover" />
          <div>
            <h2 className="text-4xl font-bold">{selectedArtist.name}</h2>
            <div className="flex items-center text-gray-400 mt-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{selectedArtist.country}</span>
              <span className="mx-2">|</span>
              <Music className="w-4 h-4 mr-2" />
              <span>{selectedArtist.genre}</span>
            </div>
          </div>
          <div className="ml-auto flex space-x-2">
            <button className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600"><Play className="w-6 h-6" /></button>
            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"><Heart className="w-6 h-6" /></button>
            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"><Share2 className="w-6 h-6" /></button>
            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"><MoreHorizontal className="w-6 h-6" /></button>
          </div>
        </div>

        <div className="flex border-b border-gray-700 mb-6">
          {['overview', 'charts', 'audience', 'social', 'playlists'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize ${activeTab === tab ? 'border-b-2 border-green-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Streaming Performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={streamData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                    <XAxis dataKey="name" tick={{ fill: '#A0AEC0' }} />
                    <YAxis tick={{ fill: '#A0AEC0' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: 'none' }} />
                    <Line type="monotone" dataKey="streams" stroke="#48BB78" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Key Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center"><Headphones className="w-4 h-4 mr-2" /> Monthly Listeners</span>
                  <span className="font-bold text-lg">{formatNumber(selectedArtist.monthlyListeners)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center"><Radio className="w-4 h-4 mr-2" /> Platform Score</span>
                  <span className="font-bold text-lg text-green-400">{selectedArtist.platformScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center"><TrendingUp className="w-4 h-4 mr-2" /> Momentum</span>
                  {renderMomentum(selectedArtist.momentum)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center"><Users className="w-4 h-4 mr-2" /> Spotify Followers</span>
                  <span className="font-bold text-lg">{formatNumber(selectedArtist.spotifyFollowers)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center"><Trophy className="w-4 h-4 mr-2" /> Peak Position</span>
                  <span className="font-bold text-lg">#{selectedArtist.peakPosition}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'charts' && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Top Tracks</h3>
            <div className="space-y-3">
              {topTracks.map((track, index) => (
                <div key={track.id} className="flex items-center p-3 bg-gray-700 rounded-md">
                  <span className="w-8 text-center text-gray-400">{index + 1}</span>
                  <div className="flex-grow ml-4">
                    <p className="font-semibold">{track.title}</p>
                    <p className="text-sm text-gray-400">Released: {track.release}</p>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Headphones className="w-4 h-4 mr-2" />
                    <span>{formatNumber(track.streams)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audience' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Audience by Country</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie data={audienceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {audienceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: 'none' }} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Audience by Age</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={demographicsData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                    <XAxis type="number" tick={{ fill: '#A0AEC0' }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#A0AEC0' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: 'none' }} />
                    <Bar dataKey="value" fill="#48BB78" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(socialData).map(([platform, data]) => (
              <div key={platform} className="bg-gray-800 p-6 rounded-lg text-center">
                <h4 className="text-lg font-bold capitalize mb-2">{platform}</h4>
                <p className="text-3xl font-bold text-green-400">{formatNumber(data.followers)}</p>
                <p className="text-sm text-gray-400">Followers</p>
                <div className="mt-4 flex items-center justify-center" >
                  {renderGrowthIcon(data.growth)}
                  <span className={`ml-2 ${data.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>{data.growth}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'playlists' && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Top Playlist Placements</h3>
            <div className="space-y-3">
              {playlistPlacements.map((placement) => (
                <div key={placement.id} className="flex items-center p-3 bg-gray-700 rounded-md">
                  <div className="w-12 h-12 bg-gray-600 rounded-md flex items-center justify-center mr-4">
                    <Music className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold">{placement.name}</p>
                    <p className="text-sm text-gray-400">{placement.platform} ・ {formatNumber(placement.followers)} followers</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">#{placement.position}</p>
                    <p className="text-sm text-gray-400">Position</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (selectedArtist) {
      return renderArtistProfile();
    }

    const dataToRender = filteredData.sort((a, b) => {
      const aVal = activeSection.includes('weekly') ? a.weeklyStreams : a.monthlyStreams;
      const bVal = activeSection.includes('weekly') ? b.weeklyStreams : b.monthlyStreams;
      return bVal - aVal;
    });

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            <button onClick={() => handleSectionChange('weekly-artists')} className={`px-4 py-2 text-sm font-medium rounded-md ${activeSection === 'weekly-artists' ? 'bg-green-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Weekly Artists</button>
            <button onClick={() => handleSectionChange('monthly-artists')} className={`px-4 py-2 text-sm font-medium rounded-md ${activeSection === 'monthly-artists' ? 'bg-green-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Monthly Artists</button>
            <button onClick={() => handleSectionChange('weekly-songs')} className={`px-4 py-2 text-sm font-medium rounded-md ${activeSection === 'weekly-songs' ? 'bg-green-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Weekly Songs</button>
            <button onClick={() => handleSectionChange('monthly-songs')} className={`px-4 py-2 text-sm font-medium rounded-md ${activeSection === 'monthly-songs' ? 'bg-green-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Monthly Songs</button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search artists or songs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-64 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-gray-800 p-4 rounded-lg mb-6 flex space-x-8">
            <div>
              <h4 className="font-semibold mb-2">Genres</h4>
              <div className="grid grid-cols-3 gap-2">
                {genres.map(genre => (
                  <label key={genre} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => {
                        setSelectedGenres(prev =>
                          prev.includes(genre)
                            ? prev.filter(g => g !== genre)
                            : [...prev, genre]
                        );
                      }}
                      className="form-checkbox h-4 w-4 bg-gray-700 border-gray-600 rounded text-green-500 focus:ring-green-500"
                    />
                    <span>{genre}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Countries</h4>
              <div className="grid grid-cols-2 gap-2">
                {countries.map(country => (
                  <label key={country} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(country)}
                      onChange={() => {
                        setSelectedCountries(prev =>
                          prev.includes(country)
                            ? prev.filter(c => c !== country)
                            : [...prev, country]
                        );
                      }}
                      className="form-checkbox h-4 w-4 bg-gray-700 border-gray-600 rounded text-green-500 focus:ring-green-500"
                    />
                    <span>{country}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection.includes('artists') ? renderArtistList(dataToRender) : renderSongList(dataToRender)}
      </div>
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8 font-sans">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Albanian Music Analytics</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Last updated: Just now</span>
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        </div>
      </header>
      {renderContent()}
    </div>
  );
};

export default UltimateAlbanianMusicPlatform;

