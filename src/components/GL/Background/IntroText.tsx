import clsx from "clsx";
import { WordAnimation } from "../../WordAnimation";
import { useStore } from "../../../stores/store";
import { useLocation } from "react-router";
import { useEffect } from "react";

const IntroText = () => {
  const pathname = useStore((state) => state.pathname);
  const setValue = useStore((state) => state.setValue);
  const highlightsVisible = useStore((state) => state.highlightsVisible);
  const location = useLocation();

  useEffect(() => {
    if (pathname !== "/") setValue("highlightsVisible", false);
  }, [pathname, setValue]);

  const blocks = [
    {
      className: "hidden 3xl:flex",
      text: `MELT is a creative\nstudio focused on branding & entertainment. We make ideas that stick.`,
    },
    {
      className: "hidden lg:flex 3xl:hidden",
      text: `MELT is a\ncreative studio\nfocused on branding & entertainment. We make ideas\nthat stick.`,
    },
    {
      className: "flex lg:hidden",
      text: `MELT is a creative studio focused on branding & entertainment. We make ideas that stick.`,
    },
  ];

  const animationProps = {
    fixed: true,
    max: 0.3,
    active: pathname === "/",
    amount: 0,
    // scroll: true,
    // scrollFactor: 0.5,
  };

  return (
    <div
      className={clsx(
        "w-full h-full fixed top-0 left-0 flex items-center justify-center z-0 p-sm md:p-md transition-all duration-3500 opacity-0 ease-in-out",
        {
          "opacity-100": pathname === "/" && location.pathname === "/",
          "-translate-y-[75vh]": highlightsVisible,
        }
      )}
    >
      <div className="feature text-dark" key={pathname === "/" ? "key-wordanimation-show" : "key-wordanimation-hide"}>
        {blocks.map((block) => (
          <WordAnimation key={block.text} {...block} {...animationProps} />
        ))}
      </div>
    </div>
  );
};

export default IntroText;
