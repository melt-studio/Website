import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../Page";
import loginService from "../../services/login";
import "./Login.css";

const Login = ({ setLoggedIn }) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const navigate = useNavigate();

  const form = useRef();

  useEffect(() => {
    document.body.classList.add("login-page");

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  // useEffect(() => {
  //   const password = window.localStorage.getItem("admin-password");

  //   const login = async (password) => {
  //     try {
  //       await loginService.login(password);
  //       setLoggedIn(true);
  //       return navigate("/admin");
  //     } catch (error) {
  //       setLoggedIn(false);
  //       window.localStorage.removeItem("admin-password");
  //     }
  //   };

  //   if (password) login(password);
  // }, [setLoggedIn, navigate]);

  const login = async (event, password) => {
    event.preventDefault();

    try {
      await loginService.login(password);
      setLoggedIn(true);
      window.localStorage.setItem("admin-password", password);
      return navigate("/admin");
    } catch (error) {
      setLoggedIn(false);
      setMessage("Wrong password");
      if (form && form.current) {
        form.current.classList.add("error");
      }
      if (timeoutId) setTimeoutId(null);
      setTimeoutId(
        setTimeout(() => {
          setMessage(null);
          if (form && form.current) {
            form.current.classList.remove("error");
          }
        }, 5000)
      );
    }
  };

  const handleChange = (e) => {
    if (form && form.current) {
      form.current.classList.remove("error");
    }
    if (message) setMessage(null);
    if (timeoutId) setTimeoutId(null);
    setPassword(e.target.value);
  };

  return (
    <Page>
      <div className="page-container">
        <div className="login-form" ref={form}>
          <h1>Login to Admin Panel</h1>
          <form onSubmit={(e) => login(e, password)}>
            <input placeholder="Password" type="password" onChange={handleChange} />
            <button type="submit">Login</button>
            {message && <div className="form__message">{message}</div>}
          </form>
        </div>
      </div>
    </Page>
  );
};

export default Login;
