import { useEffect, useMemo, useRef } from "react";
import { Vector4 } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { vertexShader } from "./shaders/vertex";
import { fragmentShader } from "./shaders/fragment";

import config from "../../../config.json";

// import { useStore } from "../../../stores/store";
import { ShaderMesh } from "../../../types";
import { useLocation } from "react-router";
import { useTexture } from "@react-three/drei";

import logoImage from "../../../assets/logo.png";
// useTexture.preload([logoImage]);

const Scene = () => {
  const location = useLocation();
  // const setValue = useStore((state) => state.setValue);
  const ref = useRef<ShaderMesh>(null);

  // useEffect(() => {
  //   if (ref.current) setValue("background", ref.current);
  // }, [ref, setValue]);

  const [logo] = useTexture([logoImage]);

  const { size } = useThree();

  const [uniforms] = useMemo(() => {
    const uniforms = {
      uTime: { value: 0 },
      uColors: { value: config.controls.colors },
      uWaves: { value: config.controls.waves },
      uDistortion: { value: config.controls.distortion },
      uResolution: {
        value: new Vector4(0, 0, 2048, 2048),
      },
      PI: { value: Math.PI },
      uLogo: { value: null },
      uMode: {
        value: new Vector4(),
      },
    };

    return [uniforms];
  }, []);

  useEffect(() => {
    if (logo && ref.current) {
      ref.current.material.uniforms.uLogo.value = logo;
      ref.current.material.uniforms.uResolution.value.z = logo.width;
      ref.current.material.uniforms.uResolution.value.w = logo.height;
    }
  }, [logo, ref]);

  useEffect(() => {
    if (ref.current && ref.current.material) {
      ref.current.material.uniforms.uResolution.value.x = size.width;
      ref.current.material.uniforms.uResolution.value.y = size.height;
    }
  }, [size]);

  useFrame((_state, delta) => {
    if (ref.current && ref.current.material) {
      ref.current.material.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh ref={ref} visible={!location.pathname.includes("/docs/")}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export default Scene;
