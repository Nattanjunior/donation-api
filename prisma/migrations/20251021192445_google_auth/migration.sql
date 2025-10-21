-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'READER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "authProvider" TEXT,
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "emailVerified" BOOLEAN DEFAULT false,
ADD COLUMN     "providerId" TEXT,
ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'READER',
ALTER COLUMN "password" DROP NOT NULL;
