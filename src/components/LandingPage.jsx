import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import {
  BarChart3, Music, Users, TrendingUp, Globe, Award, Star, Play, 
  ChevronRight, Menu, X, Mail, Phone, MapPin, Calendar, Clock,
  Download, Share2, Eye, Heart, ExternalLink, CheckCircle,
  Zap, Target, Crown, Trophy, Flame, Activity, Radio, Mic2,
  Instagram, Youtube, Facebook, Twitter, Linkedin, Github,
  ArrowRight, PlayCircle, Headphones, Disc3, Waves, Smartphone,
  BarChart2, LineChart, PieChart, TrendingDown, RefreshCw,
  Filter, Search, Bell, Settings, Home, Building, Verified
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  // Sample data for demonstrations
  const featuredArtists = [
    {
      name: "Dua Lipa",
      image: "https://i.scdn.co/image/ab6761610000e5eb0c68f6c95232e716f0abee8d",
      country: "🇬🇧",
      platformScore: 95,
      followers: "46.6M",
      growth: "+12.5%",
      verified: true
    },
    {
      name: "Noizy",
      image: "https://i.scdn.co/image/ab6761610000e5eb747661201202202202202202",
      country: "🇦🇱",
      platformScore: 75,
      followers: "812.3K",
      growth: "+25.8%",
      verified: true
    },
    {
      name: "Era Istrefi",
      image: "https://i.scdn.co/image/ab6761610000e5eb0777b7e7de2d9c0d8c7b8e9f",
      country: "🇦🇱",
      platformScore: 72,
      followers: "512.3K",
      growth: "+18.5%",
      verified: true
    }
  ];

  const topTracks = [
    {
      rank: 1,
      title: "Flowers",
      artist: "Miley Cyrus",
      streams: "45.8M",
      growth: "+15.2%",
      momentum: "rising"
    },
    {
      rank: 4,
      title: "Pronto",
      artist: "Noizy",
      streams: "28.5M",
      growth: "+25.8%",
      momentum: "explosive"
    },
    {
      rank: 6,
      title: "Bonbon",
      artist: "Era Istrefi",
      streams: "24.2M",
      growth: "+18.5%",
      momentum: "rising"
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Artist Intelligence",
      description: "Comprehensive artist analytics with A&R discovery scores, momentum tracking, and market potential assessment.",
      color: "text-blue-600"
    },
    {
      icon: Music,
      title: "Track Analytics",
      description: "Real-time streaming data, viral scores, and performance monitoring across all major platforms.",
      color: "text-green-600"
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Advanced filtering, demographic analysis, and growth trajectory predictions for strategic decisions.",
      color: "text-purple-600"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Albanian music market focus with international context and cross-platform integration.",
      color: "text-red-600"
    },
    {
      icon: BarChart3,
      title: "Professional Charts",
      description: "Industry-standard charts and rankings comparable to Billboard and Spotify analytics.",
      color: "text-orange-600"
    },
    {
      icon: Target,
      title: "A&R Discovery",
      description: "Talent identification tools with investment tier classification and breakout potential analysis.",
      color: "text-indigo-600"
    }
  ];

  const stats = [
    { label: "Artists Tracked", value: "10,000+", icon: Users },
    { label: "Monthly Streams", value: "2.8B", icon: Play },
    { label: "Countries Covered", value: "95", icon: Globe },
    { label: "Data Points", value: "50M+", icon: BarChart3 }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "A&R Manager, Atlantic Records",
      content: "This platform revolutionized our talent discovery process. The Albanian market insights are unparalleled.",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Ardit Gjebrea",
      role: "Music Producer, Albania",
      content: "Finally, a professional analytics platform that understands the Albanian music scene. Game-changing!",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Marcus Chen",
      role: "Music Industry Analyst",
      content: "The depth of data and professional presentation rivals industry leaders. Highly recommended.",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  const launchPlatform = () => {
    // Navigate to the analytics platform
    navigate('/launch-platform');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">Albanian Music Analytics</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`text-sm font-medium transition-colors ${activeSection === 'home' ? 'text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className={`text-sm font-medium transition-colors ${activeSection === 'features' ? 'text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className={`text-sm font-medium transition-colors ${activeSection === 'demo' ? 'text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Demo
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className={`text-sm font-medium transition-colors ${activeSection === 'testimonials' ? 'text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`text-sm font-medium transition-colors ${activeSection === 'contact' ? 'text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Contact
            </button>
            <Button onClick={launchPlatform} className="bg-red-600 hover:bg-red-700 text-white">
              Launch Platform
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left text-gray-600 hover:text-gray-900">Home</button>
              <button onClick={() => scrollToSection('features')} className="block w-full text-left text-gray-600 hover:text-gray-900">Features</button>
              <button onClick={() => scrollToSection('demo')} className="block w-full text-left text-gray-600 hover:text-gray-900">Demo</button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-gray-600 hover:text-gray-900">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-gray-600 hover:text-gray-900">Contact</button>
              <Button onClick={launchPlatform} className="w-full bg-red-600 hover:bg-red-700 text-white">Launch Platform</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-red-100 text-red-800 border-red-200">
              🇦🇱 Professional Music Intelligence Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover the Future of
              <span className="text-red-600 block">Albanian Music Analytics</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Professional-grade music analytics platform featuring comprehensive artist intelligence, 
              real-time streaming data, A&R discovery tools, and market insights for the Albanian music industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={launchPlatform} size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                <PlayCircle className="h-5 w-5 mr-2" />
                Launch Platform
              </Button>
              <Button onClick={launchPlatform} size="lg" variant="outline" className="border-gray-300 px-8 py-3">
                <Eye className="h-5 w-5 mr-2" />
                View Demo
              </Button>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Music Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional analytics tools designed for A&R professionals, music managers, 
              artists, and industry stakeholders seeking data-driven insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our platform provides comprehensive analytics for both emerging Albanian artists 
              and international superstars with Albanian connections.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Featured Artists */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Artists</h3>
              <div className="space-y-4">
                {featuredArtists.map((artist, index) => (
                  <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={artist.image} 
                          alt={artist.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">{artist.name}</h4>
                            {artist.verified && <Verified className="h-4 w-4 text-blue-500" />}
                            <span className="text-lg">{artist.country}</span>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">{artist.followers} followers</span>
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              {artist.growth}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{artist.platformScore}</div>
                          <div className="text-xs text-gray-500">Platform Score</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Top Tracks */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Tracks This Week</h3>
              <div className="space-y-4">
                {topTracks.map((track, index) => (
                  <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">#{track.rank}</span>
                          {track.rank <= 3 && (
                            <div>
                              {track.rank === 1 && <Crown className="h-5 w-5 text-yellow-500" />}
                              {track.rank === 2 && <Trophy className="h-5 w-5 text-gray-400" />}
                              {track.rank === 3 && <Award className="h-5 w-5 text-orange-500" />}
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold text-gray-900">{track.title}</h4>
                          <p className="text-sm text-gray-600">{track.artist}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{track.streams}</div>
                          <div className="flex items-center space-x-1">
                            <Badge 
                              className={`text-xs ${
                                track.momentum === 'explosive' ? 'bg-red-100 text-red-800' :
                                track.momentum === 'rising' ? 'bg-green-100 text-green-800' :
                                'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {track.momentum === 'explosive' && <Flame className="h-3 w-3 mr-1" />}
                              {track.momentum === 'rising' && <TrendingUp className="h-3 w-3 mr-1" />}
                              {track.growth}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Platform Screenshot Placeholder */}
          <div className="mt-16">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Professional Analytics Dashboard</h3>
                <p className="text-red-100">Complete artist intelligence, streaming analytics, and A&R discovery tools</p>
              </div>
              <div className="bg-gray-100 p-8 text-center">
                <div className="bg-white rounded-lg p-8 shadow-inner">
                  <BarChart3 className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive platform demo available</p>
                  <Button onClick={launchPlatform} className="mt-4 bg-red-600 hover:bg-red-700 text-white">
                    Launch Live Demo
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Music industry leaders rely on our platform for data-driven decision making 
              and talent discovery in the Albanian music market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Started Today
              </h2>
              <p className="text-xl text-gray-600">
                Ready to revolutionize your music analytics? Contact us for a personalized demo 
                or start your free trial today.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Request Demo Access
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                  </div>
                  <Input placeholder="Email Address" type="email" />
                  <Input placeholder="Company/Organization" />
                  <Textarea placeholder="Tell us about your music analytics needs..." rows={4} />
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Request Demo Access
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-red-600" />
                      <span className="text-gray-600">contact@albanianmusic.analytics</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-red-600" />
                      <span className="text-gray-600">+355 (0) 123 456 789</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-red-600" />
                      <span className="text-gray-600">Tirana, Albania</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-600">Real-time streaming analytics</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-600">A&R discovery tools</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-600">Market intelligence reports</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-600">Professional data export</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-600">Albanian market specialization</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon">
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg">Albanian Music Analytics</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Professional music intelligence platform for the Albanian music industry 
                and international market analysis.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-gray-400">
                <div>Artist Analytics</div>
                <div>Track Performance</div>
                <div>Market Intelligence</div>
                <div>A&R Discovery</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-gray-400">
                <div>Documentation</div>
                <div>API Reference</div>
                <div>Industry Reports</div>
                <div>Support Center</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About Us</div>
                <div>Careers</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Albanian Music Analytics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
