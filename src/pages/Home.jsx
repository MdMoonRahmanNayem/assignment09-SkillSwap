/* eslint-disable react-hooks/set-state-in-effect */
// src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import skillsData from "../data/skills-data.js";

export default function Home() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Set skills once when component mounts
    setSkills(skillsData);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* ---------------- HERO SLIDER ---------------- */}
      <div className="my-6">
        <Swiper loop autoplay={{ delay: 3000 }}>
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1529336953121-4d0bbd30a42d"
              className="w-full h-64 object-cover rounded-xl"
              alt=""
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
              className="w-full h-64 object-cover rounded-xl"
              alt=""
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1498079022511-d15614cb1c02"
              className="w-full h-64 object-cover rounded-xl"
              alt=""
            />
          </SwiperSlide>
        </Swiper>

        <h1 className="text-3xl font-bold mt-6 text-slate-800">
          Learn, Share & Trade Skills Locally
        </h1>
        <p className="text-slate-600 mt-2">
          Connect with local experts — learn real skills with real people.
        </p>
      </div>

      {/* ---------------- POPULAR SKILLS ---------------- */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Popular Skills</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.skillId}
              className="bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={skill.image}
                alt={skill.skillName}
                className="w-full h-40 object-cover rounded-t-lg"
              />

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{skill.skillName}</h3>
                <p className="text-sm text-slate-600">Rating: ⭐ {skill.rating}</p>
                <p className="font-medium text-teal-600">${skill.price}</p>

                <Link
                  to={`/skill/${skill.skillId}`}
                  className="inline-block px-3 py-2 mt-2 bg-teal-600 text-white rounded"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- TOP RATED PROVIDERS ---------------- */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Top Rated Providers</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold text-lg">Alex Martin</h3>
            <p className="text-sm text-slate-600">⭐⭐⭐⭐⭐ (4.9)</p>
            <p className="mt-2 text-sm text-slate-700">Guitar Instructor</p>
          </div>

          <div className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold text-lg">Ayesha Khan</h3>
            <p className="text-sm text-slate-600">⭐⭐⭐⭐⭐ (4.8)</p>
            <p className="mt-2 text-sm text-slate-700">Cooking Expert</p>
          </div>

          <div className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold text-lg">Maya Das</h3>
            <p className="text-sm text-slate-600">⭐⭐⭐⭐⭐ (4.7)</p>
            <p className="mt-2 text-sm text-slate-700">Yoga Trainer</p>
          </div>
        </div>
      </div>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <div className="mt-16 mb-10">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold text-lg">1. Browse Skills</h3>
            <p className="text-sm text-slate-600 mt-2">
              Explore hundreds of skills offered by real people around you.
            </p>
          </div>

          <div className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold text-lg">2. Connect Locally</h3>
            <p className="text-sm text-slate-600 mt-2">
              Contact providers directly and book sessions instantly.
            </p>
          </div>

          <div className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold text-lg">3. Learn & Exchange</h3>
            <p className="text-sm text-slate-600 mt-2">
              Improve skills, exchange value, and learn face-to-face!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
