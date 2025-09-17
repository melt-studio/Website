import clsx from "clsx";
import { useStore } from "../stores/store";
import Link from "./Link";
import { useLocation } from "react-router";

const Footer = () => {
  const location = useLocation();
  const showReel = useStore((state) => state.showReel);

  if (location.pathname.includes("/docs/") || location.pathname === "/dissolve") return null;

  return (
    <footer
      className={clsx(
        "footer bg-light flex flex-col p-sm pb-md md:p-md uppercase gap-70 z-10 pt-30 md:pt-50 transition-opacity duration-2000",
        {
          "opacity-0": showReel,
          "opacity-100": !showReel,
        }
      )}
    >
      <div className="flex flex-col gap-15 md:gap-30">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
          <div className="">Contact</div>
          <div className="flex gap-4 justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div>Melt Studio</div>
                <div>Brooklyn, NY - Los Angeles</div>
                <div>917.768.2955</div>
              </div>
              <Link to="mailto:hello@melt.works">hello@melt.works</Link>
            </div>
            <div className="flex flex-col">
              <Link to="https://www.instagram.com/melt.works/" target="_blank">
                Instagram
              </Link>
              <Link to="https://www.linkedin.com/company/meltstudionyc" target="_blank">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between font-medium">
          <div>Making ideas that stick.</div>
          <div>© 2025 MELT</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
