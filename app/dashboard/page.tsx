// app/dashboard/page.tsx
"use client";

import { Users, CreditCard, Calendar, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface Registration {
  id: number;
  name: string;
  email: string;
  mobile: string;
  collegeId: string | null;
  selectedEvents: number[];
  eventCodes: string;
  eventNames: string;
  eventDetails: any;
  totalAmount: number;
  registrationToken: string;
  paymentVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DashboardStats {
  totalRegistrations: number;
  totalRevenue: number;
  totalEvents: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRegistrations: 0,
    totalRevenue: 0,
    totalEvents: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch registrations
      const response = await fetch(
        "/api/registrations?limit=100&sortBy=createdAt&sortOrder=desc"
      );
      const data = await response.json();

      if (data.success) {
        const registrations = data.data;

        // Calculate stats
        const totalRegistrations = data.pagination?.total || 0;
        const totalRevenue = registrations.reduce(
          (sum: number, reg: Registration) => sum + reg.totalAmount,
          0
        );

        // Count unique events
        const allEvents = registrations.flatMap(
          (reg: Registration) => reg.selectedEvents || []
        );
        const uniqueEvents = [...new Set(allEvents)].length;

        setStats({
          totalRegistrations,
          totalRevenue,
          totalEvents: uniqueEvents,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [refreshKey]);

  const dashboardStats = [
    {
      title: "Total Registrations",
      value: stats.totalRegistrations.toLocaleString(),
      icon: Users,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/10",
      description: "Total number of registrations",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: CreditCard,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      description: "Total revenue generated",
    },
    {
      title: "Total Events",
      value: stats.totalEvents.toString(),
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      description: "Number of unique events",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-white/60">
            Monitor your event registration statistics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRefreshKey((prev) => prev + 1)}
            disabled={loading}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid - Only 3 boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon
                    className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  />
                </div>
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-6 w-16 bg-white/10 rounded"></div>
                  </div>
                ) : null}
              </div>
              <h3 className="text-white/60 text-sm mb-2">{stat.title}</h3>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-10 w-32 bg-white/10 rounded mb-2"></div>
                  <div className="h-4 w-24 bg-white/5 rounded"></div>
                </div>
              ) : (
                <>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-white/40 text-sm mt-2">
                    {stat.description}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional Information */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => (window.location.href = "/dashboard/registrations")}
            className="p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl hover:border-pink-500/40 transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-colors">
                <Users className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <p className="text-white font-medium">View Registrations</p>
                <p className="text-white/60 text-sm">
                  See all participant details
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => (window.location.href = "/dashboard/events")}
            className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl hover:border-blue-500/40 transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">Manage Events</p>
                <p className="text-white/60 text-sm">Edit event details</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => (window.location.href = "/dashboard/payments")}
            className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl hover:border-green-500/40 transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                <CreditCard className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white font-medium">Payment Verification</p>
                <p className="text-white/60 text-sm">Verify payment status</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center">
        <p className="text-white/40 text-sm">
          Last updated:{" "}
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
