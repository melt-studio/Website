import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import LevaControls from "../helpers/LevaControls";
import PerfMonitor from "../helpers/PerfMonitor";
import Scene from "./Scene";
import "./LogoAnimation.css";

import { useToggleControls } from "../helpers/toggleControls";
import { getLocalStorageConfig } from "../helpers/LevaControls/localStorageConfig";
import defaultConfig from "../helpers/LevaControls/config.json";

const glSettings = {
  antialias: false,
};

const LogoAnimation = ({ serverConfig, controls, effectRef, mobile, fade = false }) => {
  const { metric, value } = defaultConfig.devices.mobile;
  const [name, setName] = useState(
    (mobile && controls) || window[`inner${metric[0].toUpperCase() + metric.slice(1)}`] < value ? "logo-mobile" : "logo"
  );

  const updateName = (newName) => {
    setName(newName);
  };

  const container = useRef();

  const created = ({ gl }) => {
    gl.domElement.id = "logoAnimation";
    if (container && container.current) {
      container.current.classList.add("show");
    }
  };

  useEffect(() => {
    if (controls) {
      document.body.classList.add("controls");
    } else {
      document.body.classList.remove("controls");
    }
  }, [controls]);

  const [sceneFps, setSceneFps] = useState(60);

  // const [config, updateConfig] = useConfig(name, serverConfig);
  const [config, setConfig] = useState(defaultConfig[name]);

  useEffect(() => {
    if (serverConfig !== null && serverConfig[name] !== undefined) {
      if (serverConfig[name].id !== defaultConfig[name].id) {
        console.log(`Mismatching record ids: ${serverConfig[name].id}, ${defaultConfig[name].id}`);
      }
      setConfig(serverConfig[name]);
    }

    // else {
    //   console.log(`Config ${name} not found on server`);
    // }
  }, [name, serverConfig]);

  const localStorageConfig = getLocalStorageConfig(name, defaultConfig);
  useToggleControls(controls === undefined ? false : controls);

  return (
    <>
      <LevaControls controls={controls === undefined ? false : controls} />
      <div
        className="animation-container"
        ref={container}
        style={{
          // width: mobile && controls ? "390px" : "100%",
          // height: mobile && controls ? "844px" : "100%",
          width: "100%",
          height: "100%",
          maxHeight: controls ? "none" : "1000px",
          // maxHeight: "1000px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Canvas
          dpr={[1, 2]}
          gl={glSettings}
          onCreated={created}
          camera={{ fov: 20, near: 50, far: 200, position: [0, 0, 90] }}
        >
          {controls ? <PerfMonitor /> : null}

          <PerformanceMonitor
            onChange={({ fps }) => {
              // { fps, factor, refreshrate, frames, averages }
              // onChange is triggered when factor [0,1] changes. Factor starts at 0.5 and increases/decreased by step based on calculated performance. Once reaches 1 it won't be called again until changes.
              // Get monitored FPS to nearest 10
              // If change send that to scene/trail - NB: will cause Trail re-render
              // TODO: restrict to [30, 60, 90, 120]???
              const monitoredFps = Math.floor(fps / 10) * 10;
              if (monitoredFps !== sceneFps) {
                console.log(`--- FPS UPDATE: ${sceneFps} --> ${monitoredFps}`);
                setSceneFps(monitoredFps);
              }
            }}
          >
            <Scene
              fps={sceneFps}
              name={name}
              controls={controls === undefined ? false : controls}
              config={config}
              updateConfig={setConfig}
              localStorageConfig={localStorageConfig}
              ref={effectRef}
              containerRef={container}
              updateName={updateName}
              fade={fade}
            />
          </PerformanceMonitor>
        </Canvas>
      </div>
    </>
  );
};

export default LogoAnimation;
