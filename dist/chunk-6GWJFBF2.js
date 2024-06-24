import {
  prisma
} from "./chunk-TVWJO2T5.js";
import {
  OrderSchema
} from "./chunk-7PKT7X3J.js";

// src/routes/Orders/updateOrder.ts
import { z } from "zod";
async function updateOrderStatus(app) {
  app.withTypeProvider().put("/order/:id/status", {
    schema: {
      body: OrderSchema.pick({ status: true }),
      params: z.object({
        id: z.string().uuid()
      }),
      summary: "Atualiza o status de um pedido",
      tags: ["Orders"]
    }
  }, async (request, reply) => {
    const userId = await request.getCurrentUserId();
    const { id } = request.params;
    const { status } = request.body;
    const existingOrder = await prisma.order.findUnique({
      where: { id }
    });
    if (!existingOrder) {
      return reply.code(404).send({ message: "Pedido n\xE3o encontrado." });
    }
    if (existingOrder.userId !== userId) {
      return reply.status(403).send({ error: "Voc\xEA n\xE3o tem permiss\xE3o para atualizar este pedido" });
    }
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status }
    });
    const message = "Status do pedido atualizado com sucesso!";
    return reply.send({ order: updatedOrder, message });
  });
}

export {
  updateOrderStatus
};
