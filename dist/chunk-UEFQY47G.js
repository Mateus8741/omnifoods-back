import {
  prisma
} from "./chunk-TVWJO2T5.js";

// src/routes/Orders/deleteSingleOrder.ts
import { z } from "zod";
async function deleteSingleOrder(app) {
  app.withTypeProvider().delete("/order/:id", {
    schema: {
      params: z.object({
        id: z.string().uuid()
      }),
      summary: "Deleta um pedido pelo ID",
      tags: ["Orders"]
    }
  }, async (request, reply) => {
    const userId = await request.getCurrentUserId();
    if (!userId) {
      return reply.status(401).send({ error: "Usu\xE1rio n\xE3o autenticado" });
    }
    const { id } = request.params;
    const order = await prisma.order.findUnique({
      where: { id }
    });
    if (!order) {
      return reply.code(404).send({ message: "Pedido n\xE3o encontrado." });
    }
    if (order.userId !== userId) {
      return reply.status(403).send({ error: "Voc\xEA n\xE3o tem permiss\xE3o para deletar este pedido" });
    }
    await prisma.productOrders.deleteMany({
      where: { orderId: id }
    });
    await prisma.order.delete({
      where: { id }
    });
    return reply.send({ message: "Pedido deletado com sucesso!" });
  });
}

export {
  deleteSingleOrder
};
