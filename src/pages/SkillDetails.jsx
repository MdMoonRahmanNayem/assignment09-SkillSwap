import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import skillsData from "../data/skills-data.js";
import { useAuth } from "../context/AuthContext";

export default function SkillDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [skill, setSkill] = useState(null);

  // Booking form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // find skill by numeric id (skillId is number in skills-data)
    const sid = Number(id);
    const found = skillsData.find((s) => s.skillId === sid);
    if (found) setSkill(found);
    else setSkill(null);
  }, [id]);

  useEffect(() => {
    // if user is not logged in, redirect to login and remember current page
    if (!user) {
      // after login, firebase auth will redirect back using location.state.from
      navigate("/login", { replace: true, state: { from: location } });
    } else {
      // if logged in, prefill email
      setEmail(user.email || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!skill) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-slate-600">Skill not found.</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate booking action (no backend) — just show toast and clear form
    setTimeout(() => {
      toast.success("Booking successful! We will contact you soon.");
      setName("");
      setEmail(user?.email || "");
      setSubmitting(false);
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toaster position="top-right" />
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: Image */}
        <div className="md:col-span-2 bg-white rounded shadow">
          <img
            src={skill.image}
            alt={skill.skillName}
            className="w-full h-64 object-cover rounded-t"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold">{skill.skillName}</h1>
            <p className="text-sm text-slate-600 mt-1">{skill.category}</p>

            <div className="mt-4 space-y-2">
              <p className="text-slate-700">{skill.description}</p>
              <div className="flex gap-4 mt-3 flex-wrap">
                <span className="text-sm text-slate-600">Provider: {skill.providerName}</span>
                <span className="text-sm text-slate-600">Email: {skill.providerEmail}</span>
                <span className="text-sm text-slate-600">Slots: {skill.slotsAvailable}</span>
                <span className="text-sm text-slate-600">Rating: ⭐ {skill.rating}</span>
                <span className="text-sm font-semibold text-teal-600">Price: ${skill.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking form */}
        <aside className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Book a Session</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-sm">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full mt-1 p-2 border rounded"
                placeholder="Your full name"
              />
            </label>

            <label className="block text-sm">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 p-2 border rounded"
                placeholder="you@example.com"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 px-4 py-2 bg-teal-600 text-white rounded disabled:opacity-60"
            >
              {submitting ? "Booking..." : "Book Session"}
            </button>

            <p className="text-xs text-slate-500 mt-2">
              By booking you agree to contact the provider for scheduling and
              details. (This is a demo — no real payment processed.)
            </p>
          </form>
        </aside>
      </div>

      {/* Extra: provider contact / details */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Provider Contact</h3>
        <p className="text-sm text-slate-700 mt-1">Name: {skill.providerName}</p>
        <p className="text-sm text-slate-700">Email: {skill.providerEmail}</p>
      </div>
    </div>
  );
}
