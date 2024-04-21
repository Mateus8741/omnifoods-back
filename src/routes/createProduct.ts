// import { FastifyInstance } from "fastify";
// import { ZodTypeProvider } from "fastify-type-provider-zod";
// import { prisma } from "../prisma/prisma-client";
// import { ProductSchema } from "../schemas/productSchema";

// export async function createProduct(app: FastifyInstance) {
//     app.withTypeProvider<ZodTypeProvider>().post("/product", {
//         schema: {
//             body: ProductSchema,
//         },
//     }, async (request, reply) => {
//         const data = request.body;
    
//         const product = await prisma.product.create({
//             data: {
//                 title: data.title,
//                 details: {
//                     create: data.details.map((detail) => ({
//                         title: detail.title,
//                         price: detail.price,
//                         description: detail.description,
//                         cover: detail.cover,
//                         thumbnail: detail.thumbnail,
//                         ingredients: {
//                             create: detail.ingredients.map((ingredient) => ({
//                                 name: ingredient,
//                             })),
//                         },
//                     })),
//                 },
//             },
//         });
    
//         const message = `Produto "${product.title}" foi criado com sucesso`;
    
//         return reply.status(201).send({ product: product.title, message });
//     });
// }

import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../prisma/prisma-client";
import { ProductSchema } from "../schemas/productSchema";

export async function createProduct(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/product", {
        schema: {
            body: ProductSchema,
        },
    }, async (request, reply) => {
        try {
            const data = request.body;
            
            // Extrai os detalhes do produto do objeto de dados
            const { title, details } = data;
            
            // Cria os detalhes do produto formatados para o Prisma
            const formattedDetails = details.map((detail) => ({
                title: detail.title,
                price: detail.price,
                description: detail.description,
                cover: detail.cover,
                thumbnail: detail.thumbnail,
                ingredients: detail.ingredients
            }));

            // Cria o produto principal com os detalhes
            const product = await prisma.product.create({
                data: {
                    title,
                    details: {
                        create: formattedDetails,
                    },
                },
                include: {
                    details: true, // Inclui os detalhes criados na resposta
                },
            });

            const message = `Produto "${product.title}" foi criado com sucesso`;

            return reply.status(201).send({ product: product.title, message });
        } catch (error) {
            console.error("Erro ao criar o produto:", error);
            return reply.status(400).send({ error: "Erro ao criar o produto" });
        }
    });
}
