// app/api/registrations/[id]/route.ts (DELETE method)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    console.log("=== Starting delete process ===");

    // AWAIT THE PARAMS
    const params = await context.params;
    console.log("Delete params:", params);

    // Get the ID from params
    const id = parseInt(params.id);
    console.log("Registration ID to delete:", id);

    if (isNaN(id)) {
      console.error("Invalid ID:", params.id);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid registration ID",
        },
        { status: 400 }
      );
    }

    // First, check if registration exists
    const registration = await prisma.registration.findUnique({
      where: { id },
    });

    if (!registration) {
      return NextResponse.json(
        {
          success: false,
          error: `Registration with ID ${id} not found`,
        },
        { status: 404 }
      );
    }

    console.log("Found registration to delete:", {
      id: registration.id,
      name: registration.name,
      email: registration.email,
    });

    // Store registration data for potential undo or logging
    const deletedRegistration = {
      id: registration.id,
      name: registration.name,
      email: registration.email,
      registrationToken: registration.registrationToken,
    };

    // Delete the registration
    await prisma.registration.delete({
      where: { id },
    });

    console.log("=== Delete process completed successfully ===");

    return NextResponse.json({
      success: true,
      message: "Registration deleted successfully",
      data: deletedRegistration,
    });
  } catch (error: any) {
    console.error("=== ERROR in delete process ===");
    console.error("Error:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    // Handle foreign key constraints or other DB errors
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          success: false,
          error: "Cannot delete registration due to related records",
          details:
            "This registration has related records that must be deleted first",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete registration",
        details: error.code || "Unknown error",
      },
      { status: 500 }
    );
  }
}
