import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
// import ArrowDown from "../../assets/images/MELT__ARROW_DOWN.svg";
import "./Scroll.css";

const Scroll = ({ scroll = 0, loaded = true, other }) => {
  const scrollHelper = useRef();

  const { scrollY } = useScroll();

  const [scrollText, setScrollText] = useState("Scroll Down To View Our Works");
  const [scrollText2, setScrollText2] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (other.length > 0) {
      if (other[0].fields.scrollText !== undefined && other[0].fields.scrollText.length > 0) {
        setScrollText(other[0].fields.scrollText);
      }
      if (other[0].fields.scrollText2 !== undefined && other[0].fields.scrollText2.length > 0) {
        setScrollText2(other[0].fields.scrollText2);
      }
    }
  }, [other]);

  useEffect(() => {
    const showHelper = () => {
      setTimeoutId(
        setTimeout(() => {
          scrollHelper.current.classList.remove("hide");
          setTimeoutId(null);
        }, 1000)
      ); // 3000
    };

    if (scrollHelper.current && loaded && scroll < 20) {
      showHelper();
    }
  }, [scroll, loaded]);

  useEffect(() => {
    const animateHelper = () => {
      setTimeout(() => {
        if (scrollText2 !== null && scrollHelper.current) scrollHelper.current.classList.add("animate");
      }, 1000);
    };

    if (scrollHelper && scrollHelper.current && loaded) {
      animateHelper();
    }
  }, [scroll, loaded, scrollText2]);

  useEffect(() => {
    if (scrollHelper.current && loaded && !timeoutId) {
      if (window.scrollY > 20) {
        scrollHelper.current.classList.add("hide");
      }
    }
  }, [loaded, timeoutId]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (scrollHelper.current && loaded && !timeoutId) {
      if (latest > 20) {
        scrollHelper.current.classList.add("hide");
      } else {
        scrollHelper.current.classList.remove("hide");
      }
    }
  });

  // if (other.length === 0 || other[0].fields === undefined || other[0].fields.scrollText === undefined) return null;

  return (
    <div
      ref={scrollHelper}
      className="scroll-helper hide"
      // onTransitionEnd={() => {
      //   if (scrollText2 !== null) scrollHelper.current.classList.add("animate");
      // }}
    >
      <div className="scroll-helper__text">
        {/* <img src={ArrowDown} alt="Scroll down" /> */}
        <span className="scroll-helper__text-one">{scrollText}</span>
        {scrollText2 !== null && <span className="scroll-helper__text-two">{scrollText2}</span>}
      </div>
    </div>
  );
};

export default Scroll;
