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
    return data;
  });
}

export {
  listProducts
};
