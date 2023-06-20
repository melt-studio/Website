import { keyframes } from "../../utils/keyframes.js";
import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
// import { Vector2 } from "three";
import "./TextFeature.css";

keyframes`
  @keyframes customAnimationTextFeature {
    from {
      opacity: 0;
      transform: translate3d(0, -40px, 0);
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
  const [copy, setCopy] = useState(["WE BRING", "STORIES", "TO LIFE"]);

  useEffect(() => {
    if (mobile) {
      setCopy(["A CREATIVE", "STUDIO", "MIXING", "CRAFT &", "DESIGN"]);
    } else {
      setCopy(["MIXING", "CRAFT &", "DESIGN"]);
    }
  }, [mobile]);

  const text = [];
  for (let i = 0; i < copy.length; i++) {
    const line = copy[i];
    const words = line.split(" ");
    text[i] = [];
    for (let j = 0; j < words.length; j++) {
      const word = words[j];
      const delay = fadeInText.delay + fadeInText.damping * i * 2;
      // const delay = fadeInText.delay + fadeInText.damping * (words.length - j - 1 + (copy.length - i - 1) * 2);
      text[i].push(
        <div
          className={`textFeature-text__text text_word_${i}`}
          key={`${word}_${i}_${j}`}
          style={{
            // transitionDelay: `${delay}s`,
            transition: `opacity 1s ease-in-out ${delay + 0.15 * i}s, transform 1s ease-in-out ${delay}s`,
          }}
        >
          <span className={`feature_text_${word}`}>
            {word.split("").map((c, i) => {
              const key = `feature_text_${word}_${c}_${i}`;
              return (
                <span key={key} className={key}>
                  {c}
                </span>
              );
            })}
          </span>
          {j < words.length - 1 ? <span>&nbsp;</span> : null}
        </div>
      );
    }
  }

  const { scrollY } = useScroll();

  const text2 = useRef();

  // const pos = useMemo(() => new Vector2(), []);

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

    // pos.x = latest;
    // pos.y += (pos.y - pos.x) * 1;

    // text2.current.style.transform = `translateY(-${latest / 4}px)`;

    // if (scrollY.current - scrollY.prev < 0) {
    //   // text2.current.classList.remove("hide");
    //   // setKeyframes(keyframesDown);
    // } else {
    //   // setKeyframes(keyframesUp);
    //   text2.current.classList.add("hide");
    // }
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
      </div>
    </>
  );
};

export default TextFeature;
