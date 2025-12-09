// app/website-layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // const isDashboard = pathname.startsWith("/dashboard");
  // const isLogin = pathname === "/login";

  // // Don't show Navbar/Footer on dashboard or login pages
  // if (isDashboard) {
  //   return <>{children}</>;
  // }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
