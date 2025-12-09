"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ChevronDown,
  Sparkles,
  Mic,
  Code,
  Trophy,
} from "lucide-react";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown to event (Example: Oct 25, 2024)
  useEffect(() => {
    const eventDate = new Date("2024-10-25T09:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 pt-10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Event Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/10 mb-8"
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-semibold text-white/90">
              INTERACTION 2026 IS HERE
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-8xl lg:text-9xl font-semibold mb-6 font-italic font-roman"
          >
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              INTERACTION
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-2xl md:text-4xl font-bold text-white mb-8"
          >
            Where <span className="text-yellow-400">Ideas</span> Collide &{" "}
            <span className="text-pink-400">Innovation</span> Thrives
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-white/80 max-w-3xl mx-auto mb-12"
          >
            Join the vibe, join the fun — your presence adds the spark! Let’s
            turn this event into a memory you’ll never forget!
          </motion.p>

          {/* Event Details */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {[
              {
                icon: Calendar,
                label: "Date",
                value: "Jan 09-10, 2026",
                color: "text-yellow-400",
              },
              //   {
              //     icon: MapPin,
              //     label: "Venue",
              //     value: "University Main Campus",
              //     color: "text-pink-400",
              //   },
              {
                icon: Users,
                label: "Participants",
                value: "500+",
                color: "text-purple-400",
              },
              //   {
              //     icon: Clock,
              //     label: "Duration",
              //     value: "3 Days",
              //     color: "text-blue-400",
              //   },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 min-w-[180px]"
              >
                <item.icon className={`w-8 h-8 mb-3 ${item.color}`} />
                <span className="text-white/60 text-sm mb-1">{item.label}</span>
                <span className="text-white font-semibold text-lg">
                  {item.value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Countdown Timer */}
          {/* <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-white/60 text-lg mb-4">Event Starts In</h3>
            <div className="flex justify-center gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                    <span className="text-3xl font-bold text-white">
                      {value.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-white/60 text-sm mt-2 uppercase">
                    {unit}
                  </span>
                </div>
              ))}
            </div>
          </motion.div> */}

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-18 py-3 bg-gradient-to-r from-yellow-500 to-pink-500 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300"
            >
              Register Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-18 py-3 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              View Schedule
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-white/50" />
      </motion.div>
    </section>
  );
}
