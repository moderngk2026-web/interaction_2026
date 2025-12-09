import { div } from "framer-motion/client";
import AboutSection from "./components/About";
import Hero from "./components/Hero";
import ScheduleTable from "./components/ScheduleTable";
import SponsorsMarquee from "./components/SponsorsMarquee";
import WebsiteLayout from "./website-layout";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ScheduleTable />
      <SponsorsMarquee />
    </div>
    // </WebsiteLayout>
  );
}
