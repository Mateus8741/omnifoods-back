-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductOrders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productName" TEXT NOT NULL,
    "productPrice" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "changeToOrder" TEXT,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "ProductOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductOrders" ("changeToOrder", "id", "orderId", "productName", "productPrice", "quantity") SELECT "changeToOrder", "id", "orderId", "productName", "productPrice", "quantity" FROM "ProductOrders";
DROP TABLE "ProductOrders";
ALTER TABLE "new_ProductOrders" RENAME TO "ProductOrders";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
