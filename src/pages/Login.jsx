// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import PasswordInput from "../components/PasswordInput";

export default function Login() {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const location = useLocation();

  // redirect path after login
  const redirectPath = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login successful!");
        setTimeout(() => navigate(redirectPath, { replace: true }), 500);
      })
      .catch((error) => {
        // use 'error' (not 'err') to avoid unused-vars lint warning
        const msg = error?.message ? error.message.split(":").slice(1).join(":").trim() : "Login failed";
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Login successful!");
        navigate(redirectPath, { replace: true });
      })
      .catch(() => toast.error("Google login failed"));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6 text-slate-800">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              placeholder="your@email.com"
            />
          </label>

          {/* Password + eye toggle component */}
          <PasswordInput value={password} onChange={setPassword} />

          {/* Forgot password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              state={{ email }}
              className="text-sm text-teal-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-white border py-2 rounded flex items-center justify-center gap-2 hover:bg-slate-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt="google"
          />
          <span>Continue with Google</span>
        </button>

        {/* Link to Signup */}
        <p className="text-center text-sm text-slate-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-teal-600 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
