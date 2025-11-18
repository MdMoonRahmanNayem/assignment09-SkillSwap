/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile as firebaseUpdateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "../firebase/firebase.config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unsub();
  }, [auth]);

  const signup = async ({ name, photoURL, email, password }) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res?.user) {
        await firebaseUpdateProfile(res.user, {
          displayName: name || "",
          photoURL: photoURL || "",
        });
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profile = {}) => {
    if (!auth.currentUser) throw new Error("No authenticated user");
    setLoading(true);
    try {
      await firebaseUpdateProfile(auth.currentUser, profile);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    if (!email) throw new Error("Email required");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    googleSignIn,
    logout,
    updateUserProfile,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
