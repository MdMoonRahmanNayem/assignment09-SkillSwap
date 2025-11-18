import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import AOS from "aos";
import "aos/dist/aos.css";

import skillsData from "../data/skills-data.js";

export default function Home() {
  const [skills] = useState(() => skillsData || []);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">

      
      <div className="my-6">
        <Swiper loop autoplay={{ delay: 2000 }}>
          <SwiperSlide>
            <div
              className="h-64 flex items-center justify-center bg-cover bg-center rounded-lg text-white text-3xl font-bold"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70')",
              }}
            >
              Learn New Skills
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="h-64 flex items-center justify-center bg-cover bg-center rounded-lg text-white text-3xl font-bold"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')",
              }}
            >
              Teach What You Know
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      
      <section className="mt-10" data-aos="fade-up">
        <h2 className="text-2xl font-semibold mb-4">Popular Skills</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.skillId}
              className="bg-white shadow rounded-lg p-4"
              data-aos="zoom-in"
            >
              <img
                src={skill.image}
                alt={skill.skillName}
                className="rounded-md h-40 w-full object-cover"
              />

              <h3 className="text-lg font-semibold mt-3">
                {skill.skillName}
              </h3>

              <p className="text-sm text-slate-600 mt-1">
                Rating: ⭐ {skill.rating}
              </p>

              <p className="text-sm mt-1 text-slate-700">
                Price: ${skill.price}
              </p>

              <Link to={`/skill/${skill.skillId}`}>
                <button className="mt-3 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      
      <section className="mt-16" data-aos="fade-up">
        <h2 className="text-2xl font-semibold mb-4">How SkillSwap Works</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-white shadow rounded-lg" data-aos="fade-right">
            <h3 className="font-semibold text-lg">1. Choose a Skill</h3>
            <p className="text-sm text-slate-600 mt-1">
              Browse skills offered by experts in your community.
            </p>
          </div>

          <div className="p-4 bg-white shadow rounded-lg" data-aos="fade-up">
            <h3 className="font-semibold text-lg">2. Book a Session</h3>
            <p className="text-sm text-slate-600 mt-1">
              Pick a time slot and contact the skill provider.
            </p>
          </div>

          <div className="p-4 bg-white shadow rounded-lg" data-aos="fade-left">
            <h3 className="font-semibold text-lg">3. Learn & Teach</h3>
            <p className="text-sm text-slate-600 mt-1">
              Join the session and exchange skills effectively.
            </p>
          </div>
        </div>
      </section>

      
      <section className="mt-16" data-aos="fade-up">
        <h2 className="text-2xl font-semibold mb-4">
          Upcoming Workshops & Events
        </h2>

        <p className="text-slate-600 mb-4">
          Join local workshops hosted by SkillSwap community experts.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <div
            className="bg-white rounded-lg shadow p-4"
            data-aos="zoom-in"
            data-aos-delay="50"
          >
            <h3 className="font-semibold">Beginner Guitar Jam</h3>
            <p className="text-sm text-slate-600 mt-1">
              Alex Martin — 12th Dec • Local Studio
            </p>
            <p className="mt-2 text-sm">
              A fun group session for absolute beginners.
            </p>
            <button className="mt-3 px-4 py-2 bg-teal-600 text-white rounded">
              Register
            </button>
          </div>

          <div
            className="bg-white rounded-lg shadow p-4"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <h3 className="font-semibold">English Speaking Meetup</h3>
            <p className="text-sm text-slate-600 mt-1">
              Sara Hossain — 18th Dec • Community Center
            </p>
            <p className="mt-2 text-sm">
              Practice English with friendly group discussion.
            </p>
            <button className="mt-3 px-4 py-2 bg-teal-600 text-white rounded">
              Register
            </button>
          </div>

          <div
            className="bg-white rounded-lg shadow p-4"
            data-aos="zoom-in"
            data-aos-delay="150"
          >
            <h3 className="font-semibold">Weekend Yoga Session</h3>
            <p className="text-sm text-slate-600 mt-1">
              Maya Das — Every Sat • Park Area
            </p>
            <p className="mt-2 text-sm">
              Outdoor yoga suitable for all levels.
            </p>
            <button className="mt-3 px-4 py-2 bg-teal-600 text-white rounded">
              Register
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}