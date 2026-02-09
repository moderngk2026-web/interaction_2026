// app/api/registrations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Define event details structure for the new system
interface EventDetail {
  id: number;
  code: string;
  name: string;
  description: string;
  individualPrice: number;
  teamPrice: number;
  allowedModes: string[];
  maxTeamSize?: number;
  minTeamSize?: number;
}

// Define selected event structure from frontend
interface SelectedEvent {
  id: number;
  participationMode: "individual" | "team";
  teamMembers?: string[];
  teamSize?: number;
}

//-------------------------------------
// DEBUG HELPER
//-------------------------------------
function debug(label: string, value: any) {
  console.log(
    `\n========== DEBUG: ${label} ==========\n`,
    JSON.stringify(value, null, 2),
  );
}

//-------------------------------------
// TOKEN GENERATION (FIXED)
//-------------------------------------
async function generateRegistrationToken(eventCount: number): Promise<string> {
  const collegeCode = "MCGK";
  const year = "2026";
  const eventCountStr = eventCount.toString().padStart(2, "0");

  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    try {
      // Get current timestamp for uniqueness
      const timestamp = Date.now().toString();

      // Use different parts of timestamp for more randomness
      const tsPart1 = timestamp.slice(-6, -3);
      const tsPart2 = timestamp.slice(-3);

      // Add random number for extra uniqueness
      const randomNum = Math.floor(100 + Math.random() * 900);

      // Generate token with timestamp and random number
      const token = `${collegeCode}${year}${eventCountStr}${tsPart1}${randomNum}${tsPart2}`;

      // Check if token already exists
      const existing = await prisma.registration.findUnique({
        where: { registrationToken: token },
      });

      if (!existing) {
        return token; // Token is unique
      }

      attempts++;
      console.log(`Token ${token} exists, attempt ${attempts}/${maxAttempts}`);

      // Wait a bit before retrying (to get new timestamp)
      if (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error("Error in token generation:", error);
      // Fallback using random UUID
      const uuidPart = Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();
      return `${collegeCode}${year}${eventCountStr}${uuidPart}`;
    }
  }

  // If all attempts fail, use crypto-based random string
  const cryptoPart = Array.from(crypto.getRandomValues(new Uint8Array(4)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  return `${collegeCode}${year}${eventCountStr}${cryptoPart}`;
}

//-------------------------------------
// EVENTS DATA (Updated to match frontend exactly)
//-------------------------------------
const eventsData: EventDetail[] = [
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
  },
  {
    id: 3,
    code: "03",
    name: "PromptStorm",
    description: "Talk Smart with AI",
    individualPrice: 100,
    teamPrice: 0,
    allowedModes: ["individual"],
  },
  {
    id: 4,
    code: "04",
    name: "Echoes of Itihasa",
    description: "Public Speaking",
    individualPrice: 100,
    teamPrice: 0,
    allowedModes: ["individual"],
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
  },
  {
    id: 6,
    code: "06",
    name: "Yugantar",
    description: "Mythological Storytelling",
    individualPrice: 100,
    teamPrice: 0,
    allowedModes: ["individual"],
  },
  {
    id: 7,
    code: "07",
    name: "KavyaRas",
    description: "Poetry Recitation",
    individualPrice: 100,
    teamPrice: 0,
    allowedModes: ["individual"],
  },
  {
    id: 8,
    code: "08",
    name: "TechVision",
    description: "Offline Poster Making",
    individualPrice: 100,
    teamPrice: 0,
    allowedModes: ["individual"],
  },
  {
    id: 9,
    code: "09",
    name: "Rangrekha",
    description: "Mono Acting",
    individualPrice: 100,
    teamPrice: 0,
    allowedModes: ["individual"],
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
  },
];

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { mobile: { contains: search, mode: "insensitive" } },
        { collegeId: { contains: search, mode: "insensitive" } },
        { registrationToken: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) {
      if (status === "verified") {
        where.paymentVerified = true;
      } else if (status === "pending") {
        where.paymentVerified = false;
      }
    }

    // Get total count
    const total = await prisma.registration.count({ where });

    // Get registrations with pagination
    const registrations = await prisma.registration.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        collegeId: true,
        graduationType: true,
        selectedEvents: true,
        teamDetails: true,
        totalAmount: true,
        registrationToken: true,
        paymentVerified: true,
        paymentReceipt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Parse JSON fields
    const registrationsWithParsedDetails = registrations.map((reg) => ({
      ...reg,
      selectedEvents: reg.selectedEvents
        ? JSON.parse(reg.selectedEvents as string)
        : [],
      teamDetails: reg.teamDetails
        ? JSON.parse(reg.teamDetails as string)
        : null,
      createdAt: reg.createdAt.toISOString(),
      updatedAt: reg.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: registrationsWithParsedDetails,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch registrations",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

//-------------------------------------
// POST API ROUTE (UPDATED FOR NEW FORMAT)
//-------------------------------------
export async function POST(request: NextRequest) {
  console.log("\n=========== NEW REGISTRATION REQUEST ===========");

  try {
    // Read request body
    const body = await request.json();
    debug("Incoming Body", body);

    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "mobile",
      "selectedEvents",
      "totalAmount",
      "paymentReceipt",
      "graduationType",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        debug("Missing Field", field);
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 },
        );
      }
    }

    // Validate selectedEvents is an array
    if (
      !Array.isArray(body.selectedEvents) ||
      body.selectedEvents.length === 0
    ) {
      return NextResponse.json(
        { message: "Please select at least one event" },
        { status: 400 },
      );
    }

    // Parse selected events
    const selectedEvents: SelectedEvent[] = body.selectedEvents;
    debug("Parsed Selected Events", selectedEvents);

    // Process selected events and validate
    const processedEvents = selectedEvents.map((selection) => {
      const event = eventsData.find((e) => e.id === selection.id);
      if (!event) {
        throw new Error(`Event with ID ${selection.id} not found`);
      }

      // Create event object
      const eventObj = {
        id: event.id,
        code: event.code,
        name: event.name,
        description: event.description,
        participationMode: selection.participationMode,
        individualPrice: event.individualPrice,
        teamPrice: event.teamPrice,
        actualAmount:
          selection.participationMode === "individual"
            ? event.individualPrice
            : event.teamPrice,
      };

      // Add team details if team event
      if (selection.participationMode === "team") {
        return {
          ...eventObj,
          teamMembers: selection.teamMembers || [],
          teamSize: selection.teamSize || 0,
        };
      }

      return eventObj;
    });

    debug("Processed Events", processedEvents);

    // Validation
    for (const event of processedEvents) {
      const originalEvent = eventsData.find((e) => e.id === event.id);
      if (!originalEvent) continue;

      if (event.participationMode === "team") {
        // Check if team mode is allowed
        if (!originalEvent.allowedModes.includes("team")) {
          return NextResponse.json(
            { message: `${event.name} does not allow team participation` },
            { status: 400 },
          );
        }

        // Validate team size
        if ((event as any).teamSize < (originalEvent.minTeamSize || 2)) {
          return NextResponse.json(
            {
              message: `${event.name} requires at least ${originalEvent.minTeamSize} team members`,
            },
            { status: 400 },
          );
        }

        if (
          originalEvent.maxTeamSize &&
          (event as any).teamSize > originalEvent.maxTeamSize
        ) {
          return NextResponse.json(
            {
              message: `${event.name} allows maximum ${originalEvent.maxTeamSize} team members`,
            },
            { status: 400 },
          );
        }

        // Validate team member names
        const teamMembers = (event as any).teamMembers || [];
        if (teamMembers.length !== (event as any).teamSize) {
          return NextResponse.json(
            {
              message: `Please provide all team member names for ${event.name}`,
            },
            { status: 400 },
          );
        }

        const emptyNames = teamMembers.filter((name: string) => !name.trim());
        if (emptyNames.length > 0) {
          return NextResponse.json(
            { message: `Please fill all team member names for ${event.name}` },
            { status: 400 },
          );
        }
      } else if (event.participationMode === "individual") {
        // Check if individual mode is allowed
        if (!originalEvent.allowedModes.includes("individual")) {
          return NextResponse.json(
            {
              message: `${event.name} does not allow individual participation`,
            },
            { status: 400 },
          );
        }
      }
    }

    // Calculate total amount from processed events
    const calculatedTotalAmount = processedEvents.reduce(
      (total, event) => total + event.actualAmount,
      0,
    );

    // Verify calculated amount matches submitted amount
    if (Math.abs(calculatedTotalAmount - body.totalAmount) > 1) {
      console.warn(
        `Amount mismatch: calculated ${calculatedTotalAmount}, submitted ${body.totalAmount}`,
      );
    }

    // Prepare team details for storage
    const teamDetails = processedEvents
      .filter((event) => event.participationMode === "team")
      .map((event) => ({
        eventId: event.id,
        eventName: event.name,
        teamSize: (event as any).teamSize,
        teamMembers: (event as any).teamMembers || [],
      }));

    debug("Team Details", teamDetails);

    // Generate registration token
    const eventCount = processedEvents.length;
    const registrationToken = await generateRegistrationToken(eventCount);

    debug("Generated Token", registrationToken);

    // Check if token already exists
    const existingToken = await prisma.registration.findUnique({
      where: { registrationToken },
    });

    if (existingToken) {
      // Regenerate token if duplicate
      console.log(`Token ${registrationToken} exists, regenerating...`);
      const newToken = await generateRegistrationToken(eventCount);
      debug("Regenerated Token", newToken);
    }

    debug("Creating registration with:", {
      selectedEvents: processedEvents.length,
      teamEvents: teamDetails.length,
      totalAmount: calculatedTotalAmount,
    });

    // CREATE RECORD - Note: removed eventCodes and eventNames since they're not in your schema
    const registration = await prisma.registration.create({
      data: {
        name: body.name,
        email: body.email,
        mobile: body.mobile,
        collegeId: body.collegeId || null,
        graduationType: body.graduationType,
        selectedEvents: JSON.stringify(processedEvents), // Store as JSON string
        teamDetails:
          teamDetails.length > 0
            ? JSON.stringify(teamDetails)
            : Prisma.JsonNull,
        totalAmount: calculatedTotalAmount,
        registrationToken: registrationToken,
        paymentReceipt: body.paymentReceipt,
        paymentVerified: false,
      },
    });

    // Prepare response data
    const responseData = {
      id: registration.id,
      name: registration.name,
      email: registration.email,
      token: registration.registrationToken,
      eventsCount: eventCount,
      totalAmount: registration.totalAmount,
      selectedEvents: processedEvents,
      teamEvents: teamDetails,
    };

    // SUCCESS RESPONSE
    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        registrationToken: registration.registrationToken,
        data: responseData,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("\n=========== ERROR ===========");
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Stack trace:", error.stack);

    // Handle specific Prisma errors
    if (error.code === "P1001" || error.code === "P1002") {
      return NextResponse.json(
        {
          message: "Database connection failed. Please try again later.",
          error: error.message,
        },
        { status: 500 },
      );
    }

    if (error.code === "P2002") {
      // Unique constraint violation (email or token)
      const field = error.meta?.target?.[0] || "unknown field";
      return NextResponse.json(
        {
          message: `Registration with this ${field} already exists.`,
          error: error.message,
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        message: "Registration failed",
        error: error.message,
        details: "Please check your input and try again.",
      },
      { status: 500 },
    );
  }
}
