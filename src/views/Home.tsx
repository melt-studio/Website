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
      <div className="flex flex-col mt-[100dvh]">
        <ProjectHighlights />
      </div>
    </>
  );
};

export default Home;
