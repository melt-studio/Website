import clsx from "clsx";
import { AnimationHandle, WordAnimation } from "../../WordAnimation";
import { useStore } from "../../../stores/store";
import { useLocation } from "react-router";
import { useRef } from "react";

const IntroText = () => {
  const { width } = useStore((state) => state.viewport);
  const pathname = useStore((state) => state.pathname);
  const location = useLocation();

  const featureText = () => {
    if (width >= 1920)
      return `MELT is a creative\nstudio focused on branding & entertainment. We make ideas that stick.`;
    if (width >= 1024)
      return `MELT is a\ncreative studio\nfocused on branding & entertainment. We make ideas\nthat stick.`;
    return `MELT is a creative studio focused on branding & entertainment. We make ideas that stick.`;
  };

  const animationRef = useRef<AnimationHandle>(null);

  // useEffect(() => {
  //   if (!animationRef.current) return;

  //   if (location.pathname !== "/") animationRef.current.toggleShow("above", "show");
  //   else {
  //     animationRef.current.toggleShow("show", "below");
  //     // animationRef.current.toggleShow("show", "below");
  //   }
  // }, [location.pathname]);

  return (
    <div
      className={clsx(
        "w-full h-full fixed top-0 left-0 flex items-center justify-center z-0 p-sm md:p-md transition-opacity duration-1000 opacity-0",
        {
          // "opacity-0": location.pathname !== "/",
          "opacity-100": pathname === "/" && location.pathname === "/",
        }
      )}
      // onTransitionEnd={() => console.log("end")}
    >
      <div className="feature text-dark" key={pathname === "/" ? "key-wordanimation-show" : "key-wordanimation-hide"}>
        <WordAnimation text={featureText()} fixed max={0.25} handleRef={animationRef} active={pathname === "/"} />
      </div>
    </div>
  );
};

export default IntroText;
