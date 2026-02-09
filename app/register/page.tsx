"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  CreditCard,
  QrCode,
  AlertCircle,
  Upload,
  X,
  Loader2,
  Copy,
  UserCircle,
  Users,
  Plus,
  Minus,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import Dropzone from "react-dropzone";

interface Event {
  id: number;
  code: string;
  name: string;
  description: string;
  // Pricing information
  individualPrice: number;
  teamPrice: number;
  // Participation modes
  allowedModes: ("individual" | "team")[];
  maxTeamSize?: number;
  minTeamSize?: number;
  // Team-specific info
  maxTeams?: number;
  currentTeams?: number;
  // Individual-specific info
  maxIndividuals?: number;
  currentIndividuals?: number;
}

const events: Event[] = [
  {
    id: 1,
    code: "01",
    name: "InsightCraft",
    description: "Data Visualization Challenge",
    individualPrice: 100,
    teamPrice: 200,
    allowedModes: ["individual", "team"],
    minTeamSize: 2,
    maxTeamSize: 2,
    maxTeams: 50,
    currentTeams: 15,
    maxIndividuals: 100,
    currentIndividuals: 45,
  },
  {
    id: 2,
    code: "02",
    name: "AI Music",
    description: "Create & Remix",
    individualPrice: 100,
    teamPrice: 200,
    allowedModes: ["individual", "team"],
    minTeamSize: 2,
    maxTeamSize: 2,
    maxTeams: 40,
    currentTeams: 22,
    maxIndividuals: 80,
    currentIndividuals: 38,
  },
  {
    id: 3,
    code: "03",
    name: "PromptStorm",
    description: "Talk Smart with AI",
    individualPrice: 100,
    teamPrice: 0,
    allowedModes: ["individual"],
    maxIndividuals: 150,
    currentIndividuals: 89,
  },
  {
    id: 4,
    code: "04",
    name: "Echoes of Itihasa",
    description: "Public Speaking",
    individualPrice: 100,
    teamPrice: 0,
    allowedModes: ["individual"],
    maxIndividuals: 100,
    currentIndividuals: 67,
  },
  {
    id: 5,
    code: "05",
    name: "Yuktivaad",
    description: "Debate (For / Against)",
    individualPrice: 100,
    teamPrice: 200,
    allowedModes: ["individual", "team"],
    minTeamSize: 2,
    maxTeamSize: 2,
    maxTeams: 30,
    currentTeams: 18,
    maxIndividuals: 60,
    currentIndividuals: 42,
  },
  {
    id: 6,
    code: "06",
    name: "Yugantar",
    description: "Mythological Storytelling",
    individualPrice: 100,
    teamPrice: 0,
    allowedModes: ["individual"],
    maxIndividuals: 80,
    currentIndividuals: 55,
  },
  {
    id: 7,
    code: "07",
    name: "KavyaRas",
    description: "Poetry Recitation",
    individualPrice: 100,
    teamPrice: 0,
    allowedModes: ["individual"],
    maxIndividuals: 120,
    currentIndividuals: 78,
  },
  {
    id: 8,
    code: "08",
    name: "TechVision",
    description: "Offline Poster Making",
    individualPrice: 100,
    teamPrice: 0,
    allowedModes: ["individual"],
    maxIndividuals: 90,
    currentIndividuals: 65,
  },
  {
    id: 9,
    code: "09",
    name: "Rangrekha",
    description: "Mono Acting",
    individualPrice: 100,
    teamPrice: 0,
    allowedModes: ["individual"],
    maxIndividuals: 70,
    currentIndividuals: 48,
  },
  {
    id: 10,
    code: "10",
    name: "LokDharohar",
    description: "Street Play (Nukkad Natak)",
    individualPrice: 0,
    teamPrice: 200,
    allowedModes: ["team"],
    minTeamSize: 8,
    maxTeamSize: 15,
    maxTeams: 20,
    currentTeams: 12,
  },
  {
    id: 11,
    code: "11",
    name: "Khoj – Hidden Hustle",
    description: "TREASURE HUNT",
    individualPrice: 0,
    teamPrice: 200,
    allowedModes: ["team"],
    minTeamSize: 3,
    maxTeamSize: 4,
    maxTeams: 25,
    currentTeams: 16,
  },
  {
    id: 12,
    code: "12",
    name: "RANBHUMI.exe",
    description: "BGMI Showdown",
    individualPrice: 0,
    teamPrice: 200,
    allowedModes: ["team"],
    minTeamSize: 4,
    maxTeamSize: 4,
    maxTeams: 30,
    currentTeams: 22,
  },
  {
    id: 13,
    code: "13",
    name: "Case Race",
    description: "The Ultimate Case Challenge",
    individualPrice: 0,
    teamPrice: 200,
    allowedModes: ["team"],
    minTeamSize: 2,
    maxTeamSize: 4,
    maxTeams: 35,
    currentTeams: 25,
  },
  {
    id: 14,
    code: "14",
    name: "StockStorm",
    description: "Mock Stock Market Simulation",
    individualPrice: 100,
    teamPrice: 200,
    allowedModes: ["individual", "team"],
    minTeamSize: 2,
    maxTeamSize: 4,
    maxTeams: 40,
    currentTeams: 28,
    maxIndividuals: 80,
    currentIndividuals: 52,
  },
  {
    id: 15,
    code: "15",
    name: "Between Lectures",
    description: "Short Film Showcase",
    individualPrice: 100,
    teamPrice: 200,
    allowedModes: ["individual", "team"],
    minTeamSize: 2,
    maxTeamSize: 4,
    maxTeams: 25,
    currentTeams: 18,
    maxIndividuals: 50,
    currentIndividuals: 32,
  },
];

