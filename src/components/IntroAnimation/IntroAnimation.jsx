import { useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import FadeInOut from "../FadeInOut/FadeInOut";
import "./IntroAnimation.css";

import DrippyLogo from "../../assets/images/MELT__DRIPPY.svg";

const fadeInLogo = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(1);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
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
    return css`
      ${fadeInLogo} 2s ease 1s forwards, ${fadeOutLogo} 2s ease 3s forwards;
    `;
  }};
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
    transform: translateY(-10px);
  }
`;

const FadeText = styled.p`
  opacity: 0;
  transform: translateY(0);
  animation: ${fadeInText} 2s ease ${({ delay = 0 }) => 4 + delay}s 1 forwards,
    ${fadeOutText} 2s ease-in-out ${({ delay = 0 }) => 4 + delay * 0.5 + 4}s 1 forwards;
`;

export default function IntroAnimation({ initial, setInitial, mobile }) {
  const container = useRef();
  const copy = useRef();

  const text = `
    MELT is a
    creative
    studio
    mixing
    craft
    & design
  `;

  const lines = text
    .trim()
    .split("\n")
    .map((s) => s.trim());

  return (
    <FadeInOut
      isVisible={initial}
      transition={{ duration: mobile ? 1 : 2, ease: "easeInOut", delay: 0.5 }}
      initial="false"
      className="intro"
      containerRef={container}
    >
      <div className="intro__logo">
        <FadeLogo
          src={DrippyLogo}
          alt="MELT Logo"
          mobile={mobile}
          onAnimationEnd={(e) => {
            if (!mobile) {
              if (e.animationName === fadeInLogo.name) {
                if (container && container.current) {
                  setInitial(false);
                }
              }
            }
          }}
        />
      </div>

      {mobile && (
        <div className="intro__text" ref={copy}>
          {lines.map((line, i) => (
            <FadeText
              key={line}
              delay={i * 0.15}
              onAnimationEnd={(e) => {
                if (i === lines.length - 1) {
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
                }

                if (i === 0) {
                  if (e.animationName === fadeOutText.name) {
                    setInitial(false);
                  }
                }
              }}
            >
              {line.split("").map((c, j) => {
                const key = `intro__text_${i}_${c}_${j}`;
                return (
                  <span key={key} className={key}>
                    {c}
                  </span>
                );
              })}
            </FadeText>
          ))}
        </div>
      )}
    </FadeInOut>
  );
}
