import React, { useEffect, useState } from "react";
import "./NavBar.css";

import { Animated } from "react-animated-css";
// import { useNavigate, Link } from "react-router-dom";

import Drippy from "../../assets/images/Logo/MELT_DRIPPY WHT.png";
// import MeltStudioLogo from "../../../assets/images/Logo/MELT_MELT STUDIO.svg";

import TagLink from "../TagLink/TagLink";

export default function DrippyAndAboutNavForAbout(props) {
  // const navigate = useNavigate();
  // const [aboutUnderline, setAboutUnderline]=useState('about-underline')

  useEffect(() => {
    console.log(props);
    if (window.location.pathname === "/about") {
      // setAboutUnderline("always-underlined")
      // props.setStickyIsVis("sticky-info")
      setTimeout(() => {
        props.setVisible(true);
      }, 3000);
    }
  }, []);

  // const homeCLick = () => {
  //   navigate("/");
  //   props.homeClick();
  // };

  return (
    <Animated
      style={{ cursor: "none" }}
      className={props.isVis}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      animationInDuration={1000}
      animationOutDuration={2000}
      isVisible={props.visible}
    >
      <div style={{ cursor: "none" }} className={props.isVis}>
        <div className="nav-item__holder nav">
          <TagLink tag={{ text: "MELT Studio", href: "/" }} nav />

          <div className="logo-holder__nav">
            <img
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="drippy__nav"
              src={Drippy}
              alt="logo"
            />
          </div>

          <TagLink tag={{ text: "About Us", href: "/about" }} nav />
        </div>
      </div>
    </Animated>
  );
}
