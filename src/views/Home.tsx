import { useEffect, useRef } from "react";
// import LogoText from "../components/LogoText";
import ProjectTiles from "../components/ProjectTiles";
import clsx from "clsx";
import { useStore } from "../stores/store";

const Home = () => {
  const reelRef = useRef<HTMLVideoElement>(null);
  // const [showReel, setShowReel] = useState(false);
  const showReel = useStore((state) => state.showReel);
  const setValue = useStore((state) => state.setValue);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "MELT – Work";

    return () => {
      document.title = "MELT";
      setValue("showReel", false);
    };
  }, [setValue]);

  return (
    <div className="flex flex-col mt-[100dvh]">
      {/* <div className="w-full h-screen flex items-center justify-center p-md">
        <LogoText className="w-full h-auto" />
      </div> */}
      <div
        className={clsx(
          "w-full h-screen flex items-center justify-center p-sm md:p-md relative z-2 transition-opacity duration-2000",
          {
            "opacity-100": !showReel,
            "opacity-0": showReel,
          }
        )}
      >
        <div className="feature">
          <span>MELT is a creative studio focused on branding & entertainment.</span>
          <span className="relative w-[10vw] inline-block">
            <span className="opacity-0 mx-[1vw]">.</span>
            <span
              className="bg-light absolute -top-[.5vw] left-0 h-[6vw] w-[9vw] mx-[.5vw] rounded-[.75vw] cursor-pointer"
              onClick={() => setValue("showReel", true)}
            ></span>
          </span>
          <span>We make ideas that stick.</span>
        </div>
      </div>

      <ProjectTiles />

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
          src="https://v5.airtableusercontent.com/v3/u/45/45/1758132000000/SROs0QOM3nMVvp83ploMcQ/X2p5hbYgzCXUhtabS7ICFh7YvbjwywZwfdwNJsIQKmAOjxvVtsniMpd28O3CdiELU48fCazlqaeVg1mAC6wVW54V9wbFJP-klvVgHX0jdh2qL4CQIaVtDo1npiHsUzqrCG7qO5PtfQd-Ma3bhpwa2JYcbKW5UomVCxdlXm6GNANWtqqmJBBSxlL2AY7l4bft/IUdA2DzwQ5BnjQmbAKVz_EqTF4CWKdkVkfYDax9pf_k"
          controls
          // className="absolute w-full h-auto p-sm md:p-md"
        />
      </div>
    </div>
  );
};

export default Home;
