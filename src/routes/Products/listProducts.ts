import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../prisma/prisma-client";

export async function listProducts(app:FastifyInstance) {
    
    app.withTypeProvider<ZodTypeProvider>().get("/product", {
        schema: {
            summary: "Lista todos os produtos",
            tags: ["Products"],
        },
    }, async (request, reply) => {
        const data = await prisma.product.findMany({
            include: { details: true },
        });
        
        return data;
    });
}