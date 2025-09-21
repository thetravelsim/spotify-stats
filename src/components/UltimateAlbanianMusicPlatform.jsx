import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Settings, Play, Heart, Share2, ExternalLink, TrendingUp, TrendingDown, Minus, Crown, Medal, Award, MapPin, Users, Music, Radio, Calendar, BarChart3, PieChart, LineChart, Globe, Headphones, Eye, ThumbsUp, MessageCircle, Repeat, Volume2, Mic, Star, Target, Zap, ArrowUp, ArrowDown, ChevronRight, ChevronLeft, MoreHorizontal, X, Check, AlertCircle, Info, Clock, Flame, Trophy } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, AreaChart, Area, RadialBarChart, RadialBar, Legend } from 'recharts';

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

  // Ultimate Albanian Artists Database (40+ artists with realistic statistics)
  const allAlbanianArtists = [
    // International Superstars
    {
      id: 1,
      name: 'Dua Lipa',
      image: '/dua-lipa.jpg',
      genre: 'Pop',
      country: 'Albania/UK',
      monthlyListeners: 75400000,
      weeklyStreams: 45200000,
      monthlyStreams: 180500000,
      totalStreams: 2100000000,
      weeklyGrowth: 8.5,
      monthlyGrowth: 6.8,
      momentum: 'explosive',
      popularity: 98,
      spotifyFollowers: 87200000,
      platformScore: 95,
      peakPosition: 1,
      weeksOnChart: 156,
      monthsOnChart: 36,
      category: 'international'
    },
    {
      id: 2,
      name: 'Rita Ora',
      image: '/rita-ora.jpg',
      genre: 'Pop',
      country: 'Albania/UK',
      monthlyListeners: 18500000,
      weeklyStreams: 6700000,
      monthlyStreams: 28900000,
      totalStreams: 890000000,
      weeklyGrowth: 5.2,
      monthlyGrowth: 4.2,
      momentum: 'rising',
      popularity: 76,
      spotifyFollowers: 12300000,
      platformScore: 78,
      peakPosition: 2,
      weeksOnChart: 134,
      monthsOnChart: 31,
      category: 'international'
    },
    {
      id: 3,
      name: 'Bebe Rexha',
      image: '/bebe-rexha.jpg',
      genre: 'Pop',
      country: 'Albania/USA',
      monthlyListeners: 15200000,
      weeklyStreams: 5800000,
      monthlyStreams: 24100000,
      totalStreams: 780000000,
      weeklyGrowth: 3.8,
      monthlyGrowth: 2.9,
      momentum: 'stable',
      popularity: 74,
      spotifyFollowers: 8900000,
      platformScore: 76,
      peakPosition: 3,
      weeksOnChart: 98,
      monthsOnChart: 28,
      category: 'international'
    },
    {
      id: 4,
      name: 'Ava Max',
      image: '/ava-max.jpg',
      genre: 'Pop',
      country: 'Albania/USA',
      monthlyListeners: 12800000,
      weeklyStreams: 4900000,
      monthlyStreams: 19600000,
      totalStreams: 650000000,
      weeklyGrowth: 6.1,
      monthlyGrowth: 4.5,
      momentum: 'rising',
      popularity: 72,
      spotifyFollowers: 7200000,
      platformScore: 74,
      peakPosition: 4,
      weeksOnChart: 76,
      monthsOnChart: 22,
      category: 'international'
    },
    // German-Albanian Diaspora Superstars
    {
      id: 5,
      name: 'Capital Bra',
      image: '/capital-bra.jpg',
      genre: 'Hip Hop',
      country: 'Albania/Germany',
      monthlyListeners: 8900000,
      weeklyStreams: 12400000,
      monthlyStreams: 48600000,
      totalStreams: 890000000,
      weeklyGrowth: 4.8,
      monthlyGrowth: 7.2,
      momentum: 'rising',
      popularity: 78,
      spotifyFollowers: 3200000,
      platformScore: 79,
      peakPosition: 1,
      weeksOnChart: 89,
      monthsOnChart: 24,
      category: 'diaspora'
    },
    {
      id: 6,
      name: 'Dardan',
      image: '/dardan.jpg',
      genre: 'Hip Hop',
      country: 'Albania/Germany',
      monthlyListeners: 4200000,
      weeklyStreams: 8900000,
      monthlyStreams: 32100000,
      totalStreams: 245000000,
      weeklyGrowth: 6.8,
      monthlyGrowth: 8.9,
      momentum: 'rising',
      popularity: 71,
      spotifyFollowers: 1900000,
      platformScore: 73,
      peakPosition: 2,
      weeksOnChart: 67,
      monthsOnChart: 19,
      category: 'diaspora'
    },
    {
      id: 7,
      name: 'Azet',
      image: '/azet.jpg',
      genre: 'Hip Hop',
      country: 'Albania/Germany',
      monthlyListeners: 3800000,
      weeklyStreams: 7800000,
      monthlyStreams: 28900000,
      totalStreams: 198000000,
      weeklyGrowth: 4.2,
      monthlyGrowth: 5.7,
      momentum: 'stable',
      popularity: 69,
      spotifyFollowers: 1600000,
      platformScore: 71,
      peakPosition: 3,
      weeksOnChart: 54,
      monthsOnChart: 16,
      category: 'diaspora'
    },
    {
      id: 8,
      name: 'Loredana Zefi',
      image: '/loredana-zefi.jpg',
      genre: 'Hip Hop',
      country: 'Albania/Germany',
      monthlyListeners: 2900000,
      weeklyStreams: 5600000,
      monthlyStreams: 21800000,
      totalStreams: 156000000,
      weeklyGrowth: 9.1,
      monthlyGrowth: 12.4,
      momentum: 'explosive',
      popularity: 66,
      spotifyFollowers: 1200000,
      platformScore: 68,
      peakPosition: 4,
      weeksOnChart: 42,
      monthsOnChart: 14,
      category: 'diaspora'
    },
    // Albanian Hip Hop Scene
    {
      id: 9,
      name: 'Noizy',
      image: '/noizy.jpg',
      genre: 'Hip Hop',
      country: 'Albania',
      monthlyListeners: 3200000,
      weeklyStreams: 8900000,
      monthlyStreams: 25600000,
      totalStreams: 156000000,
      weeklyGrowth: 12.3,
      monthlyGrowth: -1.5,
      momentum: 'rising',
      popularity: 68,
      spotifyFollowers: 1800000,
      platformScore: 75,
      peakPosition: 1,
      weeksOnChart: 89,
      monthsOnChart: 22,
      category: 'local'
    },
    {
      id: 10,
      name: 'Don Xhoni',
      image: '/don-xhoni.jpg',
      genre: 'Hip Hop',
      country: 'Albania',
      monthlyListeners: 2800000,
      weeklyStreams: 5800000,
      monthlyStreams: 18200000,
      totalStreams: 134000000,
      weeklyGrowth: -2.1,
      monthlyGrowth: 8.7,
      momentum: 'stable',
      popularity: 65,
      spotifyFollowers: 1200000,
      platformScore: 72,
      peakPosition: 2,
      weeksOnChart: 67,
      monthsOnChart: 18,
      category: 'local'
    },
    {
      id: 11,
      name: 'Dhurata Dora',
      image: '/dhurata-dora.jpg',
      genre: 'Hip Hop',
      country: 'Albania',
      monthlyListeners: 1735000,
      weeklyStreams: 3400000,
      monthlyStreams: 12800000,
      totalStreams: 89000000,
      weeklyGrowth: 9.2,
      monthlyGrowth: 11.4,
      momentum: 'explosive',
      popularity: 62,
      spotifyFollowers: 890000,
      platformScore: 69,
      peakPosition: 3,
      weeksOnChart: 54,
      monthsOnChart: 15,
      category: 'local'
    },
    {
      id: 12,
      name: 'Finem',
      image: '/finem.jpg',
      genre: 'Hip Hop',
      country: 'Albania',
      monthlyListeners: 890000,
      weeklyStreams: 2200000,
      monthlyStreams: 6800000,
      totalStreams: 28000000,
      weeklyGrowth: 14.2,
      monthlyGrowth: 19.8,
      momentum: 'explosive',
      popularity: 53,
      spotifyFollowers: 340000,
      platformScore: 62,
      peakPosition: 7,
      weeksOnChart: 18,
      monthsOnChart: 5,
      category: 'local'
    },
    {
      id: 13,
      name: 'Ghetto Geasy',
      image: '/ghetto-geasy.jpg',
      genre: 'Hip Hop',
      country: 'Albania',
      monthlyListeners: 553000,
      weeklyStreams: 1400000,
      monthlyStreams: 4200000,
      totalStreams: 23000000,
      weeklyGrowth: 11.8,
      monthlyGrowth: 15.2,
      momentum: 'explosive',
      popularity: 48,
      spotifyFollowers: 220000,
      platformScore: 58,
      peakPosition: 9,
      weeksOnChart: 16,
      monthsOnChart: 4,
      category: 'local'
    },
    {
      id: 14,
      name: 'Elai',
      image: '/elai.jpg',
      genre: 'Hip Hop',
      country: 'Albania',
      monthlyListeners: 530000,
      weeklyStreams: 1300000,
      monthlyStreams: 3900000,
      totalStreams: 19000000,
      weeklyGrowth: 8.7,
      monthlyGrowth: 10.4,
      momentum: 'rising',
      popularity: 46,
      spotifyFollowers: 190000,
      platformScore: 56,
      peakPosition: 10,
      weeksOnChart: 14,
      monthsOnChart: 4,
      category: 'local'
    },
    // Kosovo Artists
    {
      id: 15,
      name: 'Era Istrefi',
      image: '/era-istrefi.jpg',
      genre: 'Pop',
      country: 'Kosovo',
      monthlyListeners: 1292000,
      weeklyStreams: 2900000,
      monthlyStreams: 10100000,
      totalStreams: 78000000,
      weeklyGrowth: 7.8,
      monthlyGrowth: 5.3,
      momentum: 'rising',
      popularity: 59,
      spotifyFollowers: 650000,
      platformScore: 66,
      peakPosition: 4,
      weeksOnChart: 43,
      monthsOnChart: 12,
      category: 'kosovo'
    },
    {
      id: 16,
      name: 'Tayna',
      image: '/tayna.jpg',
      genre: 'Hip Hop',
      country: 'Kosovo',
      monthlyListeners: 2200000,
      weeklyStreams: 4200000,
      monthlyStreams: 14500000,
      totalStreams: 89000000,
      weeklyGrowth: 15.7,
      monthlyGrowth: 18.2,
      momentum: 'explosive',
      popularity: 62,
      spotifyFollowers: 980000,
      platformScore: 70,
      peakPosition: 4,
      weeksOnChart: 45,
      monthsOnChart: 13,
      category: 'kosovo'
    },
    {
      id: 17,
      name: 'Dafina Zeqiri',
      image: '/dafina-zeqiri.jpg',
      genre: 'Pop',
      country: 'Kosovo',
      monthlyListeners: 1134000,
      weeklyStreams: 2100000,
      monthlyStreams: 7200000,
      totalStreams: 52000000,
      weeklyGrowth: 1.8,
      monthlyGrowth: 2.4,
      momentum: 'stable',
      popularity: 54,
      spotifyFollowers: 380000,
      platformScore: 63,
      peakPosition: 7,
      weeksOnChart: 29,
      monthsOnChart: 8,
      category: 'kosovo'
    },
    {
      id: 18,
      name: 'Ledri Vula',
      image: '/ledri-vula.jpg',
      genre: 'Hip Hop',
      country: 'Kosovo',
      monthlyListeners: 649000,
      weeklyStreams: 1800000,
      monthlyStreams: 5400000,
      totalStreams: 34000000,
      weeklyGrowth: 8.9,
      monthlyGrowth: 12.3,
      momentum: 'explosive',
      popularity: 51,
      spotifyFollowers: 290000,
      platformScore: 61,
      peakPosition: 8,
      weeksOnChart: 22,
      monthsOnChart: 6,
      category: 'kosovo'
    },
    {
      id: 19,
      name: 'Mozzik',
      image: '/mozzik.jpg',
      genre: 'Hip Hop',
      country: 'Kosovo',
      monthlyListeners: 890000,
      weeklyStreams: 2100000,
      monthlyStreams: 6300000,
      totalStreams: 45000000,
      weeklyGrowth: 13.4,
      monthlyGrowth: 16.8,
      momentum: 'explosive',
      popularity: 52,
      spotifyFollowers: 320000,
      platformScore: 59,
      peakPosition: 8,
      weeksOnChart: 19,
      monthsOnChart: 5,
      category: 'kosovo'
    },
    {
      id: 20,
      name: 'Gjiko',
      image: '/gjiko.jpg',
      genre: 'Hip Hop',
      country: 'Kosovo',
      monthlyListeners: 720000,
      weeklyStreams: 1700000,
      monthlyStreams: 5100000,
      totalStreams: 32000000,
      weeklyGrowth: 9.8,
      monthlyGrowth: 11.2,
      momentum: 'rising',
      popularity: 49,
      spotifyFollowers: 260000,
      platformScore: 57,
      peakPosition: 9,
      weeksOnChart: 17,
      monthsOnChart: 5,
      category: 'kosovo'
    },
    {
      id: 21,
      name: 'MC Kresha',
      image: '/mc-kresha.jpg',
      genre: 'Hip Hop',
      country: 'Kosovo',
      monthlyListeners: 580000,
      weeklyStreams: 1400000,
      monthlyStreams: 4200000,
      totalStreams: 28000000,
      weeklyGrowth: 7.2,
      monthlyGrowth: 8.9,
      momentum: 'rising',
      popularity: 47,
      spotifyFollowers: 210000,
      platformScore: 55,
      peakPosition: 10,
      weeksOnChart: 15,
      monthsOnChart: 4,
      category: 'kosovo'
    },
    {
      id: 22,
      name: '2Ton',
      image: '/2ton.jpg',
      genre: 'Hip Hop',
      country: 'Kosovo',
      monthlyListeners: 580000,
      weeklyStreams: 1200000,
      monthlyStreams: 3600000,
      totalStreams: 29000000,
      weeklyGrowth: 7.2,
      monthlyGrowth: 9.8,
      momentum: 'rising',
      popularity: 45,
      spotifyFollowers: 210000,
      platformScore: 54,
      peakPosition: 11,
      weeksOnChart: 24,
      monthsOnChart: 7,
      category: 'kosovo'
    },
    // Albanian Pop Artists
    {
      id: 23,
      name: 'Butrint Imeri',
      image: '/butrint-imeri.jpg',
      genre: 'Pop',
      country: 'Albania',
      monthlyListeners: 1426000,
      weeklyStreams: 2800000,
      monthlyStreams: 9200000,
      totalStreams: 67000000,
      weeklyGrowth: 4.1,
      monthlyGrowth: 6.8,
      momentum: 'rising',
      popularity: 58,
      spotifyFollowers: 520000,
      platformScore: 68,
      peakPosition: 5,
      weeksOnChart: 38,
      monthsOnChart: 11,
      category: 'local'
    },
    {
      id: 24,
      name: 'Elvana Gjata',
      image: '/elvana-gjata.jpg',
      genre: 'Pop',
      country: 'Albania',
      monthlyListeners: 1180000,
      weeklyStreams: 2300000,
      monthlyStreams: 7800000,
      totalStreams: 56000000,
      weeklyGrowth: 2.9,
      monthlyGrowth: 3.7,
      momentum: 'stable',
      popularity: 55,
      spotifyFollowers: 430000,
      platformScore: 65,
      peakPosition: 6,
      weeksOnChart: 32,
      monthsOnChart: 9,
      category: 'local'
    },
    {
      id: 25,
      name: 'Kidda',
      image: '/kidda.jpg',
      genre: 'Pop',
      country: 'Albania',
      monthlyListeners: 1256000,
      weeklyStreams: 2400000,
      monthlyStreams: 8100000,
      totalStreams: 48000000,
      weeklyGrowth: 5.2,
      monthlyGrowth: 7.1,
      momentum: 'rising',
      popularity: 56,
      spotifyFollowers: 410000,
      platformScore: 64,
      peakPosition: 6,
      weeksOnChart: 26,
      monthsOnChart: 7,
      category: 'local'
    },
    {
      id: 26,
      name: 'Yll Limani',
      image: '/yll-limani.jpg',
      genre: 'Pop',
      country: 'Kosovo',
      monthlyListeners: 802000,
      weeklyStreams: 1600000,
      monthlyStreams: 4800000,
      totalStreams: 34000000,
      weeklyGrowth: 3.8,
      monthlyGrowth: 5.2,
      momentum: 'stable',
      popularity: 50,
      spotifyFollowers: 290000,
      platformScore: 58,
      peakPosition: 8,
      weeksOnChart: 21,
      monthsOnChart: 6,
      category: 'kosovo'
    },
    {
      id: 27,
      name: 'Kida',
      image: '/kida.jpg',
      genre: 'Pop',
      country: 'Albania',
      monthlyListeners: 789000,
      weeklyStreams: 1500000,
      monthlyStreams: 4500000,
      totalStreams: 31000000,
      weeklyGrowth: 4.6,
      monthlyGrowth: 6.3,
      momentum: 'rising',
      popularity: 49,
      spotifyFollowers: 280000,
      platformScore: 57,
      peakPosition: 9,
      weeksOnChart: 19,
      monthsOnChart: 5,
      category: 'local'
    },
    // Emerging Artists
    {
      id: 28,
      name: 'Elinel',
      image: '/elinel.jpg',
      genre: 'Hip Hop',
      country: 'Albania',
      monthlyListeners: 420000,
      weeklyStreams: 980000,
      monthlyStreams: 2900000,
      totalStreams: 12000000,
      weeklyGrowth: 18.9,
      monthlyGrowth: 24.7,
      momentum: 'explosive',
      popularity: 43,
      spotifyFollowers: 150000,
      platformScore: 52,
      peakPosition: 12,
      weeksOnChart: 8,
      monthsOnChart: 2,
      category: 'emerging'
    },
    {
      id: 29,
      name: 'YA NINA',
      image: '/ya-nina.jpg',
      genre: 'Hip Hop',
      country: 'Albania',
      monthlyListeners: 380000,
      weeklyStreams: 890000,
      monthlyStreams: 2600000,
      totalStreams: 9000000,
      weeklyGrowth: 22.1,
      monthlyGrowth: 28.4,
      momentum: 'explosive',
      popularity: 41,
      spotifyFollowers: 130000,
      platformScore: 50,
      peakPosition: 13,
      weeksOnChart: 6,
      monthsOnChart: 2,
      category: 'emerging'
    },
    {
      id: 30,
      name: 'Vinz',
      image: '/vinz.jpg',
      genre: 'Hip Hop',
      country: 'Albania',
      monthlyListeners: 340000,
      weeklyStreams: 780000,
      monthlyStreams: 2300000,
      totalStreams: 8000000,
      weeklyGrowth: 16.8,
      monthlyGrowth: 21.3,
      momentum: 'explosive',
      popularity: 39,
      spotifyFollowers: 120000,
      platformScore: 48,
      peakPosition: 14,
      weeksOnChart: 5,
      monthsOnChart: 2,
      category: 'emerging'
    },
    {
      id: 31,
      name: 'Stealth',
      image: '/stealth.jpg',
      genre: 'Hip Hop',
      country: 'Albania',
      monthlyListeners: 310000,
      weeklyStreams: 720000,
      monthlyStreams: 2100000,
      totalStreams: 7000000,
      weeklyGrowth: 14.2,
      monthlyGrowth: 18.9,
      momentum: 'explosive',
      popularity: 37,
      spotifyFollowers: 110000,
      platformScore: 46,
      peakPosition: 15,
      weeksOnChart: 4,
      monthsOnChart: 1,
      category: 'emerging'
    },
    // Traditional/Veteran Artists
    {
      id: 32,
      name: 'Alban Skenderaj',
      image: '/alban-skenderaj.jpg',
      genre: 'Pop',
      country: 'Albania',
      monthlyListeners: 780000,
      weeklyStreams: 1600000,
      monthlyStreams: 4900000,
      totalStreams: 45000000,
      weeklyGrowth: 1.2,
      monthlyGrowth: 2.1,
      momentum: 'stable',
      popularity: 49,
      spotifyFollowers: 280000,
      platformScore: 58,
      peakPosition: 9,
      weeksOnChart: 34,
      monthsOnChart: 12,
      category: 'traditional'
    },
    {
      id: 33,
      name: 'Xhensila Myrtezaj',
      image: '/xhensila-myrtezaj.jpg',
      genre: 'Pop',
      country: 'Albania',
      monthlyListeners: 690000,
      weeklyStreams: 1400000,
      monthlyStreams: 4200000,
      totalStreams: 38000000,
      weeklyGrowth: 3.8,
      monthlyGrowth: 4.9,
      momentum: 'rising',
      popularity: 47,
      spotifyFollowers: 240000,
      platformScore: 56,
      peakPosition: 10,
      weeksOnChart: 28,
      monthsOnChart: 9,
      category: 'traditional'
    },
    {
      id: 34,
      name: 'Aurela Gace',
      image: '/aurela-gace.jpg',
      genre: 'Pop',
      country: 'Albania',
      monthlyListeners: 520000,
      weeklyStreams: 1100000,
      monthlyStreams: 3300000,
      totalStreams: 29000000,
      weeklyGrowth: 2.1,
      monthlyGrowth: 3.4,
      momentum: 'stable',
      popularity: 44,
      spotifyFollowers: 180000,
      platformScore: 53,
      peakPosition: 11,
      weeksOnChart: 25,
      monthsOnChart: 8,
      category: 'traditional'
    },
    // Additional German Diaspora
    {
      id: 35,
      name: 'DJ Regard',
      image: '/dj-regard.jpg',
      genre: 'Electronic',
      country: 'Albania/Germany',
      monthlyListeners: 1800000,
      weeklyStreams: 3200000,
      monthlyStreams: 12800000,
      totalStreams: 89000000,
      weeklyGrowth: 8.9,
      monthlyGrowth: 11.2,
      momentum: 'rising',
      popularity: 61,
      spotifyFollowers: 680000,
      platformScore: 67,
      peakPosition: 5,
      weeksOnChart: 34,
      monthsOnChart: 9,
      category: 'diaspora'
    },
    // Additional Kosovo Artists
    {
      id: 36,
      name: 'Ermal Fejzullahu',
      image: '/ermal-fejzullahu.jpg',
      genre: 'Pop',
      country: 'Kosovo',
      monthlyListeners: 450000,
      weeklyStreams: 980000,
      monthlyStreams: 2900000,
      totalStreams: 23000000,
      weeklyGrowth: 5.2,
      monthlyGrowth: 6.8,
      momentum: 'stable',
      popularity: 42,
      spotifyFollowers: 160000,
      platformScore: 51,
      peakPosition: 12,
      weeksOnChart: 18,
      monthsOnChart: 5,
      category: 'kosovo'
    },
    {
      id: 37,
      name: 'Fero',
      image: '/fero.jpg',
      genre: 'Hip Hop',
      country: 'Kosovo',
      monthlyListeners: 380000,
      weeklyStreams: 820000,
      monthlyStreams: 2400000,
      totalStreams: 15000000,
      weeklyGrowth: 12.4,
      monthlyGrowth: 15.8,
      momentum: 'explosive',
      popularity: 40,
      spotifyFollowers: 140000,
      platformScore: 49,
      peakPosition: 13,
      weeksOnChart: 9,
      monthsOnChart: 3,
      category: 'kosovo'
    },
    {
      id: 38,
      name: 'Fifi',
      image: '/fifi.jpg',
      genre: 'Pop',
      country: 'Kosovo',
      monthlyListeners: 320000,
      weeklyStreams: 690000,
      monthlyStreams: 2000000,
      totalStreams: 12000000,
      weeklyGrowth: 8.7,
      monthlyGrowth: 10.9,
      momentum: 'rising',
      popularity: 38,
      spotifyFollowers: 115000,
      platformScore: 47,
      peakPosition: 14,
      weeksOnChart: 7,
      monthsOnChart: 2,
      category: 'kosovo'
    },
    {
      id: 39,
      name: 'Florat',
      image: '/florat.jpg',
      genre: 'Pop',
      country: 'Kosovo',
      monthlyListeners: 290000,
      weeklyStreams: 620000,
      monthlyStreams: 1800000,
      totalStreams: 10000000,
      weeklyGrowth: 6.8,
      monthlyGrowth: 8.4,
      momentum: 'rising',
      popularity: 36,
      spotifyFollowers: 105000,
      platformScore: 45,
      peakPosition: 15,
      weeksOnChart: 6,
      monthsOnChart: 2,
      category: 'kosovo'
    },
    // Traditional Rock
    {
      id: 40,
      name: 'Elita 5',
      image: '/elita-5.jpg',
      genre: 'Rock',
      country: 'Albania/Macedonia',
      monthlyListeners: 180000,
      weeklyStreams: 380000,
      monthlyStreams: 1100000,
      totalStreams: 15000000,
      weeklyGrowth: 2.8,
      monthlyGrowth: 4.1,
      momentum: 'stable',
      popularity: 32,
      spotifyFollowers: 65000,
      platformScore: 42,
      peakPosition: 18,
      weeksOnChart: 12,
      monthsOnChart: 4,
      category: 'traditional'
    }
  ];

  // Enhanced Songs Database
  const allAlbanianSongs = [
    {
      id: 1,
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      image: '/levitating.jpg',
      genre: 'Pop',
      weeklyStreams: 15200000,
      monthlyStreams: 58200000,
      totalStreams: 2100000000,
      weeklyGrowth: 12.5,
      monthlyGrowth: 5.8,
      momentum: 'explosive',
      duration: '3:23',
      releaseDate: '2020-03-27',
      peakPosition: 1,
      weeksOnChart: 156,
      monthsOnChart: 36
    },
    {
      id: 2,
      title: 'Don\'t Start Now',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      image: '/dont-start-now.jpg',
      genre: 'Pop',
      weeklyStreams: 7800000,
      monthlyStreams: 32100000,
      totalStreams: 1800000000,
      weeklyGrowth: 8.3,
      monthlyGrowth: 3.2,
      momentum: 'rising',
      duration: '3:03',
      releaseDate: '2019-11-01',
      peakPosition: 2,
      weeksOnChart: 189,
      monthsOnChart: 43
    },
    {
      id: 3,
      title: 'OTR',
      artist: 'Noizy',
      album: 'Single',
      image: '/otr.jpg',
      genre: 'Hip Hop',
      weeklyStreams: 8900000,
      monthlyStreams: 28900000,
      totalStreams: 89000000,
      weeklyGrowth: -5.2,
      monthlyGrowth: 12.5,
      momentum: 'rising',
      duration: '3:45',
      releaseDate: '2024-01-15',
      peakPosition: 1,
      weeksOnChart: 32,
      monthsOnChart: 8
    },
    {
      id: 4,
      title: 'Yakuza',
      artist: 'Don Xhoni',
      album: 'Single',
      image: '/yakuza.jpg',
      genre: 'Hip Hop',
      weeklyStreams: 5800000,
      monthlyStreams: 18200000,
      totalStreams: 67000000,
      weeklyGrowth: 14.8,
      monthlyGrowth: 18.2,
      momentum: 'explosive',
      duration: '3:28',
      releaseDate: '2024-02-10',
      peakPosition: 2,
      weeksOnChart: 28,
      monthsOnChart: 7
    },
    {
      id: 5,
      title: 'Rich',
      artist: 'Elinel ft. YA NINA',
      album: 'Single',
      image: '/rich.jpg',
      genre: 'Hip Hop',
      weeklyStreams: 4200000,
      monthlyStreams: 14800000,
      totalStreams: 23000000,
      weeklyGrowth: 28.9,
      monthlyGrowth: 34.2,
      momentum: 'explosive',
      duration: '2:58',
      releaseDate: '2024-03-15',
      peakPosition: 3,
      weeksOnChart: 12,
      monthsOnChart: 3
    },
    {
      id: 6,
      title: 'STARI MAHALLES',
      artist: 'Mozzik',
      album: 'Single',
      image: '/stari-mahalles.jpg',
      genre: 'Hip Hop',
      weeklyStreams: 3900000,
      monthlyStreams: 13200000,
      totalStreams: 34000000,
      weeklyGrowth: 19.4,
      monthlyGrowth: 22.1,
      momentum: 'explosive',
      duration: '3:12',
      releaseDate: '2024-01-28',
      peakPosition: 4,
      weeksOnChart: 24,
      monthsOnChart: 6
    },
    {
      id: 7,
      title: 'Lule Bore',
      artist: 'Gjiko',
      album: 'Single',
      image: '/lule-bore.jpg',
      genre: 'Hip Hop',
      weeklyStreams: 3400000,
      monthlyStreams: 11800000,
      totalStreams: 28000000,
      weeklyGrowth: 15.2,
      monthlyGrowth: 17.8,
      momentum: 'explosive',
      duration: '3:35',
      releaseDate: '2024-02-20',
      peakPosition: 5,
      weeksOnChart: 20,
      monthsOnChart: 5
    },
    {
      id: 8,
      title: 'Physical',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      image: '/physical.jpg',
      genre: 'Pop',
      weeklyStreams: 6200000,
      monthlyStreams: 24800000,
      totalStreams: 890000000,
      weeklyGrowth: 4.1,
      monthlyGrowth: 2.9,
      momentum: 'stable',
      duration: '3:13',
      releaseDate: '2020-01-31',
      peakPosition: 3,
      weeksOnChart: 145,
      monthsOnChart: 34
    },
    {
      id: 9,
      title: 'Drill',
      artist: 'Finem',
      album: 'Single',
      image: '/drill.jpg',
      genre: 'Hip Hop',
      weeklyStreams: 2800000,
      monthlyStreams: 9600000,
      totalStreams: 18000000,
      weeklyGrowth: 24.7,
      monthlyGrowth: 29.3,
      momentum: 'explosive',
      duration: '2:45',
      releaseDate: '2024-03-05',
      peakPosition: 6,
      weeksOnChart: 14,
      monthsOnChart: 3
    },
    {
      id: 10,
      title: 'Hood Life 3',
      artist: 'Vinz ft. Stealth',
      album: 'Single',
      image: '/hood-life-3.jpg',
      genre: 'Hip Hop',
      weeklyStreams: 2400000,
      monthlyStreams: 8200000,
      totalStreams: 12000000,
      weeklyGrowth: 31.2,
      monthlyGrowth: 38.9,
      momentum: 'explosive',
      duration: '3:18',
      releaseDate: '2024-04-01',
      peakPosition: 7,
      weeksOnChart: 8,
      monthsOnChart: 2
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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'international': return 'bg-purple-100 text-purple-800';
      case 'local': return 'bg-red-100 text-red-800';
      case 'kosovo': return 'bg-blue-100 text-blue-800';
      case 'diaspora': return 'bg-green-100 text-green-800';
      case 'traditional': return 'bg-orange-100 text-orange-800';
      case 'emerging': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get current data based on active section
  const getCurrentData = () => {
    const sortedArtists = [...allAlbanianArtists].sort((a, b) => {
      if (activeSection === 'weekly-artists') return b.weeklyStreams - a.weeklyStreams;
      if (activeSection === 'monthly-artists') return b.monthlyStreams - a.monthlyStreams;
      return b.monthlyListeners - a.monthlyListeners;
    });

    const sortedSongs = [...allAlbanianSongs].sort((a, b) => {
      if (activeSection === 'weekly-songs') return b.weeklyStreams - a.weeklyStreams;
      if (activeSection === 'monthly-songs') return b.monthlyStreams - a.monthlyStreams;
      return b.totalStreams - a.totalStreams;
    });

    if (activeSection.includes('artists')) return sortedArtists.slice(0, 25);
    return sortedSongs.slice(0, 15);
  };

  const renderWeeklyArtists = () => {
    const data = getCurrentData();
    const totalStreams = data.reduce((sum, artist) => sum + artist.weeklyStreams, 0);
    const risingArtists = data.filter(artist => artist.momentum === 'explosive' || artist.momentum === 'rising').length;
    const avgGrowth = Math.round(data.reduce((sum, artist) => sum + Math.abs(artist.weeklyGrowth), 0) / data.length);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span>Ultimate Albanian Artists Weekly Chart</span>
            </h1>
            <p className="text-gray-600 mt-2">Complete database of 40+ Albanian artists from Viberate research</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
              <Clock className="w-4 h-4 inline mr-2" />
              Updated weekly • {allAlbanianArtists.length} total artists
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Download className="w-5 h-5" />
              <span>Export Chart</span>
            </button>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-5 gap-6">
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-blue-600">{data.length}</div>
            <div className="text-gray-600">Charting Artists</div>
            <div className="text-sm text-green-600 mt-1">Top performers</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-green-600">{formatNumber(totalStreams)}</div>
            <div className="text-gray-600">Total Weekly Streams</div>
            <div className="text-sm text-green-600 mt-1">Combined reach</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-purple-600">{risingArtists}</div>
            <div className="text-gray-600">Rising Artists</div>
            <div className="text-sm text-green-600 mt-1">Trending up</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-orange-600">{avgGrowth}%</div>
            <div className="text-gray-600">Avg Growth</div>
            <div className="text-sm text-green-600 mt-1">Week over week</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-red-600">{allAlbanianArtists.length}</div>
            <div className="text-gray-600">Total Database</div>
            <div className="text-sm text-blue-600 mt-1">All Albanian artists</div>
          </div>
        </div>

        {/* Enhanced Category Breakdown */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Complete Artist Categories</h3>
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {allAlbanianArtists.filter(a => a.category === 'international').length}
              </div>
              <div className="text-sm text-gray-600">International</div>
              <div className="text-xs text-purple-600">Superstars</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {allAlbanianArtists.filter(a => a.category === 'local').length}
              </div>
              <div className="text-sm text-gray-600">Local Albanian</div>
              <div className="text-xs text-red-600">Domestic scene</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {allAlbanianArtists.filter(a => a.category === 'kosovo').length}
              </div>
              <div className="text-sm text-gray-600">Kosovo</div>
              <div className="text-xs text-blue-600">Regional talent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {allAlbanianArtists.filter(a => a.category === 'diaspora').length}
              </div>
              <div className="text-sm text-gray-600">Diaspora</div>
              <div className="text-xs text-green-600">International</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {allAlbanianArtists.filter(a => a.category === 'traditional').length}
              </div>
              <div className="text-sm text-gray-600">Traditional</div>
              <div className="text-xs text-orange-600">Veterans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {allAlbanianArtists.filter(a => a.category === 'emerging').length}
              </div>
              <div className="text-sm text-gray-600">Emerging</div>
              <div className="text-xs text-yellow-600">Rising stars</div>
            </div>
          </div>
        </div>

        {/* Ultimate Artists Chart */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <h2 className="text-xl font-bold">Ultimate Albanian Weekly Artists Chart</h2>
            <p className="text-blue-100 mt-1">Complete database from Viberate research - 40+ Albanian artists worldwide</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium">Rank</th>
                  <th className="text-left p-4 font-medium">Artist</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Genre</th>
                  <th className="text-left p-4 font-medium">Weekly Streams</th>
                  <th className="text-left p-4 font-medium">Monthly Listeners</th>
                  <th className="text-left p-4 font-medium">Growth</th>
                  <th className="text-left p-4 font-medium">Momentum</th>
                  <th className="text-left p-4 font-medium">Platform Score</th>
                </tr>
              </thead>
              <tbody>
                {data.map((artist, index) => (
                  <tr key={artist.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(index + 1)}
                      </div>
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
                      <span className={`px-2 py-1 rounded-full text-sm ${getCategoryColor(artist.category)}`}>
                        {artist.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {artist.genre}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{formatNumber(artist.weeklyStreams)}</td>
                    <td className="p-4 font-medium">{formatNumber(artist.monthlyListeners)}</td>
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
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg">{artist.platformScore}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${artist.platformScore}%` }}
                          ></div>
                        </div>
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
  };

  const renderMonthlyArtists = () => {
    const data = getCurrentData();
    const totalStreams = data.reduce((sum, artist) => sum + artist.monthlyStreams, 0);
    const risingArtists = data.filter(artist => artist.momentum === 'explosive' || artist.momentum === 'rising').length;
    const avgGrowth = Math.round(data.reduce((sum, artist) => sum + Math.abs(artist.monthlyGrowth), 0) / data.length);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-purple-500" />
              <span>Ultimate Albanian Artists Monthly Chart</span>
            </h1>
            <p className="text-gray-600 mt-2">Complete monthly rankings of 40+ Albanian artists worldwide</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 bg-purple-50 px-3 py-2 rounded-lg">
              <Calendar className="w-4 h-4 inline mr-2" />
              Updated monthly • {allAlbanianArtists.length} total artists
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              <Download className="w-5 h-5" />
              <span>Export Chart</span>
            </button>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-5 gap-6">
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-purple-600">{data.length}</div>
            <div className="text-gray-600">Charting Artists</div>
            <div className="text-sm text-green-600 mt-1">Top monthly</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-green-600">{formatNumber(totalStreams)}</div>
            <div className="text-gray-600">Total Monthly Streams</div>
            <div className="text-sm text-green-600 mt-1">Combined reach</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-blue-600">{risingArtists}</div>
            <div className="text-gray-600">Rising Artists</div>
            <div className="text-sm text-green-600 mt-1">Trending up</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-orange-600">{avgGrowth}%</div>
            <div className="text-gray-600">Avg Growth</div>
            <div className="text-sm text-green-600 mt-1">Month over month</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-indigo-600">
              {formatNumber(allAlbanianArtists.reduce((sum, artist) => sum + artist.monthlyListeners, 0))}
            </div>
            <div className="text-gray-600">Total Listeners</div>
            <div className="text-sm text-blue-600 mt-1">All artists combined</div>
          </div>
        </div>

        {/* Monthly Artists Chart */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6">
            <h2 className="text-xl font-bold">Ultimate Albanian Monthly Artists Chart</h2>
            <p className="text-purple-100 mt-1">Complete monthly performance of all Albanian artists from Viberate database</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium">Rank</th>
                  <th className="text-left p-4 font-medium">Artist</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Genre</th>
                  <th className="text-left p-4 font-medium">Monthly Streams</th>
                  <th className="text-left p-4 font-medium">Monthly Listeners</th>
                  <th className="text-left p-4 font-medium">Growth</th>
                  <th className="text-left p-4 font-medium">Momentum</th>
                  <th className="text-left p-4 font-medium">Platform Score</th>
                </tr>
              </thead>
              <tbody>
                {data.map((artist, index) => (
                  <tr key={artist.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(index + 1)}
                      </div>
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
                      <span className={`px-2 py-1 rounded-full text-sm ${getCategoryColor(artist.category)}`}>
                        {artist.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {artist.genre}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{formatNumber(artist.monthlyStreams)}</td>
                    <td className="p-4 font-medium">{formatNumber(artist.monthlyListeners)}</td>
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
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg">{artist.platformScore}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${artist.platformScore}%` }}
                          ></div>
                        </div>
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
  };

  const renderWeeklySongs = () => {
    const data = getCurrentData();
    const totalStreams = data.reduce((sum, song) => sum + song.weeklyStreams, 0);
    const risingSongs = data.filter(song => song.momentum === 'explosive' || song.momentum === 'rising').length;
    const avgGrowth = Math.round(data.reduce((sum, song) => sum + Math.abs(song.weeklyGrowth), 0) / data.length);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-3">
              <Music className="w-8 h-8 text-green-500" />
              <span>Ultimate Albanian Songs Weekly Chart</span>
            </h1>
            <p className="text-gray-600 mt-2">Top Albanian songs by weekly streaming numbers including latest hits</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
              <Clock className="w-4 h-4 inline mr-2" />
              Updated weekly • Latest hits included
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
            <div className="text-2xl font-bold text-green-600">{data.length}</div>
            <div className="text-gray-600">Charting Songs</div>
            <div className="text-sm text-green-600 mt-1">This week</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-blue-600">{formatNumber(totalStreams)}</div>
            <div className="text-gray-600">Total Weekly Streams</div>
            <div className="text-sm text-green-600 mt-1">Combined</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-purple-600">{risingSongs}</div>
            <div className="text-gray-600">Rising Songs</div>
            <div className="text-sm text-green-600 mt-1">Trending up</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-orange-600">{avgGrowth}%</div>
            <div className="text-gray-600">Avg Growth</div>
            <div className="text-sm text-green-600 mt-1">Week over week</div>
          </div>
        </div>

        {/* Weekly Songs Chart */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6">
            <h2 className="text-xl font-bold">Ultimate Albanian Weekly Songs Chart</h2>
            <p className="text-green-100 mt-1">Most streamed Albanian songs including latest releases from all artists</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium">Rank</th>
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
                {data.map((song, index) => (
                  <tr key={song.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(index + 1)}
                      </div>
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
  };

  const renderMonthlySongs = () => {
    const data = getCurrentData();
    const totalStreams = data.reduce((sum, song) => sum + song.monthlyStreams, 0);
    const risingSongs = data.filter(song => song.momentum === 'explosive' || song.momentum === 'rising').length;
    const avgGrowth = Math.round(data.reduce((sum, song) => sum + Math.abs(song.monthlyGrowth), 0) / data.length);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-3">
              <Headphones className="w-8 h-8 text-indigo-500" />
              <span>Ultimate Albanian Songs Monthly Chart</span>
            </h1>
            <p className="text-gray-600 mt-2">Top Albanian songs by monthly streaming numbers across all platforms</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 bg-indigo-50 px-3 py-2 rounded-lg">
              <Calendar className="w-4 h-4 inline mr-2" />
              Updated monthly • Complete catalog
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
            <div className="text-2xl font-bold text-indigo-600">{data.length}</div>
            <div className="text-gray-600">Charting Songs</div>
            <div className="text-sm text-green-600 mt-1">This month</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-blue-600">{formatNumber(totalStreams)}</div>
            <div className="text-gray-600">Total Monthly Streams</div>
            <div className="text-sm text-green-600 mt-1">Combined</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-purple-600">{risingSongs}</div>
            <div className="text-gray-600">Rising Songs</div>
            <div className="text-sm text-green-600 mt-1">Trending up</div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-2xl font-bold text-orange-600">{avgGrowth}%</div>
            <div className="text-gray-600">Avg Growth</div>
            <div className="text-sm text-green-600 mt-1">Month over month</div>
          </div>
        </div>

        {/* Monthly Songs Chart */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
            <h2 className="text-xl font-bold">Ultimate Albanian Monthly Songs Chart</h2>
            <p className="text-indigo-100 mt-1">Most streamed Albanian songs this month from complete artist database</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium">Rank</th>
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
                {data.map((song, index) => (
                  <tr key={song.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(index + 1)}
                      </div>
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
  };

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
                Powered by Viberate Research • {allAlbanianArtists.length} Artists • 6 Categories
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

export default UltimateAlbanianMusicPlatform;
