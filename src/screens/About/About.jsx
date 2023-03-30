import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import TagLink from "../../components/TagLink/TagLink.jsx";
import "./About.css";

const customAnimationText = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const customAnimationTags = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

// const Fade2 = ({ delay, duration, cascade, children }) => {
//   return (
//     <>
//     {children}
//     </>
//   )
// }

const FadeText = ({ children }) => (
  <Fade
    direction="up"
    delay={1500}
    duration={2500}
    triggerOnce={true}
    cascade
    damping={0.2}
    keyframes={customAnimationText}
  >
    {children}
  </Fade>
);

const FadeTitle = ({ title }) => (
  <div className="about__right-block-title">
    <Fade direction="up" delay={3000} duration={1000} triggerOnce={true} cascade keyframes={customAnimationTags}>
      <h1>{title}</h1>
      <hr className="block-title-underline" />
    </Fade>
  </div>
);

const FadeTags2 = ({ property, info, manual }) => {
  if (!info.length || !info[0].fields[property]) return null;

  const tags = info[0].fields[property];

  const delay = 3300;
  const duration = 1000;
  const damping = 0;

  if (manual) {
    return (
      <div className="about__right-block-tags">
        {tags.map((tag, i) => (
          <h3
            className="fadeTags"
            style={{ animationDelay: `${delay + i * 100}ms`, animationDuration: `${duration}ms` }}
            key={tag}
          >
            {tag}
          </h3>
        ))}
      </div>
    );
  }

  return (
    <div className="about__right-block-tags">
      <Fade
        direction="up"
        delay={delay}
        duration={duration}
        triggerOnce={true}
        cascade
        damping={damping}
        keyframes={customAnimationTags}
        // onVisibilityChange={(inView, entry) => {
        //   console.log(inView, entry, entry.target.style.animationDelay);
        //   if (inView) {
        //     const id = entry.target.children[0].dataset.id;
        //     const current = entry.target;
        //     let nextSibling = current.nextElementSibling;

        //     // while (nextSibling) {
        //     //   console.log(nextSibling);
        //     //   nextSibling = nextSibling.nextElementSibling;
        //     // }
        //     const result = entry.target.style.animationDelay;
        //     const delayTag = Number(result.match(/[0-9]+/g)[0]);
        //     // console.log(delay);
        //     // entry.target.style.animationDelay = `${delay > entry.time ? delay : id * duration * damping}ms`;
        //     // entry.target.style.animationDelay = `${delay > entry.time ? delay : id * duration * damping}ms`;
        //     // Need all siblings too
        //     entry.target.style.animationDelay = `${delayTag > entry.time ? delayTag : delayTag - delay}ms`;
        //     // entry.target.style.animationDelay = `${Math.max(delay - entry.time, id * duration * 0.25)}ms`;
        //     console.log(id, entry.target.style.animationDelay);
        //   }
        // }}
      >
        {tags.map((tag, i) => (
          <h3 key={tag} data-id={i}>
            {tag}
          </h3>
        ))}
      </Fade>
    </div>
  );
};

const FadeTags = ({ children }) => (
  <div className="about__right-block-tags">
    <Fade
      direction="up"
      delay={3300}
      duration={1000}
      triggerOnce={true}
      cascade
      damping={0.25}
      keyframes={customAnimationTags}
    >
      {children}
    </Fade>
  </div>
);

const contactTags = [
  { text: "Say Hello", href: "mailto:hello@melt.works" },
  { text: "Join Our Team", href: "mailto:careers@melt.works" },
  { text: "P/ 347.249.0123", href: "tel:+347-249-0123" },
];

const followTags = [{ text: "Instagram", href: "https://www.instagram.com/melt.works/" }];

export default function About(props) {
  const [aboutTexts, setAboutTexts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      // This hides a black overlay on page load
      document.querySelector(".transition-fade__about").classList.add("hide");
    }, 1000);

    // window.scrollTo(0, document.body.clientHeight);
    // window.scrollTo(0, 0);
    document.body.classList.add("about");

    return () => {
      document.body.classList.remove("about");
    };
  }, []);

  useEffect(() => {
    if (props.aboutInfo.length) {
      // console.log(props.aboutInfo[0].fields.whatWeDo);
      let aboutTexts = [];
      const { aboutText, aboutTextTwo, aboutTextThree, aboutTextFour } = props.aboutInfo[0].fields;
      aboutTexts = [aboutText, aboutTextTwo, aboutTextThree, aboutTextFour];
      aboutTexts = aboutTexts.filter((text) => text !== undefined);
      setAboutTexts(aboutTexts);
    }
  }, [props.aboutInfo]);

  return (
    <div className="about__container page">
      <div className="transition-fade__about" />

      <Helmet>
        <meta charSet="utf-8" />
        <title>MELLLLLLT - About</title>
      </Helmet>

      <div className="inner-container">
        <div className="inner-container__left">
          <div className="about__description-text jumbo-text">
            <FadeText>
              {aboutTexts.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </FadeText>
          </div>
        </div>

        <div className="inner-container__right">
          <div className="about__right">
            <div className="about__right-block">
              <FadeTitle title="Contact" />
              <FadeTags>
                {contactTags.map((tag) => (
                  <TagLink key={tag.text} tag={tag} />
                ))}
              </FadeTags>
            </div>

            <div className="about__right-block">
              <FadeTitle title="Follow" />
              <FadeTags>
                {followTags.map((tag) => (
                  <TagLink key={tag.text} tag={tag} />
                ))}
              </FadeTags>
            </div>

            <div className="about__right-block">
              <FadeTitle title="What We Do" />
              {/* <FadeTags>
                {props.aboutInfo.length &&
                  props.aboutInfo[0].fields.whatWeDo &&
                  props.aboutInfo[0].fields.whatWeDo.map((tag) => (
                    <h3 key={tag}>{tag}</h3>
                  ))}
              </FadeTags> */}
              <FadeTags2 property="whatWeDo" info={props.aboutInfo} manual />
            </div>

            <div className="about__right-block">
              <FadeTitle title="What We Don't Do" />
              <FadeTags>
                {props.aboutInfo.length &&
                  props.aboutInfo[0].fields.whatWeDontDo &&
                  props.aboutInfo[0].fields.whatWeDontDo.map((tag) => <h3 key={tag}>{tag}</h3>)}
              </FadeTags>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
