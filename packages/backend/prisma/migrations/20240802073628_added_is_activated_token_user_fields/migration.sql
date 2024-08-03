-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activationToken" TEXT,
ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT false;
