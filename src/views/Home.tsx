import { useEffect } from "react";
// import LogoText from "../components/LogoText";
import ProjectTiles from "../components/ProjectTiles";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col mt-[100dvh]">
      {/* <div className="w-full h-screen flex items-center justify-center p-md">
        <LogoText className="w-full h-auto" />
      </div> */}
      <div className="w-full h-screen flex items-center justify-center p-md">
        <div className="max-w-3/4 font-serif text-[7vw] leading-[0.9] tracking-[-0.04em] text-center">
          MELT is a creative studio focused on branding & entertainment. We make ideas that stick.
        </div>
      </div>
      <ProjectTiles />
    </div>
  );
};

export default Home;
