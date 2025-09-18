import { useEffect, useState } from "react";
// import LogoText from "../components/LogoText";
import ProjectTiles from "../components/ProjectTiles";
import clsx from "clsx";
import { useStore } from "../stores/store";
import { useMotionValueEvent, useScroll } from "motion/react";
// import AnimatedLayout from "../components/AnimatedLayout";

const Home = () => {
  // const reelRef = useRef<HTMLVideoElement>(null);
  // const [showReel, setShowReel] = useState(false);
  // const showReel = useStore((state) => state.showReel);
  // const reel = useStore((state) => state.reel);
  const video = useStore((state) => state.video);
  // const videoPlaying = useStore((state) => state.videoPlaying);
  const background = useStore((state) => state.background);
  const setValue = useStore((state) => state.setValue);
  const viewport = useStore((state) => state.viewport);

  const [showFeature, setShowFeature] = useState<"below" | "show" | "above">("below");

  useEffect(() => {
    // window.scrollTo({
    //   top: 0,
    //   // behavior: "smooth"
    // });
    document.title = "MELT – Work";

    return () => {
      document.title = "MELT";
      setValue("showReel", false);
    };
  }, [setValue]);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // console.log("Page scroll: ", latest);
    const fold = 0.333;
    const height = 1;

    if (latest / viewport.height < fold) {
      setShowFeature("below");
    } else if (latest / viewport.height < fold + height) {
      setShowFeature("show");
    } else {
      setShowFeature("above");
    }
  });

  return (
    // <AnimatedLayout>
    <>
      <title>MELT</title>
      <div className="flex flex-col mt-[200dvh]">
        {/* <div className="w-full h-screen flex items-center justify-center p-md">
        <LogoText className="w-full h-auto" />
      </div> */}
        <div
          className={clsx(
            "w-full h-screen flex fixed top-0 left-0 items-center justify-center p-sm md:p-md z-2 transition-all duration-2000",
            {
              "opacity-0 translate-y-20": showFeature === "below",
              "opacity-100 translate-y-0": showFeature === "show",
              "opacity-0 -translate-y-20": showFeature === "above",
            }
          )}
          onClick={() => {
            if (!video || !background) return;

            if (background.material.uniforms.uVideoPlaying.value.x === 0) {
              // video.play();
              // setValue("videoPlaying", true);
              background.material.uniforms.uVideoPlaying.value.set(1, background.material.uniforms.uTime.value);
              video.muted = false;
            } else {
              // video.pause();
              // setValue("videoPlaying", false);
              background.material.uniforms.uVideoPlaying.value.set(0, background.material.uniforms.uTime.value);
              video.muted = true;
            }
          }}
          // onMouseOver={(e) => console.log(e.screenX / viewport.width, e.screenY / viewport.height)}
        >
          <div className="feature relative z-3">
            <span>MELT is a creative studio focused on branding & entertainment. We make ideas that stick.</span>

            {/* <span>MELT is a creative studio focused on branding & entertainment.</span>
            <span className="relative w-[10vw] inline-block">
              <span className="opacity-0 mx-[1vw]">.</span>
              <span
                className="bg-light absolute -top-[.5vw] left-0 h-[6vw] w-[9vw] mx-[.5vw] rounded-[.75vw] cursor-pointer"
                onClick={() => setValue("showReel", true)}
              ></span>
            </span>
            <span>We make ideas that stick.</span> */}
          </div>
        </div>

        <ProjectTiles />

        {/* {reel && (
          <div
            className={clsx(
              "fixed w-full h-screen top-0 left-0 rounded-[1.5vw] overflow-hidden flex items-center justify-center z-4 transition-opacity duration-2000",
              {
                "opacity-100 pointer-events-all": showReel,
                "opacity-0 pointer-events-none": !showReel,
              }
            )}
            onClick={(e) => {
              if (e.target === reelRef.current) return;

              setValue("showReel", false);
              if (reelRef.current) {
                reelRef.current.pause();
                // reelRef.current.currentTime = 0;
              }
            }}
          >
            <video
              ref={reelRef}
              src={reel?.url}
              controls
              // className="absolute w-full h-auto p-sm md:p-md"
            />
          </div>
        )} */}
      </div>
    </>
    // </AnimatedLayout>
  );
};

export default Home;
