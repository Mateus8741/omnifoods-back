import { z } from "zod";

const ProductOrderSchema = z.object({
  productName: z.string(),
  productPrice: z.number(),
  quantity: z.number(),
});

const OrderSchema = z.object({
  productOrders: z.array(ProductOrderSchema),
  tableNumber: z.number(),
  changeToOrder: z.string().optional().default(""),
});

export { OrderSchema, ProductOrderSchema };

