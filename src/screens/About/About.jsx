import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import TagLink from "../../components/TagLink/TagLink";
import "./About.css";

const customAnimationLeft = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
const customAnimationRight = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const FadeText = ({ children }) => (
  <Fade
    direction="up"
    delay={1500}
    duration={2500}
    triggerOnce={true}
    cascade
    damping={0.2}
    keyframes={customAnimationLeft}
  >
    {children}
  </Fade>
);

const FadeTitle = ({ title }) => (
  <Fade direction="up" delay={3000} duration={1000} triggerOnce={true} cascade keyframes={customAnimationRight}>
    <h1>{title}</h1>
    <hr className="underline-mobile-only" />
  </Fade>
);

const FadeTags = ({ children }) => (
  <Fade direction="up" delay={3300} duration={1000} triggerOnce={true} cascade keyframes={customAnimationRight}>
    {children}
  </Fade>
);

const contactTags = [
  { text: "Say Hello", href: "mailto:hello@melt.works" },
  { text: "Join Our Team", href: "mailto:careers@melt.works" },
  { text: "P/ 347.249.0123", href: "tel:+347-249-0123" },
];

const followTags = [{ text: "Instagram", href: "https://www.instagram.com/mellllllllllt/" }];

export default function About(props) {
  const [aboutTexts, setAboutTexts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      // This hides a black overlay on page load
      document.querySelector(".transition-fade__about").classList.add("hide");
    }, 1000);
  }, []);

  useEffect(() => {
    if (props.aboutInfo.length) {
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
              <FadeTags>
                {props.aboutInfo.length &&
                  props.aboutInfo[0].fields.whatWeDo &&
                  props.aboutInfo[0].fields.whatWeDo.map((tag) => <h3 key={tag}>{tag}</h3>)}
              </FadeTags>
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

// <FooterSmaller
// color={props.navTextColor}
// />

//     <br />
//     <Fade
//   // className='lets-make-something'
// direction="up"
// delay={3000}
// duration={1000}
// triggerOnce={true}
// // fraction={.4}
// cascade
// keyframes={customAnimationRight}
//     >
//       <h1>Special Projects</h1>
//       <hr className='underline-mobile-only' />
//     </Fade>
//     <Fade
//   // className='lets-make-something'
// direction="up"
// delay={3300}
// duration={1000}
// triggerOnce={true}
// // fraction={.4}
// cascade
// keyframes={customAnimationRight}
//     >
//       <div style={{ marginBottom: '-10px', width: 'fit-content' }}>
//       <a style={{textDecoration:'none', cursor:'none', }} href="/unofficials">
//       <h3

//       onMouseEnter={()=>{
//         const hoverFill = document.querySelector(".about-unofficials-underline");
//         hoverFill.classList.add("hovered")
//       }}
//       onMouseLeave={()=>{
//         const hoverFill = document.querySelector(".about-unofficials-underline");
//         hoverFill.classList.add("mouse-leave")
//         setTimeout(() => {
//           hoverFill.classList.remove("mouse-leave")
//           hoverFill.classList.remove("hovered")
//         }, 300);
//       }}
//       >Unnofficials</h3>
//       </a>
//       <div className="about-unofficials-underline ">
//       <hr
//       style={{ backgroundColor: 'black', marginBottom:'-10px' }}
//       />
//       </div>
//       </div>
//       <h3>More to come…</h3>
//     </Fade>
//     <br />
