import { useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import ProjectTiles from "../components/ProjectTiles";
import { useStore } from "../stores/store";
import { useLocation } from "react-router";

const Home = () => {
  const video = useStore((state) => state.video);
  const blob = useStore((state) => state.blob);
  const location = useLocation();

  const [, setShowFeature] = useState<"below" | "show" | "above">("below");

  // const isPageInView = usePageInView();

  // const isPresent = useIsPresent();

  // useEffect(() => {
  //   console.log(isPageInView, isPresent);
  //   if (isPageInView) {
  //     // window.scrollTo({ top: 0 });
  //   }
  // }, [isPageInView]);

  // const [isPresent, safeToRemove] = usePresence();

  // useEffect(() => {
  //   // Remove from DOM 1000ms after being removed from React
  //   // !isPresent && setTimeout(safeToRemove, 1000)
  //   console.log(isPresent);
  // }, [isPresent]);

  const { scrollY } = useScroll();

  const [expanded, setExpanded] = useState(false);

  const expandVideo = () => {
    if (!video || !blob) return;
    blob.material.uniforms.uVideoPlaying.value.set(
      1,
      blob.material.uniforms.uTime.value.x,
      blob.material.uniforms.uVideoPlaying.value.z,
      blob.material.uniforms.uVideoPlaying.value.w
    );
    video.muted = false;
    setExpanded(true);
  };

  const hideVideo = useCallback(() => {
    if (!video || !blob) return;

    blob.material.uniforms.uVideoPlaying.value.set(
      0,
      blob.material.uniforms.uTime.value.x,
      blob.material.uniforms.uVideoPlaying.value.z,
      blob.material.uniforms.uVideoPlaying.value.w
    );
    video.muted = true;
    setExpanded(false);
  }, [video, blob]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // console.log("Page scroll: ", latest);
    const fold = 0.0;
    const height = 1;

    const viewport = useStore.getState().viewport;

    if (latest / viewport.height < fold) {
      setShowFeature("below");
    } else if (latest / viewport.height < fold + height) {
      setShowFeature("show");
    } else {
      setShowFeature("above");
    }

    if (latest / viewport.height >= fold + height && expanded) {
      hideVideo();
    }
  });

  useEffect(() => {
    if (location.pathname !== "/" && expanded) {
      hideVideo();
    }
  }, [location.pathname, hideVideo, expanded]);

  return (
    <>
      <title>MELT</title>
      <div className="flex flex-col mt-[175dvh]">
        <div
          className="w-full h-screen flex fixed top-0 left-0 items-center justify-center p-sm md:p-md z-1 transition-all duration-2000 cursor-default"
          onClick={() => {
            console.log("CLICK");
            if (expanded) hideVideo();
            else expandVideo();
          }}
        ></div>

        <ProjectTiles />
      </div>
    </>
  );
};

export default Home;
