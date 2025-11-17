// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PasswordInput from "../components/PasswordInput";
import { useAuth } from "../context/AuthContext";

function validatePassword(pw) {
  if (pw.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(pw)) return "Password must contain an uppercase letter";
  if (!/[a-z]/.test(pw)) return "Password must contain a lowercase letter";
  return null;
}

export default function Signup() {
  const { signup, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    const error = validatePassword(password);
    if (error) return toast.error(error);

    setLoading(true);
    try {
      await signup({ name, photoURL: photo, email, password });
      toast.success("Signup successful!");
      navigate("/");
    } catch (err) {
      const msg = err?.message ? err.message.split(":").slice(1).join(":").trim() : "Signup failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6 text-slate-800">Signup</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <label className="block text-sm">
            Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
          </label>

          <label className="block text-sm">
            Photo URL
            <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="https://i.postimg.cc/..." />
          </label>

          <label className="block text-sm">
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
          </label>

          <div className="relative">
            <label className="block text-sm">Password</label>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              required
            />
            <span onClick={() => setShowPass(!showPass)} className="absolute right-3 top-9 cursor-pointer">{showPass ? "🙈" : "👁️"}</span>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-teal-600 text-white py-2 rounded disabled:opacity-60">
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <button onClick={googleSignIn} className="w-full mt-4 bg-white border py-2 rounded flex items-center justify-center gap-2 hover:bg-slate-50">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="google" />
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-sm text-slate-600 mt-4">
          Already have an account? <Link to="/login" className="text-teal-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
