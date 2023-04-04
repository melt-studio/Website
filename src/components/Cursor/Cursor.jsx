import { useEffect, forwardRef } from "react";
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
  useEffect(() => {
    const updateCursorPos = (e) => {
      if (ref.current) {
        ref.current.style.left = `${e.clientX}px`;
        ref.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener("mousemove", updateCursorPos);

    return () => {
      document.removeEventListener("mousemove", updateCursorPos);
    };
  }, [ref]);

  return (
    <span ref={ref} className="cursor" id="cursor">
      <CursorUnofficial />
      <CursorPlay />
      <CursorPause />
    </span>
  );
});
Cursor.displayName = "Cursor";

export default Cursor;
