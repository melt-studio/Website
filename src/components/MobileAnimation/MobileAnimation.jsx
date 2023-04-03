import styled, { keyframes } from "styled-components";
import "./MobileAnimation.css";
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
  animation: ${fadeInLogo} 2s ease 0.8s forwards, ${fadeOutLogo} 2s ease 3s forwards;
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
  animation: ${fadeInText} 2s ease ${({ delay = 0 }) => 5 + delay}s 1 forwards;
`;

export default function MobileAnimation() {
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
    <div className="mobile-intro">
      <div className="mobile-intro__logo">
        <FadeLogo src={DrippyLogo} alt="MELT Logo" />
      </div>

      <div className="mobile-intro__text">
        {lines.map((line, i) => (
          <FadeText key={line} delay={i * 0.1}>
            {line}
          </FadeText>
        ))}
      </div>
    </div>
  );
}
