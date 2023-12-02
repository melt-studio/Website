import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Link } from "react-router-dom";

import Page from "../Page.jsx";
import Markdown from "../../components/Markdown/Markdown.jsx";
import TagBlock from "../../components/TagBlock/TagBlock.jsx";
import FadeScroll from "../../components/FadeScroll/FadeScroll.jsx";

import { parseLinks } from "../../utils/parser.js";
import { keyframes } from "../../utils/keyframes.js";

import "./About.css";

keyframes`
  @keyframes customAnimationText {
    from {
      opacity: 0;
      transform: translate3d(0, 40px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

export default function About({ aboutInfo, cursor, viewport, history, menuInfo }) {
  const [loading, setLoading] = useState(true);
  const [sectionTags, setSectionTags] = useState([]);
  const [aboutSections, setAboutSections] = useState([]);
  const [contactTags, setContactTags] = useState([]);
  const [addressTags, setAddressTags] = useState([]);
  const [followTags, setFollowTags] = useState([]);
  const [backTag, setBackTag] = useState([]);

  const [fromNav, setFromNav] = useState(false);

  useEffect(() => {
    if (history.length > 1 && history[0] !== history[1]) {
      document.body.classList.add("from-nav");
      if (document.body.classList.contains("nav-menu-open")) setFromNav(true);
    }

    return () => {
      document.body.classList.remove("from-nav");
      setFromNav(false);
    };
  }, [history]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (cursor && cursor.current) {
      cursor.current.style.backgroundColor = "var(--yellow)";
      cursor.current.className = "cursor";
    }

    // Update root project-color CSS variable
    document.documentElement.style.setProperty("--text-color", "#000000");

    document.body.classList.add("about-page");

    return () => {
      document.body.classList.remove("about-page");
    };
  }, [cursor]);

  useEffect(() => {
    if (aboutInfo.length) {
      const fields = aboutInfo[0].fields;

      const titles = Object.keys(fields);
      let sections = titles.filter((t) => t !== "page").map((t) => ({ title: t, body: fields[t] }));
      sections.forEach((s) => {
        const i = s.title.indexOf(" ");
        const n = s.title.substring(0, i);
        if (n > 0 && !isNaN(n)) {
          // if title starts with number
          s.order = Number(n);
          s.title = s.title.substring(i + 1, s.title.length);
        }
        if (typeof s.body === "string") {
          s.type = "text";
          s.body = s.body.split("\n").filter((t) => t.length > 0);
        } else if (Array.isArray(s.body)) {
          s.type = "tags";
          s.body = s.body.map((tag) => ({ text: tag }));
        } else {
          s.type = "other";
        }
      });

      sections = sections.filter((s) => s.order !== undefined);
      sections.sort((a, b) => a.order - b.order);
      sections.forEach((s) => {
        s.id = s.title.toLowerCase().trim().replaceAll(" ", "").replaceAll("'", "");
      });

      setAboutSections(sections);

      const back = { text: "Back To Work", nav: true, id: "about-link-backtowork" };
      if (history.length > 1 && history[1].startsWith("/project/")) {
        back.href = history[1];
      } else {
        back.href = "/";
      }

      setSectionTags([
        ...sections.map((section) => ({
          text: section.title,
          href: `#about-section-${section.id}`,
          onClick: () => {
            const scrollWithOffset = (el) => {
              const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
              const yOffset = -window.innerHeight * 0.2; // 20vh from .page padding-top
              window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
            };

            const el = document.getElementById(`about-section-${section.id}`);
            scrollWithOffset(el);
          },
          id: `about-section-${section.id}-link`,
        })),
      ]);

      if (menuInfo.length > 0) {
        const { contact, address, follow } = menuInfo[0].fields;
        setContactTags(parseLinks(contact));
        setAddressTags([{ text: address }]);
        setFollowTags(parseLinks(follow));
      }

      setBackTag([back]);

      setLoading(false);
    }
  }, [history, aboutInfo, menuInfo]);

  const tagBlockSettings = {
    viewport: { amount: 0 },
    transition: true,
    delay: fromNav ? 1.75 : 0.75,
    titleDelay: fromNav ? 1.5 : 0.5,
  };

  return (
    <Page>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MELT • About Us</title>
      </Helmet>

      <>
        <div className={`page-container${loading ? " loading" : ""}`}>
          <div className="row col-3">
            <div className="col primary">
              <div className="description-text jumbo-text">
                {aboutSections.map((section) => (
                  <Section key={section.title} section={section} viewport={viewport} />
                ))}
              </div>
              {!loading && (
                <FadeScroll viewport={{ amount: 0 }} className="about-backtowork-text">
                  <Link id="about-backtowork-text" to="/">
                    Back To Work
                  </Link>
                </FadeScroll>
              )}
            </div>

            <div className="col-1 sticky">
              <div className={`col nav${loading ? " loading" : ""}`}>
                <TagBlock tags={sectionTags} {...tagBlockSettings} />
              </div>

              <div className={`col info${loading ? " loading" : ""}`}>
                <TagBlock title="Contact Us:" tags={contactTags} links={true} {...tagBlockSettings} />
                <TagBlock title="Address:" tags={addressTags} {...tagBlockSettings} />
                <TagBlock
                  title="Follow Us:"
                  tags={followTags}
                  links={true}
                  {...tagBlockSettings}
                  row
                  rowDelimiter={"\u00A0\u00A0|\u00A0\u00A0"}
                />
                <TagBlock tags={backTag} links={true} {...tagBlockSettings} />
              </div>
            </div>
          </div>
        </div>
      </>
    </Page>
  );
}

const Section = ({ section, viewport }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 25vh", "end 25vh"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (viewport.width < 960) return;
    if (latest > 0 && latest < 1) {
      const link = document.getElementById(`about-section-${section.id}-link`);
      if (link && !link.classList.contains("active")) link.classList.add("active");
    } else {
      const link = document.getElementById(`about-section-${section.id}-link`);
      if (link && link.classList.contains("active")) link.classList.remove("active");
    }
  });

  const sectionTag = () => (
    <TagBlock tags={section.body} viewport={{ amount: 0 }} transition={false} delay={0} row rowDelimiter=" / " />
  );

  const sectionText = () => {
    if (viewport.width >= 960) {
      return (
        <>
          {section.body.map((text, i) => (
            <FadeScroll key={`${text}_${i}`} viewport={{ amount: 0 }} className="description-text__p" exit={true}>
              <Markdown>{text}</Markdown>
            </FadeScroll>
          ))}
        </>
      );
    }

    if (viewport.width < 960) {
      return (
        <>
          <FadeScroll viewport={{ amount: 0 }} className="description-text__p">
            {section.body.map((text, i) => (
              <Markdown key={`${text}_${i}`}>{text}</Markdown>
            ))}
          </FadeScroll>
        </>
      );
    }
  };

  return (
    <section ref={sectionRef} id={`about-section-${section.id}`}>
      <FadeScroll viewport={{ amount: 0 }} className="description-text__p about-section-title" exit={true}>
        <h3>{section.title}</h3>
      </FadeScroll>
      {section.type === "tags" && sectionTag()}
      {section.type === "text" && sectionText()}
    </section>
  );
};
