import { z } from 'zod'

export const ProductSchema = z.object({
    title: z.string(),
    productName: z.string(),
    description: z.string(),
    ingredients: z.string(),
    price: z.number(),
    cover: z.string(),
    thumbnail: z.string(),
})
