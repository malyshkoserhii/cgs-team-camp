-- added the new columns with default values for existing rows
ALTER TABLE "Todo" 
  ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- updated existing rows with the default value
UPDATE "Todo" 
  SET "createdAt" = COALESCE("createdAt", CURRENT_TIMESTAMP), 
      "updatedAt" = COALESCE("updatedAt", CURRENT_TIMESTAMP);

-- alter the columns to make them NOT NULL
ALTER TABLE "Todo" 
  ALTER COLUMN "createdAt" SET NOT NULL,
  ALTER COLUMN "updatedAt" SET NOT NULL;