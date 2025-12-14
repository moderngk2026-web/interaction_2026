"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Section {
  id: string;
  name: string;
  icon: string;
}

export default function SidebarNav() {
  const [activeSection, setActiveSection] = useState("hero");

  const sections: Section[] = [
    { id: "hero", name: "Home", icon: "H" },
    { id: "about", name: "About", icon: "A" },
    { id: "schedule", name: "Schedule", icon: "S" },
    { id: "sponsors", name: "Sponsors", icon: "P" },
  ];

  // Handle active section detection
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-100px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col gap-2 p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
        {sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="relative flex items-center gap-3 group"
            >
              {/* Active indicator line */}
              <div
                className={`w-1 h-8 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600"
                    : "bg-gray-300 group-hover:bg-gray-400"
                }`}
              />

              {/* Icon circle */}
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-800"
                  }`}
                >
                  <span className="font-semibold text-sm">{section.icon}</span>
                </div>

                {/* Tooltip */}
                <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {section.name}
                  <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-y-2 border-r-2 border-transparent border-r-gray-900"></div>
                </div>
              </div>

              {/* Section name (visible on active) */}
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm font-medium text-gray-800 whitespace-nowrap pr-2"
                >
                  {section.name}
                </motion.span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
