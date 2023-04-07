import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import TagBlock from "../../components/TagBlock/TagBlock.jsx";
import FadeIn from "../../components/FadeIn/FadeIn.jsx";
import { keyframes } from "../../utils/keyframes.js";
import "./About.css";
import Page from "../Page.jsx";

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

const fadeInText = {
  name: "customAnimationText",
  duration: 2,
  delay: 0.5,
  stagger: true,
  damping: 0.25,
};

const contactInfo = [
  { text: "Say Hello", href: "mailto:hello@melt.works" },
  { text: "Join Our Team", href: "mailto:careers@melt.works" },
  { text: "P/ 347.249.0123", href: "tel:+347-249-0123" },
];

const followInfo = [{ text: "Instagram", href: "https://www.instagram.com/melt.works/" }];

export default function About({ aboutInfo, embeds, cursor }) {
  const [loading, setLoading] = useState(true);
  const [aboutTexts, setAboutTexts] = useState([]);
  const [contactTags, setContactTags] = useState([]);
  const [followTags, setFollowTags] = useState([]);
  const [whatWeDoTags, setWhatWeDoTags] = useState([]);
  const [whatWeDontDoTags, setWhatWeDontDoTags] = useState([]);
  const [embedTags, setEmbedTags] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (cursor && cursor.current) {
      cursor.current.style.backgroundColor = "var(--yellow)";
      // document.body.style.cursor = "none";
    }

    document.body.classList.add("about-page");

    return () => {
      document.body.classList.remove("about-page");
      // document.body.style.cursor = "default";
    };
  }, [cursor]);

  useEffect(() => {
    if (aboutInfo.length) {
      const { aboutText, aboutTextTwo, aboutTextThree, aboutTextFour, whatWeDo, whatWeDontDo } = aboutInfo[0].fields;

      let aboutTexts = [];
      aboutTexts = [aboutText, aboutTextTwo, aboutTextThree, aboutTextFour];
      aboutTexts = aboutTexts.filter((text) => text !== undefined);
      setAboutTexts(aboutTexts);

      if (whatWeDo) {
        setWhatWeDoTags(whatWeDo.map((tag) => ({ text: tag })));
      }

      if (whatWeDontDo) {
        setWhatWeDontDoTags(whatWeDontDo.map((tag) => ({ text: tag })));
      }

      // Set contact/follow data at same time so renders at same time as airtable data
      setContactTags(contactInfo);
      setFollowTags(followInfo);

      setLoading(false);
    }
  }, [aboutInfo]);

  useEffect(() => {
    if (embeds && embeds.length) {
      setEmbedTags(embeds.map((e) => ({ text: e.fields.title, href: `/other/${e.fields.pageUrl}`, nav: true })));
    }
  }, [embeds]);

  return (
    <Page>
      {/* <div className="page"> */}
      {/* <div className="transition-fade__about" /> */}

      <Helmet>
        <meta charSet="utf-8" />
        <title>MELLLLLLT - About</title>
      </Helmet>

      <div id="about-background"></div>

      {aboutInfo.length && (
        <div className={`page-container${loading ? " loading" : ""}`}>
          <div className="row">
            <div className="col primary">
              <div className="description-text jumbo-text">
                <FadeIn {...fadeInText}>
                  {aboutTexts.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </FadeIn>
              </div>
            </div>

            <div className="col">
              <div className="sticky">
                <TagBlock title="Contact" tags={contactTags} />
                <TagBlock title="Follow" tags={followTags} />
                <TagBlock title="Other" tags={embedTags} />
                <TagBlock title="What We Do" tags={whatWeDoTags} />
                <TagBlock title="What We Don't Do" tags={whatWeDontDoTags} />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* </div> */}
    </Page>
  );
}
