import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Markdown from "../../components/Markdown/Markdown.jsx";
import TagBlock from "../../components/TagBlock/TagBlock.jsx";
import { keyframes } from "../../utils/keyframes.js";
import Page from "../Page.jsx";
// import Background from "../../components/Background/Background.jsx";
// import TextFeature from "../../components/TextFeature/TextFeature.jsx";
import FadeScroll from "../../components/FadeScroll/FadeScroll.jsx";
import "./About.css";
import { useMotionValueEvent, useScroll } from "framer-motion";
// import Scroll from "../../components/Scroll/Scroll.jsx";
import { parseLinks } from "../../utils/parser.js";
import { Link } from "react-router-dom";
// import { keyframesItemInfo } from "../../components/NavMenu/NavMenu.jsx";

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

export default function About({ aboutInfo, embeds, cursor, mobile, viewport, scrollCutOff, history, menuInfo }) {
  const [loading, setLoading] = useState(true);
  // const [aboutText, setAboutText] = useState(null);
  // const [contactTags, setContactTags] = useState([]);
  // const [gradientCols, setGradientCols] = useState([0x000000]);
  // const [gradientColsLoaded, setGradientColsLoaded] = useState(false);
  // const [whatWeDoTags, setWhatWeDoTags] = useState([]);
  // const [whatWeDontDoTags, setWhatWeDontDoTags] = useState([]);
  const [sectionTags, setSectionTags] = useState([]);
  const [aboutSections, setAboutSections] = useState([]);
  const [contactTags, setContactTags] = useState([]);
  const [addressTags, setAddressTags] = useState([]);
  const [followTags, setFollowTags] = useState([]);
  const [backTag, setBackTag] = useState([]);

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

  // console.log(aboutInfo);

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
      // console.log(fields);

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
      // let iMax = Math.max(...sections.filter((s) => s.order !== undefined).map((s) => s.order));
      // sections.forEach((s, i) => {
      //   if (s.order === undefined) {
      //     iMax += 1;
      //     s.order = iMax;
      //   }
      // });
      sections = sections.filter((s) => s.order !== undefined);
      sections.sort((a, b) => a.order - b.order);
      sections.forEach((s) => {
        s.id = s.title.toLowerCase().trim().replaceAll(" ", "").replaceAll("'", "");
      });
      // console.log(sections);

      setAboutSections(sections);

      // const { aboutText, whatWeDo, whatWeDontDo } = aboutInfo[0].fields;

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

      // // ReactMarkdown causes unwanted re-renders when using components prop (and in this case wrapping each p element with the FadeIn component, causing repeated fade ins on viewport change, incl. scrolling on mobile as browser height changes), so instead pre-splitting the text into paragraphs then wrapping each paragraph with FadeIn and ReactMarkdown
      // // Only needed if doing staggered fadeIn
      // setAboutText(aboutText.split("\n").filter((t) => t.length > 0));

      // const headers = aboutText
      //   .split("\n")
      //   .filter((t) => t.startsWith("###") && t.trim().length > 4)
      //   .map((t) => t.replace("### ", ""));

      // if (whatWeDo) {
      //   setWhatWeDoTags(whatWeDo.map((tag) => ({ text: tag })));
      //   headers.push("What We Do");
      // }

      // if (whatWeDontDo) {
      //   setWhatWeDontDoTags(whatWeDontDo.map((tag) => ({ text: tag })));
      //   headers.push("What We Don't Do");
      // }

      // const contact = { text: "Contact Us", href: "mailto:hello@melt.work", id: "about-link-contact" };

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
          // nav: true,
          onClick: () => {
            const scrollWithOffset = (el) => {
              const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
              const yOffset = -window.innerHeight * 0.2; // 20vh from .page padding-top
              window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
            };

            const el = document.getElementById(`about-section-${section.id}`);
            scrollWithOffset(el);

            // el.scrollIntoView({ behavior: "smooth" });
          },
          id: `about-section-${section.id}-link`,
        })),
        // contact,
      ]);

      // console.log(parseLinks(contact));
      // setContactTags(parseLinks(contact));

      // const sections = aboutText
      // setAboutNav()

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

  return (
    <Page>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MELT • About Us</title>
      </Helmet>

      {/* <Background
        backgroundColor={"#14170e, #427402"}
        multiple={true}
        multiColors={gradientCols}
        multiLoaded={gradientColsLoaded}
        viewport={viewport}
        cursor={true}
      /> */}

      {/* {aboutInfo.length > 0 && <Scroll />} */}

      {/* {aboutInfo.length > 0 && ( */}
      <>
        {/* <TextFeature mobile={mobile} viewport={viewport} scrollCutOff={scrollCutOff} /> */}

        {/* <FadeScroll viewport={{ amount: 0.01 }} className={`page-container${loading ? " loading" : ""}`}> */}
        <div className={`page-container${loading ? " loading" : ""}`}>
          <div className="row col-3">
            <div className="col primary">
              <div className="description-text jumbo-text">
                {aboutSections.map((section) => (
                  <Section key={section.title} section={section} viewport={viewport} />
                ))}
              </div>
              <Link id="about-backtowork-text" to="/">
                Back To Work
              </Link>
            </div>

            <div className="col-1 sticky">
              <div
                className={`col nav${loading ? " loading" : ""}`}
                // onClick={() => {
                //   document.getElementById("about-section-whatwedo").scrollIntoView({ behavior: "smooth" });
                // }}
              >
                {/* <div className=""> */}
                {/* <div className="sections">
                  {aboutNav.map((a) => (
                    <div key={a}>{a}</div>
                  ))}
                </div>
                <div>
                  <a href="/">Back To Work</a>
                </div> */}
                <TagBlock
                  tags={sectionTags}
                  viewport={{ amount: 0.25, once: viewport.width >= 960 }}
                  transition={true}
                  // delay={viewport.width < 960 ? 0.5 : 2.5}
                  delay={0.5}
                />
              </div>

              <div className={`col info${loading ? " loading" : ""}`}>
                <TagBlock
                  title="Contact Us:"
                  tags={contactTags}
                  links={true}
                  viewport={{ amount: 0, once: viewport.width >= 960 }}
                  transition={true}
                  delay={0.75}
                  titleDelay={3}
                />
                <TagBlock
                  title="Address:"
                  tags={addressTags}
                  viewport={{ amount: 0, once: viewport.width >= 960 }}
                  transition={true}
                  delay={0.75}
                  titleDelay={3}
                />
                <TagBlock
                  title="Follow Us:"
                  tags={followTags}
                  links={true}
                  viewport={{ amount: 0, once: viewport.width >= 960 }}
                  transition={true}
                  delay={0.75}
                  titleDelay={3}
                  row
                  rowDelimiter={"\u00A0\u00A0|\u00A0\u00A0"}
                />

                <TagBlock
                  tags={backTag}
                  links={true}
                  viewport={{ amount: 0, once: viewport.width >= 960 }}
                  transition={true}
                  delay={0.75}
                  titleDelay={3}
                />
              </div>

              {/* <TagBlock
                    title="What We Do"
                    tags={whatWeDoTags}
                    viewport={{ amount: 0.25 }}
                    transition={true}
                    delay={viewport.width < 960 ? 0.5 : 2.5}
                  />
                  <TagBlock
                    title="What We Don't Do"
                    tags={whatWeDontDoTags}
                    viewport={{ amount: 0.25 }}
                    transition={true}
                    delay={viewport.width < 960 ? 0.5 : 2.5}
                  /> */}
              {/* </div> */}

              {/* <div className="col links">
                  <div className="">
                    <TagBlock
                      tags={contactTags}
                      links={true}
                      viewport={{ amount: 0.25 }}
                      transition={true}
                      delay={viewport.width < 960 ? 1 : 3.5}
                    />
                  </div>
                </div> */}
            </div>
          </div>
        </div>
        {/* </FadeScroll> */}
      </>

      {/* )} */}
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
    // if (section.order === 2) console.log("Page scroll: ", latest < 0.1 || latest > 0.9, section.title);
    if (latest > 0 && latest < 1) {
      const link = document.getElementById(`about-section-${section.id}-link`);
      if (link && !link.classList.contains("active")) link.classList.add("active");
      // sectionRef.current.style.backgroundColor = "red";
    } else {
      // sectionRef.current.style.backgroundColor = "blue";
      const link = document.getElementById(`about-section-${section.id}-link`);
      if (link && link.classList.contains("active")) link.classList.remove("active");
    }
  });

  const sectionTag = (title) => (
    <TagBlock
      // title={section.title}
      tags={section.body}
      // viewport={{ amount: 0.25 }}
      viewport={{ amount: viewport.width < 960 ? 0.25 : 0.0 }}
      transition={false}
      // delay={viewport.width < 960 ? 0.5 : 2.5}
      delay={0}
      row
      rowDelimiter=" / "
    />
  );

  const sectionText = (title) => {
    if (viewport.width >= 960) {
      return (
        <>
          {section.body.map((text, i) => (
            <FadeScroll
              key={`${text}_${i}`}
              viewport={{ amount: 0.0 }}
              className="description-text__p"
              exit={true}
              // pageViewport={viewport}
              // title={title}
              // ind={i}
              // text={text}
            >
              <Markdown>{text}</Markdown>
            </FadeScroll>
          ))}
        </>
      );
    }

    if (viewport.width < 960) {
      return (
        <>
          <FadeScroll viewport={{ amount: 0.0 }} className="description-text__p">
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
      <FadeScroll
        viewport={{ amount: viewport.width < 960 ? 0.1 : 0.0 }}
        className="description-text__p about-section-title"
        exit={true}
        // pageViewport={viewport}
      >
        {/* <div> */}
        <h3>{section.title}</h3>
        {/* </div> */}
      </FadeScroll>
      {section.type === "tags" && sectionTag(section.title)}
      {section.type === "text" && sectionText(section.title)}
    </section>
  );
};
