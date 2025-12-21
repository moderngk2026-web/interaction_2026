"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import Image from "next/image";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  // { name: "Our Team", href: "/our-team" },
  // { name: "Schedule", href: "/schedule" },
  { name: "Contact", href: "/contact" },
];

// Top Header Component
function TopHeader() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-950 via-purple-950 to-indigo-950 text-white py-3 px-4 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: College Logo */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center shadow-lg">
            <Image
              src="/images/collegelogo.jpg"
              alt="PES Logo"
              width={48}
              height={48}
              className="object-contain w-24 h-24"
            />
          </div>
        </div>

        {/* Middle: College Information - Mobile responsive text */}
        <div className="flex-1 mx-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-sm font-bold text-white tracking-tight leading-tight">
              PROGRESSIVE EDUCATION SOCIETY&apos;S
            </h1>
            <h2 className="text-lg font-semibold text-yellow-300 mt-0.5 leading-tight">
              MODERN COLLEGE OF ARTS, SCIENCE & COMMERCE (AUTONOMOUS)
            </h2>
            <p className="text-xs text-gray-200 mt-0.5 leading-tight">
              Ganeshkhind, Pune - 411016
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-2 gap-y-0.5 mt-0.5">
              <p className="text-[10px] text-gray-300 leading-tight">
                Affiliated to Savitribai Phule Pune University, Pune
              </p>
              {/* <span className="hidden sm:inline text-gray-400">|</span>
              <p className="text-[10px] text-green-300 font-medium leading-tight">
                Re-accredited by NAAC with &apos;A+&apos; Grade
              </p> */}
            </div>
          </div>
        </div>

        {/* Right: Another Logo */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center shadow-lg">
            <Image
              src="/images/interactionlogo.jpg"
              alt="PES Logo"
              width={48}
              height={48}
              className="object-contain w-24 h-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Function to handle PDF download
  const handleDownloadRuleBook = () => {
    const pdfUrl = "/pdf/rule_book_interaction.pdf"; // Replace with your actual PDF path

    // Create a temporary anchor element for download
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "INTERACTION-2026-Rulebook.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        // Scrolling DOWN - hide navbar
        if (currentScrollY > 100) {
          // Only hide after 100px scroll
          setIsVisible(false);
        }
      } else {
        // Scrolling UP - show navbar
        setIsVisible(true);
      }

      // Update isScrolled for shadow effect
      setIsScrolled(currentScrollY > 10);

      // Update last scroll position
      setLastScrollY(currentScrollY);

      // Set a timeout to ensure navbar stays visible at top
      scrollTimeout.current = setTimeout(() => {
        if (currentScrollY <= 100) {
          setIsVisible(true);
        }
      }, 150);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [lastScrollY]);

  return (
    <>
      {/* Main Container with fixed positioning */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Top Header */}
        <TopHeader />

        {/* Main Navigation */}
        <nav
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg"
              : "bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-3"
              >
                <div className="relative">
                  <Link
                    href="/"
                    className="relative flex flex-col items-center justify-center"
                  >
                    <span className="text-2xl font-normal bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent font-['Impact'] tracking-wider">
                      Interaction
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        isScrolled ? "text-black" : "text-white"
                      } tracking-widest mt-0.5`}
                    >
                      2026
                    </span>
                  </Link>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative px-4 py-2 font-medium transition-all duration-300 group ${
                        isScrolled
                          ? "text-gray-800 hover:text-purple-600"
                          : "text-white hover:text-yellow-300"
                      }`}
                    >
                      <span className="relative z-10 text-sm">{item.name}</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-pink-500 group-hover:w-4/5 group-hover:left-1/10 transition-all duration-300"></span>
                    </Link>
                  </motion.div>
                ))}

                {/* Download Rule Book Button (Small) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <button
                    onClick={handleDownloadRuleBook}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all duration-300 ${
                      isScrolled
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:scale-105 hover:shadow-blue-500/30"
                        : "bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:shadow-lg hover:scale-105 hover:shadow-blue-400/30"
                    }`}
                    title="Download Rule Book"
                  >
                    <Download size={12} />
                    <span className="hidden sm:inline">Rulebook</span>
                  </button>
                </motion.div>

                {/* Register/Login Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  <Link
                    href="/register"
                    className="ml-1 px-5 py-2 bg-gradient-to-r from-yellow-500 to-pink-500 text-white font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:shadow-yellow-500/30 text-sm"
                  >
                    REGISTER
                  </Link>
                </motion.div>
              </div>

              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg ${
                  isScrolled
                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    : "bg-white/10 text-white hover:bg-white/20"
                } transition-colors duration-200`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
                <div className="px-4 pt-2 pb-4 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-sm font-medium text-white hover:text-yellow-300 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          {item.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Download Rule Book Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-2"
                  >
                    <button
                      onClick={() => {
                        handleDownloadRuleBook();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block mx-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-center rounded-xl hover:shadow-xl transition-all duration-300 text-sm flex items-center justify-center gap-2"
                    >
                      <Download size={16} />
                      Download Rule Book
                    </button>
                  </motion.div>

                  {/* Mobile Register Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pt-2"
                  >
                    <Link
                      href="/register"
                      className="block mx-2 px-4 py-3 bg-gradient-to-r from-yellow-500 to-pink-500 text-white font-bold text-center rounded-xl hover:shadow-xl transition-all duration-300 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      REGISTER NOW
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Spacer div to prevent content jump */}
      <div className="h-36" />
    </>
  );
}
