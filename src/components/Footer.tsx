import Link from "./Link";
import { useLocation } from "react-router";

const Footer = () => {
  const location = useLocation();

  if (location.pathname.includes("/docs/") || location.pathname === "/dissolve") return null;

  return (
    <footer className={`footer bg-light flex flex-col p-md uppercase gap-70 z-2 pt-50`}>
      <div className="flex flex-col gap-30">
        <div className="grid grid-cols-[repeat(3,_1fr)]">
          <div>Contact</div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <div>Melt Studio</div>
              <div>Brooklyn, NY - Los Angeles</div>
              <div>917.768.2955</div>
            </div>
            <Link to="mailto:hello@melt.works">hello@melt.works</Link>
          </div>
          <div className="flex flex-col items-end">
            <Link to="https://www.instagram.com/melt.works/" target="_blank">
              Instagram
            </Link>
            <Link to="https://www.linkedin.com/company/meltstudionyc" target="_blank">
              LinkedIn
            </Link>
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
