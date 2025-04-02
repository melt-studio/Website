import { useEffect, useMemo, useRef } from "react";
import { Vector4 } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { vertexShader } from "./shaders/vertex";
import { fragmentShader } from "./shaders/fragment";

import config from "../../config.json";

import { useStore } from "../../store";
import { BackgroundMesh } from "../../types";

const Background = () => {
  const setValue = useStore((state) => state.setValue);
  const ref = useRef<BackgroundMesh>(null);

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
    <mesh ref={ref}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Background;
