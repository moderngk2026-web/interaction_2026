"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Send,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Schedule", href: "/schedule" },
    // { name: "Speakers", href: "/speakers" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">I</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Interaction</h3>
                <p className="text-sm text-gray-400">2026</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              Annual tech symposium bringing together innovators, creators, and
              industry leaders to shape the future of technology.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Event Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Date</div>
                  <div className="text-gray-400 text-sm">
                    January 09-10, 2026
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Venue</div>
                  <div className="text-gray-400 text-sm">
                    Modern College, Ganeshkhind, Pune - 411007
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Contact</div>
                  <div className="text-gray-400 text-sm">+91 98765 43210</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates about events and announcements.
            </p>

            <form className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-500 text-xs">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div> */}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            © 2026 Interaction Tech Symposium. All rights reserved.
          </div>

          {/* Policy Links */}
          {/* <div className="flex flex-wrap gap-6">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/code-of-conduct"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Code of Conduct
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
