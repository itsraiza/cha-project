/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `ConfirmacaoPresenca` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `ConfirmacaoPresenca` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ConfirmacaoPresenca" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ConfirmacaoPresenca_token_key" ON "ConfirmacaoPresenca"("token");
