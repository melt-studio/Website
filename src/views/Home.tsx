import clsx from "clsx";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import ProjectTiles from "../components/ProjectTiles";
// import { WordsPullUp } from "../components/WordAnimation";
import { useStore } from "../stores/store";
import { useLocation } from "react-router";

const Home = () => {
  const video = useStore((state) => state.video);
  const blob = useStore((state) => state.blob);
  const location = useLocation();
  // const setValue = useStore((state) => state.setValue);
  // const viewport = useStore((state) => state.viewport);

  const [, setShowFeature] = useState<"below" | "show" | "above">("below");

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
    if (location.pathname !== "/") {
      hideVideo();
    }
  }, [location.pathname, hideVideo]);

  return (
    <>
      <title>MELT</title>
      <div className="flex flex-col mt-[175dvh]">
        <div
          className={clsx(
            "w-full h-screen flex fixed top-0 left-0 items-center justify-center p-sm md:p-md z-1 transition-all duration-2000 cursor-default",
            {
              // "opacity-0 translate-y-20": showFeature === "below",
              // "opacity-100 translate-y-0": showFeature === "show",
              // "opacity-0 -translate-y-20": showFeature === "above",
            }
          )}
          onClick={() => {
            if (expanded) hideVideo();
            else expandVideo();
          }}
        >
          {/* <div className="feature text-red-500/50 hidden">
            <WordsPullUp
              text="MELT is a creative studio focused on branding & entertainment. We make ideas that stick."
              fixed
            />
          </div> */}
        </div>

        <ProjectTiles />
      </div>
    </>
  );
};

export default Home;
