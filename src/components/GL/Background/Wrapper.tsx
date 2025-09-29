import { Canvas, RootState } from "@react-three/fiber";
import clsx from "clsx";
import { Perf } from "r3f-perf";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

import reel from "../../../assets/reel.mp4";
import { useStore } from "../../../stores/store";
import Scene from "./Scene";
import IntroText from "./IntroText";

const debug = process.env.NODE_ENV === "debug";

const Gradient = () => {
  const setValue = useStore((state) => state.setValue);
  const gradient = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (gradient.current) setValue("gradient", gradient.current);
  }, [gradient, setValue]);

  return (
    <div className="fixed -top-px -left-px -z-999 w-0 h-0 pointer-events-none">
      <div
        ref={gradient}
        data-name="gradient"
        className={clsx("bg-mid w-full h-full scale-100 opacity-0", {
          "[transition:background-color_1.5s_ease_1s,opacity_1.5s_ease_1s,border-color_1.5s_ease_1s,scale_1.5s_ease_1s]":
            location.pathname === "/dissolve",
          "[transition:background-color_1.5s_ease_0s,opacity_1.5s_ease_0s,border-color_1.5s_ease_0s,scale_1.5s_ease_0s]":
            location.pathname !== "/dissolve",
        })}
      ></div>
    </div>
  );
};

const Video = () => {
  const setValue = useStore((state) => state.setValue);
  const video = useRef<HTMLVideoElement | null>(null);
  const blob = useStore((state) => state.blob);
  const [canPlay, setCanPlay] = useState(false);
  const [vidSize, setVidSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (blob && canPlay && vidSize) {
      blob.material.uniforms.uVideoPlaying.value.z = 1;
      blob.material.uniforms.uVideoPlaying.value.w = blob.material.uniforms.uTime.value.x;
      blob.material.uniforms.uVideoResolution.value.set(
        vidSize.width,
        vidSize.height,
        1,
        blob.material.uniforms.uTime.value.x
      );
    }
  }, [blob, canPlay, vidSize]);

  useEffect(() => {
    if (video.current) {
      setValue("video", video.current);
    }
  }, [video, setValue]);

  return (
    <div className="opacity-0 fixed right-px bottom-px w-px h-px -z-1 pointer-events-none overflow-hidden">
      <video
        ref={video}
        src={reel}
        controls
        className="w-px h-px left-0 top-0 pointer-events-none"
        muted
        autoPlay
        playsInline
        loop
        preload="metadata"
        onLoadedMetadata={(e) => {
          setVidSize({
            width: (e.target as HTMLVideoElement).videoWidth,
            height: (e.target as HTMLVideoElement).videoHeight,
          });
        }}
        onCanPlay={() => {
          if (!canPlay) setCanPlay(true);
        }}
      />
    </div>
  );
};

const Scroll = () => {
  const setValue = useStore((state) => state.setValue);
  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scroll.current) setValue("scroll", scroll.current);
  }, [scroll, setValue]);

  return (
    <div className="fixed -top-px -left-px -z-999 w-0 h-0 pointer-events-none">
      <div ref={scroll} className="bg-mid [transition:opacity_3s_ease_0s] w-full h-full"></div>
    </div>
  );
};

const Wrapper = () => {
  const canvasContainer = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const docs = location.pathname.includes("/docs/");

  const setValue = useStore((state) => state.setValue);
  const ready = useStore((state) => state.ready);

  const glSettings = {
    antialias: false,
    preserveDrawingBuffer: false,
  };

  const created = (state: RootState) => {
    state.gl.setClearColor(0xc1c1c1, 0);
    setValue("ready", true);

    state.gl.domElement.style.zIndex = "1";

    if (canvasContainer.current) {
      canvasContainer.current.childNodes.forEach((node) => ((node as HTMLDivElement).style.pointerEvents = "none"));
    }
  };

  const target = document.getElementById("target");

  return (
    <>
      <Gradient />
      <Scroll />
      <Video />

      <div
        className={clsx(
          "justify-center items-center h-dvh w-full text-white fixed top-0 left-0 z-0 transition-opacity duration-2000 pointer-events-none",
          {
            "opacity-100": ready,
            "opacity-0": !ready,
            hidden: docs,
            flex: !docs,
          }
        )}
        ref={canvasContainer}
      >
        <IntroText />

        <Canvas dpr={[1, 2]} gl={glSettings} onCreated={created} eventSource={target || undefined}>
          {debug && <Perf position="bottom-right" />}
          <Scene />
        </Canvas>
      </div>
    </>
  );
};

export default Wrapper;
