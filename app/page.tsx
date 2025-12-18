import { div } from "framer-motion/client";
import AboutSection from "./components/About";
import Hero from "./components/Hero";
import ScheduleTable from "./components/ScheduleTable";
import SponsorsMarquee from "./components/SponsorsMarquee";
import WebsiteLayout from "./website-layout";
import SidebarNav from "./components/SidebarNav";
import Maintenance from "./components/Maintanance";

export default function Home() {
  return (
    <div>
      <SidebarNav />
      <Hero />
      <AboutSection />
      <SponsorsMarquee />
      {/* <Maintenance /> */}
    </div>
    // </WebsiteLayout>
  );
}
