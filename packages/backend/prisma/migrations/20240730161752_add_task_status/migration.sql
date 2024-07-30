/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `Todo` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "isCompleted",
ADD COLUMN     "status" "TodoStatus" NOT NULL DEFAULT 'PENDING';
