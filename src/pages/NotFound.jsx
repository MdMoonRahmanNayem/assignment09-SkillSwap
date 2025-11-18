import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
        <p className="mb-6 text-gray-700">
          Oops! Page not found — looks like the link is incorrect.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
        >
          Go back Home
        </Link>
      </div>
    </div>
  );
}
