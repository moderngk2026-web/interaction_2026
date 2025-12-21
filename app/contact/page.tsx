"use client";

import { Mail, Phone, MapPin, User, GraduationCap } from "lucide-react";
import Image from "next/image";

const contactData = {
  email: "moderngk2026@gmail.com",
  phone: "+91 9309034640",
  location: "Modern College, Ganeshkhind, Pune - 411016",

  studentCoordinators: [
    {
      name: "Herambh Kadam",
      phone: "+91 9309034640",
      // email: "rahul.sharma@college.edu",
      image: "/images/heramb.jpg",
      department: "Computer Science",
      year: "Final Year",
    },
    {
      name: "Sarthak Meher",
      phone: "+91 7038622958",
      // email: "priya.patel@college.edu",
      image: "/images/meher.jpeg",
      department: "Computer Science",
      year: "Final Year",
    },
  ],

  teacherCoordinators: [
    {
      name: "Prof. Chaitali Makashir",
      // phone: "+91 98765 43212",
      // email: "rajesh.kumar@college.edu",
      image: "/images/12.png",
      department: "Computer Science",
      designation: "Event Coordinator",
    },
    {
      name: "Prof. Nikita Gaikwad",
      // phone: "+91 98765 43213",
      // email: "anjali.singh@college.edu",
      image: "/images/1.png",
      department: "Computer Science",
      designation: "Event Coordinator",
    },
    {
      name: "Prof. Pratik Pol",
      // phone: "+91 98765 43213",
      // email: "anjali.singh@college.edu",
      image: "/images/17.png",
      department: "Computer Science",
      designation: "Event Coordinator",
    },
  ],
};

export default function ContactWithImages() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 p-4 md:p-8">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-5xl md:text-5xl font-bold text-white text-center mb-6 mt-20 font-roman font-italic">
          Contact{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
            Us
          </span>
        </h1>

        <p className="text-white/70 text-center text-lg mb-12 max-w-2xl mx-auto">
          Get in touch with our coordinators for any queries about the event
        </p>

        {/* General Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-xl border border-yellow-500/30">
                <Mail className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-white/60 text-sm">Event Email</div>
                <a
                  href={`mailto:${contactData.email}`}
                  className="text-white text-lg font-bold hover:text-yellow-400 transition-colors"
                >
                  {contactData.email}
                </a>
              </div>
            </div>
            {/* <p className="text-white/70 text-sm">
              For general inquiries and registration
            </p> */}
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-xl border border-pink-500/30">
                <Phone className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <div className="text-white/60 text-sm">Phone Number</div>
                <a
                  href={`tel:${contactData.phone}`}
                  className="text-white text-lg font-bold hover:text-pink-400 transition-colors"
                >
                  {contactData.phone}
                </a>
              </div>
            </div>
            {/* <p className="text-white/70 text-sm">
              Available Monday to Friday, 9AM - 5PM
            </p> */}
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-xl border border-purple-500/30">
                <MapPin className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-white/60 text-sm">Event Venue</div>
                <div className="text-white text-lg font-bold">
                  {contactData.location}
                </div>
              </div>
            </div>
            {/* <p className="text-white/70 text-sm">
              Main campus, near administration building
            </p> */}
          </div>
        </div>

        {/* Coordinators */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Student Coordinators */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Student Support
                </h2>
                <p className="text-white/60 text-sm">
                  Final year students managing event operations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactData.studentCoordinators.map((coordinator, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative w-16 h-16  overflow-hidden border-2 border-blue-500/30">
                        <img
                          src={coordinator.image}
                          alt={coordinator.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          {coordinator.name}
                        </h3>
                        <div className="text-blue-400 text-sm font-medium">
                          Student Coordinator
                        </div>
                        <div className="text-white/60 text-xs mt-1">
                          {coordinator.department}
                        </div>
                        <div className="text-white/50 text-xs">
                          {coordinator.year}
                        </div>
                      </div>
                    </div>

                    {/* <div className="space-y-3 pt-4 border-t border-white/10">
                      <a
                        href={`mailto:${coordinator.email}`}
                        className="flex items-center gap-3 text-sm text-white/80 hover:text-blue-400 transition-colors group"
                      >
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="truncate">{coordinator.email}</span>
                      </a>
                      <a
                        href={`tel:${coordinator.phone}`}
                        className="flex items-center gap-3 text-sm text-white/80 hover:text-blue-400 transition-colors group"
                      >
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span>{coordinator.phone}</span>
                      </a>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Coordinators */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-xl border border-yellow-500/30">
                <GraduationCap className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Faculty Coordinators
                </h2>
                <p className="text-white/60 text-sm">
                  Faculty members overseeing event organization
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactData.teacherCoordinators.map((coordinator, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-500/30">
                        <img
                          src={coordinator.image}
                          alt={coordinator.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          {coordinator.name}
                        </h3>
                        <div className="text-yellow-400 text-sm font-medium">
                          {coordinator.designation}
                        </div>
                        <div className="text-white/60 text-xs mt-1">
                          {coordinator.department}
                        </div>
                        <div className="text-white/50 text-xs">
                          Faculty Coordinator
                        </div>
                      </div>
                    </div>

                    {/* <div className="space-y-3 pt-4 border-t border-white/10">
                      <a
                        href={`mailto:${coordinator.email}`}
                        className="flex items-center gap-3 text-sm text-white/80 hover:text-yellow-400 transition-colors group"
                      >
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="truncate">{coordinator.email}</span>
                      </a>
                      <a
                        href={`tel:${coordinator.phone}`}
                        className="flex items-center gap-3 text-sm text-white/80 hover:text-yellow-400 transition-colors group"
                      >
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span>{coordinator.phone}</span>
                      </a>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {/* <div className="bg-gradient-to-r from-yellow-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-white/10 p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-4">
            Need Immediate Assistance?
          </h3>
          <p className="text-white/70 mb-6">
            For urgent queries during event days, visit our help desk at the
            main entrance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${contactData.phone}`}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-bold rounded-full hover:scale-105 transition-transform"
            >
              Call Now
            </a>
            <a
              href={`mailto:${contactData.email}`}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/10 transition-colors"
            >
              Send Email
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
}
