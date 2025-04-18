import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  const basePath = process.env.NODE_ENV === 'production' ? '/unity-learn' : '';

  const { unityProvider, requestFullscreen } = useUnityContext({
    loaderUrl: `${basePath}/games/Essentials Project/WebGL Builds/Build/WebGL Builds.loader.js`,
    dataUrl: `${basePath}/games/Essentials Project/WebGL Builds/Build/WebGL Builds.data.br`,
    frameworkUrl: `${basePath}/games/Essentials Project/WebGL Builds/Build/WebGL Builds.framework.js.br`,
    codeUrl: `${basePath}/games/Essentials Project/WebGL Builds/Build/WebGL Builds.wasm.br`,
  });

  return (
    <div>
      <Unity 
        unityProvider={unityProvider} 
        style={{ width: "800px", height: "600px" }}
      />
      <button onClick={requestFullscreen}>Fullscreen</button>
    </div>
  );
}

export default App;