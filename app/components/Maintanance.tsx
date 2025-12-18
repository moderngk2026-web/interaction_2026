"use client";

import { AlertTriangle } from "lucide-react";

const Maintenance = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 px-4">
      <div className="max-w-xl w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/30">
            <AlertTriangle className="w-10 h-10 text-yellow-400" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Website Under Maintenance
        </h1>

        {/* Description */}
        <p className="text-white/70 text-base md:text-lg mb-6 leading-relaxed">
          We are currently performing scheduled maintenance to improve your
          experience. The website will be available again shortly.
        </p>

        {/* Divider */}
        <div className="h-px bg-white/10 my-6" />

        {/* Footer Info */}
        <p className="text-white/60 text-sm">Thank you for your patience.</p>

        {/* <p className="text-white/80 text-sm mt-2">
          For urgent queries, contact us at{" "}
          <a
            href="mailto:moderngk2026@gmail.com"
            className="text-yellow-400 hover:underline"
          >
            moderngk2026@gmail.com
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Maintenance;
