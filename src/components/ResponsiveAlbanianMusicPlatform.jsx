import React, { useState } from 'react';
import { UltimateAlbanianMusicPlatform } from './UltimateAlbanianMusicPlatform';

// Import the working desktop component
import UltimateAlbanianMusicPlatform from './UltimateAlbanianMusicPlatform';

const ResponsiveAlbanianMusicPlatform = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If desktop, use the existing working component
  if (!isMobile) {
    return <UltimateAlbanianMusicPlatform />;
  }

  // Mobile-specific component with improved readability
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile-specific CSS */}
      <style jsx>{`
        /* Mobile-only styles */
        @media (max-width: 767px) {
          .mobile-chart-card {
            min-height: 120px !important;
            padding: 16px !important;
          }
          
          .mobile-chart-text {
            font-size: 14px !important;
            line-height: 1.4 !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
          
          .mobile-chart-title {
            font-size: 12px !important;
            margin-bottom: 8px !important;
          }
          
          .mobile-chart-number {
            font-size: 18px !important;
            font-weight: bold !important;
            margin-bottom: 4px !important;
          }
          
          .mobile-modal {
            padding: 20px !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
          }
          
          .mobile-modal .chart-positions {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            margin-top: 20px !important;
          }
          
          .mobile-modal .chart-position-card {
            padding: 20px !important;
            border-radius: 12px !important;
            text-align: center !important;
            min-height: 100px !important;
          }
          
          .mobile-modal .chart-position-title {
            font-size: 12px !important;
            margin-bottom: 8px !important;
            opacity: 0.8 !important;
          }
          
          .mobile-modal .chart-position-rank {
            font-size: 24px !important;
            font-weight: bold !important;
            margin-bottom: 4px !important;
          }
          
          .mobile-modal .chart-position-platform {
            font-size: 11px !important;
            opacity: 0.7 !important;
          }
        }
      `}</style>

      {/* Use the existing component but with mobile-specific styling */}
      <div className="mobile-optimized">
        <UltimateAlbanianMusicPlatform />
      </div>
    </div>
  );
};

export default ResponsiveAlbanianMusicPlatform;
