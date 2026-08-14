/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Mensagem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `Mensagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mensagem" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Mensagem_token_key" ON "Mensagem"("token");