// Mock function to get next participant number
const getNextParticipantNumber = async (
  eventCount: number,
): Promise<number> => {
  const mockCounts: Record<number, number> = {
    1: 25,
    2: 18,
    3: 12,
    4: 8,
    5: 5,
    6: 3,
  };
  return (mockCounts[eventCount] || 0) + 1;
};

// Function to generate the registration token
const generateRegistrationToken = (
  collegeCode: string,
  year: string,
  eventCount: number,
  participantNumber: number,
): string => {
  const eventCountStr = eventCount.toString().padStart(2, "0");
  const participantNumberStr = participantNumber.toString().padStart(3, "0");
  return `${collegeCode}${year}${eventCountStr}${participantNumberStr}`;
};

interface RegistrationFormData {
  name: string;
  email: string;
  mobile: string;
  collegeId: string;
  graduationType: string;
  selectedEvents: {
    id: number;
    participationMode: "individual" | "team";
    teamMembers?: string[];
    teamSize?: number;
  }[];
  totalAmount: number;
  registrationToken: string;
  paymentReceipt: string;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    collegeId: "",
    graduationType: "",
  });

  const [selectedEvents, setSelectedEvents] = useState<
    {
      id: number;
      participationMode: "individual" | "team";
      teamMembers?: string[];
      teamSize?: number;
    }[]
  >([]);
  const [submitted, setSubmitted] = useState(false);
  const [registrationToken, setRegistrationToken] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamDetails, setTeamDetails] = useState<Record<number, string[]>>({});

  // Initialize team members for team events
  const initializeTeamMembers = (eventId: number, minSize: number) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    const baseTeamMembers = Array(minSize).fill("");
    if (event.id === 10) {
      // LokDharohar - start with 8 members
      baseTeamMembers.push(...Array(7).fill(""));
    }
    setTeamDetails((prev) => ({
      ...prev,
      [eventId]: [...baseTeamMembers],
    }));
  };

  // Update team member
  const updateTeamMember = (eventId: number, index: number, value: string) => {
    setTeamDetails((prev) => ({
      ...prev,
      [eventId]: prev[eventId].map((member, i) =>
        i === index ? value : member,
      ),
    }));
  };

  // Add team member
  const addTeamMember = (eventId: number) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    if (teamDetails[eventId].length < (event.maxTeamSize || 4)) {
      setTeamDetails((prev) => ({
        ...prev,
        [eventId]: [...prev[eventId], ""],
      }));
    }
  };

  // Remove team member
  const removeTeamMember = (eventId: number, index: number) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    if (teamDetails[eventId].length > (event.minTeamSize || 2)) {
      setTeamDetails((prev) => ({
        ...prev,
        [eventId]: prev[eventId].filter((_, i) => i !== index),
      }));
    }
  };

  // Toggle event selection
  const handleEventToggle = (eventId: number, mode: "individual" | "team") => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    setSelectedEvents((prev) => {
      // Remove if already selected
      const filtered = prev.filter((item) => item.id !== eventId);

      // Add with new mode
      const newSelection = {
        id: eventId,
        participationMode: mode,
        teamSize:
          mode === "team"
            ? teamDetails[eventId]?.length || event.minTeamSize || 2
            : undefined,
        teamMembers: mode === "team" ? teamDetails[eventId] : undefined,
      };

      return [...filtered, newSelection];
    });
  };

  // Calculate total amount
  useEffect(() => {
    let amount = 0;
    selectedEvents.forEach((selection) => {
      const event = events.find((e) => e.id === selection.id);
      if (event) {
        if (selection.participationMode === "individual") {
          amount += event.individualPrice;
        } else {
          amount += event.teamPrice;
        }
      }
    });
    setTotalAmount(amount);
  }, [selectedEvents]);

  // Generate token based on selected events
  const generateToken = useCallback(async () => {
    if (selectedEvents.length === 0) return;

    try {
      const collegeCode = "MCGK";
      const year = "2026";
      const eventCount = selectedEvents.length;

      // Get next participant number for this event count
      const participantNumber = await getNextParticipantNumber(eventCount);

      // Generate the token
      const token = generateRegistrationToken(
        collegeCode,
        year,
        eventCount,
        participantNumber,
      );
      setRegistrationToken(token);
    } catch (error) {
      console.error("Error generating token:", error);
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      setRegistrationToken(`REG-${timestamp}-${random}`);
    }
  }, [selectedEvents]);

  // Generate token when events change
  useEffect(() => {
    if (selectedEvents.length > 0) {
      generateToken();
    } else {
      setRegistrationToken("");
    }
  }, [selectedEvents, generateToken]);

  // Handle file drop for payment receipt
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }

      // Check file type
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      if (!validTypes.includes(file.type)) {
        setError("Only JPEG, PNG, JPG, and PDF files are allowed");
        return;
      }

      setPaymentReceipt(file);
      setError("");

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setReceiptPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setReceiptPreview(null);
      }
    }
  }, []);

  const removeReceipt = () => {
    setPaymentReceipt(null);
    setReceiptPreview(null);
  };

  // Upload to Cloudinary
  const uploadToCloudinary = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
      );

      // Add optimization parameters
      formData.append("quality", "auto");
      formData.append("fetch_format", "auto");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Cloudinary Upload Failed:", errorText);
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Upload error details:", error);
      throw error;
    }
  };

  // Submit registration to database
  const submitRegistration = async (receiptUrl: string) => {
    setLoading(true);
    try {
      // Prepare registration data
      const registrationData = {
        ...formData,
        selectedEvents: selectedEvents.map((selection) => ({
          id: selection.id,
          participationMode: selection.participationMode,
          teamMembers: selection.teamMembers,
          teamSize: selection.teamSize,
        })),
        totalAmount,
        registrationToken,
        paymentReceipt: receiptUrl,
      };

      console.log("Submitting:", registrationData);

      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error(
            "Email already registered. Please use a different email or check your previous registration.",
          );
        } else if (response.status === 400) {
          throw new Error(
            responseData.message || "Please check all required fields.",
          );
        } else {
          throw new Error(responseData.message || "Registration failed");
        }
      }

      setSubmitted(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Validation
    if (selectedEvents.length === 0) {
      setError("Please select at least one event");
      setIsSubmitting(false);
      return;
    }

    if (!formData.name || !formData.email || !formData.mobile) {
      setError("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    if (!paymentReceipt) {
      setError("Please upload payment receipt");
      setIsSubmitting(false);
      return;
    }

    if (!formData.graduationType) {
      setError("Please select graduation type (UG / PG)");
      setIsSubmitting(false);
      return;
    }

    // Validate team member names for team events
    for (const selection of selectedEvents) {
      if (selection.participationMode === "team" && selection.teamMembers) {
        const emptyNames = selection.teamMembers.filter(
          (name) => name.trim() === "",
        );
        if (emptyNames.length > 0) {
          setError(
            `Please fill all team member names for ${events.find((e) => e.id === selection.id)?.name}`,
          );
          setIsSubmitting(false);
          return;
        }
      }
    }

    setError("");

    try {
      setUploading(true);
      const receiptUrl = await uploadToCloudinary(paymentReceipt);
      await submitRegistration(receiptUrl);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Submission failed");
      setIsSubmitting(false);
    } finally {
      setUploading(false);
    }
  };

  const getSelectedEventNames = () => {
    return selectedEvents
      .map((selection) => {
        const event = events.find((e) => e.id === selection.id);
        const mode =
          selection.participationMode === "team" ? " (Team)" : " (Individual)";
        return event ? `${event.name}${mode}` : "";
      })
      .filter(Boolean)
      .join(", ");
  };

  const getSelectedEventCodes = () => {
    return selectedEvents
      .map((selection) => {
        const event = events.find((e) => e.id === selection.id);
        const mode = selection.participationMode === "team" ? "T" : "I";
        return event ? `${event.code}${mode}` : "";
      })
      .filter(Boolean)
      .join(", ");
  };

  const handleModeToggle = (eventId: number, mode: "individual" | "team") => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    // If switching to team mode, initialize team members
    if (mode === "team" && !teamDetails[eventId]) {
      initializeTeamMembers(eventId, event.minTeamSize || 2);
    }

    // Update the selection
    handleEventToggle(eventId, mode);
  };

  const removeEvent = (eventId: number) => {
    setSelectedEvents((prev) => prev.filter((item) => item.id !== eventId));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Generate UPI payment string
  const generateUPIString = () => {
    const config = {
      amount: totalAmount,
      upiId: "7498980121@ybl",
      name: "College Events",
    };

    return `upi://pay?pa=${config.upiId}&pn=${encodeURIComponent(
      config.name,
    )}&am=${config.amount}&cu=INR`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto mt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Event{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
              Registration
            </span>
          </h1>
          <p className="text-white/70 text-lg">
            Register for upcoming college events
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
          >
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Events List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-yellow-400" />
                Available Events
              </h2>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {events.map((event) => {
                  const isSelected = selectedEvents.some(
                    (se) => se.id === event.id,
                  );
                  const selectedMode = selectedEvents.find(
                    (se) => se.id === event.id,
                  )?.participationMode;

                  return (
                    <div
                      key={event.id}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-white font-medium">
                            {event.name}
                          </div>
                          <div className="text-xs px-2 py-1 bg-white/10 rounded">
                            Event {event.code}
                          </div>
                        </div>
                        <div className="text-yellow-400 font-bold">
                          ₹
                          {event.individualPrice > 0
                            ? `${event.individualPrice} (Ind)`
                            : ""}
                          {event.teamPrice > 0
                            ? ` / ₹${event.teamPrice} (Team)`
                            : ""}
                        </div>
                      </div>

                      <div className="text-white/60 text-sm mb-4">
                        {event.description}
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        {event.allowedModes.includes("individual") && (
                          <button
                            onClick={() =>
                              handleModeToggle(event.id, "individual")
                            }
                            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                              isSelected && selectedMode === "individual"
                                ? "bg-blue-500 text-white"
                                : "bg-white/10 text-white/70 hover:bg-white/20"
                            }`}
                          >
                            <UserCircle className="w-4 h-4" />
                            Individual
                            <span className="text-xs">
                              (₹{event.individualPrice})
                            </span>
                          </button>
                        )}

                        {event.allowedModes.includes("team") && (
                          <button
                            onClick={() => handleModeToggle(event.id, "team")}
                            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                              isSelected && selectedMode === "team"
                                ? "bg-purple-500 text-white"
                                : "bg-white/10 text-white/70 hover:bg-white/20"
                            }`}
                          >
                            <Users className="w-4 h-4" />
                            Team
                            <span className="text-xs">
                              (₹{event.teamPrice})
                            </span>
                          </button>
                        )}
                      </div>

                      {isSelected &&
                        selectedMode === "team" &&
                        teamDetails[event.id] && (
                          <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-white font-medium flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Team Members ({teamDetails[event.id].length})
                                {event.minTeamSize && event.maxTeamSize && (
                                  <span className="text-xs text-white/60">
                                    ({event.minTeamSize}-{event.maxTeamSize}{" "}
                                    members)
                                  </span>
                                )}
                              </h4>

                              {teamDetails[event.id].length <
                                (event.maxTeamSize || 4) && (
                                <button
                                  type="button"
                                  onClick={() => addTeamMember(event.id)}
                                  className="p-1 bg-green-500/20 hover:bg-green-500/30 rounded-lg"
                                >
                                  <Plus className="w-4 h-4 text-green-400" />
                                </button>
                              )}
                            </div>

                            <div className="space-y-2">
                              {teamDetails[event.id].map((member, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="text"
                                    value={member}
                                    onChange={(e) =>
                                      updateTeamMember(
                                        event.id,
                                        index,
                                        e.target.value,
                                      )
                                    }
                                    placeholder={`Team member ${index + 1} name`}
                                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-white placeholder-white/50"
                                    required={index < (event.minTeamSize || 2)}
                                  />
                                  {index >= (event.minTeamSize || 2) && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeTeamMember(event.id, index)
                                      }
                                      className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg"
                                    >
                                      <Minus className="w-4 h-4 text-red-400" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      <div className="flex justify-between items-center mt-4">
                        <div className="text-white/60 text-sm">
                          {event.allowedModes.includes("individual") && (
                            <span>
                              Individual: {event.currentIndividuals || 0}/
                              {event.maxIndividuals || "∞"}
                            </span>
                          )}
                          {event.allowedModes.includes("team") && (
                            <span className="ml-3">
                              Teams: {event.currentTeams || 0}/
                              {event.maxTeams || "∞"}
                            </span>
                          )}
                        </div>

                        {isSelected && (
                          <button
                            type="button"
                            onClick={() => removeEvent(event.id)}
                            className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Registration Form, QR Code, and Upload */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Personal Information */}
              <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-yellow-400" />
                  Personal Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
                      placeholder="9876543210"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      College Name
                    </label>
                    <input
                      type="text"
                      name="collegeId"
                      value={formData.collegeId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
                      placeholder="Enter your college name"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Graduation Type *
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="graduationType"
                          value="UG"
                          checked={formData.graduationType === "UG"}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-yellow-500 focus:ring-yellow-500"
                          required
                        />
                        <span className="text-white">UG</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="graduationType"
                          value="PG"
                          checked={formData.graduationType === "PG"}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-yellow-500 focus:ring-yellow-500"
                          required
                        />
                        <span className="text-white">PG</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Events Summary */}
              {selectedEvents.length > 0 && (
                <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Selected Events ({selectedEvents.length})
                  </h3>

                  <div className="space-y-3 mb-4">
                    {selectedEvents.map((selection) => {
                      const event = events.find((e) => e.id === selection.id);
                      if (!event) return null;

                      return (
                        <div
                          key={selection.id}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                        >
                          <div>
                            <div className="text-white font-medium">
                              {event.name}
                            </div>
                            <div className="text-white/60 text-sm">
                              {selection.participationMode === "team"
                                ? `Team (${selection.teamSize} members)`
                                : "Individual"}
                            </div>
                          </div>
                          <div className="text-yellow-400 font-bold">
                            ₹
                            {selection.participationMode === "team"
                              ? event.teamPrice
                              : event.individualPrice}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="text-white font-bold">Total Amount:</div>
                      <div className="text-2xl font-bold text-yellow-400">
                        ₹{totalAmount}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* QR Code Payment */}
              {selectedEvents.length > 0 && (
                <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-purple-400" />
                    Payment QR Code
                  </h3>

                  <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-xl border border-white/10 mb-4">
                    <div className="p-4 bg-white rounded-xl mb-4">
                      <QRCodeCanvas
                        value={generateUPIString()}
                        size={180}
                        level="H"
                        includeMargin={true}
                        fgColor="#1e293b"
                        bgColor="#ffffff"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-2">
                        ₹{totalAmount}
                      </div>
                      <div className="text-white/70 text-sm">
                        Scan to pay via UPI
                      </div>
                    </div>
                  </div>

                  <div className="text-white/60 text-sm">
                    <p className="mb-2">UPI ID: 7498980121@ybl</p>
                    <p>
                      After payment, please upload the transaction screenshot
                      below.
                    </p>
                  </div>
                </div>
              )}

              {/* Payment Receipt Upload - ADDED HERE */}
              {selectedEvents.length > 0 && (
                <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-green-400" />
                    Upload Payment Receipt
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    Upload screenshot of your payment confirmation
                  </p>

                  <Dropzone
                    onDrop={handleDrop}
                    accept={{
                      "image/*": [".jpeg", ".jpg", ".png"],
                      "application/pdf": [".pdf"],
                    }}
                    maxSize={5 * 1024 * 1024} // 5MB
                    disabled={uploading}
                  >
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                          isDragActive
                            ? "border-yellow-400 bg-yellow-500/10"
                            : "border-white/20 hover:border-yellow-400 hover:bg-white/5"
                        } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <input {...getInputProps()} />
                        {uploading ? (
                          <div className="flex flex-col items-center">
                            <Loader2 className="w-12 h-12 text-yellow-400 animate-spin mb-4" />
                            <p className="text-white">Uploading...</p>
                          </div>
                        ) : paymentReceipt ? (
                          <div className="relative">
                            {receiptPreview ? (
                              <div className="relative mx-auto w-48 h-48 rounded-lg overflow-hidden border border-white/20">
                                <img
                                  src={receiptPreview}
                                  alt="Receipt preview"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            ) : (
                              <div className="p-4 bg-white/5 rounded-lg">
                                <div className="text-white font-medium mb-2">
                                  {paymentReceipt.name}
                                </div>
                                <div className="text-white/60 text-sm">
                                  {(paymentReceipt.size / 1024).toFixed(2)} KB
                                </div>
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeReceipt();
                              }}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full"
                            >
                              <X className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <Upload className="w-12 h-12 text-white/50 mx-auto" />
                            <div>
                              <p className="text-white font-medium mb-2">
                                {isDragActive
                                  ? "Drop the file here"
                                  : "Drag & drop payment receipt"}
                              </p>
                              <p className="text-white/60 text-sm">
                                or click to select file
                              </p>
                            </div>
                            <p className="text-white/50 text-xs">
                              Supports: JPG, PNG, PDF (Max 5MB)
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              )}

              {/* Submit Button */}
              {selectedEvents.length > 0 && (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || uploading || !paymentReceipt}
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                    isSubmitting || uploading || !paymentReceipt
                      ? "bg-white/10 text-white/50 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white hover:scale-105"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                      Processing...
                    </>
                  ) : uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                      Uploading...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Success Modal */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl p-8 max-w-md w-full border border-white/10"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Registration Successful!
                </h3>
                <p className="text-white/70 mb-6">
                  Your registration has been submitted for verification. We will
                  verify your payment and send confirmation email within 24
                  hours.
                </p>

                <div className="bg-white/5 p-4 rounded-lg mb-6">
                  <div className="text-white/60 text-sm mb-2">
                    Registration Token
                  </div>
                  <div className="font-mono text-lg font-bold text-green-400">
                    {registrationToken}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    // Reset form
                    setFormData({
                      name: "",
                      email: "",
                      mobile: "",
                      collegeId: "",
                      graduationType: "",
                    });
                    setSelectedEvents([]);
                    setPaymentReceipt(null);
                    setReceiptPreview(null);
                    setTeamDetails({});
                  }}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-lg"
                >
                  Register Another
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-white/60 mb-2">
            Need help with registration? Contact our coordinators
          </p>
          <p className="text-white/80">
            Email:{" "}
            <a
              href="mailto:moderngk2026@gmail.com"
              className="text-yellow-400 hover:underline"
            >
              moderngk2026@gmail.com
            </a>{" "}
            | Phone:{" "}
            <a
              href="tel:+917038622958"
              className="text-yellow-400 hover:underline"
            >
              +91 7038622958
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
