import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [form, setForm] = useState({});

  const login = async () => {
    const res = await API.post("/login", form);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/>
      <input placeholder="Password" onChange={e => setForm({...form, password: e.target.value})}/>
      <button onClick={login}>Login</button>
    </div>
  );
}