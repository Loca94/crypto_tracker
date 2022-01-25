/*
  Warnings:

  - You are about to drop the `TagsOfCoinMonitored` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TagsOfCoinMonitored";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_CoinMonitoredToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "CoinMonitored" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoinMonitoredToTag_AB_unique" ON "_CoinMonitoredToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_CoinMonitoredToTag_B_index" ON "_CoinMonitoredToTag"("B");
