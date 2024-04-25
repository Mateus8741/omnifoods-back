import { z } from 'zod';

// export const ProductSchema = z.object({
//     title: z.string(),
//     productName: z.string(),
//     description: z.string(),
//     ingredients: z.string(),
//     price: z.number(),
//     cover: z.string(),
//     thumbnail: z.string(),
// })

const DetailSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  cover: z.string(),
  thumbnail: z.string(),
  ingredients: z.string(),
});

const ProductSchema = z.object({
  title: z.string(),
  details: z.array(DetailSchema),
});

export { DetailSchema, ProductSchema };

