import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../prisma/prisma-client.js";

export async function listAllOrder(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get("/list-all-orders", {
        schema: {
            summary: "Lista todos os pedidos",
            tags: ["Orders"],
        },
    }, async (request, reply) => {
        try {
            const userId = await request.getCurrentUserId();

            if (!userId) {
                return reply.status(401).send({ error: "Usuário não autenticado" });
            }

            const data = await prisma.order.findMany({
                where: { userId },
                include: { productOrders: true },
                orderBy: { createdAt: "desc" }
            });

            return reply.send(data);
        } catch (error) {
            console.error("Erro ao listar pedidos:", error);
            return reply.status(500).send({ error: "Erro interno do servidor" });
        }
    });
}
