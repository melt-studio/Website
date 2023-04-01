import { useEffect, forwardRef } from "react";
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

    // console.log("CURSOR");

    document.addEventListener("mousemove", updateCursorPos);

    return () => {
      document.removeEventListener("mousemove", updateCursorPos);
    };
  }, [ref]);

  return (
    <span ref={ref} className="cursor" id="cursor">
      <span className="cursor-unofficial-container">
        <span className="cursor-unofficial">Unofficial</span>
      </span>
    </span>
  );
});
Cursor.displayName = "Cursor";

export default Cursor;
