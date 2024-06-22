import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../prisma/prisma-client.js";

export async function deleteSingleOrder(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete("/order/:id", {
        schema: {
            params: z.object({
                id: z.string().uuid()
            }),
            summary: "Deleta um pedido pelo ID",
            tags: ["Orders"],
        },
    }, async (request, reply) => {
        const userId = await request.getCurrentUserId();

        if (!userId) {
            return reply.status(401).send({ error: "Usuário não autenticado" });
        }

        const { id } = request.params;

        const order = await prisma.order.findUnique({
            where: { id },
        });
        
        if (!order) {
            return reply.code(404).send({ message: "Pedido não encontrado." });
        }

        if (order.userId !== userId) {
            return reply.status(403).send({ error: "Você não tem permissão para deletar este pedido" });
        }

        await prisma.productOrders.deleteMany({
            where: { orderId: id },
        });

        await prisma.order.delete({
            where: { id },
        });

        return reply.send({ message: "Pedido deletado com sucesso!" });
    });
}