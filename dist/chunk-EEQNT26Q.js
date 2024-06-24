import {
  prisma
} from "./chunk-TVWJO2T5.js";
import {
  ProductSchema
} from "./chunk-JBQHQ5HM.js";

// src/routes/Products/createProduct.ts
async function createProduct(app) {
  app.withTypeProvider().post("/product", {
    schema: {
      body: ProductSchema,
      summary: "Cria um novo produto",
      tags: ["Products"]
    }
  }, async (request, reply) => {
    const userId = await request.getCurrentUserId();
    if (!userId) {
      return reply.status(401).send({ error: "Usu\xE1rio n\xE3o autenticado" });
    }
    try {
      const data = request.body;
      const { title, details } = data;
      const existingProduct = await prisma.product.findFirst({
        where: { title }
      });
      let product;
      if (existingProduct) {
        product = await prisma.product.update({
          where: { id: existingProduct.id },
          data: {
            userId,
            details: {
              createMany: {
                data: details
              }
            }
          },
          include: {
            details: true
          }
        });
      } else {
        product = await prisma.product.create({
          data: {
            title,
            userId,
            details: {
              createMany: {
                data: details
              }
            }
          },
          include: {
            details: true
          }
        });
      }
      const message = `Produto "${product.title}" foi criado com sucesso`;
      return reply.status(201).send({ product: product.title, message });
    } catch (error) {
      console.error("Erro ao criar o produto:", error);
      return reply.status(400).send({ error: "Erro ao criar o produto" });
    }
  });
}

export {
  createProduct
};
