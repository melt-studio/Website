import { useEffect, useMemo, useRef } from "react";
import { Vector2, Vector3, Vector4 } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { vertexShader } from "./shaders/vertex";
import { fragmentShader } from "./shaders/fragment";

import config from "../../config.json";

import { useStore } from "../../store";
import { BackgroundMesh } from "../../types";
import { useLocation } from "react-router";
import { useTexture } from "@react-three/drei";

const Background = () => {
  const location = useLocation();
  const setValue = useStore((state) => state.setValue);
  const ref = useRef<BackgroundMesh>(null);

  useEffect(() => {
    if (ref.current) setValue("background", ref.current);
  }, [ref, setValue]);

  const logo = useTexture("/logo.png");

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
      uLogo: { value: null },
      uMode: {
        value: new Vector3(0, 0, 0),
      },
      uMouse: {
        value: new Vector2(),
      },
      uScroll: {
        value: 0,
      },
    };

    return [uniforms];
  }, []);

  useEffect(() => {
    if (logo && ref.current) {
      ref.current.material.uniforms.uLogo.value = logo;
    }
  }, [logo, ref]);

  useEffect(() => {
    if (ref.current && ref.current.material) {
      ref.current.material.uniforms.uResolution.value.x = size.width;
      ref.current.material.uniforms.uResolution.value.y = size.height;
    }
  }, [size, setValue]);

  useEffect(() => {
    // console.log(location.pathname);
    if (ref.current) {
      ref.current.material.uniforms.uMode.value.x = ref.current.material.uniforms.uMode.value.y;

      ref.current.material.uniforms.uMode.value.y = location.pathname === "/" ? 0 : 1;

      ref.current.material.uniforms.uMode.value.z = ref.current.material.uniforms.uTime.value;
    }
  }, [location.pathname]);

  useFrame((_state, delta) => {
    if (ref.current && ref.current.material) {
      ref.current.material.uniforms.uTime.value += delta;

      const s = Math.max(0, Math.min(window.scrollY / size.height, 1));
      ref.current.material.uniforms.uScroll.value += (s - ref.current.material.uniforms.uScroll.value) * 0.05;
    }
  });

  return (
    <mesh ref={ref} visible={!location.pathname.includes("/docs/")}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
};

export default Background;
