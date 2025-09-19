import { OrthographicCamera } from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useStore } from "../../../stores/store";
import { WebGLRenderer } from "three";
import clsx from "clsx";
import { useLocation } from "react-router";
import Scene from "./Scene";

const debug = process.env.NODE_ENV === "debug";

const Wrapper = () => {
  const location = useLocation();

  const docs = location.pathname.includes("/docs/");

  // const setValue = useStore((state) => state.setValue);
  const ready = useStore((state) => state.ready);

  const glSettings = {
    antialias: false,
    preserveDrawingBuffer: false,
  };

  const created = ({ gl }: { gl: WebGLRenderer }) => {
    gl.setClearColor(0xc1c1c1, 1);
    // setValue("ready", true);
    // // console.log("READY");
    // // if (logoRef.current) logoRef.current.style.display = "none";
  };

  return (
    // <div
    //   className={clsx(
    //     "justify-center items-center h-dvh w-full text-white top-0 left-0 z-1 transition-opacity duration-2000",
    //     {
    //       "opacity-100": ready,
    //       "opacity-0": !ready,
    //       hidden: docs,
    //       flex: !docs,
    //     }
    //   )}
    // >
    <Canvas dpr={[1, 2]} gl={glSettings} onCreated={created}>
      {debug && <Perf position="bottom-left" />}
      <OrthographicCamera makeDefault left={-0.5} right={0.5} top={0.5} bottom={-0.5} near={-1} far={1} manual />
      <Scene />
    </Canvas>
    // </div>
  );
};

export default Wrapper;
