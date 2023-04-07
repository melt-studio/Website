import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import WaterfallAnimation from "../../components/WaterfallAnimation/index.js";
import LogoAnimation from "../../components/LogoAnimation/index.js";
import "./Protected.css";

export default function ProtectedPage(props) {
  const [isAllowed, setIsAllowed] = useState(false);
  const [password, confirmPassword] = useState("");
  const [animationchoice, setAnimationChoice] = useState("waterfall");

  const inputElement = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      if (inputElement.current) {
        inputElement.current.focus();
      }
    }, 2000);
  }, []);

  // console.log("password", props.miscPageInfo[0].fields.password)

  const allowIn = (password) => {
    if (password === props.miscPageInfo[0].fields.password) {
      setIsAllowed(true);
    } else {
      alert("Password not correct!");
    }
  };

  setTimeout(() => {
    document.querySelector(".login-section").classList.add("show");
  }, 1000);
  setTimeout(() => {
    document.querySelector(".password-input").classList.add("expand");
  }, 1200);

  return (
    <div className="protected-page__container">
      <form className="login-section">
        <input
          ref={inputElement}
          placeholder=""
          type="text"
          onChange={(e) => {
            confirmPassword(e.target.value);
          }}
          className="password-input"
        />
        <br />
        <br />
        <button type="submit" className="login-button" onClick={() => allowIn(password)}>
          PLEASE LOGIN
        </button>
      </form>

      {/* {isAllowed === true ? (
        <div className="allowed-section">
          <div className="wc-nav">
            <p onClick={() => setAnimationChoice("logo-no")}>Logo</p>
            <p onClick={() => setAnimationChoice("logo")}>Logo With Controls</p>
            <p onClick={() => setAnimationChoice("waterfall-no")}>Waterfall</p>
            <p onClick={() => setAnimationChoice("waterfall")}>Waterfall With Controls</p>
          </div>
          {animationchoice === "waterfall" && <WaterfallAnimation controls />}
          {animationchoice === "logo" && <LogoAnimation controls />}
          {animationchoice === "waterfall-no" && <WaterfallAnimation />}
          {animationchoice === "logo-no" && <LogoAnimation />}
        </div>
      ) : (
        <form className="login-section">
          <input
            ref={inputElement}
            placeholder=""
            type="text"
            onChange={(e) => {
              confirmPassword(e.target.value);
            }}
            className="password-input"
          />
          <br />
          <br />
          <button type="submit" className="login-button" onClick={() => allowIn(password)}>
            PLEASE LOGIN
          </button>
        </form>
      )} */}
    </div>
  );
}
