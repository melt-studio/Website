import { useState } from "react";

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
      <h1>Login to Admin Panel</h1>
      <form onSubmit={(e) => login(e, password)}>
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminForm;
