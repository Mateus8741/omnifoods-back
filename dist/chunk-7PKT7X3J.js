// src/schemas/orderSchema.ts
import { z } from "zod";
var OrderStatusEnum = z.enum(["PENDING", "COMPLETED", "PREPARING"]).default("PENDING");
var ProductOrderSchema = z.object({
  productName: z.string(),
  productPrice: z.number(),
  quantity: z.number()
});
var OrderSchema = z.object({
  productOrders: z.array(ProductOrderSchema),
  tableNumber: z.number(),
  changeToOrder: z.string().optional().default(""),
  status: OrderStatusEnum
});

export {
  ProductOrderSchema,
  OrderSchema
};
