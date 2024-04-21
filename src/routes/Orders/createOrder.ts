import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../prisma/prisma-client";
import { OrderSchema } from "../../schemas/orderSchema";

export async function createOrder(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/order", {
        schema: { body: OrderSchema }
    }, async (request, reply) => {
        const data = request.body;

        const { productOrders, tableNumber, changeToOrder } = data;

        const order = await prisma.order.create({
            data: {
                tableNumber,
                changeToOrder,
                createdAt: new Date(),
                productOrders: {
                    create: productOrders.map((productOrder) => ({
                        productName: productOrder.productName,
                        productPrice: productOrder.productPrice,
                        quantity: productOrder.quantity,
                    }))
                }
            },
            include: {
                productOrders: true
            }
        });

        const message = "Order created successfully";

        return reply.code(201).send({ order, message });

    });
    
}