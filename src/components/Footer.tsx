import Link from "./Link";
import { useMotionValueEvent, useScroll } from "motion/react";
import clsx from "clsx";
import { useStore } from "../stores/store";
import { useRef, useState } from "react";

const Footer = () => {
  const activeProject = useStore((state) => state.activeProject);
  const pathname = useStore((state) => state.pathname);

  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (!ref.current) return;

    const page = window.innerHeight / (document.body.scrollHeight - window.innerHeight);
    if (current > 1 - page * 0.25) {
      if (!visible) setVisible(true);
    } else {
      if (visible) setVisible(false);
    }
  });

  if (pathname?.includes("/docs/") || pathname === "/dissolve") return null;

  const caption = "Making ideas that stick.";

  const details = {
    address: "Brooklyn, NY - Los Angeles",
    tel: "917.768.2955",
  };

  const emailLink = {
    to: "mailto:hello@melt.works",
    label: "hello@melt.works",
  };

  const socialLinks = [
    { to: "https://www.instagram.com/melt.works/", label: "Instagram" },
    { to: "https://www.linkedin.com/company/meltstudionyc", label: "LinkedIn" },
  ];

  const copyright = `© ${new Date().getFullYear()} MELT`;

  const getFeature = () => {
    let data: { label?: string; link?: { to: string; label: string }; text?: string } = {
      link: { to: emailLink.to, label: "Get in touch" },
    };

    if (pathname?.includes("/works/") && activeProject && activeProject.next) {
      data = {
        label: "Next Project",
        link: { to: `/works/${activeProject.next.url}`, label: activeProject.next.name },
      };
    }

    if (pathname === "/") {
      data = { link: { to: "/works", label: "View all projects" } };
    }

    return (
      <div className="flex flex-col gap-5 w-full">
        {data.label && <div>{data.label}</div>}
        <div className="feature normal-case flex w-full">
          {data.link && (
            <Link to={data.link.to} className="text-left">
              {data.link.label}
            </Link>
          )}
          {data.text && <div>{data.text}</div>}
        </div>
      </div>
    );
  };

  return (
    <footer
      ref={ref}
      className={clsx(
        "footer flex flex-col uppercase transition-opacity duration-1000 h-dvh fixed inset-0 z-5 text-mid bg-dark",
        {
          "opacity-0 pointer-events-none": !visible,
        }
      )}
    >
      <div className="flex flex-col gap-15 md:gap-30 p-sm pb-md md:p-md z-10 pt-20 md:pt-20 h-full">
        <div
          className={clsx("flex flex-col w-full grow justify-center transition-all duration-2000", {
            "opacity-0 -translate-y-[40px]": !visible,
          })}
        >
          {getFeature()}
        </div>

        <div
          className={clsx(
            "grid grid-cols-[1fr_2fr] gap-12 md:gap-4 justify-between items-end transition-all duration-2000 delay-500",
            {
              "opacity-0 -translate-y-[40px]": !visible,
            }
          )}
        >
          <div className="font-medium order-2 col-span-2 md:col-span-1 flex justify-between">
            <div>{caption}</div>
            <div className="block md:hidden">{copyright}</div>
          </div>
          <div className="flex grow justify-between col-span-2 md:col-span-1 order-1 md:order-3 items-start md:items-end">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div>{details.address}</div>
                <div>{details.tel}</div>
              </div>
              <Link to={emailLink.to}>{emailLink.label}</Link>
            </div>
            <div className="flex flex-col gap-0.5 md:gap-0 items-end md:items-start">
              {socialLinks.map((link) => (
                <Link key={link.to} to={link.to} target="_blank">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="font-medium hidden md:block">{copyright}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
