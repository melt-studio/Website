import Link from "./Link";
import { Easing, motion, stagger } from "motion/react";
import clsx from "clsx";
import { useStore } from "../stores/store";

const Footer = () => {
  const activeProject = useStore((state) => state.activeProject);
  const pathname = useStore((state) => state.pathname);

  if (pathname?.includes("/docs/") || pathname === "/dissolve") return null;

  const parentVariants = {
    hidden: {
      opacity: 1,
      transform: "translateY(0px)",
    },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 1,
        delayChildren: stagger(0.25, { startDelay: 0 }),
        ease: "easeInOut" as Easing,
      },
    },
  };

  const bgVariants = {
    hidden: {
      opacity: 0,
      // transform: "scaleY(50%)",
    },
    visible: {
      opacity: 1,
      // transform: "scaleY(100%)",
    },
  };

  const childVariants = {
    hidden: { opacity: 0, transform: "translateY(-20px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 1,
        delay: 1,
        ease: "easeInOut" as Easing,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, transform: "translateY(-40px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 1.5,
        delay: 1.5,
        ease: "easeInOut" as Easing,
      },
    },
  };

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
    <motion.footer
      viewport={{ amount: 0.5, once: false }}
      initial="hidden"
      whileInView="visible"
      variants={parentVariants}
      className={clsx("footer flex flex-col uppercase transition-opacity duration-2000 h-dvh relative z-5 text-mid", {
        "bg-light": pathname?.includes("/works/"),
      })}
    >
      <motion.div
        variants={bgVariants}
        transition={{
          duration: 2,
          ease: "easeInOut" as Easing,
        }}
        className="absolute inset-0 bg-dark origin-bottom scale-y-1000 pointer-events-none"
      />
      <div className="flex flex-col gap-15 md:gap-30 p-sm pb-md md:p-md z-10 pt-20 md:pt-20 h-full">
        <motion.div variants={featureVariants} className="flex flex-col w-full grow justify-center">
          {getFeature()}
        </motion.div>

        <motion.div
          variants={childVariants}
          className="grid grid-cols-[1fr_2fr] gap-12 md:gap-4 justify-between items-end"
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
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
