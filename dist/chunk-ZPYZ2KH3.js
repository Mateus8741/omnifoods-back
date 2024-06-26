import {
  prisma
} from "./chunk-TVWJO2T5.js";

// src/routes/Orders/listOrder.ts
async function listAllOrder(app) {
  app.withTypeProvider().get("/list-all-orders", {
    schema: {
      summary: "Lista todos os pedidos",
      tags: ["Orders"]
    }
  }, async (request, reply) => {
    try {
      const userId = await request.getCurrentUserId();
      if (!userId) {
        return reply.status(401).send({ error: "Usu\xE1rio n\xE3o autenticado" });
      }
      const data = await prisma.order.findMany({
        where: { userId },
        include: { productOrders: true },
        orderBy: { createdAt: "desc" }
      });
      return reply.send(data);
    } catch (error) {
      console.error("Erro ao listar pedidos:", error);
      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  });
}

export {
  listAllOrder
};
