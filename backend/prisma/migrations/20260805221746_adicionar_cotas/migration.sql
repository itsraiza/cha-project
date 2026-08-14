-- AlterTable
ALTER TABLE "Presente" ADD COLUMN     "possuiCotas" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "totalCotas" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Cota" (
    "id" TEXT NOT NULL,
    "nomePessoa" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "presenteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cota_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cota_token_key" ON "Cota"("token");

-- AddForeignKey
ALTER TABLE "Cota" ADD CONSTRAINT "Cota_presenteId_fkey" FOREIGN KEY ("presenteId") REFERENCES "Presente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
