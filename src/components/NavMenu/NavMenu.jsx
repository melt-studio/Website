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

const keyframesItem2 = {
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

const links = [
  { text: "All Works", href: "/", nav: true },
  { text: "Print", href: "/?filter=print", nav: true, filter: "print" },
  { text: "GFX", href: "/?filter=gfx", nav: true, filter: "gfx" },
  { text: "About Us", href: "/about", nav: true },
  { text: "Say Hello", href: "mailto:hello@melt.works", nav: false },
  // { text: "Follow", href: "https://www.instagram.com/melt.works/", nav: false },
];

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

const NavMenuLink = ({ link, closeNavMenu }) => {
  const [selected, setSelected] = useState(false);

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  useEffect(() => {
    if (filter !== null && ["print", "gfx"].includes(filter.toLowerCase().trim())) {
      if (link.filter !== undefined && link.filter === filter.toLowerCase().trim()) {
        setSelected(true);
      }
    } else {
      if (location.pathname === link.href) {
        setSelected(true);
      }
    }
  }, [location, link, filter]);

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

function NavMenuItems({ closeNavMenu, aboutInfo }) {
  const isPresent = useIsPresent();

  return (
    <motion.div className="nav-menu__items" variants={keyframesItems}>
      <div className="nav-menu__col-2">
        <NavInfo aboutInfo={aboutInfo} />
        <div className="nav-menu__links">
          {links.map((link) => (
            <NavMenuLink key={`${link.text}_${link.href}`} link={link} closeNavMenu={closeNavMenu} />
          ))}
        </div>
      </div>
      <NavMenuClose key={"close"} closeNavMenu={closeNavMenu} present={isPresent} />
    </motion.div>
  );
}

const NavInfo = ({ aboutInfo }) => {
  const [aboutText, setAboutText] = useState(null);
  const [contactTags, setContactTags] = useState([]);
  const [followTags, setFollowTags] = useState([]);
  const [addressText, setAddressText] = useState(null);

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
    if (aboutInfo.length) {
      const { contact, follow, address, aboutTextNav } = aboutInfo[0].fields;

      // let colors = gradient.split(", ").map((c) => c.trim());
      // const selectedColors = [];
      // const n = colors.length < 5 ? colors.length : 5;
      // for (let i = 0; i < n; i++) {
      //   const j = Math.floor(Math.random() * colors.length);
      //   selectedColors.push(colors[j]);
      //   colors = colors.filter((c, i) => i !== j);
      // }
      // setGradientCols(selectedColors);
      // setGradientColsLoaded(true);

      // ReactMarkdown causes unwanted re-renders when using components prop (and in this case wrapping each p element with the FadeIn component, causing repeated fade ins on viewport change, incl. scrolling on mobile as browser height changes), so instead pre-splitting the text into paragraphs then wrapping each paragraph with FadeIn and ReactMarkdown
      // Only needed if doing staggered fadeIn
      // setAboutText(aboutText.split("\n").filter((t) => t.length > 0));

      // if (whatWeDo) {
      //   setWhatWeDoTags(whatWeDo.map((tag) => ({ text: tag })));
      // }

      // if (whatWeDontDo) {
      //   setWhatWeDontDoTags(whatWeDontDo.map((tag) => ({ text: tag })));
      // }

      // console.log(follow);

      // console.log(parseLinks(contact));
      setContactTags(parseLinks(contact));
      setFollowTags(parseLinks(follow));
      setAddressText(address);
      setAboutText(aboutTextNav);

      // setLoading(false);
    }
  }, [aboutInfo]);

  useEffect(() => {
    console.log(followTags);
  }, [followTags]);

  return (
    <div className="nav-menu__info">
      <motion.div variants={keyframesItem2}>
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
      <motion.div variants={keyframesItem2}>
        <TagBlock
          title="Address:"
          tags={[{ text: addressText }]}
          // link
          // viewport={{ amount: 0.25 }}
          // transition={true}
          // delay={viewport.width < 960 ? 0.5 : 2.5}
        />
      </motion.div>
      <motion.div variants={keyframesItem2}>
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
      <motion.div variants={keyframesItem2}>
        <Markdown>{aboutText}</Markdown>
      </motion.div>
    </div>
  );
};

const NavMenu = ({ navMenuOpen, setNavMenuOpen, aboutInfo }) => {
  const closeNavMenu = () => {
    setNavMenuOpen(false);
  };

  return (
    <FadeInOut isVisible={navMenuOpen} keyframes={keyframesContainer} className="nav-menu">
      <NavMenuItems closeNavMenu={closeNavMenu} aboutInfo={aboutInfo} />
    </FadeInOut>
  );
};

export default NavMenu;
