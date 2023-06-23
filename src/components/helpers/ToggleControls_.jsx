import { useState, useEffect, useRef } from "react";

const ToggleControls = ({ controls }) => {
  const [isVisible, setIsVisible] = useState(true);

  const button = useRef();

  useEffect(() => {
    // if (!controls) return;

    const leva = document.querySelector(".leva");
    if (leva) {
      leva.style.visibility = isVisible ? "visible" : "hidden";
    }

    const perf = document.querySelector(".r3f-perf");
    if (perf) {
      perf.style.visibility = isVisible ? "visible" : "hidden";
    }

    document.body.style.cursor = isVisible ? "default" : "none";

    if (button && button.current) {
      button.current.classList.toggle("show");
    }
  }, [isVisible]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <button className="controls-toggle" onClick={toggleVisibility} ref={button}>
      {isVisible ? "Hide" : "Show"} controls/cursor
    </button>
  );
};

export default ToggleControls;
