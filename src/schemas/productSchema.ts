import { z } from 'zod'

export const productSchema = z.object({
    title: z.string(),
    name: z.string(),
    description: z.string(),
    ingredients: z.string(),
    price: z.number(),
    cover: z.string(),
    thumbnail: z.string(),
})
