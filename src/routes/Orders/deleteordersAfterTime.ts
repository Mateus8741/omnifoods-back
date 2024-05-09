import { FastifyInstance } from 'fastify';
import { prisma } from '../../prisma/prisma-client.js';


export async function deleteOrdersAfterTime(app: FastifyInstance) {
    app.delete("/delete-all-orders", {
        schema: {
            summary: "Deleta todos os pedidos criados",
            tags: ["Orders"],
        },
    }, async (request, reply) => {
        const currentTime = new Date(); //precisa mudar

        const orders = await prisma.order.findMany({
            where: {
                createdAt: {
                    lt: currentTime,
                },
            },
        });

        const [ deletedOrders ] = await Promise.all([
            prisma.productOrders.deleteMany({
                where: {
                    orderId: {
                        in: orders.map((order) => order.id),
                    },
                },
            }),

            prisma.order.deleteMany({
                where: {
                    id: {
                        in: orders.map((order) => order.id),
                    },
                },
            }),
        ])

        return deletedOrders.count;
    });
}