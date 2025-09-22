import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { WebGLRenderer } from "three";
import Scene from "./Scene";

const debug = process.env.NODE_ENV === "debug";

const Wrapper = () => {
  const glSettings = {
    antialias: false,
    preserveDrawingBuffer: false,
  };

  const created = ({ gl }: { gl: WebGLRenderer }) => {
    gl.setClearColor(0xc1c1c1, 1);
  };

  return (
    <Canvas dpr={[1, 2]} gl={glSettings} onCreated={created}>
      {debug && <Perf position="bottom-left" />}
      <OrthographicCamera makeDefault left={-0.5} right={0.5} top={0.5} bottom={-0.5} near={-1} far={1} manual />
      <Scene />
    </Canvas>
  );
};

export default Wrapper;
