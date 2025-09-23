import { useEffect, useMemo, useRef } from "react";
import { RepeatWrapping, Vector2, Vector4, VideoTexture } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { vertexShader } from "./shaders/vertex";
import { fragmentShaderBlob } from "./shaders/fragmentBlob";

import reel from "../../../assets/reel.mp4";

import { useStore } from "../../../stores/store";
import { ShaderMesh } from "../../../types";
import { useLocation } from "react-router";
import { useTexture } from "@react-three/drei";

useTexture.preload(reel);

const Blob = () => {
  const location = useLocation();
  const setValue = useStore((state) => state.setValue);
  const scroll = useStore((state) => state.scroll);
  const video = useStore((state) => state.video);
  // const ready = useStore((state) => state.ready);
  const blob = useRef<ShaderMesh>(null);

  useEffect(() => {
    if (blob.current) setValue("blob", blob.current);
  }, [blob, setValue]);

  const { size, viewport } = useThree();

  const mouse = useMemo(() => new Vector2(), []);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const { width, height } = useStore.getState().viewport;
      const x = (e.clientX / width) * 2 - 1;
      const y = (1 - e.clientY / height) * 2 - 1;
      mouse.set(x, y);
    };
    window.addEventListener("mousemove", listener);

    return () => window.removeEventListener("mousemove", listener);
  }, [mouse]);

  const tex = useMemo(() => {
    if (video) {
      const tex = new VideoTexture(video);
      tex.wrapS = RepeatWrapping;
      tex.wrapT = RepeatWrapping;
      return tex;
    }
    return null;
  }, [video]);

  useEffect(() => {
    if (tex && blob.current) {
      blob.current.material.uniforms.uVideo.value = tex;
    }
  }, [tex]);

  const [uniformsBlob] = useMemo(() => {
    const uniformsBlob = {
      uTime: { value: new Vector2() },
      uResolution: {
        value: new Vector4(0, 0, 1024, 1024),
      },
      PI: { value: Math.PI },
      uVideo: { value: null },
      uVideoPlaying: { value: new Vector4() },
      uVideoResolution: { value: new Vector4() },
      uMouse: {
        value: new Vector2(),
      },
      uScroll: {
        value: new Vector2(),
      },
    };

    return [uniformsBlob];
  }, []);

  const [styleScroll] = useMemo(() => {
    return [scroll ? window.getComputedStyle(scroll) : null];
  }, [scroll]);

  useEffect(() => {
    if (blob.current) {
      blob.current.material.uniforms.uResolution.value.x = size.width;
      blob.current.material.uniforms.uResolution.value.y = size.height;
    }
  }, [size]);

  useEffect(() => {
    if (location.pathname === "/" && blob.current) {
      blob.current.material.uniforms.uTime.value.y = 0;
    }
  }, [location.pathname]);

  useFrame((_state, delta) => {
    if (blob.current) {
      blob.current.material.uniforms.uTime.value.x += delta;
      blob.current.material.uniforms.uTime.value.y += delta;

      if (location.pathname === "/") {
        const s = window.scrollY / size.height;
        blob.current.material.uniforms.uScroll.value.x += (s - blob.current.material.uniforms.uScroll.value.x) * 0.05;

        blob.current.material.uniforms.uMouse.value.x +=
          (mouse.x - blob.current.material.uniforms.uMouse.value.x) * 0.15;
        blob.current.material.uniforms.uMouse.value.y +=
          (mouse.y - blob.current.material.uniforms.uMouse.value.y) * 0.15;
      }
    }

    if (styleScroll && scroll) {
      const max = 1;
      const s = window.scrollY / size.height;
      if (s < max) scroll.style.opacity = "0";
      else scroll.style.opacity = "1";
      const o = styleScroll.getPropertyValue("opacity");
      if (blob.current) blob.current.material.uniforms.uScroll.value.y = o;
    }
  });

  return (
    <mesh ref={blob} visible={location.pathname === "/"}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShaderBlob}
        uniforms={uniformsBlob}
        transparent={true}
      />
    </mesh>
  );
};

export default Blob;
