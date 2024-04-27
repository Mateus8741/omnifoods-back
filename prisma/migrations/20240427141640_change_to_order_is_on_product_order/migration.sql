/*
  Warnings:

  - You are about to drop the column `changeToOrder` on the `Order` table. All the data in the column will be lost.
  - Added the required column `changeToOrder` to the `ProductOrders` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tableNumber" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Order" ("createdAt", "id", "tableNumber", "updatedAt") SELECT "createdAt", "id", "tableNumber", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_ProductOrders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productName" TEXT NOT NULL,
    "productPrice" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "changeToOrder" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "ProductOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductOrders" ("id", "orderId", "productName", "productPrice", "quantity") SELECT "id", "orderId", "productName", "productPrice", "quantity" FROM "ProductOrders";
DROP TABLE "ProductOrders";
ALTER TABLE "new_ProductOrders" RENAME TO "ProductOrders";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
