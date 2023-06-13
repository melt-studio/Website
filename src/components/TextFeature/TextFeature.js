import { keyframes } from "../../utils/keyframes.js";
import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import "./TextFeature.css";

// import Arrow from "../../assets/images/MELT__ARROW.svg";

keyframes`
  @keyframes customAnimationTextFeature {
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
  name: "customAnimationTextFeature",
  duration: 2,
  delay: 0.5,
  damping: 0.125,
};

const TextFeature = ({ mobile, viewport, scrollCutOff }) => {
  const [isVisible, setIsVisible] = useState(false);
  // const [strs, setStrs] = useState(["WE BRING", "STORIES", "TO LIFE"]);

  // useEffect(() => {

  // }, [])

  const strs = ["WE BRING", "STORIES", "TO LIFE"];
  const text = [];
  for (let i = 0; i < strs.length; i++) {
    const str = strs[i];
    text[i] = [];
    for (let j = 0; j < str.length; j++) {
      const s = str[j];
      const delay = fadeInText.delay + fadeInText.damping * (j + i * 2);
      text[i].push(
        <div className="textFeature-text__text" key={`${s}_${i}_${j}`} style={{ transitionDelay: `${delay}s` }}>
          {s === " " ? <span>&nbsp;</span> : <span>{s}</span>}
        </div>
      );
    }
  }

  const { scrollY } = useScroll();

  const text2 = useRef();

  useEffect(() => {
    setTimeout(() => {
      const s = viewport.height * 0.1;
      const latest = scrollY.current;
      if (latest > s) {
        setIsVisible(false);
      } else if (latest <= s) {
        setIsVisible(true);
      }
    }, 100);
  }, [scrollY, viewport]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const s = viewport.height * 0.1;

    if (isVisible && latest > s) {
      setIsVisible(false);
    } else if (!isVisible && latest <= s) {
      setIsVisible(true);
    }
  });

  return (
    <>
      <div id="textFeature-container">
        <div ref={text2} className={`textFeature-text${isVisible ? " show" : ""}`}>
          {text.map((line, i) => (
            <div className="textFeature-text__line" key={`about_line_${i}`}>
              {line}
            </div>
          ))}
        </div>
        {/* <img src={Arrow} alt="Scroll down" /> */}
      </div>
    </>
  );
};

export default TextFeature;
