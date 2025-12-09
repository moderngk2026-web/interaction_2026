/*
  Warnings:

  - You are about to drop the `registrations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "registrations";

-- CreateTable
CREATE TABLE "Registration" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "collegeId" TEXT,
    "selectedEvents" INTEGER[],
    "eventCodes" TEXT,
    "eventNames" TEXT,
    "eventDetails" JSONB,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "registrationToken" TEXT NOT NULL,
    "paymentReceipt" TEXT NOT NULL,
    "paymentVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Registration_email_key" ON "Registration"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_registrationToken_key" ON "Registration"("registrationToken");
