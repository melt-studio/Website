import { useEffect } from "react";
import { WordAnimation } from "../components/WordAnimation";

const Dissolve = () => {
  useEffect(() => {
    document.documentElement.classList.add("page-dissolve");
    return () => document.documentElement.classList.remove("page-dissolve");
  }, []);

  return (
    <>
      <title>MELT – Dissolve</title>
      <div className="flex flex-col items-center justify-center w-full h-dvh pointer-events-none">
        <div className="feature text-light">
          <WordAnimation text="Take a moment to melt your mind." keyframe delay={2} duration={3} />
        </div>
      </div>
    </>
  );
};

export default Dissolve;
