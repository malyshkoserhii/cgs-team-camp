/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Dashboard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descr" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "private" BOOLEAN NOT NULL,
    "ownername" TEXT NOT NULL,

    CONSTRAINT "Dashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TodoItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descr" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3),
    "status" TEXT DEFAULT 'ToDo',
    "userId" INTEGER,
    "dashboardId" INTEGER NOT NULL,

    CONSTRAINT "TodoItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Dashboard" ADD CONSTRAINT "Dashboard_ownername_fkey" FOREIGN KEY ("ownername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoItem" ADD CONSTRAINT "TodoItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoItem" ADD CONSTRAINT "TodoItem_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
