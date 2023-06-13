import { useEffect, useRef, forwardRef } from "react";
import CursorUnofficial from "./CusorUnofficial.jsx";
import CursorPlay from "./CursorPlay.jsx";
import CursorPause from "./CursorPause.jsx";
import "./Cursor.css";
// import { useLocation } from "react-router-dom";

export const cursorEvents = {
  onMouseEnter: (name = ["link"]) => {
    const cursor = document.getElementById("cursor");
    if (cursor) {
      name.forEach((n) => {
        if (!cursor.classList.contains(n)) {
          cursor.classList.add(n);
        }
      });
    }
  },
  onMouseLeave: (name = ["link"]) => {
    const cursor = document.getElementById("cursor");
    if (cursor) {
      name.forEach((n) => {
        if (cursor.classList.contains(n)) {
          cursor.classList.remove(n);
        }
      });
    }
  },
};

const Cursor = forwardRef((props, ref) => {
  const container = useRef();
  // const location = useLocation();

  useEffect(() => {
    const updateCursorPos = (e) => {
      if (container && container.current) {
        // ref.current.style.left = `${e.clientX}px`;
        // ref.current.style.top = `${e.clientY}px`;
        container.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    document.addEventListener("mousemove", updateCursorPos);

    return () => {
      document.removeEventListener("mousemove", updateCursorPos);
    };
  }, [ref]);

  // useEffect(() => {
  //   if (location.pathname === "/" && ref.current) {
  //     ref.current.classList.add("initial");
  //   }
  // }, [ref, location]);

  return (
    <div ref={container} className="cursor-container">
      <div ref={ref} className="cursor initial" id="cursor">
        <CursorUnofficial />
        <CursorPlay />
        <CursorPause />
      </div>
    </div>
  );
});
Cursor.displayName = "Cursor";

export default Cursor;
