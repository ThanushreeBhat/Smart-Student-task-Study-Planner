import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const register = async () => {
    if (!data.name || !data.email || !data.password) {
      return alert("All fields required");
    }

    try {
      await API.post("/register", data);
      alert("Registered successfully ✅");
      window.location.href = "/";
    } catch (err) {
      alert("Registration failed ❌");
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ textAlign: "center" }}>Register</h2>

        <input
          placeholder="Name"
          value={data.name}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button className="btn-primary" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}