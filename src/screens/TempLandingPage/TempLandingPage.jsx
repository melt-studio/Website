import React, { useRef } from "react";
// import LogoAnimation from '../../components/LogoAnimation'
import WaterfallAnimation from "../../components/WaterfallAnimation";
// import Marquee from "react-fast-marquee";
import "./TempLandingPage.css";
// import Button from "../../assets/Cursors/MELT_Live.png";
import Button from "../../assets/Cursors/MELT_WEBSITE ICONS_05.08_Live Site Button 1 1.png";
import Button2 from "../../assets/Cursors/MELT_WEBSITE ICONS_05.08_Live Site Button 2 2.png";
// import Button from "../../assets/Cursors/MELT_Live2.svg";

export default function TempLandingPage() {
  const cursor = useRef();

  // useEffect(() => {
  //   const updateCursor = (e) => {
  //     if (cursor && cursor.current && window.innerWidth > 800) {
  //       cursor.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  //     }
  //   };
  //   window.addEventListener("mousemove", updateCursor);
  //   // window.addEventListener("touchmove", updateCursor);

  //   return () => {
  //     window.removeEventListener("mousemove", updateCursor);
  //     // window.removeEventListener("touchmove", updateCursor);
  //   };
  // }, []);

  return (
    <div className="temp-page__container">
      <WaterfallAnimation cursor={cursor} />
      {/* <Marquee
        gradient={false}
        speed={40}
        style={{
          background: "#000000",
          padding: "10px 0",
          color: "#bcfc45",
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 600,
          zIndex: 2,
          fontSize: "18px",
          cursor: "default",
        }}
      >
        <div className="mq">NEW WEBSITE DROPPING SOON</div>
        <div className="mq">
          SAY HELLO UNTIL THEN:{" "}
          <a
            style={{ color: "#bcfc45" }}
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:hello@melt.works"
          >
            <u>HELLO@MELT.WORKS</u>
          </a>
        </div>
        <div className="mq">NEW WEBSITE DROPPING SOON</div>
        <div className="mq">
          SAY HELLO UNTIL THEN:{" "}
          <a
            style={{ color: "#bcfc45" }}
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:hello@melt.works"
          >
            <u>HELLO@MELT.WORKS</u>
          </a>
        </div>
      </Marquee> */}
      <div id="cursor" ref={cursor}>
        <img alt="Cursor Arrow" src={Button2} />
        <img alt="Cursor Arrow" src={Button} />
      </div>
    </div>
  );
}
