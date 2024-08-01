/*
  Warnings:

  - Made the column `isPrivate` on table `Todo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isCompleted` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "isPrivate" SET NOT NULL,
ALTER COLUMN "isPrivate" SET DEFAULT false,
ALTER COLUMN "isCompleted" SET NOT NULL,
ALTER COLUMN "isCompleted" SET DEFAULT false;
