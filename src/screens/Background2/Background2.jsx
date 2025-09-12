import { useEffect, useMemo, useRef } from "react";
import { Vector4 } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import { vertexShader } from "./shaders/vertex";
import { fragmentShader } from "./shaders/fragment";

import config from "../../config.json";

import { useStore } from "../../store";
import { OrthographicCamera } from "@react-three/drei";

const debug = process.env.NODE_ENV === "debug";

const Scene = () => {
  const setValue = useStore((state) => state.setValue);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) setValue("background", ref.current);
  }, [ref, setValue]);

  const { size } = useThree();

  const [uniforms] = useMemo(() => {
    const uniforms = {
      uTime: { value: 0 },
      uColors: { value: config.controls.colors },
      uWaves: { value: config.controls.waves },
      uDistortion: { value: config.controls.distortion },
      uResolution: {
        value: new Vector4(0, 0, 1024, 1024),
      },
      PI: { value: Math.PI },
    };

    return [uniforms];
  }, []);

  useEffect(() => {
    if (ref.current && ref.current.material) {
      ref.current.material.uniforms.uResolution.value.x = size.width;
      ref.current.material.uniforms.uResolution.value.y = size.height;
    }
  }, [size, setValue]);

  useFrame((_state, delta) => {
    if (ref.current && ref.current.material) {
      ref.current.material.uniforms.uTime.value += delta;
    }
  });

  return (
    <>
      <OrthographicCamera makeDefault left={-0.5} right={0.5} top={0.5} bottom={-0.5} near={-1} far={1} manual />
      <mesh ref={ref}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
      </mesh>
    </>
  );
};

const Background2 = () => {
  const setValue = useStore((state) => state.setValue);
  const ready = useStore((state) => state.ready);

  useEffect(() => {
    document.body.classList.add("dissolve-page");

    return () => {
      document.body.classList.remove("dissolve-page");
      setValue("ready", false);
    };
  }, []);

  const glSettings = {
    antialias: false,
    preserveDrawingBuffer: false,
  };

  const created = ({ gl }) => {
    gl.setClearColor(0x000000, 1);
    setValue("ready", true);
  };

  return (
    <div className="flex fixed inset-0 justify-center items-center h-dvh w-full text-white">
      <Canvas dpr={[1, 2]} gl={glSettings} onCreated={created}>
        {debug && <Perf position="bottom-left" />}
        <Scene />
      </Canvas>
    </div>
  );
};

export default Background2;
