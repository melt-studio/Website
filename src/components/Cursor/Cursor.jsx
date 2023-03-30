import { forwardRef } from "react";
import "./Cursor.css";

const Cursor = forwardRef((props, ref) => {
  return (
    <span ref={ref} className="cursor">
      <span className="cursor-unofficial-container">
        <span className="cursor-unofficial">Unofficial</span>
      </span>
    </span>
  );
});
Cursor.displayName = "Cursor";

export default Cursor;
