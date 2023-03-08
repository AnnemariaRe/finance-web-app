-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('current', 'savings', 'credit', 'deposit');

-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('expense', 'income');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('grocery', 'restaurants', 'transport', 'housing', 'medicine', 'travel');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER,
    "title" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "currency" TEXT NOT NULL,
    "accountType" "AccountType" NOT NULL DEFAULT 'current',

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "operationType" "OperationType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "category" "Category" NOT NULL,
    "accountId" INTEGER NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
