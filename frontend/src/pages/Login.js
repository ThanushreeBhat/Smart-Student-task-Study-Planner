import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [data, setData] = useState({});

  const login = async () => {
    const res = await API.post("/login", data);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <input placeholder="Email"
          onChange={e => setData({...data, email: e.target.value})} />

        <input type="password" placeholder="Password"
          onChange={e => setData({...data, password: e.target.value})} />

        <button className="btn-primary" onClick={login}>Login</button>
      </div>
    </div>
  );
}