import { useEffect } from "react";
import ProjectTiles from "../components/ProjectTiles";

const Home = () => {
  useEffect(() => {
    document.documentElement.classList.add("page-home");
    return () => document.documentElement.classList.remove("page-home");
  }, []);

  return (
    <>
      <title>MELT</title>
      <div className="flex flex-col mt-[110dvh]">
        <ProjectTiles />
      </div>
    </>
  );
};

export default Home;
