/*
  Warnings:

  - You are about to drop the column `endHour` on the `InstructorAvailability` table. All the data in the column will be lost.
  - You are about to drop the column `startHour` on the `InstructorAvailability` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InstructorAvailability" DROP COLUMN "endHour",
DROP COLUMN "startHour",
ADD COLUMN     "hours" INTEGER[];
