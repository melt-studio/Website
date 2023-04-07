import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import LevaControls from "../helpers/LevaControls";
import PerfMonitor from "../helpers/PerfMonitor";
import Scene from "./Scene";

import { useToggleControls } from "../helpers/toggleControls";
import { getLocalStorageConfig } from "../helpers/LevaControls/localStorageConfig";
import defaultConfig from "../helpers/LevaControls/config.json";

const glSettings = {
  antialias: false,
};

const created = ({ gl }) => {
  gl.domElement.id = "waterfallAnimation";
  gl.setClearAlpha(0);
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

  return (
    <>
      <LevaControls controls={controls === undefined ? false : controls} />
      <div
        ref={container}
        style={{
          width: mobile && controls ? "390px" : "100%",
          height: mobile && controls ? "844px" : "100vh",
          display: "block",
          position: "fixed",
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
