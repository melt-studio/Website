import { useEffect, useMemo, useRef } from "react";
import { Color, Vector2, Vector3, Vector4 } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { vertexShader } from "./shaders/vertex";
import { fragmentShader } from "./shaders/fragment";

import config from "../../config.json";

import { useStore } from "../../stores/store";
import { BackgroundMesh } from "../../types";
import { useLocation } from "react-router";
import { useTexture } from "@react-three/drei";
import logoImage from "../../assets/logo.png";
import useProject from "../../helpers/useProject";

useTexture.preload(logoImage);

const Background = () => {
  const location = useLocation();
  const setValue = useStore((state) => state.setValue);
  // const ready = useStore((state) => state.ready);
  const ref = useRef<BackgroundMesh>(null);
  const project = useProject();

  useEffect(() => {
    if (ref.current) setValue("background", ref.current);
  }, [ref, setValue]);

  const logo = useTexture(logoImage);

  // const progress = useProgress();

  // console.log(progress);

  const { size } = useThree();

  const [uniforms] = useMemo(() => {
    const uniforms = {
      uTime: { value: 0 },
      uColors: { value: config.controls.colors },
      uTheme: { value: new Vector3() },
      uTheme0: { value: new Color() },
      uTheme1: { value: new Color() },
      uTheme2: { value: new Color() },
      uTheme3: { value: new Color() },
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

    setValue("viewport", {
      width: size.width,
      height: size.height,
    });
  }, [size, setValue]);

  useEffect(() => {
    if (!ref.current || !ref.current.material) return;

    if (project && project.theme) {
      ref.current.material.uniforms.uTheme2.value.copy(ref.current.material.uniforms.uTheme0.value);
      ref.current.material.uniforms.uTheme3.value.copy(ref.current.material.uniforms.uTheme1.value);
      project.theme.forEach((hex, i) => {
        if (ref.current && ref.current.material) ref.current.material.uniforms[`uTheme${i}`].value.set(hex);
      });

      ref.current.material.uniforms.uTheme.value.set(
        1,
        ref.current.material.uniforms.uTheme.value.x,
        ref.current.material.uniforms.uTime.value
      );
    } else {
      ref.current.material.uniforms.uTheme.value.set(
        0,
        ref.current.material.uniforms.uTheme.value.x,
        ref.current.material.uniforms.uTime.value
      );
      ref.current.material.uniforms.uTheme2.value.copy(ref.current.material.uniforms.uTheme0.value);
      ref.current.material.uniforms.uTheme3.value.copy(ref.current.material.uniforms.uTheme1.value);
    }
  }, [project]);

  useEffect(() => {
    // console.log(location.pathname);
    if (ref.current) {
      ref.current.material.uniforms.uMode.value.x = ref.current.material.uniforms.uMode.value.y;

      if (location.pathname === "/") ref.current.material.uniforms.uMode.value.y = 0;
      else ref.current.material.uniforms.uMode.value.y = 1;

      ref.current.material.uniforms.uMode.value.z = ref.current.material.uniforms.uTime.value;
    }
  }, [location.pathname]);

  useFrame((_state, delta) => {
    if (ref.current && ref.current.material) {
      ref.current.material.uniforms.uTime.value += delta;

      if (location.pathname === "/") {
        const s = Math.max(0, Math.min(window.scrollY / size.height, 1));
        ref.current.material.uniforms.uScroll.value += (s - ref.current.material.uniforms.uScroll.value) * 0.05;
      }
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
