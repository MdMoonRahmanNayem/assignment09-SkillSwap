/* eslint-disable react-refresh/only-export-components */

// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile as firebaseUpdateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // listen for auth state changes and keep user in sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  // convenience helpers (return the promises so callers can chain/await)
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  const signup = (email, password, displayName = "", photoURL = "") => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        // set displayName / photoURL immediately after creating
        if (displayName || photoURL) {
          await firebaseUpdateProfile(cred.user, { displayName, photoURL });
        }
        return cred;
      })
      .finally(() => setLoading(false));
  };

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    return signInWithPopup(auth, provider)
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth)
      .finally(() => setLoading(false));
  };

  const updateProfile = (profile) => {
    // wrapper for firebase updateProfile
    if (!auth.currentUser) return Promise.reject(new Error("No user"));
    setLoading(true);
    return firebaseUpdateProfile(auth.currentUser, profile)
      .finally(() => setLoading(false));
  };

  const value = {
    user,
    loading,
    login,
    signup,
    googleLogin,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
