import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../prisma/prisma-client";
import { ProductSchema } from "../../schemas/productSchema";

export async function createProduct(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/product", {
        schema: {
            body: ProductSchema,
        },
    }, async (request, reply) => {
        try {
            const data = request.body;
            const { title, details } = data;
            
            const existingProduct = await prisma.product.findFirst({
                where: { title },
            });

            let product;

            if (existingProduct) {
                product = await prisma.product.update({
                    where: { id: existingProduct.id },
                    data: {
                        details: {
                            create: details.map((detail) => ({
                                title: detail.title,
                                price: detail.price,
                                description: detail.description,
                                cover: detail.cover,             //FIXME: cover precisa vir do cloudflare
                                thumbnail: detail.thumbnail,    //FIXME: thumbnail precisa vir do cloudflare
                                ingredients: detail.ingredients,
                            })),
                        },
                    },
                    include: {
                        details: true,
                    },
                });
            } else {
                product = await prisma.product.create({
                    data: {
                        title,
                        details: {
                            create: details.map((detail) => ({
                                title: detail.title,
                                price: detail.price,
                                description: detail.description,
                                cover: detail.cover,
                                thumbnail: detail.thumbnail,
                                ingredients: detail.ingredients,
                            })),
                        },
                    },
                    include: {
                        details: true,
                    },
                });
            }

            const message = `Produto "${product.title}" foi criado com sucesso`;

            return reply.status(201).send({ product: product.title, message });
        } catch (error) {
            console.error("Erro ao criar o produto:", error);
            return reply.status(400).send({ error: "Erro ao criar o produto" });
        }
    });
}
