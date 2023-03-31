import React from "react";
import "./FooterSmaller.css";

export default function FooterSmaller(props) {
  return (
    <div className="footer-smaller__container">
      <div className="footer-smaller__holder">
        <div style={{ width: "100px" }} id="text">
          <p
            style={{ color: props.color }}
            className="text"
            onMouseEnter={() => {
              // const text = document.querySelector("#text");
              // text.classList.add("smiley-face");
              // text.innerHTML = "😊";
            }}
            onMouseLeave={() => {
              // const text = document.querySelector("#text");
              // text.classList.remove("smiley-face");
              // text.innerHTML = "SWEAT THE DETAILS";
            }}
          >
            SWEAT THE DETAILS
          </p>
        </div>
        <div>
          <p
            style={{ color: props.color }}
            className="text"
            onMouseEnter={() => {
              const hoverFill = document.querySelector(".copywrite-underline");
              hoverFill.classList.add("hovered");
            }}
            onMouseLeave={() => {
              const hoverFill = document.querySelector(".copywrite-underline");
              hoverFill.classList.remove("hovered");
            }}
          >
            2023 © MELT STUDIO
          </p>
        </div>
      </div>
    </div>
  );
}
// <div className='sweat-underline'>
//         <hr style={{backgroundColor:props.color}}  />
//         </div>
// <div className='copywrite-underline'>
//         <hr style={{backgroundColor:props.color}}  />
//         </div>
