import React, { useState, useEffect, useRef } from 'react';
import './UnityGamePlayer.css';

// Component to play Unity WebGL games with support for multiple games
const UnityGamePlayer = ({ 
  gameId, 
  gameTitle = "Unity Game",
  width = 1280,
  height = 720,
  fullscreenEnabled = true
}) => {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [unityInstance, setUnityInstance] = useState(null);
  const [warnings, setWarnings] = useState([]);

  // Detect if user is on mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  // Get the base URL from Vite environment
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // Base path for Unity builds
  const basePath = `${baseUrl}unity-builds`;
  
  // Build game-specific paths
  const buildUrl = `${basePath}/${gameId}/Build`;
  const templateDataUrl = `${basePath}/${gameId}/TemplateData`;
  const streamingAssetsUrl = `${basePath}/${gameId}/StreamingAssets`;

  // Unity config matching the original HTML - now with proper .br extensions
  const config = {
    arguments: [],
    dataUrl: `${buildUrl}/WebGL Builds.data.br`,
    frameworkUrl: `${buildUrl}/WebGL Builds.framework.js.br`,
    codeUrl: `${buildUrl}/WebGL Builds.wasm.br`,
    streamingAssetsUrl: streamingAssetsUrl,
    companyName: "RickyCorp",
    productName: gameTitle,
    productVersion: "0.1.0",
  };

  // Function to show warning/error banners (ported from original)
  const showBanner = (msg, type) => {
    console.log(`Unity ${type}: ${msg}`);
    const newWarning = { msg, type };
    setWarnings(prev => [...prev, newWarning]);
    
    if (type !== 'error') {
      setTimeout(() => {
        setWarnings(prev => prev.filter(w => w !== newWarning));
      }, 5000);
    }
  };

  // Add showBanner to config
  config.showBanner = showBanner;

  // Handle fullscreen
  const handleFullscreen = () => {
    if (unityInstance) {
      unityInstance.SetFullscreen(1);
    }
  };

  // Load Unity
  useEffect(() => {
    let cancelled = false;

    const loadUnity = async () => {
      // Ensure canvas exists
      if (!canvasRef.current) return;
      
      // Clear previous game if exists
      if (unityInstance) {
        unityInstance.Quit();
        setUnityInstance(null);
        setIsLoaded(false);
        setProgress(0);
      }
      
      // We need to ensure the Unity loader script is loaded
      const loaderUrl = `${buildUrl}/WebGL Builds.loader.js`;
      
      const loadScript = () => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = loaderUrl;
          script.async = true;
          
          script.onload = resolve;
          script.onerror = (e) => {
            console.error("Failed to load Unity script:", e);
            reject(new Error(`Failed to load Unity loader from ${loaderUrl}. Check that the file exists and the server can access it.`));
          };
          
          document.body.appendChild(script);
        });
      };
      
      try {
        // Only load the script if createUnityInstance is not defined
        if (typeof window.createUnityInstance === 'undefined') {
          console.log("Loading Unity script from:", loaderUrl);
          await loadScript();
        }
        
        if (cancelled) return;

        console.log("Creating Unity instance with config:", config);
        
        // Create the Unity instance
        const instance = await window.createUnityInstance(
          canvasRef.current,
          config,
          (loadProgress) => {
            if (!cancelled) {
              setProgress(loadProgress * 100);
              console.log(`Loading progress: ${Math.round(loadProgress * 100)}%`);
            }
          }
        );
        
        if (!cancelled) {
          setUnityInstance(instance);
          setIsLoaded(true);
          console.log("Unity game loaded successfully!");
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Unity loading error:", error);
          showBanner(`Failed to load Unity game: ${error.message}. Check browser console for details.`, 'error');
        }
      }
    };

    loadUnity();

    // Cleanup function
    return () => {
      cancelled = true;
      if (unityInstance) {
        unityInstance.Quit();
      }
    };
  }, [gameId, unityInstance, buildUrl]); // Reload when gameId or buildUrl changes

  // Add mobile meta tag if on mobile
  useEffect(() => {
    if (isMobile) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
      document.getElementsByTagName('head')[0].appendChild(meta);
      
      // Cleanup when component unmounts
      return () => {
        const metaTags = document.getElementsByTagName('meta');
        for (let i = 0; i < metaTags.length; i++) {
          if (metaTags[i].name === 'viewport' && 
              metaTags[i].content === 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes') {
            metaTags[i].remove();
            break;
          }
        }
      };
    }
  }, [isMobile]);

  // Dynamic styles for the progress bar images
  const progressBarEmpty = {
    backgroundImage: `url('${templateDataUrl}/progress-bar-empty-dark.png')`
  };
  
  const progressBarFull = {
    backgroundImage: `url('${templateDataUrl}/progress-bar-full-dark.png')`,
    width: `${progress}%`
  };
  
  const unityLogo = {
    backgroundImage: `url('${templateDataUrl}/unity-logo-dark.png')`
  };
  
  const unityLogoFooter = {
    backgroundImage: `url('${templateDataUrl}/unity-logo-light.png')`
  };
  
  const fullscreenButton = {
    backgroundImage: `url('${templateDataUrl}/fullscreen-button.png')`
  };

  return (
    <div id="unity-container" className={isMobile ? "unity-mobile" : "unity-desktop"}>
      <canvas 
        ref={canvasRef}
        id="unity-canvas" 
        width={width} 
        height={height} 
        tabIndex="-1"
        className={isMobile ? "unity-mobile" : ""}
        style={{
          width: isMobile ? '100%' : `${width}px`,
          height: isMobile ? '100%' : `${height}px`
        }}
      ></canvas>
      
      {!isLoaded && (
        <div id="unity-loading-bar">
          <div id="unity-logo" style={unityLogo}></div>
          <div id="unity-progress-bar-empty" style={progressBarEmpty}>
            <div 
              id="unity-progress-bar-full" 
              style={progressBarFull}
            ></div>
          </div>
        </div>
      )}
      
      <div id="unity-warning" style={{ display: warnings.length > 0 ? 'block' : 'none' }}>
        {warnings.map((warning, index) => (
          <div 
            key={index} 
            style={{ 
              background: warning.type === 'error' ? 'red' : warning.type === 'warning' ? 'yellow' : 'transparent',
              padding: '10px'
            }}
          >
            {warning.msg}
          </div>
        ))}
      </div>
      
      <div id="unity-footer">
        <div id="unity-logo-title-footer" style={unityLogoFooter}></div>
        {fullscreenEnabled && (
          <div 
            id="unity-fullscreen-button" 
            onClick={handleFullscreen}
            style={fullscreenButton}
          ></div>
        )}
        <div id="unity-build-title">{gameTitle}</div>
      </div>
    </div>
  );
};

export default UnityGamePlayer;