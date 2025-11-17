// src/components/Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoImg from "../assets/logo.png"; // make sure this file exists

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-400 flex items-center justify-center text-white font-bold">SF</div>
              <span className="font-semibold text-lg text-slate-900">SkillSwap</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-teal-600 font-medium' : 'text-slate-700'}>Home</NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-teal-600 font-medium' : 'text-slate-700'}>My Profile</NavLink>
          </nav>

          {/* Right side: auth controls */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Avatar with hover name tooltip */}
                <div className="relative group">
                  <img
                    src={user.photoURL || logoImg}
                    alt={user.displayName || user.email || "avatar"}
                    className="w-9 h-9 rounded-full object-cover border"
                    title={user.displayName || user.email}
                  />
                  <div className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute right-0 mt-12 w-max bg-white border rounded shadow px-3 py-1 text-sm text-slate-700">
                    {user.displayName || user.email}
                  </div>
                </div>

                <button
                  onClick={() => logout && logout()}
                  className="px-3 py-1 rounded-md border text-sm text-slate-700 hover:bg-slate-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1 rounded-md border text-sm text-slate-700 hover:bg-slate-50">Login</Link>
                <Link to="/signup" className="px-3 py-1 rounded-md bg-yellow-400 text-white text-sm">Signup</Link>
              </>
            )}

            {/* Mobile menu button (small placeholder) */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>

        {/* Mobile nav (simple) */}
        <div className="md:hidden mt-2">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <NavLink to="/" className={({ isActive }) => isActive ? 'text-teal-600 font-medium' : 'text-slate-700'}>Home</NavLink>
              <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-teal-600 font-medium' : 'text-slate-700'}>Profile</NavLink>
            </div>
            {!user && (
              <div className="flex gap-2">
                <Link to="/login" className="text-sm text-slate-700">Login</Link>
                <Link to="/signup" className="text-sm text-yellow-500">Signup</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/* Small mobile menu placeholder component */
function MobileMenu() {
  return (
    <details className="relative">
      <summary className="list-none cursor-pointer px-2 py-1 rounded-md border text-sm">Menu</summary>
      <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow p-2">
        <Link to="/" className="block px-2 py-1 text-sm text-slate-700">Home</Link>
        <Link to="/profile" className="block px-2 py-1 text-sm text-slate-700">My Profile</Link>
      </div>
    </details>
  );
}
