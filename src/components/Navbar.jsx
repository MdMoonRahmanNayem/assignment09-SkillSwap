import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FALLBACK_AVATAR =
  "https://www.gravatar.com/avatar/?d=mp&s=200"; 
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        
        <div className="flex items-center justify-between h-16">

          
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-yellow-400 flex items-center justify-center text-white font-bold">
              SS
            </div>
            <span className="font-semibold text-lg text-slate-900">
              SkillSwap
            </span>
          </Link>

          
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 font-medium"
                  : "text-slate-700 hover:text-teal-600 transition"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 font-medium"
                  : "text-slate-700 hover:text-teal-600 transition"
              }
            >
              My Profile
            </NavLink>
          </nav>

          
          <div className="flex items-center gap-3">

            
            {user ? (
              <>
                
                <div className="relative">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || user.email || "avatar"}
                      title={user.displayName || user.email}
                      className="w-9 h-9 rounded-full object-cover border"
                    />
                  ) : (
                    <div
                      title={user.displayName || user.email}
                      className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm border"
                    >
                      {user.displayName
                        ? user.displayName.charAt(0).toUpperCase()
                        : (user.email || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-md border text-sm text-slate-700 hover:bg-slate-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 rounded-md border text-sm text-slate-700 hover:bg-slate-100 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-3 py-1 rounded-md bg-yellow-400 text-white text-sm hover:bg-yellow-500 transition"
                >
                  Signup
                </Link>
              </>
            )}

            
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 border rounded-lg hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {open ? (
                <span className="text-lg">✕</span>
              ) : (
                <span className="text-lg">☰</span>
              )}
            </button>
          </div>
        </div>

        
        {open && (
          <div className="md:hidden mt-2 bg-white shadow-lg rounded-lg p-4 absolute left-0 w-full z-40">
            <div className="flex items-center justify-between mb-3">

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || user.email || "avatar"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-slate-700 text-lg font-medium">
                      {(user?.displayName || user?.email || "G")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    {user?.displayName || "Guest"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {user?.email || "Not signed in"}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-sm text-slate-600 px-2 py-1 rounded hover:bg-slate-100 transition"
              >
                Close
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <NavLink
                to="/"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-2 rounded text-teal-600 font-medium"
                    : "px-3 py-2 rounded text-slate-700 hover:bg-slate-50 transition"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/profile"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-2 rounded text-teal-600 font-medium"
                    : "px-3 py-2 rounded text-slate-700 hover:bg-slate-50 transition"
                }
              >
                My Profile
              </NavLink>

              
              {!user && (
                <div className="mt-3 flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={handleNavClick}
                    className="px-3 py-2 rounded border text-center text-slate-700 hover:bg-slate-50 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={handleNavClick}
                    className="px-3 py-2 rounded bg-yellow-400 text-white text-center hover:bg-yellow-500 transition"
                  >
                    Signup
                  </Link>
                </div>
              )}

              
              {user && (
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="mt-3 px-3 py-2 rounded border text-left text-slate-700 hover:bg-slate-50 transition"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}