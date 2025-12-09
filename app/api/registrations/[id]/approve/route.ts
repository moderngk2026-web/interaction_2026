import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

// Get email credentials from environment variables
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
const emailFrom = process.env.EMAIL_FROM || "noreply@eventhub.com";

// Configure email transporter with Gmail
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail service
  auth: {
    user: emailUser, // Your Gmail address
    pass: emailPassword, // Your Gmail app password
  },
});

// Optional: Add transporter verification
transporter.verify(function (error, success) {
  if (error) {
    console.error("Email transporter error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    console.log("=== Starting approval process ===");
    console.log("Email config:", {
      user: emailUser ? "Set" : "Not set",
      from: emailFrom,
    });

    // AWAIT THE PARAMS
    const params = await context.params;
    console.log("Request params:", params);

    // Get the ID from params
    const id = parseInt(params.id);
    console.log("Registration ID:", id);

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

    // Get request body
    const body = await request.json();
    console.log("Request body:", body);

    const { email, name, registrationToken, eventNames, totalAmount } = body;

    // Validate required fields
    if (!email || !name || !registrationToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // First, get the registration from database
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

    console.log("Found registration:", registration);

    // Update registration to approved
    const updatedRegistration = await prisma.registration.update({
      where: { id: id },
      data: { paymentVerified: true },
    });

    console.log("Updated registration:", updatedRegistration);

    // Send email
    try {
      const textContent = `
Registration Approved - EventHub 2026

Hello ${name},

We are pleased to inform you that your registration for EventHub 2026 has been approved!

Registration Details:
• Name: ${name}
• Events Registered: ${eventNames || "Multiple events"}
• Total Amount: ₹${totalAmount || 0}
• Registration Token: ${registrationToken}

IMPORTANT: Please keep your registration token safe. You will need it for event participation and verification.

We look forward to seeing you at the event!

Best regards,
EventHub Team
      `;

      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Approved</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Registration Approved!</h1>
    </div>
    
    <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-top: 0;">Hello ${name},</h2>
        
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
            We are pleased to inform you that your registration for <strong>EventHub 2026</strong> has been approved!
        </p>
        
        <div style="background: white; border: 2px solid #e0e0e0; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #333; margin-top: 0;">Registration Details:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; color: #666; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; color: #666; border-bottom: 1px solid #eee;"><strong>Events Registered:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${
                      eventNames || "Multiple events"
                    }</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; color: #666; border-bottom: 1px solid #eee;"><strong>Total Amount:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">₹${
                      totalAmount || 0
                    }</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; color: #666;"><strong>Registration Token:</strong></td>
                    <td style="padding: 10px 0;"><strong style="color: #764ba2; font-size: 18px;">${registrationToken}</strong></td>
                </tr>
            </table>
        </div>
        
        <div style="background: #e8f4fc; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="color: #0c5460; margin: 0;">
                <strong>Important:</strong> Please keep your registration token safe. You will need it for event participation and verification.
            </p>
        </div>
        
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
            We look forward to seeing you at the event! If you have any questions, please contact us.
        </p>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
                This is an automated message. Please do not reply to this email.<br>
                © ${new Date().getFullYear()} EventHub. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
      `;

      const mailOptions = {
        from: `"EventHub" <${emailFrom}>`,
        to: email,
        subject: "🎉 Registration Approved - EventHub 2026",
        text: textContent,
        html: htmlContent,
      };

      console.log("Attempting to send email to:", email);
      console.log("From email:", emailFrom);

      // ACTUALLY SEND THE EMAIL
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
      console.log("Email preview URL:", nodemailer.getTestMessageUrl(info));
    } catch (emailError: any) {
      console.error("Email error:", emailError.message);
      console.error("Email error stack:", emailError.stack);

      // Don't fail the request if email fails, but log it
      return NextResponse.json({
        success: true,
        message: "Registration approved but email failed to send",
        emailError: emailError.message,
        data: updatedRegistration,
      });
    }

    console.log("=== Approval process completed successfully ===");

    return NextResponse.json({
      success: true,
      message: "Registration approved and email sent successfully",
      data: updatedRegistration,
    });
  } catch (error: any) {
    console.error("=== ERROR in approval process ===");
    console.error("Error:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("=== END ERROR ===");

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to approve registration",
        details: error.code || "Unknown error",
      },
      { status: 500 }
    );
  }
}
