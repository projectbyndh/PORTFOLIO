import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const PremiumLoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const loadingBarRef = useRef(null);

  useEffect(() => {
    // Start loading on route change
    setProgress(20);

    // Simulate progressive loading with realistic timing
    const timer1 = setTimeout(() => setProgress(40), 100);
    const timer2 = setTimeout(() => setProgress(70), 300);
    const timer3 = setTimeout(() => setProgress(100), 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname]);

  useEffect(() => {
    // Initial page load
    setProgress(30);
    const initialTimer = setTimeout(() => setProgress(100), 800);

    return () => clearTimeout(initialTimer);
  }, []);

  return (
    <>
      <LoadingBar
        color="#4A8EBC"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={4}
        shadow={true}
        waitingTime={400}
        loaderSpeed={500}
        transitionTime={300}
        containerStyle={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
        }}
        containerClassName="loading-bar-container"
        className="loading-bar-shimmer loading-bar-glow"
      />
      <style dangerouslySetInnerHTML={{
        __html: `
                .loading-bar-container > div {
                  background: linear-gradient(
                    90deg,
                    #4A8EBC 0%,
                    #5BA3D0 25%,
                    #6BB8E3 50%,
                    #5BA3D0 75%,
                    #4A8EBC 100%
                  ) !important;
                  background-size: 200% 100% !important;
                  animation: shimmer 2s infinite linear !important;
                  box-shadow: 
                    0 0 10px rgba(74, 142, 188, 0.8),
                    0 0 20px rgba(74, 142, 188, 0.5),
                    0 0 30px rgba(74, 142, 188, 0.3) !important;
                  border-radius: 0 2px 2px 0 !important;
                }
        
                @keyframes shimmer {
                  0% {
                    background-position: -200% 0;
                  }
                  100% {
                    background-position: 200% 0;
                  }
                }
            `}} />
    </>
  );
};

export default PremiumLoadingBar;
