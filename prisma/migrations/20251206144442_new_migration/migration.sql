/*
  Warnings:

  - You are about to drop the `Registration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Registration";

-- CreateTable
CREATE TABLE "registrations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "collegeId" TEXT,
    "selectedEvents" JSONB NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "registrationToken" TEXT NOT NULL,
    "paymentReceipt" TEXT NOT NULL,
    "paymentVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registrations_email_key" ON "registrations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_registrationToken_key" ON "registrations"("registrationToken");

-- CreateIndex
CREATE INDEX "registrations_registrationToken_idx" ON "registrations"("registrationToken");

-- CreateIndex
CREATE INDEX "registrations_email_idx" ON "registrations"("email");
