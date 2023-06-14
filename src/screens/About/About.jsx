import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Markdown from "../../components/Markdown/Markdown.jsx";
import TagBlock from "../../components/TagBlock/TagBlock.jsx";
// import FadeIn from "../../components/FadeIn/FadeIn.jsx";
import { keyframes } from "../../utils/keyframes.js";
import Page from "../Page.jsx";
import Background from "../../components/Background/Background.jsx";
import TextFeature from "../../components/TextFeature/TextFeature.jsx";
import FadeScroll from "../../components/FadeScroll/FadeScroll.jsx";
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

// const fadeInText = {
//   name: "customAnimationText",
//   duration: 2,
//   delay: 0.5,
//   // stagger: true,
//   damping: 0.25,
// };

// const fadeInTextIntro = {
//   ...fadeInText,
//   name: "customAnimationTextIntro",
// };

// const contactInfo = [
//   { text: "Say Hello", href: "mailto:hello@melt.works" },
//   { text: "Join Our Team", href: "mailto:careers@melt.works" },
//   { text: "P/ 347.249.0123", href: "tel:+347-249-0123" },
// ];

// const followInfo = [{ text: "Instagram", href: "https://www.instagram.com/melt.works/" }];

const parseLinks = (links) => {
  return links
    .trim()
    .split("\n")
    .map((c) => {
      const text = c.substring(1, c.indexOf("]"));
      let href = c.substring(c.indexOf("]") + 2, c.length - 2);
      if (href.includes("tel:")) {
        href = href.substring(href.indexOf("tel:"));
      }

      return {
        text,
        href,
      };
    });
};

