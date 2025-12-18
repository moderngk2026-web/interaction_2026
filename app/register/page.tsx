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
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import Dropzone from "react-dropzone";

interface Event {
  id: number;
  code: string; // Event code like 01, 02, etc.
  name: string;
  price: number;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
}

const events: Event[] = [
  {
    id: 1,
    code: "01",
    name: "Code Warriors",
    price: 100,
    description: "Coding competitions",
    maxParticipants: 300,
    currentParticipants: 245,
  },
  {
    id: 2,
    code: "02",
    name: "Mind Marathon (Quiz)",
    price: 100,
    description: "Mind Marathon (Quiz)",
    maxParticipants: 500,
    currentParticipants: 320,
  },
  {
    id: 3,
    code: "03",
    name: "SnapReel Contest",
    price: 100,
    description: "SnapReel Contest",
    maxParticipants: 200,
    currentParticipants: 180,
  },
  {
    id: 4,
    code: "04",
    name: "Gamer Strike",
    price: 100,
    description: "Gamer Strike",
    maxParticipants: 50,
    currentParticipants: 45,
  },
  {
    id: 5,
    code: "05",
    name: "Tech Debate",
    price: 100,
    description: "Tech Debate",
    maxParticipants: 100,
    currentParticipants: 85,
  },
  {
    id: 6,
    code: "06",
    name: "Grab the oppurtunity",
    price: 100,
    description: "Grab the oppurtunity",
    maxParticipants: 150,
    currentParticipants: 120,
  },
  {
    id: 7,
    code: "07",
    name: "Web Craft Challenge",
    price: 100,
    description: "Web Craft Challenge",
    maxParticipants: 150,
    currentParticipants: 120,
  },
  {
    id: 8,
    code: "08",
    name: "Spark the idea",
    price: 100,
    description: "Spark the idea",
    maxParticipants: 150,
    currentParticipants: 120,
  },
];

// Mock function to get next participant number - In production, this would be from DB
const getNextParticipantNumber = async (
  eventCount: number
): Promise<number> => {
  // This is a mock. In real app, you'd query the database to get the count
  // of registrations with the same event count for the current year
  const mockCounts: Record<number, number> = {
    1: 25, // Already have 25 participants with 1 event
    2: 18, // 18 participants with 2 events
    3: 12, // 12 participants with 3 events
    4: 8, // 8 participants with 4 events
    5: 5, // 5 participants with 5 events
    6: 3, // 3 participants with all 6 events
  };

  return (mockCounts[eventCount] || 0) + 1;
};

// Function to generate the registration token
const generateRegistrationToken = (
  collegeCode: string,
  year: string,
  eventCount: number,
  participantNumber: number
): string => {
  const eventCountStr = eventCount.toString().padStart(2, "0");
  const participantNumberStr = participantNumber.toString().padStart(3, "0");

  return `${collegeCode}${year}${eventCountStr}${participantNumberStr}`;
};

