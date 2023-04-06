import { useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import DrippyLogo from "../../assets/images/MELT__DRIPPY.svg";
// import { motion, AnimatePresence } from "framer-motion";
import FadeInOut from "../FadeInOut/FadeInOut";
import "./IntroAnimation.css";

const fadeInLogo = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(1);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  // 0% {
  //   opacity: 0;
  //   transform: translateY(30px) scale(1);
  // }
  // 50% {
  //   opacity: 1;
  //   transform: translateY(0) scale(1);
  // }
  // 100% {
  //   opacity: 0;
  //   transform: translateY(0) scale(0.85);
  // }
`;

const fadeOutLogo = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(0) scale(0.85);
  }
`;

const FadeLogo = styled.img`
  opacity: 0;
  transform: translateY(30px) scale(1);
  animation: ${({ mobile }) => {
    // if (mobile) {
    // return css`
    //   ${fadeInLogo} 2s ease 1s forwards, ${fadeOutLogo} 2s ease 3s forwards;
    // `;
    return css`
      // ${fadeInLogo} 2s ease 1s forwards;
      ${fadeInLogo} 2s ease 1s forwards, ${fadeOutLogo} 2s ease 3s forwards;
    `;
    // }

    // return css`
    //   ${fadeInLogo} 2s ease 0.8s forwards
    // `;
  }};

  // .hide & {
  //   animation: ${({ mobile }) => css`
    //     ${fadeOutLogo} 2s ease 0s forwards;
    //
  `};
  // }
`;

const fadeInText = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOutText = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-50vh);
  }
`;

const FadeText = styled.p`
  opacity: 0;
  transform: translateY(0);
  animation: ${fadeInText} 2s ease ${({ delay = 0 }) => 4 + delay}s 1 forwards,
    ${fadeOutText} 2s ease-in-out ${({ delay = 0 }) => 4 + delay * 0.5 + 4}s 1 forwards;
`;

export default function IntroAnimation({ initial, setInitial, viewport, widthCutOff }) {
  // const [ended, setEnded] = useState(false);

  const container = useRef();
  const copy = useRef();

  const text = `
    MELT is a
    creative
    studio
    bringing
    stories
    to life
    through
    design.
  `;

  const lines = text
    .trim()
    .split("\n")
    .map((s) => s.trim());

  return (
    <FadeInOut
      isVisible={initial}
      transition={{ duration: viewport.width < widthCutOff ? 1 : 2, ease: "easeInOut", delay: 0.5 }}
      initial="false"
      className="intro"
      containerRef={container}
    >
      {/* <AnimatePresence> */}
      {/* {initial && (
        <motion.div
          initial={false}
          animate={{ opacity: [0, 1, 1] }}
          exit={{ opacity: 0 }}
          transition={{ duration: viewport.width < widthCutOff ? 1 : 2, ease: "easeInOut", delay: 0.5 }}
          className="intro"
          ref={container}
        > */}
      <div className="intro__logo">
        <FadeLogo
          src={DrippyLogo}
          alt="MELT Logo"
          mobile={viewport.width < widthCutOff}
          onAnimationEnd={(e) => {
            if (viewport.width >= widthCutOff) {
              if (e.animationName === fadeInLogo.name) {
                if (container && container.current) {
                  // setEnded(true);
                  setInitial(false);
                }
              }
            }
          }}
        />
      </div>

      {viewport.width < widthCutOff && (
        <div className="intro__text" ref={copy}>
          {lines.map((line, i) => (
            <FadeText
              key={line}
              delay={i * 0.1}
              onAnimationEnd={(e) => {
                if (i === lines.length - 1) {
                  // setEnded(true);
                  if (e.animationName === fadeInText.name) {
                    if (container && container.current && copy && copy.current) {
                      const h = copy.current.getBoundingClientRect().height;
                      if (h > 0) {
                        container.current.style.height = `${h}px`;
                        container.current.style.height = 0;
                        container.current.classList.add("hide");
                      }
                    }
                  }

                  // if (e.animationName === fadeInLogo.name) {
                  //   if (container && container.current) {
                  //     // setEnded(true);
                  //     setInitial(false);
                  //   }
                  // }

                  // console.log(h);
                }

                if (i === 0) {
                  if (e.animationName === fadeOutText.name) {
                    setInitial(false);
                  }
                }
              }}
            >
              {line}
            </FadeText>
          ))}
        </div>
      )}
      {/* </motion.div>
      )}
    </AnimatePresence> */}
    </FadeInOut>
  );
}
