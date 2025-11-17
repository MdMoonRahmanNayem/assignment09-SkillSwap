// src/pages/MyProfile.jsx
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function MyProfile() {
  const { user, logout, updateUserProfile } = useAuth();

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
    setUpdating(true);
    try {
      await updateUserProfile({ displayName: name.trim(), photoURL: photoURL.trim() || null });
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
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
        <div className="flex-shrink-0 flex flex-col items-center gap-4">
          <img src={user.photoURL || "/vite.svg"} alt={user.displayName || user.email} className="w-32 h-32 rounded-full object-cover border" />
          <button onClick={() => logout()} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
        </div>

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

          <div className="mt-6">
            <button onClick={() => setEditing(true)} className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Update Profile</button>
          </div>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-3">Update Profile</h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              <label className="block text-sm">
                Name
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
              </label>

              <label className="block text-sm">
                Photo URL
                <input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="https://i.postimg.cc/..." />
              </label>

              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => { setName(user.displayName || ""); setPhotoURL(user.photoURL || ""); setEditing(false); }} className="px-3 py-2 border rounded">Cancel</button>
                <button type="submit" disabled={updating} className="px-4 py-2 bg-teal-600 text-white rounded disabled:opacity-60">{updating ? "Saving..." : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
