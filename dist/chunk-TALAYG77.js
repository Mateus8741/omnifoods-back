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
    const { id } = request.params;
    const order = await prisma.order.findUnique({
      where: { id }
    });
    if (!order) {
      return reply.code(404).send({ message: "Pedido n\xE3o encontrado." });
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
