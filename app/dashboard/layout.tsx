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
  allowedRoles: ("SuperAdmin" | "Admin")[];
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Closed by default on mobile
  const [isMobile, setIsMobile] = useState(false);
  const [admin, setAdmin] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

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
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setSidebarOpen(false); // Always closed on mobile by default
      } else {
        setSidebarOpen(true); // Open by default on desktop
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
      // badge: 24,
      allowedRoles: ["SuperAdmin"],
    },
    // {
    //   icon: Calendar,
    //   label: "Events",
    //   href: "/dashboard/events",
    //   allowedRoles: ["SuperAdmin"],
    // },
    // {
    //   icon: CreditCard,
    //   label: "Payments",
    //   href: "/dashboard/payments",
    //   badge: 12,
    //   allowedRoles: ["SuperAdmin"],
    // },
    // {
    //   icon: BarChart,
    //   label: "Analytics",
    //   href: "/dashboard/analytics",
    //   allowedRoles: ["SuperAdmin"],
    // },
    // {
    //   icon: Settings,
    //   label: "Settings",
    //   href: "/dashboard/settings",
    //   allowedRoles: ["SuperAdmin"],
    // },
  ];

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
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile & Desktop */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen transition-all duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${!isMobile ? "translate-x-0" : ""}
          ${isMobile ? "w-72" : sidebarOpen ? "w-64" : "w-20"}
        `}
      >
        <div className="h-full bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col overflow-hidden">
          {/* Logo Section */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                {(sidebarOpen || !isMobile) && (
                  <div className="min-w-0">
                    <h1 className="text-lg font-bold text-white truncate">
                      Interaction Admin
                    </h1>
                    <p className="text-xs text-white/60">Control Panel</p>
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
                )}
              </div>

              {!isMobile && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white flex-shrink-0"
                  aria-label={
                    sidebarOpen ? "Collapse sidebar" : "Expand sidebar"
                  }
                >
                  {sidebarOpen ? (
                    <ChevronLeft size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </button>
              )}

              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white flex-shrink-0"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {filteredSidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg transition-all
                    ${
                      isActive
                        ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white border border-pink-500/30"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <div
                    className={`p-2 rounded-lg flex-shrink-0 ${
                      isActive ? "bg-pink-500/20" : "bg-white/5"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  {(sidebarOpen || isMobile) && (
                    <div className="flex items-center justify-between flex-1 min-w-0">
                      <span className="font-medium truncate">{item.label}</span>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="px-2 py-1 text-xs bg-pink-500 text-white rounded-full min-w-[24px] flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                        {admin.role === "superadmin" &&
                          item.allowedRoles.includes("Admin") &&
                          !item.allowedRoles.includes("SuperAdmin") && (
                            <Shield className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          )}
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="p-3 border-t border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
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
                  <p className="text-white font-medium truncate text-sm">
                    {admin.name}
                  </p>
                  <p className="text-white/60 text-xs truncate capitalize">
                    {admin.role === "superadmin" ? "Super Admin" : "Admin"}
                  </p>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white flex-shrink-0"
                title="Logout"
                aria-label="Logout"
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
          min-h-screen transition-all duration-300
          ${!isMobile && sidebarOpen ? "md:ml-64" : ""}
          ${!isMobile && !sidebarOpen ? "md:ml-20" : ""}
          ${isMobile ? "ml-0" : ""}
        `}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Left Section */}
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white md:hidden"
                  aria-label="Open menu"
                >
                  <Menu size={24} />
                </button>

                {/* Mobile Search */}
                {isMobile && !searchOpen && (
                  <div className="flex items-center gap-2 flex-1">
                    <h1 className="text-lg font-bold text-white truncate">
                      {filteredSidebarItems.find(
                        (item) => item.href === pathname
                      )?.label || "Dashboard"}
                    </h1>
                    <button
                      onClick={() => setSearchOpen(true)}
                      className="ml-auto p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                      aria-label="Search"
                    >
                      <Search size={20} />
                    </button>
                  </div>
                )}

                {/* Desktop Search */}
                {!isMobile && (
                  <div className="relative flex-1 max-w-md">
                    <Search
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-12 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500 text-sm"
                    />
                  </div>
                )}

                {/* Mobile Search Expanded */}
                {isMobile && searchOpen && (
                  <div className="flex items-center gap-2 flex-1">
                    <div className="relative flex-1">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-10 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500 text-sm"
                        autoFocus
                      />
                      <button
                        onClick={() => setSearchOpen(false)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white"
                        aria-label="Close search"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-3">
                {/* Notifications - Only for superadmin */}
                {admin.role === "superadmin" && (
                  <button
                    className="relative p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                    aria-label="Notifications"
                  >
                    <Bell size={22} />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </button>
                )}

                {/* Desktop Admin Info */}
                {!isMobile && (
                  <>
                    <div className="text-right hidden lg:block">
                      <p className="text-white font-medium text-sm">
                        {admin.name}
                      </p>
                      <p className="text-white/60 text-xs capitalize">
                        {admin.role === "superadmin" ? "Super Admin" : "Admin"}
                      </p>
                    </div>
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-pink-500/20 rounded-full flex items-center justify-center border-2 border-pink-500/30">
                        <User size={20} className="text-white" />
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${
                          admin.role === "superadmin"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
                      ></div>
                    </div>
                  </>
                )}

                {/* Mobile Admin Info (Collapsed) */}
                {isMobile && !searchOpen && (
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-pink-500/20 rounded-full flex items-center justify-center border-2 border-pink-500/30">
                      <User size={20} className="text-white" />
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${
                        admin.role === "superadmin"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 md:p-6">
          {/* Mobile role warning */}
          {isMobile &&
            admin.role === "admin" &&
            pathname !== "/dashboard/registrations" &&
            pathname !== "/dashboard" && (
              <div className="mb-4 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/30 rounded-xl p-3">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium text-sm">
                      Restricted Access
                    </h3>
                    <p className="text-white/60 text-xs">
                      You only have access to Dashboard and Registrations pages.
                    </p>
                  </div>
                </div>
              </div>
            )}

          {/* Desktop role warning */}
          {!isMobile &&
            admin.role === "admin" &&
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

          {/* Content with responsive padding */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 md:p-6">
            {children}
          </div>

          {/* Mobile Bottom Spacing */}
          <div className="h-16 md:h-0"></div>
        </main>

        {/* Mobile Bottom Navigation (Optional) */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/5 backdrop-blur-xl border-t border-white/10 p-3">
            <div className="flex items-center justify-around">
              <Link
                href="/dashboard"
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  pathname === "/dashboard" ? "text-pink-400" : "text-white/60"
                }`}
              >
                <Home size={24} />
                <span className="text-xs mt-1">Home</span>
              </Link>
              <Link
                href="/dashboard/registrations"
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  pathname === "/dashboard/registrations"
                    ? "text-pink-400"
                    : "text-white/60"
                }`}
              >
                <Users size={24} />
                <span className="text-xs mt-1">Reg</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex flex-col items-center p-2 rounded-lg transition-colors text-white/60"
              >
                <Menu size={24} />
                <span className="text-xs mt-1">Menu</span>
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="flex flex-col items-center p-2 rounded-lg transition-colors text-white/60"
              >
                <Search size={24} />
                <span className="text-xs mt-1">Search</span>
              </button>
              <div className="relative">
                <div className="flex flex-col items-center p-2 rounded-lg transition-colors text-white/60">
                  <User size={24} />
                  <span className="text-xs mt-1">Profile</span>
                </div>
                <div
                  className={`absolute top-0 right-2 w-2 h-2 rounded-full ${
                    admin.role === "superadmin"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
