-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "collegeId" TEXT,
    "selectedEvents" TEXT[],
    "totalAmount" INTEGER NOT NULL,
    "registrationToken" TEXT NOT NULL,
    "paymentReceipt" TEXT,
    "paymentVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Registration_email_key" ON "Registration"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_registrationToken_key" ON "Registration"("registrationToken");

-- CreateIndex
CREATE INDEX "Registration_registrationToken_idx" ON "Registration"("registrationToken");
