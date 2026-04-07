import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/login", { email });
    console.log(res.data);
  };

  return (
    <div>
      <h2>Login</h2>
      <input onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}