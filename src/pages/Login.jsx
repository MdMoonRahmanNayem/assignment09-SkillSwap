import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PasswordInput from "../components/PasswordInput";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Login successful!");
      setTimeout(() => navigate(redirectPath, { replace: true }), 300);
    } catch (err) {
      const msg = err?.message ? err.message.split(":").slice(1).join(":").trim() : "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await googleSignIn();
      toast.success("Login successful!");
      navigate(redirectPath, { replace: true });
    } catch (err) {
      const msg = err?.message ? err.message.split(":").slice(1).join(":").trim() : "Google login failed";
      toast.error(msg);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6 text-slate-800">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4" aria-label="login form">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>

          <PasswordInput value={password} onChange={setPassword} />

          <div className="text-right">
            <Link to="/forgot-password" state={{ email }} className="text-sm text-teal-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-teal-600 text-white py-2 rounded disabled:opacity-60">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button onClick={handleGoogle} disabled={googleLoading} className="w-full mt-4 bg-white border py-2 rounded flex items-center justify-center gap-2 disabled:opacity-60">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="google" />
          <span>{googleLoading ? "Signing in..." : "Continue with Google"}</span>
        </button>

        <p className="text-center text-sm text-slate-600 mt-4">
          Don’t have an account? <Link to="/signup" className="text-teal-600 hover:underline">Signup</Link>
        </p>
      </div>
    </div>
  );
}
