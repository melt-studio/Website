import clsx from "clsx";
import { WordAnimation } from "../../WordAnimation";
import { useStore } from "../../../stores/store";

const IntroText = () => {
  const { width } = useStore((state) => state.viewport);

  const featureText = () => {
    if (width >= 1920)
      return `MELT is a creative\nstudio focused on branding & entertainment. We make ideas that stick.`;
    if (width >= 1024)
      return `MELT is a\ncreative studio\nfocused on branding & entertainment. We make ideas\nthat stick.`;
    return `MELT is a creative studio focused on branding & entertainment. We make ideas that stick.`;
  };

  return (
    <div
      className={clsx("w-full h-full fixed top-0 left-0 flex items-center justify-center z-0 p-sm md:p-md", {
        "opacity-0": location.pathname !== "/",
        "opacity-100 transition-opacity duration-2000": location.pathname === "/",
      })}
    >
      <div className="feature text-dark" key={location.pathname}>
        <WordAnimation text={featureText()} fixed />
      </div>
    </div>
  );
};

export default IntroText;
