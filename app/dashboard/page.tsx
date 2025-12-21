// app/dashboard/page.tsx
"use client";

import {
  Users,
  CreditCard,
  Calendar,
  RefreshCw,
  TrendingUp,
  Award,
  Video,
  Music,
  Gamepad2,
  Code,
  Brain,
  Camera,
  MessageSquare,
  Zap,
  Globe,
  Lightbulb,
  Target,
} from "lucide-react";
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

interface Event {
  id: number;
  code: string;
  name: string;
  price: number;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  icon: any;
}

interface EventStats {
  id: number;
  name: string;
  registrationCount: number;
  icon: any;
}

interface DashboardStats {
  totalRegistrations: number;
  totalRevenue: number;
  totalEvents: number;
  eventWiseStats: EventStats[];
  allEvents: Event[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRegistrations: 0,
    totalRevenue: 0,
    totalEvents: 0,
    eventWiseStats: [],
    allEvents: [],
  });

  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Define all events with icons
  const allEvents: Event[] = [
    {
      id: 1,
      code: "01",
      name: "Code Warriors",
      price: 100,
      description: "Coding competitions",
      maxParticipants: 300,
      currentParticipants: 0,
      icon: Code,
    },
    {
      id: 2,
      code: "02",
      name: "Mind Marathon (Quiz)",
      price: 100,
      description: "Mind Marathon (Quiz)",
      maxParticipants: 500,
      currentParticipants: 0,
      icon: Brain,
    },
    {
      id: 3,
      code: "03",
      name: "SnapReel Contest",
      price: 100,
      description: "SnapReel Contest",
      maxParticipants: 200,
      currentParticipants: 0,
      icon: Camera,
    },
    {
      id: 4,
      code: "04",
      name: "Gamer Strike",
      price: 100,
      description: "Gamer Strike",
      maxParticipants: 50,
      currentParticipants: 0,
      icon: Gamepad2,
    },
    {
      id: 5,
      code: "05",
      name: "Tech Debate",
      price: 100,
      description: "Tech Debate",
      maxParticipants: 100,
      currentParticipants: 0,
      icon: MessageSquare,
    },
    {
      id: 6,
      code: "06",
      name: "Grab the opportunity",
      price: 100,
      description: "Grab the opportunity",
      maxParticipants: 150,
      currentParticipants: 0,
      icon: Target,
    },
    {
      id: 7,
      code: "07",
      name: "Web Craft Challenge",
      price: 100,
      description: "Web Craft Challenge",
      maxParticipants: 150,
      currentParticipants: 0,
      icon: Globe,
    },
    {
      id: 8,
      code: "08",
      name: "Spark the idea",
      price: 100,
      description: "Spark the idea",
      maxParticipants: 150,
      currentParticipants: 0,
      icon: Lightbulb,
    },
  ];

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch registrations
      const response = await fetch(
        "/api/registrations?limit=1000&sortBy=createdAt&sortOrder=desc"
      );
      const data = await response.json();

      if (data.success) {
        const registrations = data.data;

        // Calculate total stats
        const totalRegistrations = data.pagination?.total || 0;
        const totalRevenue = registrations.reduce(
          (sum: number, reg: Registration) => sum + reg.totalAmount,
          0
        );

        // Count registrations for each event
        const eventCountMap = new Map<
          number,
          { name: string; count: number }
        >();

        registrations.forEach((reg: Registration) => {
          if (reg.selectedEvents && Array.isArray(reg.selectedEvents)) {
            reg.selectedEvents.forEach((eventId: number) => {
              // Find event from our predefined list
              const event = allEvents.find((e) => e.id === eventId);
              const eventName = event?.name || `Event ${eventId}`;

              if (eventCountMap.has(eventId)) {
                const current = eventCountMap.get(eventId)!;
                eventCountMap.set(eventId, {
                  name: current.name,
                  count: current.count + 1,
                });
              } else {
                eventCountMap.set(eventId, { name: eventName, count: 1 });
              }
            });
          }
        });

        // Convert map to array and sort by count (descending)
        const eventWiseStats: EventStats[] = Array.from(eventCountMap.entries())
          .map(([id, { name, count }]) => {
            const event = allEvents.find((e) => e.id === id);
            return {
              id,
              name,
              registrationCount: count,
              icon: event?.icon || Award,
            };
          })
          .sort((a, b) => b.registrationCount - a.registrationCount);

        // Update allEvents with current participants count
        const updatedAllEvents = allEvents.map((event) => {
          const eventStats = eventWiseStats.find((e) => e.id === event.id);
          return {
            ...event,
            currentParticipants: eventStats?.registrationCount || 0,
          };
        });

        setStats({
          totalRegistrations,
          totalRevenue,
          totalEvents: eventWiseStats.length,
          eventWiseStats,
          allEvents: updatedAllEvents,
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
      title: "Active Events",
      value: stats.totalEvents.toString(),
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      description: "Number of events with registrations",
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

      {/* All Events Grid */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">All Events</h3>
            <p className="text-white/60">
              Track registration status for each event
            </p>
          </div>
          <div className="text-white/40 text-sm">
            Showing {stats.allEvents.length} events
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-40 bg-white/10 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.allEvents.map((event) => {
              const Icon = event.icon;
              const registrationCount = event.currentParticipants;
              const percentage =
                (registrationCount / event.maxParticipants) * 100;
              const isAlmostFull = percentage >= 80;
              const isFull = percentage >= 100;

              return (
                <div
                  key={event.id}
                  className={`bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl border ${
                    isFull
                      ? "border-red-500/30"
                      : isAlmostFull
                      ? "border-yellow-500/30"
                      : "border-white/10"
                  } p-5 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${
                        isFull ? "bg-red-500/10" : "bg-white/5"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isFull ? "text-red-400" : "text-white"
                        }`}
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-white/60">
                        #{event.code}
                      </span>
                      <div className="text-white/60 text-xs mt-1">
                        ₹{event.price}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-white font-bold text-lg mb-1">
                    {event.name}
                  </h4>
                  <p className="text-white/60 text-sm mb-4">
                    {event.description}
                  </p>

                  {/* Registration Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Registrations</span>
                      <span
                        className={`font-medium ${
                          isFull ? "text-red-400" : "text-white"
                        }`}
                      >
                        {registrationCount}/{event.maxParticipants}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isFull
                            ? "bg-gradient-to-r from-red-500 to-red-600"
                            : isAlmostFull
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                            : "bg-gradient-to-r from-blue-500 to-purple-500"
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">
                        {percentage.toFixed(1)}% filled
                      </span>
                      {isFull ? (
                        <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                          Full
                        </span>
                      ) : isAlmostFull ? (
                        <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                          Almost Full
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                          Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
          <h4 className="text-white/60 text-sm mb-2">Most Popular Event</h4>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-6 w-32 bg-white/10 rounded mb-2"></div>
              <div className="h-4 w-24 bg-white/5 rounded"></div>
            </div>
          ) : stats.eventWiseStats.length > 0 ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  {stats.eventWiseStats[0]?.icon &&
                    (() => {
                      const IconComponent = stats.eventWiseStats[0].icon;
                      return (
                        <IconComponent className="w-5 h-5 text-purple-400" />
                      );
                    })()}
                </div>
                <div>
                  <p className="text-xl font-bold text-white">
                    {stats.eventWiseStats[0]?.name || "N/A"}
                  </p>
                  <p className="text-white/60 text-sm">
                    {stats.eventWiseStats[0]?.registrationCount || 0}{" "}
                    registrations
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-white">No data available</p>
          )}
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6">
          <h4 className="text-white/60 text-sm mb-2">Avg per Event</h4>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-6 w-32 bg-white/10 rounded mb-2"></div>
              <div className="h-4 w-24 bg-white/5 rounded"></div>
            </div>
          ) : stats.totalEvents > 0 ? (
            <>
              <p className="text-xl font-bold text-white">
                {Math.round(stats.totalRegistrations / stats.totalEvents)}
              </p>
              <p className="text-white/60 text-sm mt-2">
                Average registrations per active event
              </p>
            </>
          ) : (
            <p className="text-white">No data available</p>
          )}
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl border border-green-500/20 p-6">
          <h4 className="text-white/60 text-sm mb-2">Latest Update</h4>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-6 w-32 bg-white/10 rounded mb-2"></div>
              <div className="h-4 w-24 bg-white/5 rounded"></div>
            </div>
          ) : (
            <>
              <p className="text-xl font-bold text-white">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-white/60 text-sm mt-2">
                {stats.totalRegistrations} total registrations
              </p>
            </>
          )}
        </div>
      </div> */}
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
