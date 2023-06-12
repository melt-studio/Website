import FadeIn from "../../components/FadeIn/FadeIn.jsx";
import { keyframes } from "../../utils/keyframes.js";
import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import "./TextFeature.css";
import Arrow from "../../assets/images/MELT__ARROW.svg";

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
  // stagger: true,
  damping: 0.125,
};

const TextFeature = ({ mobile, viewport, scrollCutOff }) => {
  // const created = ({ gl }) => {
  //   // gl.setClearColor(0x0000ff);
  // };

  const strs = ["WE BRING", "STORIES", "TO LIFE"];
  const text = [];
  for (let i = 0; i < strs.length; i++) {
    const str = strs[i];
    text[i] = [];
    for (let j = 0; j < str.length; j++) {
      const s = str[j];
      text[i].push(
        <FadeIn key={`${s}_${i}_${j}`} {...fadeInText} delay={fadeInText.delay + fadeInText.damping * (j + i * 2)}>
          {s === " " ? <span>&nbsp;</span> : <span>{s}</span>}
        </FadeIn>
      );
    }
  }

  // const [isVisible] = useState(true);
  const { scrollY } = useScroll();

  const text2 = useRef();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (text2.current) {
      if (latest > viewport.height * 0.1) {
        text2.current.classList.remove("show");
      } else {
        text2.current.classList.add("show");
      }
    }
  });

  return (
    <>
      <div id="textFeature-container">
        <div ref={text2} className="textFeature-text show">
          {text.map((line, i) => (
            <div key={`about_line_${i}`}>{line}</div>
          ))}
        </div>
        <img src={Arrow} alt="Scroll down" />
      </div>
    </>
  );
};

export default TextFeature;
