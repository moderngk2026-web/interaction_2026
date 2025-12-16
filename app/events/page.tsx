"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
}

const sampleEvents: Event[] = [
  {
    id: 1,
    title: "Mind Marathon (Quiz)",
    description:
      "Music, dance, and drama performances showcasing cultural heritage",
    date: "Jan 09, 2026",
  },

  {
    id: 2,
    title: "Grab the oppurtunity",
    description: "Showcase of student photography work",
    date: "Jan 09, 2026",
  },
  {
    id: 3,
    title: "Web Craft Challenge",
    description: "48-hour hackathon for social and environmental solutions",
    date: "Jan 09, 2026",
  },
  {
    id: 4,
    title: "Spark the idea",
    description: "Interactive session with industry leaders",
    date: "Jan 09, 2026",
  },
  {
    id: 5,
    title: "Code Warriors",
    description:
      "Coding competitions, tech talks, and workshops by industry experts",
    date: "Jan 10, 2026",
  },
  {
    id: 6,
    title: "SnapReel Contest",
    description: "Athletics, cricket, football, and basketball tournaments",
    date: "Jan 10, 2026",
  },
  {
    id: 7,
    title: "Gamer Strike",
    description: "Hands-on workshop on AI and Machine Learning fundamentals",
    date: "Jan 10, 2026",
  },
  {
    id: 8,
    title: "Tech Debate",
    description: "Pitch innovative ideas to investors and win seed funding",
    date: "Jan 10, 2026",
  },
];

export default function AlternatingEvents() {
  const [events] = useState<Event[]>(sampleEvents);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto mt-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-roman font-italic">
            Interaction{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="text-white/70 text-xl">
            Discover upcoming events in our college
          </p>
        </div>

        {/* Alternating Cards Grid */}
        <div className="grid grid-cols-1 gap-8">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`w-full md:w-4/5 ${
                    isLeft ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <div
                    className={`
                    bg-gradient-to-br from-white/5 to-white/0 
                    backdrop-blur-sm border border-white/10 
                    p-8 rounded-3xl
                    ${
                      isLeft
                        ? "border-l-4 border-yellow-500"
                        : "border-r-4 border-pink-500"
                    }
                    hover:bg-white/10 transition-all duration-300
                  `}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Date */}
                      <div
                        className={`
                        px-6 py-3 rounded-xl 
                        bg-gradient-to-r ${
                          isLeft
                            ? "from-yellow-500/20 to-amber-500/20"
                            : "from-pink-500/20 to-purple-500/20"
                        } 
                        border ${
                          isLeft ? "border-yellow-500/30" : "border-pink-500/30"
                        }
                        ${isLeft ? "md:text-left" : "md:text-right md:order-2"}
                      `}
                      >
                        <div className="text-2xl font-bold text-white">
                          {event.date.split(" ")[0]}
                        </div>
                        <div className="text-white/70">
                          {event.date.split(" ")[1]}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {event.title}
                        </h3>
                        {/* <p className="text-white/70 text-lg">
                          {event.description}
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        {/* <div className="text-center mt-20">
          <button className="px-12 py-4 bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white text-xl font-bold rounded-full hover:scale-105 transition-transform">
            Explore All Events
          </button>
        </div> */}
      </div>
    </div>
  );
}
