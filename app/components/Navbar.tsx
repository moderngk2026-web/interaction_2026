"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Our Team", href: "/our-team" },
  { name: "Schedule", href: "/schedule" },
  // { name: "Sponsors", href: "/sponsors" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Simple scroll effect for shadow
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 10);
    });
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Event-themed font */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              {/* Decorative element */}
              {/* <div className="absolute  rounded-full blur opacity-30"></div> */}
              <Link
                href="/"
                className="relative flex flex-col items-center justify-center"
              >
                <span className="text-3xl font-normal bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent font-['Impact'] tracking-wider">
                  Interaction
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isScrolled ? "text-black" : "text-white"
                  } tracking-widest mt-1`}
                >
                  2026
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-6 py-3 font-medium transition-all duration-300 group ${
                    isScrolled
                      ? "text-gray-800 hover:text-purple-600"
                      : "text-white hover:text-yellow-300"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-pink-500 group-hover:w-4/5 group-hover:left-1/10 transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}

            {/* Register/Login Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <Link
                href="/register"
                className="ml-4 px-8 py-3 bg-gradient-to-r from-yellow-500 to-pink-500 text-white font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:shadow-yellow-500/30"
              >
                REGISTER
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-3 rounded-lg ${
              isScrolled
                ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                : "bg-white/10 text-white hover:bg-white/20"
            } transition-colors duration-200`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-blue-900 to-purple-900 shadow-2xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block px-6 py-4 text-lg font-medium text-white hover:text-yellow-300 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Register Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <Link
                  href="/register"
                  className="block mx-4 px-6 py-4 bg-gradient-to-r from-yellow-500 to-pink-500 text-white font-bold text-center rounded-xl hover:shadow-xl transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  REGISTER NOW
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Event Badge */}
      {!isScrolled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 hidden lg:block"
        >
          <div className="bg-gradient-to-r from-yellow-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-b-lg shadow-lg">
            EVENT DATE • Jan 09-10
          </div>
        </motion.div>
      )}
    </nav>
  );
}
