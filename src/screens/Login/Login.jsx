import { useState, useEffect, useRef } from "react";
import loginService from "../../services/login";
import "./Login.css";

const Login = ({ loggedIn, setLoggedIn }) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const form = useRef();

  useEffect(() => {
    document.body.classList.add("login-page");

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (password === "") {
      setLoggedIn(false);
      if (form && form.current) {
        form.current.classList.add("error");
      }
      return setMessage("Please enter password");
    }

    try {
      await loginService.login(password);
      setLoggedIn(true);
      window.localStorage.setItem("melt_admin_password", password);
      document.body.classList.add("logged-in");
      setPassword("");
    } catch (error) {
      setLoggedIn(false);
      document.body.classList.remove("logged-in");
      if (form && form.current) {
        form.current.classList.add("error");
      }
      setMessage("Wrong password");
    }
  };

  const handleChange = (e) => {
    if (form && form.current) {
      form.current.classList.remove("error");
    }
    if (message) setMessage(null);
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setPassword(e.target.value);
  };

  return (
    <div className="form login-form" ref={form}>
      <form onSubmit={handleLogin}>
        <input placeholder="Password" type="password" onChange={handleChange} autoFocus={true} />
        <button type="submit">Login to Admin Panel</button>
        {message && <div className="form__message">{message}</div>}
      </form>
    </div>
  );
};

export default Login;
