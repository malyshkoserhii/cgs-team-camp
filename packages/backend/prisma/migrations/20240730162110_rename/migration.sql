/*
  Warnings:

  - The values [PENDING,IN_PROGRESS,COMPLETED] on the enum `TodoStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TodoStatus_new" AS ENUM ('pending', 'inProgress', 'completed');
ALTER TABLE "Todo" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Todo" ALTER COLUMN "status" TYPE "TodoStatus_new" USING ("status"::text::"TodoStatus_new");
ALTER TYPE "TodoStatus" RENAME TO "TodoStatus_old";
ALTER TYPE "TodoStatus_new" RENAME TO "TodoStatus";
DROP TYPE "TodoStatus_old";
ALTER TABLE "Todo" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "status" SET DEFAULT 'pending';
