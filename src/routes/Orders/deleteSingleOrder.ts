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
        const { id } = request.params;

        const order = await prisma.order.findUnique({
            where: { id },
        });
        
        if (!order) {
            return reply.code(404).send({ message: "Pedido não encontrado." });
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