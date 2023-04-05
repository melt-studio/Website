import { useEffect, useRef, forwardRef } from "react";
import CursorUnofficial from "./CusorUnofficial.jsx";
import CursorPlay from "./CursorPlay.jsx";
import CursorPause from "./CursorPause.jsx";
import "./Cursor.css";

export const cursorEvents = {
  onMouseEnter: (name = "link") => {
    const cursor = document.getElementById("cursor");
    if (cursor) {
      if (!cursor.classList.contains(name)) {
        cursor.classList.add(name);
      }
    }
  },
  onMouseLeave: (name = "link") => {
    const cursor = document.getElementById("cursor");
    if (cursor) {
      if (cursor.classList.contains(name)) {
        cursor.classList.remove(name);
      }
    }
  },
};

const Cursor = forwardRef((props, ref) => {
  const container = useRef();

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

  return (
    <div ref={container} className="cursor-container">
      <div ref={ref} className="cursor" id="cursor">
        <CursorUnofficial />
        <CursorPlay />
        <CursorPause />
      </div>
    </div>
  );
});
Cursor.displayName = "Cursor";

export default Cursor;
