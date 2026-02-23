import { useEffect } from "react";
import ProjectHighlights from "../components/ProjectHighlights";

const Home = () => {
  useEffect(() => {
    document.documentElement.classList.add("page-home");
    return () => document.documentElement.classList.remove("page-home");
  }, []);

  return (
    <>
      <title>MELT</title>
      <div className="flex flex-col pb-[25dvh]">
        <div className="h-dvh"></div>
        <ProjectHighlights />
      </div>
    </>
  );
};

export default Home;
