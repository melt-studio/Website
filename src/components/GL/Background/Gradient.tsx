import { useEffect, useMemo, useRef } from "react";
import { Color, Vector3, Vector4 } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { vertexShader } from "./shaders/vertex";
import { fragmentShaderGrad } from "./shaders/fragmentGrad";

import config from "../../../config.json";

import reel from "../../../assets/reel.mp4";

import { useStore } from "../../../stores/store";
import { ShaderMesh } from "../../../types";
import { useLocation } from "react-router";
import { useTexture } from "@react-three/drei";
import { themeColors } from "../../../helpers/utils";

useTexture.preload(reel);

const Gradient = () => {
  const location = useLocation();
  const setValue = useStore((state) => state.setValue);
  const activeProject = useStore((state) => state.activeProject);
  const gradient = useStore((state) => state.gradient);
  const ref = useRef<ShaderMesh>(null);

  useEffect(() => {
    if (ref.current) setValue("background", ref.current);
  }, [ref, setValue]);

  const { size, viewport } = useThree();

  const [uniforms] = useMemo(() => {
    const uniforms = {
      uTime: { value: 0 },
      uColors: { value: config.controls.colors },
      uTheme: { value: new Vector3() },
      uTheme0: { value: new Color(themeColors.light.hex) },
      uTheme1: { value: new Color(themeColors.light.hex) },
      uWaves: { value: config.controls.waves },
      uDistortion: { value: config.controls.distortion },
      uResolution: {
        value: new Vector4(0, 0, 1024, 1024),
      },
      PI: { value: Math.PI },
      uMode: {
        value: new Vector4(),
      },
    };

    return [uniforms];
  }, []);

  const [style] = useMemo(() => {
    return [gradient ? window.getComputedStyle(gradient) : null];
  }, [gradient]);

  useEffect(() => {
    if (ref.current) {
      ref.current.material.uniforms.uResolution.value.x = size.width;
      ref.current.material.uniforms.uResolution.value.y = size.height;
    }
  }, [size]);

  useEffect(() => {
    if (ref.current && gradient) {
      if (location.pathname === "/" || location.pathname === "/about") {
        ref.current.material.uniforms.uTheme.value.x = 0;
        ref.current.material.uniforms.uMode.value.x = 0;
        gradient.style.opacity = "0%";
        gradient.style.backgroundColor = themeColors.light.hex;
        gradient.style.borderColor = themeColors.light.hex;
      } else {
        ref.current.material.uniforms.uTheme.value.x = 1;
        ref.current.material.uniforms.uMode.value.x = 1;
        gradient.style.opacity = "100%";

        if (location.pathname.includes("/work/") && activeProject) {
          gradient.style.backgroundColor = activeProject.theme[0];
          gradient.style.borderColor = activeProject.theme[1];
        }
      }

      if (location.pathname === "/" || location.pathname.includes("/work/")) {
        gradient.style.scale = "1";
      } else {
        gradient.style.scale = "0";
      }
    }
  }, [location.pathname, gradient, activeProject]);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.uTime.value += delta;
    }

    if (ref.current && ref.current.material && style) {
      const c0 = style.getPropertyValue("background-color");
      const rgb0 = c0
        .replace("rgb(", "")
        .replace(")", "")
        .split(",")
        .map((s) => Number(s.trim()) / 255);
      ref.current.material.uniforms.uTheme0.value.setRGB(rgb0[0], rgb0[1], rgb0[2]);

      const c1 = style.getPropertyValue("border-color");
      const rgb1 = c1
        .replace("rgb(", "")
        .replace(")", "")
        .split(",")
        .map((s) => Number(s.trim()) / 255);
      ref.current.material.uniforms.uTheme1.value.setRGB(rgb1[0], rgb1[1], rgb1[2]);

      // uTheme.y = transition between project colors and logo color
      const o = style.getPropertyValue("opacity");
      ref.current.material.uniforms.uTheme.value.y = o;

      // uTheme.z = transition between project colors and drippy color
      const s = style.getPropertyValue("scale");
      ref.current.material.uniforms.uTheme.value.z = s;
    }
  });

  let visible = false;
  if (location.pathname === "/dissolve") visible = true;
  if (size.width >= 768 && !location.pathname.includes("/docs/")) visible = true;

  return (
    <mesh ref={ref} visible={visible}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShaderGrad}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export default Gradient;
