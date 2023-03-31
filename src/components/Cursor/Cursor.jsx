import { forwardRef } from "react";
import "./Cursor.css";

export const cursorEvents = {
  onMouseEnter: () => {
    const cursor = document.getElementById("cursor");
    if (cursor) {
      if (!cursor.classList.contains("link")) {
        cursor.classList.add("link");
      }
    }
  },
  onMouseLeave: () => {
    const cursor = document.getElementById("cursor");
    if (cursor) {
      if (cursor.classList.contains("link")) {
        cursor.classList.remove("link");
      }
    }
  },
};

const Cursor = forwardRef((props, ref) => {
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
