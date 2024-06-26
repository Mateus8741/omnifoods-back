import {
  prisma
} from "./chunk-TVWJO2T5.js";

// src/routes/Products/listProducts.ts
async function listProducts(app) {
  app.withTypeProvider().get("/product", {
    schema: {
      summary: "Lista todos os produtos",
      tags: ["Products"]
    }
  }, async (request, reply) => {
    try {
      const userId = await request.getCurrentUserId();
      if (!userId) {
        return reply.status(401).send({ error: "Usu\xE1rio n\xE3o autenticado" });
      }
      const data = await prisma.product.findMany({
        where: {
          userId
        },
        include: {
          details: true
        }
      });
      return reply.send(data);
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  });
}

export {
  listProducts
};
