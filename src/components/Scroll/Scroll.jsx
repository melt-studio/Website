import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import ArrowDown from "../../assets/images/MELT__ARROW_DOWN.svg";
import "./Scroll.css";

const Scroll = ({ scroll = 0, loaded = true }) => {
  const scrollHelper = useRef();

  const { scrollY } = useScroll();

  useEffect(() => {
    console.log(scroll);
  }, [scroll]);

  useEffect(() => {
    const showHelper = () =>
      setTimeout(() => {
        scrollHelper.current.classList.remove("hide");
      }, 2000);

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

  return (
    <div ref={scrollHelper} className="scroll-helper hide">
      <span className="scroll-helper__icon">
        <img src={ArrowDown} alt="Scroll down" />
      </span>
    </div>
  );
};

export default Scroll;
