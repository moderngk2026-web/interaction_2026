// app/api/registrations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Define event details structure
interface EventDetail {
  id: number;
  code: string;
  name: string;
  price?: number;
}

//-------------------------------------
// DEBUG HELPER
//-------------------------------------
function debug(label: string, value: any) {
  console.log(`\n========== DEBUG: ${label} ==========\n`, value);
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
// EVENTS DATA (Should match frontend)
//-------------------------------------
const eventsData = [
  { id: 1, code: "01", name: "Code Warriors", price: 100 },
  { id: 2, code: "02", name: "Mind Marathon (Quiz)", price: 100 },
  { id: 3, code: "03", name: "SnapReel Contest", price: 100 },
  { id: 4, code: "04", name: "Gamer Strike", price: 100 },
  { id: 5, code: "05", name: "Tech Debate", price: 100 },
  { id: 6, code: "06", name: "Grab the oppurtunity", price: 100 },
  { id: 7, code: "07", name: "Web Craft Challenge", price: 100 },
  { id: 8, code: "08", name: "Spark the idea", price: 100 },
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
        eventCodes: true,
        eventNames: true,
        eventDetails: true,
        totalAmount: true,
        registrationToken: true,
        paymentVerified: true,
        paymentReceipt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Parse event details JSON
    const registrationsWithParsedDetails = registrations.map((reg) => ({
      ...reg,
      eventDetails: reg.eventDetails
        ? JSON.parse(reg.eventDetails as string)
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
      { status: 500 }
    );
  }
}

//-------------------------------------
// POST API ROUTE (FIXED)
//-------------------------------------
export async function POST(request: NextRequest) {
  console.log("\n=========== NEW REGISTRATION REQUEST ===========");

  try {
    // Read request body
    const body = await request.json();
    debug("Incoming Body", body);

    // REMOVE registrationToken from body if it exists
    const { registrationToken: frontendToken, ...cleanBody } = body;
    if (frontendToken) {
      console.log(`⚠️ Frontend sent token: ${frontendToken} (will be ignored)`);
    }

    // Validate required fields (REMOVED registrationToken)
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
      if (!cleanBody[field]) {
        debug("Missing Field", field);
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // REMOVED THE EMAIL DUPLICATE CHECK
    // ---------------------------------
    // No longer checking: const existingRegistration = await prisma.registration.findFirst(...)
    // No longer returning 409 error for duplicate emails
    // ---------------------------------

    // PROCESS SELECTED EVENTS (same as before)
    debug("Raw selectedEvents from frontend", body.selectedEvents);

    let selectedEventIds: number[] = [];
    let selectedEventDetails: EventDetail[] = [];

    if (Array.isArray(body.selectedEvents)) {
      if (
        body.selectedEvents.length > 0 &&
        typeof body.selectedEvents[0] === "object"
      ) {
        selectedEventIds = body.selectedEvents.map((event: any) =>
          typeof event === "object" && event.id
            ? Number(event.id)
            : Number(event)
        );

        selectedEventDetails = selectedEventIds
          .map((eventId) => {
            const event = eventsData.find((e) => e.id === eventId);
            return event
              ? {
                  id: event.id,
                  code: event.code,
                  name: event.name,
                  price: event.price,
                }
              : null;
          })
          .filter(Boolean) as EventDetail[];
      } else {
        selectedEventIds = body.selectedEvents.map((id: any) => Number(id));

        selectedEventDetails = selectedEventIds
          .map((eventId) => {
            const event = eventsData.find((e) => e.id === eventId);
            return event
              ? {
                  id: event.id,
                  code: event.code,
                  name: event.name,
                  price: event.price,
                }
              : null;
          })
          .filter(Boolean) as EventDetail[];
      }
    }

    debug("Extracted Event IDs", selectedEventIds);
    debug("Event Details", selectedEventDetails);

    // Prepare event codes and names for separate fields
    const eventCodes = selectedEventDetails.map((e) => e.code).join(",");
    const eventNames = selectedEventDetails.map((e) => e.name).join(",");

    // Prepare full event details JSON
    const eventDetailsJson = {
      eventIds: selectedEventIds,
      eventCodes: selectedEventDetails.map((e) => e.code),
      eventNames: selectedEventDetails.map((e) => e.name),
      eventDetails: selectedEventDetails,
      count: selectedEventIds.length,
      totalAmount: body.totalAmount,
    };

    debug("Event Codes String", eventCodes);
    debug("Event Names String", eventNames);
    debug("Event Details JSON", eventDetailsJson);

    // Generate registration token
    const eventCount = selectedEventIds.length;
    const registrationToken = await generateRegistrationToken(eventCount);

    debug("Generated Token", registrationToken);

    // Process payment receipt
    const receiptData = cleanBody.paymentReceipt;

    // Check if generated token already exists
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
      selectedEvents: selectedEventIds,
      eventCodes,
      eventNames,
      eventDetails: eventDetailsJson,
      token: registrationToken,
    });

    // CREATE RECORD
    const registration = await prisma.registration.create({
      data: {
        name: cleanBody.name,
        email: cleanBody.email,
        mobile: cleanBody.mobile,
        collegeId: cleanBody.collegeId || null,
        graduationType: cleanBody.graduationType,
        selectedEvents: { set: selectedEventIds },
        eventCodes: eventCodes,
        eventNames: eventNames,
        eventDetails: JSON.stringify(eventDetailsJson),
        totalAmount: cleanBody.totalAmount,
        registrationToken, // Use ONLY the generated token
        paymentReceipt: receiptData,
        paymentVerified: false,
      },
    });

    // SUCCESS RESPONSE
    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        registrationToken: registration.registrationToken,
        data: {
          id: registration.id,
          name: registration.name,
          email: registration.email,
          token: registration.registrationToken,
          eventsCount: eventCount,
          totalAmount: registration.totalAmount,
          eventCodes: selectedEventDetails.map((e) => e.code),
          eventNames: selectedEventDetails.map((e) => e.name),
          eventDetails: selectedEventDetails,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("\n=========== ERROR ===========");
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);

    // REMOVED P2002 (unique constraint) error handling

    if (error.code === "P1001") {
      return NextResponse.json(
        {
          message: "Database connection failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Registration failed",
        error: error.message,
        details: "Please check your input and try again.",
      },
      { status: 500 }
    );
  }
}
