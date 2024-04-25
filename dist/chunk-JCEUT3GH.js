// src/schemas/orderSchema.ts
import { z } from "zod";
var ProductOrderSchema = z.object({
  productName: z.string(),
  productPrice: z.number(),
  quantity: z.number()
});
var OrderSchema = z.object({
  productOrders: z.array(ProductOrderSchema),
  tableNumber: z.number(),
  changeToOrder: z.string().optional().default("")
});

export {
  ProductOrderSchema,
  OrderSchema
};
