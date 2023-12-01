import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { motion, useIsPresent } from "framer-motion";
import FadeInOut from "../FadeInOut/FadeInOut.jsx";
import { cursorEvents } from "../Cursor/Cursor.jsx";
import "./NavMenu.css";
import TagBlock from "../TagBlock/TagBlock.jsx";
import { parseLinks } from "../../utils/parser.js";
import Markdown from "../Markdown/Markdown.jsx";

const keyframesContainer = {
  enter: {
    opacity: [0, 1, 1],
    // y: 0,
    // transition: { duration: 1.25, ease: "easeInOut", when: "beforeChildren" },
    transition: { duration: 1, ease: "easeInOut", when: "beforeChildren" },
  },
  exit: {
    opacity: [1, 1, 0],
    // y: "-100%",
    transition: {
      // duration: 1.25,
      duration: 1,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
};

const keyframesItems = {
  enter: {
    // transition: { staggerChildren: 0.15, delayChildren: 0, staggerDirection: 1 },
    transition: { staggerChildren: 0.1, delayChildren: 0, staggerDirection: 1 },
  },
  exit: {
    // transition: { staggerChildren: 0.15, staggerDirection: -1 },
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
};

const keyframesItem = {
  initial: {
    y: "-0.2em",
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    // transition: { duration: 1.75, ease: "easeInOut" },
    transition: { duration: 1.25, ease: "easeInOut" },
  },
  exit: {
    y: "-0.2em",
    opacity: 0,
    // transition: { duration: 1, ease: "easeInOut" },
    transition: { duration: 0.75, ease: "easeInOut" },
  },
};

export const keyframesItemInfo = {
  initial: {
    y: "-0.6em",
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    // transition: { duration: 1.75, ease: "easeInOut" },
    transition: { duration: 1.25, delay: 1, ease: "easeInOut" },
  },
  exit: {
    y: "-0.6em",
    opacity: 0,
    // transition: { duration: 1, ease: "easeInOut" },
    transition: { duration: 0.75, delay: 0.25, ease: "easeInOut" },
  },
};
const NavMenuClose = ({ closeNavMenu, present }) => {
  return (
    <motion.div className="nav-menu__close" variants={keyframesItem}>
      <div
        className={`nav-menu__close-container${present ? "" : " closing"}`}
        onClick={closeNavMenu}
        onMouseEnter={() => cursorEvents.onMouseEnter()}
        onMouseLeave={() => cursorEvents.onMouseLeave()}
      >
        <div className="nav-menu__close-bar left"></div>
        <div className="nav-menu__close-bar right"></div>
      </div>
    </motion.div>
  );
};

const NavMenuLinkText = ({ text, selected }) => (
  <motion.p
    className={`nav-menu__link${selected ? " selected" : ""}`}
    variants={keyframesItem}
    onMouseEnter={() => cursorEvents.onMouseEnter()}
    onMouseLeave={() => cursorEvents.onMouseLeave()}
  >
    {text}
  </motion.p>
);

const NavMenuLink = ({ link, closeNavMenu, projectTags }) => {
  const [selected, setSelected] = useState(false);

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  useEffect(() => {
    if (filter !== null && projectTags.map((t) => t.toLowerCase()).includes(filter.toLowerCase().trim())) {
      if (link.filter !== undefined && link.filter === filter.toLowerCase().trim()) {
        setSelected(true);
      }
    } else {
      if (link.href !== "/" && location.pathname === link.href) {
        setSelected(true);
      }
    }
  }, [location, link, filter, projectTags]);

  if (link.nav) {
    return (
      <Link
        to={link.href}
        onClick={() => {
          if (selected) return closeNavMenu();

          const links = document.querySelectorAll("nav-menu__link");
          links.forEach((link) => {
            link.classList.remove("selected");
          });

          setSelected(true);
          if (link.href === "/" && location.pathname === "/") {
            window.scrollTo(0, 0);
          }
          closeNavMenu();
        }}
      >
        <NavMenuLinkText text={link.text} selected={selected} />
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={link.href}>
      <NavMenuLinkText text={link.text} />
    </a>
  );
};

function NavMenuItems({ closeNavMenu, menuInfo, projectTags }) {
  const isPresent = useIsPresent();

  const links = [
    { text: "All Works", href: "/", nav: true },
    // { text: "Print", href: "/?filter=print", nav: true, filter: "print" },
    // { text: "GFX", href: "/?filter=gfx", nav: true, filter: "gfx" },
  ];

  projectTags.forEach((tag) => {
    links.push({ text: tag, href: `/?filter=${tag.toLowerCase()}`, nav: true, filter: tag.toLowerCase() });
  });

  links.push(
    { text: "About Us", href: "/about", nav: true },
    { text: "Say Hello", href: "mailto:hello@melt.works", nav: false }
  );

  return (
    <motion.div className="nav-menu__items" variants={keyframesItems}>
      <div className="nav-menu__col-2">
        <NavInfo menuInfo={menuInfo} />
        <div className="nav-menu__links">
          {links.map((link) => (
            <NavMenuLink
              key={`${link.text}_${link.href}`}
              link={link}
              closeNavMenu={closeNavMenu}
              projectTags={projectTags}
            />
          ))}
        </div>
      </div>
      <NavMenuClose key={"close"} closeNavMenu={closeNavMenu} present={isPresent} />
    </motion.div>
  );
}

const NavInfo = ({ menuInfo }) => {
  const [contactTags, setContactTags] = useState([]);
  const [addressText, setAddressText] = useState(null);
  const [followTags, setFollowTags] = useState([]);
  const [aboutText, setAboutText] = useState(null);

  // const contactTags = JSON.parse(aboutInfo[0].fields.contact)
  // const tags = [
  //   { text: "(347) 946.0249", href: "tel:(347) 946.0249" },
  //   { text: "hello@melt.works", href: "mailto: hello@melt.works" },
  // ];
  // const followtags = [
  //   { text: "Instagram", href: "/" },
  //   { text: "LinkedIn", href: "/" },
  // ];
  // const addressTag = [{ text: "Brooklyn, NY" }];

  useEffect(() => {
    if (menuInfo.length) {
      const { contact, address, follow, about } = menuInfo[0].fields;
      setContactTags(parseLinks(contact));
      setAddressText(address);
      setFollowTags(parseLinks(follow));
      setAboutText(about);
    }
  }, [menuInfo]);

  return (
    <div className="nav-menu__info">
      <motion.div variants={keyframesItemInfo}>
        {/* <TagBlock
          title="Contact Us:"
          tags={tags}
          // viewport={{ amount: 0.25 }}
          // transition={true}
          // delay={viewport.width < 960 ? 0.5 : 2.5}
        /> */}
        <TagBlock
          title="Contact Us:"
          tags={contactTags}
          links={true}
          viewport={{ amount: 0.25 }}
          transition={true}
          // delay={viewport.width < 960 ? 1 : 3.5}
        />
      </motion.div>
      <motion.div variants={keyframesItemInfo}>
        <TagBlock
          title="Address:"
          tags={[{ text: addressText }]}
          // link
          // viewport={{ amount: 0.25 }}
          // transition={true}
          // delay={viewport.width < 960 ? 0.5 : 2.5}
        />
      </motion.div>
      <motion.div variants={keyframesItemInfo}>
        {/* <TagBlock
          title="Follow Us:"
          tags={followtags}
          row
          rowDelimiter=" | "
          // link
          // viewport={{ amount: 0.25 }}
          // transition={true}
          // delay={viewport.width < 960 ? 0.5 : 2.5}
        /> */}
        <TagBlock
          title="Follow Us:"
          tags={followTags}
          links={true}
          viewport={{ amount: 0.25 }}
          transition={true}
          row
          rowDelimiter={"\u00A0\u00A0|\u00A0\u00A0"}
          // delay={viewport.width < 960 ? 1 : 3.5}
        />
      </motion.div>
      <motion.div variants={keyframesItemInfo}>
        <Markdown>{aboutText}</Markdown>
      </motion.div>
    </div>
  );
};

const NavMenu = ({ navMenuOpen, setNavMenuOpen, menuInfo, projectTags }) => {
  const closeNavMenu = () => {
    setNavMenuOpen(false);
  };

  return (
    <FadeInOut isVisible={navMenuOpen} keyframes={keyframesContainer} className="nav-menu">
      <NavMenuItems closeNavMenu={closeNavMenu} menuInfo={menuInfo} projectTags={projectTags} />
    </FadeInOut>
  );
};

export default NavMenu;
