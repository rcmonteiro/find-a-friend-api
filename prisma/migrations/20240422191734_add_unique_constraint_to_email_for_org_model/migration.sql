/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");