// Update the RegistrationFormData interface
interface RegistrationFormData {
  name: string;
  email: string;
  mobile: string;
  collegeId: string;
  selectedEvents: {
    id: number;
    code: string;
    name: string;
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

  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
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

  // Generate registration token based on selected events
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
        participantNumber
      );
      setRegistrationToken(token);
    } catch (error) {
      console.error("Error generating token:", error);
      // Fallback to simple token
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      setRegistrationToken(`REG-${timestamp}-${random}`);
    }
  }, [selectedEvents]);

  // Calculate total amount and update token whenever selected events change
  useEffect(() => {
    const amount = selectedEvents.length * 100;
    setTotalAmount(amount);

    if (selectedEvents.length > 0) {
      generateToken();
    } else {
      setRegistrationToken("");
    }
  }, [selectedEvents, generateToken]);

  const handleEventToggle = (eventId: number) => {
    setSelectedEvents((prev) => {
      if (prev.includes(eventId)) {
        return prev.filter((id) => id !== eventId);
      } else {
        if (prev.length < 8) {
          return [...prev, eventId];
        }
        return prev;
      }
    });
  };

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

  // Copy token to clipboard
  const copyTokenToClipboard = () => {
    navigator.clipboard.writeText(registrationToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Test component to check Cloudinary config
  function CloudinaryTest() {
    const [config, setConfig] = useState<any>(null);

    useEffect(() => {
      setConfig({
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      });
    }, []);

    return (
      <div className="p-4 bg-red-50">
        <h3>Cloudinary Config Test:</h3>
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </div>
    );
  }

  // Upload to Cloudinary with low quality settings
  // Updated uploadToCloudinary function
  const uploadToCloudinary = async (file: File): Promise<string> => {
    try {
      // Log environment variables (remove in production)
      console.log("Cloudinary Config:", {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      });

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
      );

      // Add optimization parameters
      formData.append("quality", "auto");
      formData.append("fetch_format", "auto");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Cloudinary Upload Failed:", {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
        });
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}`
        );
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
      // Prepare selected events data
      const selectedEventDetails = selectedEvents.map((id) => {
        const event = events.find((e) => e.id === id);
        return {
          id: event?.id || id,
          code: event?.code || "",
          name: event?.name || "",
        };
      });

      // IMPORTANT: Send event IDs (numbers), not objects for selectedEvents
      const registrationData = {
        ...formData,
        selectedEvents: selectedEvents, // Just the array of IDs: [1, 2, 3]
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
        // Handle specific error statuses
        if (response.status === 409) {
          throw new Error(
            "Email already registered. Please use a different email or check your previous registration."
          );
        } else if (response.status === 400) {
          throw new Error(
            responseData.message || "Please check all required fields."
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

    // ⛔ Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true); // 🔒 LOCK IMMEDIATELY

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

    setError("");

    try {
      const receiptUrl = await uploadToCloudinary(paymentReceipt);
      await submitRegistration(receiptUrl);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Submission failed");
      setIsSubmitting(false); // unlock only on failure
    }
  };

  const getSelectedEventNames = () => {
    return selectedEvents
      .map((id) => {
        const event = events.find((e) => e.id === id);
        return event?.name;
      })
      .filter(Boolean)
      .join(", ");
  };

  const getSelectedEventCodes = () => {
    return selectedEvents
      .map((id) => {
        const event = events.find((e) => e.id === id);
        return event?.code;
      })
      .filter(Boolean)
      .join(", ");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isSubmitDisabled =
    isSubmitting ||
    loading ||
    uploading ||
    selectedEvents.length === 0 ||
    !paymentReceipt;

  // Generate UPI payment string
  const generateUPIString = () => {
    const config = {
      amount: totalAmount,
      upiId: "7498980121@ybl",
      name: "College Events",
      message: `Registration for ${selectedEvents.length} event(s) - Token: ${registrationToken}`,
    };

    return `upi://pay?pa=${config.upiId}&pn=${encodeURIComponent(
      config.name
    )}&am=${config.amount}&tn=${encodeURIComponent(config.message)}&cu=INR`;
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

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Left Column: Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-yellow-400" />
              Personal Information
            </h2>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <User className="w-5 h-5 text-white/50" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Mail className="w-5 h-5 text-white/50" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Phone className="w-5 h-5 text-white/50" />
                    </div>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                {/* College ID (Optional) */}
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
                    placeholder="Enter your college Name"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Graduation Type *
                  </label>

                  <div className="flex gap-6">
                    {/* UG */}
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

                    {/* PG */}
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

                {/* Events Selection */}
                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-pink-400" />
                    Select Events (₹100 per event)
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    Choose the events you want to participate in
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {events.map((event) => {
                      const isSelected = selectedEvents.includes(event.id);
                      const isFull =
                        event.currentParticipants >= event.maxParticipants;

                      return (
                        <div
                          key={event.id}
                          className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30"
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                          } ${isFull ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() => !isFull && handleEventToggle(event.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded border flex items-center justify-center ${
                                isSelected
                                  ? "bg-blue-500 border-blue-500"
                                  : "border-white/30"
                              }`}
                            >
                              {isSelected && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="font-medium text-white">
                                    {event.name}
                                  </div>
                                  <div className="text-xs px-2 py-1 bg-white/10 rounded">
                                    Event {event.code}
                                  </div>
                                </div>
                                <div className="text-yellow-400 font-bold">
                                  ₹{event.price}
                                </div>
                              </div>
                              <div className="text-white/60 text-sm mt-1">
                                {event.description}
                              </div>
                              {/* <div className="flex items-center gap-2 mt-2">
                                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                                    style={{
                                      width: `${
                                        (event.currentParticipants /
                                          event.maxParticipants) *
                                        100
                                      }%`,
                                    }}
                                  />
                                </div>
                                <div className="text-white/50 text-xs">
                                  {event.currentParticipants}/
                                  {event.maxParticipants}
                                </div>
                              </div>
                              {isFull && (
                                <div className="text-red-400 text-xs mt-2 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  Event Full
                                </div>
                              )} */}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selection Summary */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-pink-500/10 rounded-xl border border-yellow-500/20">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-white/70 text-sm mb-1">
                          Selected Events:
                        </div>
                        <div className="text-white font-bold">
                          {selectedEvents.length} events
                        </div>
                      </div>
                      <div>
                        <div className="text-white/70 text-sm mb-1">
                          Event Codes:
                        </div>
                        <div className="text-blue-400 font-bold">
                          {getSelectedEventCodes() || "None"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-white/70">Total Amount:</div>
                      <div className="text-2xl font-bold text-yellow-400">
                        ₹{totalAmount}
                      </div>
                    </div>
                    {/* {selectedEvents.length > 0 && registrationToken && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="text-white/70 text-sm mb-1">
                          Registration Token:
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="font-mono text-lg font-bold text-green-400 bg-white/5 px-3 py-1 rounded">
                            {registrationToken}
                          </div>
                          <button
                            type="button"
                            onClick={copyTokenToClipboard}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            title="Copy token"
                          >
                            <Copy
                              className={`w-4 h-4 ${
                                copied ? "text-green-400" : "text-white/60"
                              }`}
                            />
                          </button>
                        </div>
                        <div className="text-white/50 text-xs mt-1">
                          MCGK2026
                          <span className="text-yellow-400">
                            {selectedEvents.length.toString().padStart(2, "0")}
                          </span>
                          XXX
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>

                {/* QR Code Display */}
                <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <QrCode className="w-6 h-6 text-purple-400" />
                    Payment QR Code
                  </h2>

                  {selectedEvents.length > 0 ? (
                    <div className="space-y-6">
                      {/* QR Code */}
                      <div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10">
                        <div className="p-4 bg-white rounded-xl mb-4">
                          <QRCodeCanvas
                            value={generateUPIString()}
                            size={200}
                            level="H"
                            includeMargin={true}
                            fgColor="#1e293b"
                            bgColor="#ffffff"
                          />
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-yellow-400 mb-2">
                            ₹{totalAmount}
                          </div>
                          <div className="text-white/70 text-sm">
                            Scan to pay via UPI
                          </div>
                          {/* {registrationToken && (
                            <div className="mt-2 text-white/50 text-xs">
                              Token: {registrationToken}
                            </div>
                          )} */}
                        </div>
                      </div>

                      {/* Payment Details */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-white/70">Selected Events</div>
                          <div className="text-white font-medium">
                            {selectedEvents.length} events
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-white/70">Price per Event</div>
                          <div className="text-white font-medium">₹100</div>
                        </div>
                        <div className="h-px bg-white/10"></div>
                        <div className="flex items-center justify-between">
                          <div className="text-white font-bold">
                            Total Amount
                          </div>
                          <div className="text-2xl font-bold text-yellow-400">
                            ₹{totalAmount}
                          </div>
                        </div>
                      </div>

                      {/* Token Info */}
                      {registrationToken && (
                        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                          <h4 className="text-white font-bold mb-2">
                            Token Information
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-white/70">
                                College Code:
                              </span>
                              <span className="text-white font-mono">MCGK</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white/70">Year:</span>
                              <span className="text-white font-mono">2026</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white/70">
                                Event Count:
                              </span>
                              <span className="text-yellow-400 font-mono">
                                {selectedEvents.length
                                  .toString()
                                  .padStart(2, "0")}
                              </span>
                            </div>
                            {/* <div className="flex items-center justify-between">
                              <span className="text-white/70">
                                Participant #:
                              </span>
                              <span className="text-green-400 font-mono">
                                {registrationToken.slice(-3)}
                              </span>
                            </div> */}
                          </div>
                        </div>
                      )}

                      {/* Payment Instructions */}
                      <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                        <h4 className="text-white font-bold mb-2">
                          Payment Instructions:
                        </h4>
                        <ul className="text-white/70 text-sm space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-white/50 rounded-full mt-2"></div>
                            Scan the QR code with any UPI app
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-white/50 rounded-full mt-2"></div>
                            Verify the amount before payment
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-white/50 rounded-full mt-2"></div>
                            Save payment screenshot as receipt
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-white/50 rounded-full mt-2"></div>
                            Upload receipt after successful payment
                          </li>
                          {/* <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-white/50 rounded-full mt-2"></div>
                            Mention token {registrationToken} in payment note if
                            possible
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 rounded-full mb-6">
                        <QrCode className="w-10 h-10 text-white/30" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Select Events to Generate QR Code
                      </h3>
                      <p className="text-white/60">
                        Choose events from the form to see payment QR code
                      </p>
                    </div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-8"
                >
                  {/* Payment Receipt Upload */}
                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Upload className="w-5 h-5 text-green-400" />
                      Upload Payment Receipt
                    </h3>
                    <p className="text-white/60 text-sm mb-4">
                      Upload screenshot of payment confirmation
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
                          } ${
                            uploading ? "opacity-50 cursor-not-allowed" : ""
                          }`}
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

                  {/* Important Notes */}
                  <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      Important Notes
                    </h3>
                    <ul className="space-y-3 text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
                        <span>
                          Each event costs ₹100. Select multiple events to pay
                          combined amount.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
                        <span>
                          <strong>Registration Token:</strong> MCGK2026
                          <span className="text-yellow-400">XX</span>
                          <span className="text-green-400">YYY</span>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
                        <span>XX = Number of selected events (01-06)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
                        <span>YYY = Your unique participant number</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
                        <span>Save your token - required for event entry</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting || loading || uploading
                      ? "bg-white/10 text-white/50 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white hover:scale-105"
                  }`}
                >
                  {isSubmitting || loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Submit Registration
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Registration Successful!
                </h3>
                <p className="text-white/70 mb-6">
                  Your registration has been submitted for verification
                </p>

                {/* <div className="bg-white/5 p-6 rounded-xl mb-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-white/60 text-sm mb-2">
                        Your Registration Token
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="font-mono text-2xl font-bold text-green-400 bg-white/10 px-4 py-2 rounded-lg">
                          {registrationToken}
                        </div>
                        <button
                          onClick={copyTokenToClipboard}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Copy token"
                        >
                          <Copy
                            className={`w-5 h-5 ${
                              copied ? "text-green-400" : "text-white/60"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="text-white/50 text-sm mt-2">
                        Keep this token safe for future reference
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <div className="text-white/60 text-sm mb-1">
                          Selected Events
                        </div>
                        <div className="text-white font-medium">
                          {selectedEvents.length} events
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 text-sm mb-1">
                          Total Amount
                        </div>
                        <div className="text-yellow-400 font-bold">
                          ₹{totalAmount}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="text-white/60 text-sm mb-2">
                        Token Breakdown
                      </div>
                      <div className="flex items-center justify-center gap-1 text-sm">
                        <span className="text-white">MCGK</span>
                        <span className="text-white">2026</span>
                        <span className="text-yellow-400">
                          {selectedEvents.length.toString().padStart(2, "0")}
                        </span>
                        <span className="text-green-400">
                          {registrationToken.slice(-3)}
                        </span>
                      </div>
                      <div className="text-white/50 text-xs mt-2">
                        College | Year | Events | Participant #
                      </div>
                    </div>
                  </div>
                </div> */}

                <p className="text-white/60 text-sm">
                  We will verify your payment and send confirmation email within
                  24 hours
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column: QR Code & Payment Details */}
        </div>

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
              href="mailto:events@college.edu"
              className="text-yellow-400 hover:underline"
            >
              moderngk2026@gmail.com
            </a>{" "}
            | Phone:{" "}
            <a
              href="tel:+911234567890"
              className="text-yellow-400 hover:underline"
            >
              +91 9309034640
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
