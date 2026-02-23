import { useEffect } from "react";
import ProjectTiles from "../components/ProjectTiles";

const Work = () => {
  useEffect(() => {
    document.documentElement.classList.add("page-home");
    return () => document.documentElement.classList.remove("page-home");
  }, []);

  return (
    <>
      <title>MELT – Work</title>
      <div className="flex flex-col pb-[100dvh]">
        <ProjectTiles />
      </div>
    </>
  );
};

export default Work;
