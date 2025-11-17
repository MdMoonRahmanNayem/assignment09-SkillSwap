// src/components/PasswordInput.jsx
import React, { useState } from "react";

export default function PasswordInput({ value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <label className="block text-sm font-medium text-slate-700">
      Password
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full mt-1 p-2 border rounded pr-10"
          placeholder="••••••"
        />
        <span
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500"
        >
          {show ? "🙈" : "👁️"}
        </span>
      </div>
    </label>
  );
}
