// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import PasswordInput from "../components/PasswordInput";

export default function Signup() {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  // form state
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // password validation checker
  const validatePassword = (pwd) => {
    if (pwd.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(pwd)) return "Must include at least one uppercase letter";
    if (!/[a-z]/.test(pwd)) return "Must include at least one lowercase letter";
    return null;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // validate password
    const error = validatePassword(password);
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        // update profile (no unused 'res' variable)
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        });

        toast.success("Signup successful!");
        setTimeout(() => navigate("/"), 600);
      })
      .catch((error) => {
        const msg = error?.message ? error.message.split(":").slice(1).join(":").trim() : "Signup failed";
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleSignup = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Signup successful!");
        navigate("/");
      })
      .catch(() => toast.error("Google signup failed"));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6 text-slate-800">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name */}
          <label className="block text-sm font-medium text-slate-700">
            Name
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              placeholder="Full Name"
            />
          </label>

          {/* Photo URL */}
          <label className="block text-sm font-medium text-slate-700">
            Photo URL
            <input
              type="text"
              required
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              placeholder="https://example.com/photo.jpg"
            />
          </label>

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

          {/* Password */}
          <PasswordInput value={password} onChange={setPassword} />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Signup"}
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignup}
          className="w-full mt-4 bg-white border py-2 rounded flex items-center justify-center gap-2 hover:bg-slate-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt="google"
          />
          <span>Continue with Google</span>
        </button>

        {/* Already have account? */}
        <p className="text-center text-sm text-slate-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
