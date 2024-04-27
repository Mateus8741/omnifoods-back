import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../prisma/prisma-client";
import { OrderSchema } from "../../schemas/orderSchema";

export async function createOrder(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/order", {
        schema: { 
            body: OrderSchema,
            summary: "Cria um novo pedido",
            tags: ["Orders"],
        }
    }, async (request, reply) => {
        const data = request.body;

        const { productOrders, tableNumber, changeToOrder } = data;

        const order = await prisma.order.create({
            data: {
                tableNumber,
                changeToOrder,
                createdAt: new Date(),
                productOrders: {
                    createMany: {
                        data: productOrders
                    }
                }
            },
            include: {
                productOrders: true
            }
        });

        const message = "Pedido criado com sucesso!";

        return reply.code(201).send({ order, message });

    });
    
}