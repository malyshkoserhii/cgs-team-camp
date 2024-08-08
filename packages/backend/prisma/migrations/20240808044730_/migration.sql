/*
  Warnings:

  - Made the column `status` on table `TodoItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `TodoItem` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedTime` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TodoItem" DROP CONSTRAINT "TodoItem_userId_fkey";

-- AlterTable
ALTER TABLE "TodoItem" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "resetPasswordExpires" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" TEXT,
ADD COLUMN     "updatedTime" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "TodoItem" ADD CONSTRAINT "TodoItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
