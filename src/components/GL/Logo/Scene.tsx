import { useEffect, useMemo, useRef } from "react";
import { Color, Vector2, Vector3, Vector4 } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { vertexShader } from "./shaders/vertex";
import { fragmentShader } from "./shaders/fragment";

import config from "../../../config.json";

import { useStore } from "../../../stores/store";
import { BackgroundMesh } from "../../../types";
import { useLocation } from "react-router";
import { useTexture } from "@react-three/drei";

import logoImage from "../../../assets/logo.png";
import logoImage2 from "../../../assets/logo2.png";
useTexture.preload([logoImage, logoImage2]);

// type BackgroundProps = {
//   bg1: RefObject<HTMLDivElement | null>;
//   bg2: RefObject<HTMLDivElement | null>;
// };

const Scene = () => {
  const location = useLocation();
  const setValue = useStore((state) => state.setValue);
  // const activeProject = useStore((state) => state.activeProject);
  // const gradient = useStore((state) => state.gradient);
  // const video = useStore((state) => state.video);
  // const ready = useStore((state) => state.ready);
  const ref = useRef<BackgroundMesh>(null);

  useEffect(() => {
    if (ref.current) setValue("background", ref.current);
  }, [ref, setValue]);

  const [logo, logo2] = useTexture([logoImage, logoImage2]);

  const { size } = useThree();

  const mouse = useMemo(() => new Vector2(), []);

  useEffect(() => {
    console.log("adding listener");
    const listener = (e: MouseEvent) => {
      // console.log(e.screenX, e.screenY);
      const { width, height } = useStore.getState().viewport;
      const x = (e.clientX / width) * 2 - 1;
      const y = (1 - e.clientY / height) * 2 - 1;
      // console.log(x, y);
      // if (ref.current) {
      //   ref.current.material.uniforms.uMouse.value.x += (x - ref.current.material.uniforms.uMouse.value.x) * 0.05;
      //   ref.current.material.uniforms.uMouse.value.y += (y - ref.current.material.uniforms.uMouse.value.y) * 0.05;
      // }
      mouse.set(x, y);
    };
    window.addEventListener("mousemove", listener);

    return () => window.removeEventListener("mousemove", listener);
  }, [mouse]);

  // const progress = useProgress();

  // console.log(progress);

  const [uniforms] = useMemo(() => {
    const uniforms = {
      uTime: { value: 0 },
      uColors: { value: config.controls.colors },
      uTheme: { value: new Vector3() },
      uTheme0: { value: new Color() },
      uTheme1: { value: new Color() },
      uWaves: { value: config.controls.waves },
      uDistortion: { value: config.controls.distortion },
      uResolution: {
        value: new Vector4(0, 0, 1024, 1024),
      },
      PI: { value: Math.PI },
      uLogo: { value: null },
      uLogo2: { value: null },
      uVideo: { value: null },
      uVideoPlaying: { value: new Vector2() },
      uVideoResolution: { value: new Vector4() },
      uMode: {
        value: new Vector4(),
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
    if (logo2 && ref.current) {
      ref.current.material.uniforms.uLogo2.value = logo2;
    }
  }, [logo2, ref]);

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

  useFrame((_state, delta) => {
    if (ref.current && ref.current.material) {
      ref.current.material.uniforms.uTime.value += delta;

      if (location.pathname === "/") {
        // const s = Math.max(0, Math.min(window.scrollY / size.height, 1));
        const s = window.scrollY / size.height;
        // console.log(s);
        ref.current.material.uniforms.uScroll.value += (s - ref.current.material.uniforms.uScroll.value) * 0.05;

        ref.current.material.uniforms.uMouse.value.x += (mouse.x - ref.current.material.uniforms.uMouse.value.x) * 0.15;
        ref.current.material.uniforms.uMouse.value.y += (mouse.y - ref.current.material.uniforms.uMouse.value.y) * 0.15;
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

export default Scene;
