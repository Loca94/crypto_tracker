/*
  Warnings:

  - Added the required column `cryptoId` to the `CryptoMonitored` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CryptoMonitored" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cryptoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "targetPrice" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CryptoMonitored_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CryptoMonitored" ("alias", "createdAt", "id", "name", "symbol", "targetPrice", "updatedAt", "userId") SELECT "alias", "createdAt", "id", "name", "symbol", "targetPrice", "updatedAt", "userId" FROM "CryptoMonitored";
DROP TABLE "CryptoMonitored";
ALTER TABLE "new_CryptoMonitored" RENAME TO "CryptoMonitored";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
