// src/pages/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

export default function MyProfile() {
  const { user, logout } = useAuth();
  const auth = getAuth();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("No user logged in.");

    if (!name.trim()) return toast.error("Name cannot be empty.");

    setUpdating(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name.trim(),
        photoURL: photoURL.trim() || null,
      });

      toast.success("Profile updated successfully!");
      setEditing(false);
      // Note: If AuthContext listens to onAuthStateChanged, the user object will update automatically.
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-slate-600">You are not logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Toaster position="top-right" />

      <div className="bg-white rounded shadow p-6 flex flex-col md:flex-row gap-6">
        {/* Left: Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center gap-4">
          <img
            src={user.photoURL || "/vite.svg"}
            alt={user.displayName || user.email}
            className="w-32 h-32 rounded-full object-cover border"
          />
          <button
            onClick={() => logout && logout()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Right: Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{user.displayName || "No name"}</h2>
          <p className="text-sm text-slate-600">{user.email}</p>

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs text-slate-500">User Name</p>
              <div className="text-sm text-slate-800">{user.displayName || "-"}</div>
            </div>

            <div>
              <p className="text-xs text-slate-500">User Email</p>
              <div className="text-sm text-slate-800">{user.email}</div>
            </div>

            <div>
              <p className="text-xs text-slate-500">User Image URL</p>
              <div className="text-sm text-slate-800 break-all">{user.photoURL || "-"}</div>
            </div>
          </div>

          {/* Update button */}
          <div className="mt-6">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Modal for editing */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-3">Update Profile</h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              <label className="block text-sm">
                Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                  placeholder="Your full name"
                  required
                />
              </label>

              <label className="block text-sm">
                Photo URL
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                  placeholder="https://example.com/photo.jpg"
                />
              </label>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setName(user.displayName || "");
                    setPhotoURL(user.photoURL || "");
                    setEditing(false);
                  }}
                  className="px-3 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="px-4 py-2 bg-teal-600 text-white rounded disabled:opacity-60"
                >
                  {updating ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500 mt-4">
        Tip: Profile changes use Firebase&apos;s <code>updateProfile()</code>. If your AuthContext listens to auth state changes it will reflect automatically; otherwise refresh the page to see updates.
      </p>
    </div>
  );
}
