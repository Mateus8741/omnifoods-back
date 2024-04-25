import { FastifyInstance } from "fastify";
import { prisma } from "../../prisma/prisma-client";

export async function listOrder(app: FastifyInstance) {
    app.get("/order", async (request, reply) => {
        const data = await prisma.order.findMany({
            include: { productOrders: true },
            orderBy: { createdAt: "desc" }
        });

        return data
    });
    
}