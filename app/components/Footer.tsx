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
  Map as MapIcon,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  const mapUrl = "https://maps.app.goo.gl/vpo93UQnrBTwfSrTA";
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.46098553569!2d73.824437!3d18.520456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf8962db8f3b%3A0x6c5c4c7b3d5f5f5f!2sModern%20College%20of%20Arts%2C%20Science%20and%20Commerce%20(Autonomous)%2C%20Pune!5e0!3m2!1sen!2sin!4v1638361234567!5m2!1sen!2sin";

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4 lg:col-span-2">
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
              Annual intercollegiate event which is organised by the department
              of computer science modern college Ganesh khind to bring
              students together
            </p>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
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
            <ul className="space-y-4 mb-4">
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
                    Modern College, Ganeshkhind
                  </div>
                  <div className="text-gray-400 text-sm">Pune - 411016</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Contact</div>
                  {/* <div className="text-gray-400 text-sm">+91 9309034640</div> */}
                  <div className="text-gray-400 text-sm">+91 7038622958</div>
                </div>
              </li>
            </ul>

            {/* Map Link Button */}
            {/* <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <MapIcon className="w-4 h-4" />
              Open in Google Maps
            </a> */}
          </div>

          {/* Google Map */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
              <MapIcon className="w-5 h-5" />
              Location
            </h4>
            <div className="space-y-4">
              {/* Map Container */}
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-700">
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Modern College of Arts, Science and Commerce Location"
                  className="w-full h-48 md:h-52"
                />
              </div>

              {/* Address */}
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">Modern College</strong>
                  <br />
                  Ganeshkhind Road
                  <br />
                  Pune, Maharashtra 411016
                  <br />
                  India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-gray-500 text-sm text-center md:text-left">
            © 2026 Interaction. All rights reserved. | Organized by Department
            of Computer Science
          </div>

          {/* College Info */}
          <div className="text-gray-400 text-xs text-center md:text-right">
            <p>Modern College of Arts, Science & Commerce (Autonomous)</p>
            <p className="mt-1">
              Affiliated to Savitribai Phule Pune University
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
