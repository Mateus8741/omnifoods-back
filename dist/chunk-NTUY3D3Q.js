// src/schemas/orderSchema.ts
import { z } from "zod";
var ProductOrderSchema = z.object({
  productName: z.string(),
  productPrice: z.number(),
  quantity: z.number(),
  changeToOrder: z.string().optional().default("")
});
var OrderSchema = z.object({
  productOrders: z.array(ProductOrderSchema),
  tableNumber: z.number()
});

export {
  ProductOrderSchema,
  OrderSchema
};
