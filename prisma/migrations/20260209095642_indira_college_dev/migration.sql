/*
  Warnings:

  - You are about to drop the column `eventCodes` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `eventDetails` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `eventNames` on the `Registration` table. All the data in the column will be lost.
  - Changed the type of `selectedEvents` on the `Registration` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "eventCodes",
DROP COLUMN "eventDetails",
DROP COLUMN "eventNames",
ADD COLUMN     "teamDetails" JSONB,
DROP COLUMN "selectedEvents",
ADD COLUMN     "selectedEvents" JSONB NOT NULL;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
