import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const prefillEmail = location.state?.email || "";
  const [email, setEmail] = useState(prefillEmail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(prefillEmail);
  }, [prefillEmail]);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      toast.success("Reset email sent. Redirecting to Gmail...");
      window.open("https://mail.google.com", "_blank");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      const msg = err?.message ? err.message.split(":").slice(1).join(":").trim() : "Failed to send reset email";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">Reset Password</h2>
        <p className="text-sm text-slate-600 mb-4">Enter your account email and we'll send password reset instructions.</p>

        <form onSubmit={handleReset} className="space-y-4">
          <label className="block text-sm">
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full mt-1 p-2 border rounded" placeholder="you@example.com" />
          </label>

          <button type="submit" disabled={loading} className="w-full bg-teal-600 text-white py-2 rounded disabled:opacity-60">
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          <button onClick={() => navigate(-1)} className="text-teal-600 hover:underline">← Back to Login</button>
        </div>
      </div>
    </div>
  );
}
