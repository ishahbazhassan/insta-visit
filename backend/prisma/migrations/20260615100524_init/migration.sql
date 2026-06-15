-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "npiNumber" TEXT NOT NULL,
    "credentials" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "licenseExpirationDate" TEXT NOT NULL,
    "licenseState" TEXT NOT NULL,
    "homeStreetAddress" TEXT NOT NULL,
    "homeCity" TEXT NOT NULL,
    "homeState" TEXT NOT NULL,
    "homeZipCode" TEXT NOT NULL,
    "practiceAddress" TEXT NOT NULL,
    "sameAsHomeAddress" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
