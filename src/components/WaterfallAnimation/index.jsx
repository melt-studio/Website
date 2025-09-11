import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import LevaControls from "../helpers/LevaControls";
import PerfMonitor from "../helpers/PerfMonitor";
import Scene from "./Scene";
import "../helpers/animation.css";
import { cursorEvents } from "../Cursor/Cursor";

import { useToggleControls } from "../helpers/toggleControls";
import { getLocalStorageConfig } from "../helpers/LevaControls/localStorageConfig";
import defaultConfig from "../helpers/LevaControls/config.json";
import ToggleControls from "../helpers/ToggleControls_";

const glSettings = {
  antialias: false,
};

const WaterfallAnimation = ({ serverConfig, controls, mobile }) => {
  const { metric, value } = defaultConfig.devices.mobile;
  const [name, setName] = useState(
    (mobile && controls) || window[`inner${metric[0].toUpperCase() + metric.slice(1)}`] < value
      ? "waterfall-mobile"
      : "waterfall"
  );
  const updateName = (newName) => {
    setName(newName);
  };

  useEffect(() => {
    if (controls) {
      document.body.classList.add("controls");
    } else {
      document.body.classList.remove("controls");
    }
  }, [controls]);

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

  const container = useRef();

  const created = ({ gl }) => {
    gl.domElement.id = "waterfallAnimation";
    gl.setClearAlpha(0);
    if (container && container.current) {
      container.current.classList.add("show");
    }
  };

  return (
    <>
      {controls && <ToggleControls />}
      <LevaControls controls={controls === undefined ? false : controls} />
      <div
        className="animation-container"
        onMouseEnter={() => cursorEvents.onMouseEnter(["animation"])}
        onMouseLeave={() => cursorEvents.onMouseLeave(["animation"])}
        ref={container}
        style={{
          // width: mobile && controls ? "390px" : "100%",
          // height: mobile && controls ? "844px" : "100vh",
          width: "100%",
          height: controls ? "100%" : "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,

          position: controls ? "relative" : "fixed",
          top: 0,
        }}
      >
        <Canvas dpr={[1, 2]} gl={glSettings} onCreated={created}>
          {controls ? <PerfMonitor /> : null}
          <Scene
            name={name}
            controls={controls === undefined ? false : controls}
            config={config}
            updateConfig={setConfig}
            localStorageConfig={localStorageConfig}
            containerRef={container}
            updateName={updateName}
          />
        </Canvas>
      </div>
    </>
  );
};

export default WaterfallAnimation;
