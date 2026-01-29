import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MirroredRepeatWrapping, Vector2, Vector3, Vector4, VideoTexture } from "three";
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
  const pathname = useStore((state) => state.pathname);
  const scroll = useStore((state) => state.scroll);
  const video = useStore((state) => state.video);
  const blob = useRef<ShaderMesh>(null);
  const [expanded, setExpanded] = useState(false);
  const [initial, setInitial] = useState(false);

  useEffect(() => {
    if (blob.current) setValue("blob", blob.current);
  }, [blob, setValue]);

  const { size, viewport } = useThree();

  const tex = useMemo(() => {
    if (video) {
      const tex = new VideoTexture(video);
      tex.wrapS = MirroredRepeatWrapping;
      tex.wrapT = MirroredRepeatWrapping;
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
      uTime: { value: new Vector3() },
      uResolution: {
        value: new Vector4(0, 0, 1024, 1024),
      },
      uMode: { value: 0 },
      uHover: { value: new Vector2() },
      PI: { value: Math.PI },
      uVideo: { value: null },
      uVideoPlaying: { value: new Vector4() },
      uVideoResolution: { value: new Vector4() },
      uMouse: {
        value: new Vector2(-2, -2),
      },
      uPath: {
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
    if (!blob.current) return;

    if (location.pathname !== "/") {
      blob.current.material.uniforms.uTime.value.y = blob.current.material.uniforms.uTime.value.x;
      blob.current.material.uniforms.uMode.value = 0;
    } else {
      blob.current.material.uniforms.uTime.value.y = blob.current.material.uniforms.uTime.value.x;
      blob.current.material.uniforms.uMode.value = 1;
    }
  }, [location.pathname]);

  useFrame(({ pointer }, delta) => {
    if (blob.current) {
      blob.current.material.uniforms.uTime.value.x += delta;

      if (location.pathname === "/") {
        const s = window.scrollY / size.height;
        blob.current.material.uniforms.uScroll.value.x += (s - blob.current.material.uniforms.uScroll.value.x) * 0.05;

        const fold = 0.0;
        const height = 1;

        if (s >= fold + height && expanded) {
          hideVideo();
        }

        if (initial) {
          blob.current.material.uniforms.uMouse.value.x +=
            (pointer.x - blob.current.material.uniforms.uMouse.value.x) * 0.15;
          blob.current.material.uniforms.uMouse.value.y +=
            (pointer.y - blob.current.material.uniforms.uMouse.value.y) * 0.15;
        }

        if (!expanded) {
          const time = blob.current.material.uniforms.uTime.value.z * 0.02 + 4;
          let x = Math.sin(time * 3) * 0.5;
          let y = Math.sin(time * 2) * 0.5;
          // x += Math.sin(time * 6) * 0.25;
          // y += Math.sin(time * 5) * 0.25;
          // x += Math.sin(time * 10) * 0.25;
          // y += Math.sin(time * 8) * 0.25;
          x *= 0.666;
          y *= 0.666;

          const d = blob.current.material.uniforms.uMouse.value.distanceTo(blob.current.material.uniforms.uPath.value);

          if (d > 0.333) {
            blob.current.material.uniforms.uTime.value.z += delta;
            blob.current.material.uniforms.uPath.value.set(x, y);
            if (blob.current.material.uniforms.uHover.value.x === 1) {
              blob.current.material.uniforms.uHover.value.set(0, blob.current.material.uniforms.uTime.value.x);
            }
          } else {
            if (blob.current.material.uniforms.uHover.value.x === 0) {
              blob.current.material.uniforms.uHover.value.set(1, blob.current.material.uniforms.uTime.value.x);
            }
          }
        }
      }
    }

    if (styleScroll && scroll) {
      const max = 0.3;
      const s = window.scrollY / size.height;
      if (s < max) scroll.style.opacity = "0";
      else scroll.style.opacity = "1";
      const o = styleScroll.getPropertyValue("opacity");
      if (blob.current) blob.current.material.uniforms.uScroll.value.y = o;
    }
  });

  const expandVideo = () => {
    if (!video || !blob.current) return;
    blob.current.material.uniforms.uVideoPlaying.value.set(
      1,
      blob.current.material.uniforms.uTime.value.x,
      blob.current.material.uniforms.uVideoPlaying.value.z,
      blob.current.material.uniforms.uVideoPlaying.value.w
    );
    if (video.paused) video.play();
    video.muted = false;
    setExpanded(true);
  };

  const hideVideo = useCallback(() => {
    if (!video || !blob.current) return;

    blob.current.material.uniforms.uVideoPlaying.value.set(
      0,
      blob.current.material.uniforms.uTime.value.x,
      blob.current.material.uniforms.uVideoPlaying.value.z,
      blob.current.material.uniforms.uVideoPlaying.value.w
    );
    video.muted = true;
    setExpanded(false);
  }, [video, blob]);

  useEffect(() => {
    if (location.pathname !== "/" && expanded) {
      hideVideo();
    }
  }, [location.pathname, hideVideo, expanded]);

  return (
    <mesh
      ref={blob}
      visible={pathname === "/" || location.pathname === "/"}
      onClick={() => {
        if (!initial) setInitial(true);
        if (expanded) hideVideo();
        else expandVideo();
      }}
      onPointerEnter={() => {
        if (!initial) setInitial(true);
      }}
      onPointerMove={() => {
        if (!initial) setInitial(true);
      }}
    >
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
