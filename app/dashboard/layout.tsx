// app/dashboard/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Users,
  Calendar,
  CreditCard,
  BarChart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  User,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  icon: any;
  label: string;
  href: string;
  badge?: number;
  allowedRoles: ("SuperAdmin" | "Admin")[]; // Define which roles can access this item
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [admin, setAdmin] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      router.push("/login");
      return;
    }

    const parsedAdmin = JSON.parse(adminData);
    setAdmin(parsedAdmin);

    // Handle responsive sidebar
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    // Check role-based access
    checkAccess(parsedAdmin.role, pathname);

    setIsLoading(false);
    return () => window.removeEventListener("resize", handleResize);
  }, [router, pathname]);

  const checkAccess = (role: string, currentPath: string) => {
    // Define accessible routes for each role
    const adminRoutes = ["/dashboard", "/dashboard/registrations"];

    const superAdminRoutes = [
      "/dashboard",
      "/dashboard/registrations",
      "/dashboard/analytics",
      "/dashboard/events",
      "/dashboard/payments",
      "/dashboard/settings",
    ];

    const accessibleRoutes =
      role === "superadmin" ? superAdminRoutes : adminRoutes;

    // If current path is not in accessible routes, redirect to dashboard
    if (!accessibleRoutes.includes(currentPath)) {
      router.push("/dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/login");
  };

  const sidebarItems: SidebarItem[] = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/dashboard",
      allowedRoles: ["SuperAdmin", "Admin"],
    },
    {
      icon: Users,
      label: "Registrations",
      href: "/dashboard/registrations",
      badge: 24,
      allowedRoles: ["SuperAdmin", "Admin"],
    },
    {
      icon: Calendar,
      label: "Events",
      href: "/dashboard/events",
      allowedRoles: ["SuperAdmin"],
    },
    {
      icon: CreditCard,
      label: "Payments",
      href: "/dashboard/payments",
      badge: 12,
      allowedRoles: ["SuperAdmin"],
    },
    {
      icon: BarChart,
      label: "Analytics",
      href: "/dashboard/analytics",
      allowedRoles: ["SuperAdmin"],
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/settings",
      allowedRoles: ["SuperAdmin"],
    },
  ];

  // Filter sidebar items based on admin role
  const filteredSidebarItems = sidebarItems.filter((item) =>
    admin ? item.allowedRoles.includes(admin.role) : false
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!admin) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen transition-all duration-300
          ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"}
          ${!isMobile ? "translate-x-0" : ""}
          ${!isMobile && !sidebarOpen ? "w-20" : ""}
        `}
      >
        <div className="h-full bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col">
          {/* Logo Section */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              {sidebarOpen || !isMobile ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">EventHub</h1>
                    <p className="text-xs text-white/60">Admin Panel</p>
                    {/* Role Badge */}
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          admin.role === "superadmin"
                            ? "bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                            : "bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {admin.role === "superadmin" && (
                          <Shield className="w-3 h-3 mr-1" />
                        )}
                        {admin.role === "superadmin" ? "Super Admin" : "Admin"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              )}

              {!isMobile && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                >
                  {sidebarOpen ? (
                    <ChevronLeft size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {filteredSidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl transition-all
                    ${
                      isActive
                        ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white border border-pink-500/30"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isActive ? "bg-pink-500/20" : "bg-white/5"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  {(sidebarOpen || isMobile) && (
                    <>
                      <span className="font-medium flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs bg-pink-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {/* Show lock icon for admin-only items in superadmin view */}
                      {admin.role === "superadmin" &&
                        item.allowedRoles.includes("Admin") &&
                        !item.allowedRoles.includes("SuperAdmin") && (
                          <span className="text-blue-400">
                            <Shield className="w-4 h-4" />
                          </span>
                        )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                {/* Role indicator dot */}
                <div
                  className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${
                    admin.role === "superadmin"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                ></div>
              </div>
              {(sidebarOpen || isMobile) && (
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {admin.name}
                  </p>
                  <p className="text-white/60 text-xs truncate capitalize">
                    {admin.role === "superadmin" ? "Super Admin" : "Admin"}
                  </p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`
          transition-all duration-300 min-h-screen
          ${!isMobile && sidebarOpen ? "ml-64" : ""}
          ${!isMobile && !sidebarOpen ? "ml-20" : ""}
        `}
      >
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/5 backdrop-blur-xl border-b border-white/10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center gap-4">
                {isMobile && (
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                  >
                    <Menu size={24} />
                  </button>
                )}
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-12 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 w-64 focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-4">
                {/* Notifications - Only for superadmin */}
                {admin.role === "superadmin" && (
                  <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white">
                    <Bell size={22} />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </button>
                )}

                {/* Admin Info */}
                <div className="flex items-center gap-3">
                  <div className="text-right hidden md:block">
                    <p className="text-white font-medium">{admin.name}</p>
                    <p className="text-white/60 text-sm capitalize">
                      {admin.role === "superadmin" ? "Super Admin" : "Admin"}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-pink-500/20 rounded-full flex items-center justify-center border-2 border-pink-500/30">
                      <User size={20} className="text-white" />
                    </div>
                    {/* Role indicator dot */}
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${
                        admin.role === "superadmin"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {/* Show role warning for admin users on restricted pages */}
          {admin.role === "admin" &&
            pathname !== "/dashboard/registrations" &&
            pathname !== "/dashboard" && (
              <div className="mb-6 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <div>
                    <h3 className="text-white font-medium">
                      Restricted Access
                    </h3>
                    <p className="text-white/60 text-sm">
                      You only have access to Dashboard and Registrations pages.
                    </p>
                  </div>
                </div>
              </div>
            )}
          {children}
        </main>
      </div>
    </div>
  );
}
