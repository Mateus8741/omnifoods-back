import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../prisma/prisma-client.js";
import { OrderSchema } from "../../schemas/orderSchema.js";


export async function createOrder(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/order", {
        schema: { 
            body: OrderSchema,
            summary: "Cria um novo pedido",
            tags: ["Orders"],
        }
    }, async (request, reply) => {
        const userId = await request.getCurrentUserId();

        if (!userId) {
            return reply.code(401).send({ error: "Usuário não autenticado" });
        }

        const data = request.body;

        const { productOrders, tableNumber, changeToOrder, status } = data;

        const order = await prisma.order.create({
            data: {
                userId,
                tableNumber,
                changeToOrder,
                status,
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