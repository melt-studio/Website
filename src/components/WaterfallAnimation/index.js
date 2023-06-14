import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import LevaControls from "../helpers/LevaControls";
import PerfMonitor from "../helpers/PerfMonitor";
import Scene from "./Scene";

import { useConfig } from "../helpers/LevaControls/setupConfig";
import { useToggleControls } from "../helpers/toggleControls";
import { getLocalStorageConfig } from "../helpers/LevaControls/setupConfig";
import defaultConfig from "../helpers/LevaControls/config.json";
import { useRef } from "react";

const glSettings = {
  antialias: false,
};

const created = ({ gl }) => {
  gl.domElement.id = "waterfallAnimation";
  gl.setClearAlpha(0);
};

const WaterfallAnimation = ({ controls, mobile, cursor }) => {
  const { metric, value } = defaultConfig.devices.mobile;
  const [name, setName] = useState(
    (mobile && controls) ||
      window[`inner${metric[0].toUpperCase() + metric.slice(1)}`] < value
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

  const [config, updateConfig] = useConfig(name);
  const localStorageConfig = getLocalStorageConfig(name);
  useToggleControls(controls === undefined ? false : controls);

  const container = useRef();

  return (
    <>
      <LevaControls controls={controls === undefined ? false : controls} />
      <div
        ref={container}
        className="canvas-container loading"
        style={{
          width: mobile && controls ? "390px" : "100%",
          height: mobile && controls ? "844px" : "100dvh",
          display: "block",
          position: "fixed",
          top: 0,
          // transition: "height 1s",
        }}
      >
        <Canvas
          dpr={[1, 2]}
          gl={glSettings}
          onCreated={created}
          orthographic
          camera={{
            left: -1,
            right: 1,
            top: 1,
            bottom: -1,
            near: -1,
            far: 1,
          }}
        >
          {controls ? <PerfMonitor /> : null}
          <Scene
            name={name}
            controls={controls === undefined ? false : controls}
            config={config}
            updateConfig={updateConfig}
            localStorageConfig={localStorageConfig}
            containerRef={container}
            updateName={updateName}
            cursor={cursor}
          />
        </Canvas>
      </div>
    </>
  );
};

export default WaterfallAnimation;
