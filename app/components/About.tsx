"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Trophy,
  Code,
  Mic,
  BookOpen,
  Quote,
  Award,
} from "lucide-react";
import Image from "next/image";

export default function AboutSectionWithImages() {
  const leadership = [
    {
      name: "Dr. Sanjay Kharat",
      role: "Principal",
      department: "Modern College of Commerce, Arts and Science",
      description:
        "Visionary leader with 25+ years in academic excellence and innovation.",
      image: "/images/principal.jpg", // Replace with your image path
      color: "border-blue-200 bg-gradient-to-br from-blue-50 to-white",
      //   badge: "25+ Years Experience",
    },
    {
      name: "Dr. Pallavi ",
      role: "HOD - Computer Science",
      department: "Department of Computer Science Modern College",
      description:
        "Pioneering industry-academia collaborations in emerging technologies.",
      image: "/images/hod.jpg", // Replace with your image path
      color: "border-purple-200 bg-gradient-to-br from-purple-50 to-white",
      //   badge: "Industry Expert",
    },
  ];

  const eventStats = [
    {
      icon: Calendar,
      label: "Date",
      value: "Oct 25-27",
      color: "bg-blue-100 text-blue-700",
    },
    // {
    //   icon: Users,
    //   label: "Participants",
    //   value: "1000+",
    //   color: "bg-purple-100 text-purple-700",
    // },
    // {
    //   icon: BookOpen,
    //   label: "Workshops",
    //   value: "30+",
    //   color: "bg-pink-100 text-pink-700",
    // },
    // {
    //   icon: Trophy,
    //   label: "Prize Pool",
    //   value: "₹1L",
    //   color: "bg-yellow-100 text-yellow-700",
    // },
    // {
    //   icon: Code,
    //   label: "Hackathon",
    //   value: "48H",
    //   color: "bg-green-100 text-green-700",
    // },
    // {
    //   icon: Mic,
    //   label: "Speakers",
    //   value: "50+",
    //   color: "bg-orange-100 text-orange-700",
    // },
  ];

  const eventHighlights = [
    "Keynote sessions by industry leaders",
    "National-level hackathon",
    "Career fair opportunities",
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-6xl font-bold text-gray-800 mb-3 font-roman font-italic">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Interaction 2026
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Annual flagship tech symposium connecting students with industry
            through innovation and collaboration
          </p>
        </div>

        {/* Leadership with Images */}
        <div className="mb-10">
          <h3 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Our <span className="text-blue-600">Leadership</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {leadership.map((person, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${person.color} rounded-2xl p-5 shadow-sm border`}
              >
                <div className="flex items-start gap-5">
                  {/* Profile Image with Badge */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-xl overflow-hidden border-3 border-white shadow-md">
                      {/* Image Container */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                        {/* Placeholder if image not available */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-gray-500 text-2xl font-bold">
                            {person.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        </div>

                        {/* Actual Image - Uncomment when you have images */}
                        {/* <Image
                          src={person.image}
                          alt={person.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        /> */}
                      </div>
                    </div>

                    {/* Badge */}
                    {/* <div className="absolute -bottom-2 -right-2 bg-white px-2 py-1 rounded-lg shadow-sm border border-gray-200">
                      <Award className="w-4 h-4 text-yellow-500 inline mr-1" />
                      <span className="text-xs font-medium text-gray-700">
                        {person.badge}
                      </span>
                    </div> */}
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1">
                    <div className="mb-3">
                      <h4 className="font-bold text-gray-800 text-lg">
                        {person.name}
                      </h4>
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            index === 0 ? "bg-blue-500" : "bg-purple-500"
                          }`}
                        ></div>
                        <p className="text-blue-600 font-semibold">
                          {person.role}
                        </p>
                      </div>
                      <p className="text-gray-500 text-sm">
                        {person.department}
                      </p>
                    </div>

                    <div className="bg-white/50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start gap-2">
                        <Quote className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 text-sm italic">
                          {person.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Event Stats Cards */}
        {/* <div className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {eventStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200"
              >
                <div
                  className={`w-12 h-12 ${
                    stat.color.split(" ")[0]
                  } rounded-lg flex items-center justify-center mx-auto mb-3`}
                >
                  <stat.icon
                    className={`w-6 h-6 ${stat.color.split(" ")[1]}`}
                  />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div> */}

        {/* Event Overview */}
        <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Event Description */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Event <span className="text-blue-600">Overview</span>
              </h3>

              <div className="space-y-4">
                <p className="text-gray-700 text-sm">
                  <strong className="text-gray-800">Interaction 2026</strong> is
                  our annual flagship event designed to bridge the gap between
                  academic learning and real-world industry applications. This
                  2-day symposium brings together students, innovators, and
                  industry leaders to explore cutting-edge technologies.
                </p>

                {/* Timeline Visual */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800">
                      Event Timeline
                    </h4>
                    <span className="text-sm text-blue-600 font-medium">
                      Jan 09-10, 2026
                    </span>
                  </div>

                  <div className="flex items-center">
                    {["Day 1", "Day 2"].map((day, idx) => (
                      <div key={idx} className="flex-1 text-center">
                        <div
                          className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center
                          ${
                            idx === 0
                              ? "bg-blue-500 text-white"
                              : idx === 1
                              ? "bg-green-500 text-white"
                              : "bg-purple-500 text-white"
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {day}
                        </div>
                        <div className="text-xs text-gray-500">
                          {idx === 0
                            ? "Events"
                            : idx === 1
                            ? "More Events"
                            : "Hackathon"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Event Highlights */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Event <span className="text-purple-600">Highlights</span>
              </h3>

              <div className="space-y-3">
                {eventHighlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        index % 3 === 0
                          ? "bg-blue-500"
                          : index % 3 === 1
                          ? "bg-green-500"
                          : "bg-purple-500"
                      }`}
                    ></div>
                    <span className="text-sm text-gray-700">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
