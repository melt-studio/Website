import React, { useEffect } from "react";
import "./NavBar.css";
import { Animated } from "react-animated-css";
import TagLink from "../TagLink/TagLink";
import DrippyLogo from "../../assets/images/Logo/MELT_DRIPPY WHT.png";

const NavBar = (props) => {
  // const navigate = useNavigate();
  // const [aboutUnderline, setAboutUnderline]=useState('about-underline')

  useEffect(() => {
    // console.log(props);
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
    <div className="sticky-info-holder">
      <Animated
        className={props.isVis}
        animationIn="fadeInDown"
        animationOut="fadeOutUp"
        animationInDuration={1000}
        animationOutDuration={2000}
        isVisible={props.visible}
      >
        <div className={props.isVis}>
          <div className="nav-item__holder nav">
            <TagLink tag={{ text: "MELT Studio", href: "/" }} nav />

            <div className="logo-holder__nav">
              <img
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="drippy__nav"
                src={DrippyLogo}
                alt="logo"
              />
            </div>

            <TagLink tag={{ text: "About Us", href: "/about" }} nav />
          </div>
        </div>
      </Animated>
    </div>
  );
};

export default NavBar;
