"use client";

import { useState } from "react";
import { Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react";

interface ScheduleItem {
  time: string;
  title: string;
  venue: string;
  description?: string;
}

const dailySchedule: ScheduleItem[] = [
  {
    time: "09:00 AM",
    title: "Registration",
    venue: "Main Lobby",
    description: "Welcome and check-in",
  },
  {
    time: "10:00 AM",
    title: "Opening Ceremony",
    venue: "Main Auditorium",
    description: "Welcome address by dean",
  },
  {
    time: "11:00 AM",
    title: "Coffee Break",
    venue: "Food Court",
    description: "Networking opportunity",
  },
  {
    time: "11:30 AM",
    title: "AI Keynote",
    venue: "Tech Hall",
    description: "Future of AI in education",
  },
  {
    time: "01:00 PM",
    title: "Lunch",
    venue: "Cafeteria",
    description: "Buffet lunch",
  },
  {
    time: "02:00 PM",
    title: "Web Dev Workshop",
    venue: "Lab 301",
    description: "Modern web technologies",
  },
  {
    time: "04:00 PM",
    title: "Startup Pitches",
    venue: "Business Hall",
    description: "Student startup presentations",
  },
  {
    time: "06:00 PM",
    title: "Day Wrap-up",
    venue: "Auditorium",
    description: "Summary and announcements",
  },
];

export default function SimpleSchedule() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-12 mt-20 font-roman font-italic">
          Event{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
            Schedule
          </span>
        </h1>

        <div className="space-y-4">
          {dailySchedule.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/15 transition-colors"
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              >
                <div className="flex items-center gap-4">
                  <div className="text-yellow-400 font-bold text-lg min-w-[100px]">
                    {item.time}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{item.venue}</span>
                    </div>
                  </div>
                </div>
                <button className="text-white/50">
                  {expandedIndex === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {expandedIndex === index && item.description && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/70">{item.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
