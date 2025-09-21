import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AnalyticsPlatformWorkingFixed from './components/AnalyticsPlatformWorkingFixed';
import VibrateStyleAnalyticsPlatform from './components/VibrateStyleAnalyticsPlatform';
import EnhancedAlbanianArtistsPlatform from './components/EnhancedAlbanianArtistsPlatform';
import UltimateAlbanianMusicPlatform from './components/UltimateAlbanianMusicPlatform';
import './App.css';
import './mobile-fixes.css';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/launch-platform" element={<UltimateAlbanianMusicPlatform />} />
        <Route path="/artists-platform" element={<EnhancedAlbanianArtistsPlatform />} />
        <Route path="/viberate-platform" element={<VibrateStyleAnalyticsPlatform />} />
        <Route path="/legacy-platform" element={<AnalyticsPlatformWorkingFixed />} />
      </Routes>
    </Router>
  );
};

export default App;
