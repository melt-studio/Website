import { useState, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
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
    // if (mobile) {
    return css`
      ${fadeInLogo} 2s ease 0.8s forwards, ${fadeOutLogo} 2s ease 3s forwards;
    `;
    // }

    // return css`
    //   ${fadeInLogo} 2s ease 0.8s forwards
    // `;
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

const FadeText = styled.p`
  opacity: 0;
  transform: translateY(0);
  animation: ${fadeInText} 2s ease ${({ delay = 0 }) => 4 + delay}s 1 forwards;
`;

export default function MobileAnimation({ viewport, widthCutOff }) {
  const [ended, setEnded] = useState(false);

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
    <div className={`intro${ended ? " ended" : ""}`} ref={container}>
      <div className="intro__logo">
        <FadeLogo
          src={DrippyLogo}
          alt="MELT Logo"
          mobile={viewport.width < widthCutOff}
          onAnimationEnd={() => {
            if (viewport.width >= widthCutOff) {
              if (container && container.current) {
                container.current.classList.add("hide");
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
              onAnimationEnd={() => {
                if (i === lines.length - 1) {
                  setEnded(true);
                  // if (container && container.current && copy && copy.current) {
                  //   container.current.style.height = `${copy.current.offsetHeight}px`;
                  // }
                }
              }}
            >
              {line}
            </FadeText>
          ))}
        </div>
      )}
    </div>
  );
}
