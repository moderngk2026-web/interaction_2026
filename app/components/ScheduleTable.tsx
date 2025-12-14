"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Trophy, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function ScheduleTable() {
  const [activeDay, setActiveDay] = useState("day1");

  const scheduleData = {
    day1: [
      {
        time: "9:00 AM - 10:00 AM",
        event: "Inauguration Ceremony",
        venue: "Main Auditorium",
        description: "Chief Guest: Dr. Rajesh Sharma",
        icon: "🎤",
        type: "ceremony",
      },
      {
        time: "10:30 AM - 12:30 PM",
        event: "Game 1",
        venue: "Computer Lab A",
        description: "Game 1",
        icon: "🎮",
        type: "Game",
        prize: "₹10,000",
      },
      {
        time: "2:00 PM - 4:00 PM",
        event: "Game 2",
        venue: "Gaming Arena",
        description: "Game 2",
        icon: "⚽",
        type: "Game",
        prize: "₹8,000",
      },
      {
        time: "4:30 PM - 6:30 PM",
        event: "Game 3",
        venue: "Conference Hall",
        description: "Game 3",
        icon: "♟️",
        type: "boardgame",
        prize: "₹5,000",
      },
    ],
    day2: [
      {
        time: "9:30 AM - 11:30 AM",
        event: "Game 4",
        venue: "Game Arena",
        description: "Game 4",
        icon: "📱",
        type: "mobile",
        prize: "₹15,000",
      },
      {
        time: "12:00 PM - 2:00 PM",
        event: "Game 5",
        venue: "Sports Complex",
        description: "Game 5",
        icon: "🏓",
        type: "sports",
        prize: "₹6,000",
      },
      {
        time: "2:30 PM - 4:30 PM",
        event: "Game 7",
        venue: "Computer Lab B",
        description: "Game 7",
        icon: "🎯",
        type: "Game",
        prize: "₹12,000",
      },
      {
        time: "6:00 PM - 7:00 PM",
        event: "Prize Distribution & Closing",
        venue: "Main Auditorium",
        description: "All Winners & Special Awards",
        icon: "🏆",
        type: "ceremony",
      },
    ],
    // day3: [
    //   {
    //     time: "10:00 AM - 12:00 PM",
    //     event: "Valorant Tournament - Finals",
    //     venue: "Main Stage",
    //     description: "Grand Final Match",
    //     icon: "🎮",
    //     type: "Game",
    //     prize: "₹25,000",
    //   },
    //   {
    //     time: "1:00 PM - 3:00 PM",
    //     event: "FIFA 23 - Grand Final",
    //     venue: "Gaming Arena",
    //     description: "Championship Match",
    //     icon: "⚽",
    //     type: "Game",
    //     prize: "₹15,000",
    //   },
    //   {
    //     time: "3:30 PM - 5:30 PM",
    //     event: "Treasure Hunt",
    //     venue: "Campus Grounds",
    //     description: "Team Challenge",
    //     icon: "🗺️",
    //     type: "outdoor",
    //     prize: "₹7,000",
    //   },
    //   {
    //     time: "6:00 PM - 7:00 PM",
    //     event: "Prize Distribution & Closing",
    //     venue: "Main Auditorium",
    //     description: "All Winners & Special Awards",
    //     icon: "🏆",
    //     type: "ceremony",
    //   },
    // ],
  };

  const dayTabs = [
    { id: "day1", label: "Day 1", date: "Jan 09", events: 4 },
    { id: "day2", label: "Day 2", date: "Jan 10", events: 4 },
    // { id: "day3", label: "Day 3", date: "Oct 27", events: 4 },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Game":
        return "bg-blue-100 text-blue-700";
      case "sports":
        return "bg-green-100 text-green-700";
      case "boardgame":
        return "bg-purple-100 text-purple-700";
      case "mobile":
        return "bg-pink-100 text-pink-700";
      case "outdoor":
        return "bg-orange-100 text-orange-700";
      case "ceremony":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section
      id="schedule"
      className="py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Event Schedule
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-3 font-roman font-italic">
            Games & Sports <span className="text-blue-600">Schedule</span>
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            Complete timetable of all gaming competitions and sports events
            across 2 days
          </p>
        </div>

        {/* Day Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {dayTabs.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`flex flex-col items-center px-6 py-3 rounded-xl border transition-all ${
                activeDay === day.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600 shadow-lg"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <span className="font-semibold">{day.label}</span>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-3 h-3" />
                <span>{day.date}</span>
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {day.events} events
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Schedule Table */}
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-100 rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-gradient-to-r from-blue-400 to-purple-600 border-b border-blue-200 p-4">
            <div className="col-span-1 font-semibold text-white text-sm">#</div>
            <div className="col-span-2 font-semibold text-white text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time
              </div>
            </div>
            <div className="col-span-4 font-semibold text-white text-sm">
              Event
            </div>
            <div className="col-span-2 font-semibold text-white text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Venue
              </div>
            </div>
            {/* <div className="col-span-2 font-semibold text-white text-sm">
              Prize
            </div> */}
            <div className="col-span-1 font-semibold text-white text-sm">
              Type
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {scheduleData[activeDay as keyof typeof scheduleData].map(
              (item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="grid grid-cols-12 p-4 hover:bg-blue-50/50 transition-colors"
                >
                  {/* Serial Number */}
                  <div className="col-span-1 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border border-blue-200">
                      <span className="font-bold text-blue-700">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="col-span-2 flex items-center">
                    <div className="font-medium text-gray-800 text-sm">
                      {item.time}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="col-span-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {item.event}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="col-span-2 flex items-center">
                    <div className="text-sm font-medium text-gray-700 bg-gray-100 rounded-lg px-3 py-1.5">
                      {item.venue}
                    </div>
                  </div>

                  {/* Prize */}
                  {/* <div className="col-span-2 flex items-center">
                    {item.prize ? (
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-gray-800">
                          {item.prize}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </div> */}

                  {/* Type */}
                  <div className="col-span-1 flex items-center">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getTypeColor(
                        item.type
                      )}`}
                    >
                      {item.type.toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Legend */}
        {/* <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Event Types Legend
          </h4>
          <div className="flex flex-wrap gap-3">
            {[
              {
                type: "Game",
                label: "E-Sports",
                color: "bg-blue-100 text-blue-700",
              },
              {
                type: "sports",
                label: "Sports",
                color: "bg-green-100 text-green-700",
              },
              {
                type: "boardgame",
                label: "Board Games",
                color: "bg-purple-100 text-purple-700",
              },
              {
                type: "mobile",
                label: "Mobile Games",
                color: "bg-pink-100 text-pink-700",
              },
              {
                type: "outdoor",
                label: "Outdoor",
                color: "bg-orange-100 text-orange-700",
              },
              {
                type: "ceremony",
                label: "Ceremony",
                color: "bg-yellow-100 text-yellow-700",
              },
            ].map((item) => (
              <div key={item.type} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${item.color.split(" ")[0]}`}
                ></div>
                <span className="text-sm text-black">{item.label}</span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Summary Stats */}
        {/* <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: Trophy,
              label: "Total Prize Pool",
              value: "₹1,00,000+",
              color: "from-yellow-400 to-orange-400",
            },
            {
              icon: Clock,
              label: "Total Duration",
              value: "30+ Hours",
              color: "from-blue-400 to-purple-400",
            },
            {
              icon: Award,
              label: "Games & Sports",
              value: "12+ Events",
              color: "from-green-400 to-teal-400",
            },
            {
              icon: Users,
              label: "Expected Players",
              value: "500+",
              color: "from-pink-400 to-rose-400",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-3`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
