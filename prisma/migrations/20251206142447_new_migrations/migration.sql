/*
  Warnings:

  - The primary key for the `Registration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Registration` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `selectedEvents` on the `Registration` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `paymentReceipt` on table `Registration` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "selectedEvents",
ADD COLUMN     "selectedEvents" JSONB NOT NULL,
ALTER COLUMN "totalAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "paymentReceipt" SET NOT NULL,
ADD CONSTRAINT "Registration_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Registration_email_idx" ON "Registration"("email");
