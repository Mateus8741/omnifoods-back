import { z } from "zod";

const ProductOrderSchema = z.object({
  productName: z.string(),
  productPrice: z.number(),
  quantity: z.number(),
  changeToOrder: z.string().default(""),
});

const OrderSchema = z.object({
  productOrders: z.array(ProductOrderSchema),
  tableNumber: z.number(),
});

export { OrderSchema, ProductOrderSchema };

