import {
  ProductSchema
} from "./chunk-JBQHQ5HM.js";
import {
  prisma
} from "./chunk-TVWJO2T5.js";

// src/routes/Products/createProduct.ts
async function createProduct(app) {
  app.withTypeProvider().post("/product", {
    schema: {
      body: ProductSchema,
      summary: "Cria um novo produto",
      tags: ["Products"]
    }
  }, async (request, reply) => {
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
