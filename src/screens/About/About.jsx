import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Markdown from "../../components/Markdown/Markdown.jsx";
import TagBlock from "../../components/TagBlock/TagBlock.jsx";
import { keyframes } from "../../utils/keyframes.js";
import Page from "../Page.jsx";
// import Background from "../../components/Background/Background.jsx";
// import TextFeature from "../../components/TextFeature/TextFeature.jsx";
import FadeScroll from "../../components/FadeScroll/FadeScroll.jsx";
import "./About.css";
// import Scroll from "../../components/Scroll/Scroll.jsx";

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

export default function About({ aboutInfo, embeds, cursor, mobile, viewport, scrollCutOff }) {
  const [loading, setLoading] = useState(true);
  const [aboutText, setAboutText] = useState(null);
  // const [contactTags, setContactTags] = useState([]);
  // const [gradientCols, setGradientCols] = useState([0x000000]);
  // const [gradientColsLoaded, setGradientColsLoaded] = useState(false);
  const [whatWeDoTags, setWhatWeDoTags] = useState([]);
  const [whatWeDontDoTags, setWhatWeDontDoTags] = useState([]);
  const [sectionTags, setSectionTags] = useState([]);

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
      const { aboutText, whatWeDo, whatWeDontDo } = aboutInfo[0].fields;

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
      setAboutText(aboutText.split("\n").filter((t) => t.length > 0));

      const headers = aboutText
        .split("\n")
        .filter((t) => t.startsWith("###") && t.trim().length > 4)
        .map((t) => t.replace("### ", ""));

      if (whatWeDo) {
        setWhatWeDoTags(whatWeDo.map((tag) => ({ text: tag })));
        headers.push("What We Do");
      }

      if (whatWeDontDo) {
        setWhatWeDontDoTags(whatWeDontDo.map((tag) => ({ text: tag })));
        headers.push("What We Don't Do");
      }

      setSectionTags([
        ...headers.map((tag) => ({
          text: tag,
          // href: `#about-section-${tag.trim().toLowerCase().replaceAll(" ", "").replaceAll("'", "")}`,
        })),
        { text: "Back To Work", href: "/" },
      ]);

      // console.log(parseLinks(contact));
      // setContactTags(parseLinks(contact));

      // const sections = aboutText
      // setAboutNav()

      setLoading(false);
    }
  }, [aboutInfo]);

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
                {viewport.width >= 960 &&
                  aboutText &&
                  aboutText.map((text, i) => (
                    <FadeScroll key={`${text}_${i}`} viewport={{ amount: 0.25 }} className="description-text__p">
                      <Markdown>{text}</Markdown>
                    </FadeScroll>
                  ))}
                {viewport.width < 960 && aboutText && (
                  <FadeScroll viewport={{ amount: 0.1 }} className="description-text__p">
                    {aboutText.map((text, i) => (
                      <Markdown key={`${text}_${i}`}>{text}</Markdown>
                    ))}
                  </FadeScroll>
                )}

                <section id="about-section-whatwedo">
                  <TagBlock
                    title="What We Do"
                    tags={whatWeDoTags}
                    // viewport={{ amount: 0.25 }}
                    transition={false}
                    // delay={viewport.width < 960 ? 0.5 : 2.5}
                    delay={0}
                    row
                    rowDelimiter=" / "
                  />
                </section>
                <section id="about-section-whatwedontdo">
                  <TagBlock
                    title="What We Don't Do"
                    tags={whatWeDontDoTags}
                    // viewport={{ amount: 0.25 }}
                    transition={false}
                    // delay={viewport.width < 960 ? 0.5 : 2.5}
                    delay={0}
                    row
                    rowDelimiter=" / "
                  />
                </section>
              </div>
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
                  viewport={{ amount: 0.25 }}
                  transition={true}
                  delay={viewport.width < 960 ? 0.5 : 2.5}
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
