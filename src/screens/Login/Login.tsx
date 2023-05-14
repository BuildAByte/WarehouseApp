import { loginWorker } from "../../api/api";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function login() {
    console.log(name, password);
    const logUser = await loginWorker(name, password);
    console.log(logUser);

    if (logUser.token) {
      navigate("/app/workers");
      localStorage.setItem("token", logUser.token);
      localStorage.setItem("user", JSON.stringify(logUser.user));
    } else {
      alert("Login failed");
    }
  }
  return (
    <div className="wrapper">
      <div className="header">I'm a 30px tall header</div>
      <div className="main">
        <div className="item-container">
          <label>
            Name:
            <input
              type="text"
              name="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </label>
        </div>
        <div className="item-container">
          <label>
            Password:
            <input
              type="text"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>
        </div>
        <div className="item-container">
          <button onClick={login} type="button">
            Click Me
          </button>
        </div>
      </div>
      <div className="footer">I'm a 30px tall footer</div>
    </div>
  );
}

export default Login;
