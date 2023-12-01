import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
// import ArrowDown from "../../assets/images/MELT__ARROW_DOWN.svg";
import "./Scroll.css";

const Scroll = ({ scroll = 0, loaded = true, other }) => {
  const scrollHelper = useRef();

  const { scrollY } = useScroll();

  useEffect(() => {
    const showHelper = () =>
      setTimeout(() => {
        scrollHelper.current.classList.remove("hide");
      }, 1000); // 3000

    if (scrollHelper.current && loaded && scroll < 20) {
      showHelper();
    }
  }, [scroll, loaded]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (scrollHelper.current) {
      if (latest > 20) {
        scrollHelper.current.classList.add("hide");
      } else {
        scrollHelper.current.classList.remove("hide");
      }
    }
  });

  if (other.length === 0 || other[0].fields === undefined || other[0].fields.scrollText === undefined) return null;

  return (
    <div
      ref={scrollHelper}
      className="scroll-helper hide"
      onTransitionEnd={() => scrollHelper.current.classList.add("animate")}
    >
      <span className="scroll-helper__icon">
        {/* <img src={ArrowDown} alt="Scroll down" /> */}
        {/* Scroll Down To See Our Works */}
        {other[0].fields.scrollText}
      </span>
    </div>
  );
};

export default Scroll;
