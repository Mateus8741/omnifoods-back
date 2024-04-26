import {
  ProductSchema
} from "./chunk-JBQHQ5HM.js";
import {
  prisma
} from "./chunk-TVWJO2T5.js";
import {
  __async
} from "./chunk-5HTTFJTC.js";

// src/routes/Products/createProduct.ts
function createProduct(app) {
  return __async(this, null, function* () {
    app.withTypeProvider().post("/product", {
      schema: {
        body: ProductSchema,
        summary: "Cria um novo produto",
        tags: ["Products"]
      }
    }, (request, reply) => __async(this, null, function* () {
      try {
        const data = request.body;
        const { title, details } = data;
        const existingProduct = yield prisma.product.findFirst({
          where: { title }
        });
        let product;
        if (existingProduct) {
          product = yield prisma.product.update({
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
          product = yield prisma.product.create({
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
    }));
  });
}

export {
  createProduct
};
