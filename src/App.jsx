import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar every page */}
      <Navbar />

      {/* Main route area */}
      <main className="flex-1">
        <AppRoutes />
      </main>

      {/* Footer every page */}
      <Footer />
    </div>
  );
}
