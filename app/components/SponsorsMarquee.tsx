"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SponsorsMarqueeWithImages() {
  const sponsors = [
    {
      name: "Google",
      logo: "/sponsors/google.svg", // or .png
      bgColor: "bg-white",
    },
    {
      name: "Microsoft",
      logo: "/sponsors/microsoft.svg",
      bgColor: "bg-white",
    },
    {
      name: "Amazon",
      logo: "/sponsors/amazon.svg",
      bgColor: "bg-white",
    },
    {
      name: "Apple",
      logo: "/sponsors/apple.svg",
      bgColor: "bg-white",
    },
    {
      name: "Meta",
      logo: "/sponsors/meta.svg",
      bgColor: "bg-white",
    },
    {
      name: "Tesla",
      logo: "/sponsors/tesla.svg",
      bgColor: "bg-white",
    },
    {
      name: "IBM",
      logo: "/sponsors/ibm.svg",
      bgColor: "bg-white",
    },
    {
      name: "Intel",
      logo: "/sponsors/intel.svg",
      bgColor: "bg-white",
    },
  ];

  return (
    <section
      id="sponsors"
      className="py-12 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-5xl font-bold text-gray-800 mb-2 font-roman font-italic">
            Our <span className="text-blue-600">Sponsors</span>
          </h3>
          <p className="text-gray-600 text-sm">Trusted by industry leaders</p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>

          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
            className="flex gap-10 py-4"
          >
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center gap-3 group"
              >
                {/* Big Image/Logo Container */}
                <div
                  className={`w-24 h-24 rounded-xl ${sponsor.bgColor} border-2 border-gray-200 flex items-center justify-center shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-300 p-4`}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 96px) 100vw, 96px"
                      priority={index < 4}
                    />

                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-700">
                        {sponsor.name.charAt(0)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">LOGO</div>
                    </div>
                  </div>
                </div>

                {/* <div className="text-center">
                  <div className="font-semibold text-gray-800 text-sm">
                    {sponsor.name}
                  </div>
                  <div className="text-gray-500 text-xs">Partner</div>
                </div> */}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
