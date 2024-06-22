import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../prisma/prisma-client.js";
import { OrderSchema } from "../../schemas/orderSchema.js";

export async function updateOrderStatus(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put("/order/:id/status", {
        schema: {
            body: OrderSchema.pick({ status: true }),
            params: z.object({
                id: z.string().uuid()
            }),
            summary: "Atualiza o status de um pedido",
            tags: ["Orders"],
        }
    }, async (request, reply) => {
        const userId = await request.getCurrentUserId();

        const { id } = request.params;
        const { status } = request.body;

        const existingOrder = await prisma.order.findUnique({
            where: { id },
        });

        if (!existingOrder) {
            return reply.code(404).send({ message: "Pedido não encontrado." });
        }

        if (existingOrder.userId !== userId) {
            return reply.status(403).send({ error: "Você não tem permissão para atualizar este pedido" });
        }

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { status },
        });

        const message = "Status do pedido atualizado com sucesso!";
        return reply.send({ order: updatedOrder, message });
    });
}
