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
        const data = request.body;
    
        const product = await prisma.product.create({
            data,
        });
    
        const message = `Produto "${product.title}" foi criado com sucesso`;
    
        return reply.status(201).send({ product: product.title, message });
    });
}