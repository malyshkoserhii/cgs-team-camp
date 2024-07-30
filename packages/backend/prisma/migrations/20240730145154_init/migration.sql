/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "todos" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);
