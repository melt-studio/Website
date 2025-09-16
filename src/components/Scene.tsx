import { OrthographicCamera } from "@react-three/drei";
import Background from "./Background/Background";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
// import { useEffect } from "react";
import { useStore } from "../store";
import { WebGLRenderer } from "three";

const debug = process.env.NODE_ENV === "debug";

const Scene = () => {
  // useEffect(() => {
  //   document.documentElement.classList.add("page-dissolve");
  //   return () => document.documentElement.classList.remove("page-dissolve");
  // }, []);

  const setValue = useStore((state) => state.setValue);
  // const ready = useStore((state) => state.ready);

  const glSettings = {
    antialias: false,
    preserveDrawingBuffer: false,
  };

  const created = ({ gl }: { gl: WebGLRenderer }) => {
    gl.setClearColor(0x000000, 1);
    setValue("ready", true);
  };

  return (
    <div className="flex justify-center items-center h-dvh w-full text-white fixed top-0 left-0 z-1">
      <Canvas dpr={[1, 2]} gl={glSettings} onCreated={created}>
        {debug && <Perf position="bottom-left" />}
        <OrthographicCamera makeDefault left={-0.5} right={0.5} top={0.5} bottom={-0.5} near={-1} far={1} manual />
        <Background />
      </Canvas>
    </div>
  );
};

export default Scene;