export default function About({ aboutInfo, embeds, cursor, mobile, viewport, scrollCutOff }) {
  const [loading, setLoading] = useState(true);
  const [aboutText, setAboutText] = useState(null);
  const [contactTags, setContactTags] = useState([]);
  const [gradientCols, setGradientCols] = useState([0x000000]);
  const [gradientColsLoaded, setGradientColsLoaded] = useState(false);
  // const [followTags, setFollowTags] = useState([]);
  const [whatWeDoTags, setWhatWeDoTags] = useState([]);
  const [whatWeDontDoTags, setWhatWeDontDoTags] = useState([]);
  // const [embedTags, setEmbedTags] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (cursor && cursor.current) {
      cursor.current.style.backgroundColor = "var(--yellow)";
      // document.body.style.cursor = "none";
      cursor.current.className = "cursor";
    }

    // Update root project-color CSS variable
    document.documentElement.style.setProperty("--text-color", "#000000");

    document.body.classList.add("about-page");

    return () => {
      document.body.classList.remove("about-page");
      // document.body.style.cursor = "default";
    };
  }, [cursor]);

  useEffect(() => {
    if (aboutInfo.length) {
      // const { aboutText, whatWeDo, whatWeDontDo, contact, follow } = aboutInfo[0].fields;
      const { aboutText, whatWeDo, whatWeDontDo, contact, gradient } = aboutInfo[0].fields;

      // console.log(gradient.);
      let colors = gradient.split(", ").map((c) => c.trim());
      // console.log(colors);
      const selectedColors = [];
      const n = colors.length < 5 ? colors.length : 5;
      for (let i = 0; i < n; i++) {
        const j = Math.floor(Math.random() * colors.length);
        // console.log(j);
        selectedColors.push(colors[j]);
        colors = colors.filter((c, i) => i !== j);
      }
      // console.log(selectedColors);
      setGradientCols(selectedColors);
      setGradientColsLoaded(true);

      // setAboutText(aboutText);
      // ReactMarkdown causes unwanted re-renders when using components prop (and in this case wrapping each p element with the FadeIn component, causing repeated fade ins on viewport change, incl. scrolling on mobile as browser height changes), so instead pre-splitting the text into paragraphs then wrapping each paragraph with FadeIn and ReactMarkdown
      // Only needed if doing staggered fadeIn
      setAboutText(aboutText.split("\n").filter((t) => t.length > 0));

      if (whatWeDo) {
        setWhatWeDoTags(whatWeDo.map((tag) => ({ text: tag })));
      }

      if (whatWeDontDo) {
        setWhatWeDontDoTags(whatWeDontDo.map((tag) => ({ text: tag })));
      }

      // Set contact/follow data at same time so renders at same time as airtable data
      // setContactTags(contactInfo);
      // setFollowTags(followInfo);
      setContactTags(parseLinks(contact));
      // setFollowTags(parseLinks(follow));

      setLoading(false);
    }
  }, [aboutInfo]);

  // useEffect(() => {
  //   if (embeds && embeds.length) {
  //     setEmbedTags(
  //       embeds
  //         .filter((e) => !e.fields.hideOnAbout)
  //         .map((e) => ({ text: e.fields.title, href: `/${e.fields.pageType}/${e.fields.pageUrl}`, nav: true }))
  //     );
  //   }
  // }, [embeds]);

  return (
    <Page>
      {/* <div className="page"> */}
      {/* <div className="transition-fade__about" /> */}

      <Helmet>
        <meta charSet="utf-8" />
        <title>MELT • About Us</title>
      </Helmet>

      {/* <Background backgroundColor={"#bcfc45, #333333"} /> */}
      {/* <Background backgroundColor={"#000000, #333333"} /> */}
      <Background
        backgroundColor={"#14170e, #427402"}
        multiple={true}
        // multiColors={[0xbcfc45, 0x00a742, 0xff0000, 0x00ff00, 0x0000ff]}
        multiColors={gradientCols}
        multiLoaded={gradientColsLoaded}
        viewport={viewport}
      />

      {aboutInfo.length > 0 && (
        <>
          {/* <FadeIn {...fadeInTextIntro}> */}
          <TextFeature mobile={mobile} viewport={viewport} scrollCutOff={scrollCutOff} />
          {/* </FadeIn> */}

          <FadeScroll viewport={{ amount: 0.01 }} className={`page-container${loading ? " loading" : ""}`}>
            <div className="row col-3">
              <div className="col primary">
                <div className="description-text jumbo-text">
                  {aboutText &&
                    aboutText.map((text, i) => (
                      // <FadeIn key={text} {...fadeInText} delay={fadeInText.delay + fadeInText.damping * i}>

                      <FadeScroll key={text} viewport={{ amount: 0.25 }} className="description-text__p">
                        <Markdown>{text}</Markdown>
                      </FadeScroll>
                      // </FadeIn>
                    ))}
                </div>
              </div>

              <div className="col-2 sticky">
                <div className="col what">
                  <div className="">
                    {/* <FadeScroll viewport={{ amount: 0.25 }} className="tag-block"> */}
                    <TagBlock
                      title="What We Do"
                      tags={whatWeDoTags}
                      viewport={{ amount: 0.25 }}
                      transition={true}
                      delay={mobile ? 1 : 2.5}
                    />
                    {/* </FadeScroll> */}
                    <TagBlock
                      title="What We Don't Do"
                      tags={whatWeDontDoTags}
                      viewport={{ amount: 0.25 }}
                      transition={true}
                      delay={mobile ? 1 : 2.5}
                    />
                  </div>
                </div>

                <div className="col links">
                  <div className="">
                    <TagBlock
                      tags={contactTags}
                      links={true}
                      viewport={{ amount: 0.25 }}
                      transition={true}
                      delay={mobile ? 1.5 : 3.5}
                    />
                    {/* <TagBlock title="Contact" tags={contactTags} /> */}
                    {/* <TagBlock title="Follow" tags={followTags} /> */}
                    {/* <TagBlock title="Other" tags={embedTags} /> */}
                  </div>
                </div>
              </div>
            </div>
          </FadeScroll>
        </>
      )}
      {/* </div> */}
    </Page>
  );
}
