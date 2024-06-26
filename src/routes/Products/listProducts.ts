import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../prisma/prisma-client.js";


export async function listProducts(app:FastifyInstance) {
    
    app.withTypeProvider<ZodTypeProvider>().get("/product", {
        schema: {
            summary: "Lista todos os produtos",
            tags: ["Products"],
        },
    }, async (request, reply) => {
        try {
            const userId = await request.getCurrentUserId();

            if (!userId) {
                return reply.status(401).send({ error: "Usuário não autenticado" });
            }

            const data = await prisma.product.findMany({
                where: {
                    userId,
                },
                include: {
                    details: true,
                },
            });
            
            return reply.send(data);
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            return reply.status(500).send({ error: "Erro interno do servidor" });
        }
    });
}