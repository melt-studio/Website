import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import WaterfallAnimation from "../../components/WaterfallAnimation/index.js";
import LogoAnimation from "../../components/LogoAnimation/index.js";
import "./Protected.css";
import Page from "../Page.jsx";
import styled from "styled-components";

export const IFrame = styled.iframe`
  width: 100%;
  // height: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
  border: none;
  margin: 75px 0;
`;

export default function ProtectedPage({ loggedIn, setLoggedIn, mobile, config }) {
  // const [animationchoice, setAnimationChoice] = useState("waterfall");

  useEffect(() => {
    document.body.classList.add("admin-page");

    return () => {
      document.body.classList.remove("admin-page");
    };
  }, []);

  const { id } = useParams();
  // console.log(id);

  const inputElement = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      if (inputElement.current) {
        inputElement.current.focus();
      }
    }, 2000);
  }, []);

  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);

  // console.log("password", props.miscPageInfo[0].fields.password)

  if (mobile) {
    return <div>Please view on desktop</div>;
  }

  return (
    <Page>
      <div className="page-container">
        {loggedIn ? <AdminPanel config={config} /> : <AdminForm setLoggedIn={setLoggedIn} />}
      </div>
    </Page>
  );
}

const AdminPanel = ({ config }) => {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#000000" }}>
      <LogoAnimation serverConfig={config} controls />
    </div>
    // <IFrame
    //   src={`/admin/${"logo"}`}
    // ></IFrame>
  );
};

const AdminForm = ({ setLoggedIn }) => {
  const [password, setPassword] = useState("");

  const login = (event, password) => {
    event.preventDefault();

    if (password === "test") {
      setLoggedIn(true);
    } else {
      alert("Password not correct!");
      setLoggedIn(false);
    }
  };

  return (
    <div className="admin-form">
      <form onSubmit={(e) => login(e, password)}>
        <input
          placeholder=""
          type="text"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">PLEASE LOGIN</button>
      </form>
    </div>
  );
};

/* {isAllowed === true ? (
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
      )} */
