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
    const data = await prisma.product.findMany({
      include: { details: true }
    });
    return data;
  });
}

export {
  listProducts
};
