// src/schemas/productSchema.ts
import { z } from "zod";
var DetailSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  cover: z.string(),
  thumbnail: z.string(),
  ingredients: z.string()
});
var ProductSchema = z.object({
  title: z.string(),
  details: z.array(DetailSchema)
});

export {
  DetailSchema,
  ProductSchema
};
