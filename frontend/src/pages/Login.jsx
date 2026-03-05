import { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      login(res.data.token);

      window.location.href = "/";

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-2xl shadow w-96 space-y-4">

        <h2 className="text-2xl font-bold text-center">
          Login
        </h2>

        <input
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          onClick={handleSubmit}
        >
          Login
        </button>

      </div>
    </div>
  );
}