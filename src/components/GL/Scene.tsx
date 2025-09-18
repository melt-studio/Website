import { OrthographicCamera } from "@react-three/drei";
import Background from "./Background";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
// import { useEffect } from "react";
import { useStore } from "../../stores/store";
import { WebGLRenderer } from "three";
// import { useRef } from "react";
import clsx from "clsx";
import { useLocation } from "react-router";
import { useEffect, useRef } from "react";
// import LogoText from "../LogoText";
// import { useRef } from "react";

import reel from "../../assets/reel.mp4";

const debug = process.env.NODE_ENV === "debug";

const Gradient = () => {
  const setValue = useStore((state) => state.setValue);
  const gradient = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gradient.current) setValue("gradient", gradient.current);
  }, [gradient, setValue]);

  return (
    <div className="fixed -top-px -left-px -z-999 w-0 h-0 pointer-events-none">
      {/* // <div className="fixed top-0 left-0 z-9999 w-20 h-20 block pointer-events-none"> */}
      <div
        ref={gradient}
        className="bg-mid [transition:background-color_1s_ease_0.1s,opacity_1s_ease_0.1s,border-color_1s_ease_0.1s,scale_1s_ease_0.1s] w-full h-full scale-100"
      ></div>
      {/* <div ref={bg2} className="bg-mid [transition:background-color_1s_ease_0.1s] w-full h-full"></div>
      <div ref={bg3} className="[transition:opacity_1s_ease_0.1s] opacity-0 w-full h-full"></div> */}
    </div>
  );
};

const Scene = () => {
  // useEffect(() => {
  //   document.documentElement.classList.add("page-dissolve");
  //   return () => document.documentElement.classList.remove("page-dissolve");
  // }, []);
  // const canvasContainer = useRef<HTMLDivElement>(null);

  const video = useRef<HTMLVideoElement>(null);
  const location = useLocation();

  const docs = location.pathname.includes("/docs/");

  const setValue = useStore((state) => state.setValue);
  const ready = useStore((state) => state.ready);
  const background = useStore((state) => state.background);
  // const reel = useStore((state) => state.reel);

  const glSettings = {
    antialias: false,
    preserveDrawingBuffer: false,
  };

  const created = ({ gl }: { gl: WebGLRenderer }) => {
    gl.setClearColor(0xc1c1c1, 1);
    setValue("ready", true);
    // console.log("READY");
    // if (logoRef.current) logoRef.current.style.display = "none";
  };

  useEffect(() => {
    if (video.current) {
      setValue("video", video.current);
    }
  }, [video, setValue]);

  return (
    <>
      <Gradient />

      <div className="opacity-0 fixed left-0 top-0 w-full h-screen flex items-center justify-center z-2">
        <video
          ref={video}
          src={reel}
          controls
          className="w-full h-auto p-sm md:p-md left-0 top-0"
          muted
          autoPlay
          loop
          // onEnded={(e) => {
          //   if (background) {
          //     background.material.uniforms.uVideoPlaying.value.set(0, background.material.uniforms.uTime.value);
          //     // (e.target as HTMLVideoElement).currentTime = 0;
          //   }
          // }}
          onLoadedMetadata={(e) => {
            if (background) {
              // console.log(e);
              background.material.uniforms.uVideoResolution.value.set(
                (e.target as HTMLVideoElement).videoWidth,
                (e.target as HTMLVideoElement).videoHeight,
                1,
                background.material.uniforms.uTime.value
              );
              // console.log(background.material.uniforms.uVideoResolution.value);
            }
          }}
        />
      </div>

      <div
        className={clsx(
          "justify-center items-center h-dvh w-full text-white fixed top-0 left-0 z-1 transition-opacity duration-2000",
          {
            "opacity-100": ready,
            "opacity-0": !ready,
            hidden: docs,
            flex: !docs,
          }
        )}
      >
        {/* <div ref={logoRef} className="w-full h-screen flex items-center justify-center p-md absolute">
        <LogoText className="w-full h-auto fill-red-500 z-99" />
      </div> */}
        <Canvas dpr={[1, 2]} gl={glSettings} onCreated={created}>
          {debug && <Perf position="bottom-left" />}
          <OrthographicCamera makeDefault left={-0.5} right={0.5} top={0.5} bottom={-0.5} near={-1} far={1} manual />
          <Background />
        </Canvas>
      </div>
    </>
  );
};

export default Scene;
