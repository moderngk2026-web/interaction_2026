import { div } from "framer-motion/client";
import AboutSection from "./components/About";
import Hero from "./components/Hero";
import ScheduleTable from "./components/ScheduleTable";
import SponsorsMarquee from "./components/SponsorsMarquee";
import WebsiteLayout from "./website-layout";
import SidebarNav from "./components/SidebarNav";

export default function Home() {
  return (
    <div>
      <SidebarNav />
      <Hero />
      <AboutSection />
      {/* <ScheduleTable /> */}
      <SponsorsMarquee />
    </div>
    // </WebsiteLayout>
  );
}
