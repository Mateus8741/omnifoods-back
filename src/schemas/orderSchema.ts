import { z } from "zod";

const OrderStatusEnum = z.enum(["PENDING", "COMPLETED", "CANCELLED"]).default("PENDING");

const ProductOrderSchema = z.object({
  productName: z.string(),
  productPrice: z.number(),
  quantity: z.number(),
});

const OrderSchema = z.object({
  productOrders: z.array(ProductOrderSchema),
  tableNumber: z.number(),
  changeToOrder: z.string().optional().default(""),
  status: OrderStatusEnum,
});

export { OrderSchema, ProductOrderSchema };

