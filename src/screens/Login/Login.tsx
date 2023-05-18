import { loginWorker } from "../../api/api";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    const logUser = await loginWorker(name, password);

    if (logUser.token) {
      navigate("/app/workers");
      localStorage.setItem("token", logUser.token);
      localStorage.setItem("user", JSON.stringify(logUser.user));
    } else {
      alert("Login failed");
    }
  }
  return (
    <div className="main">
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
      <label>
        Password:
        <input
          type="password"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </label>
      <button onClick={login} type="button">
        Login
      </button>
    </div>
  );
}

export default Login;
