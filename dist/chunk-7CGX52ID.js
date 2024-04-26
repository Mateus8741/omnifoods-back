import {
  ProductSchema
} from "./chunk-JBQHQ5HM.js";
import {
  prisma
} from "./chunk-TVWJO2T5.js";
import {
  __async
} from "./chunk-5HTTFJTC.js";

// src/routes/Products/updateTitle.ts
import { z } from "zod";
function updateTitle(app) {
  return __async(this, null, function* () {
    app.withTypeProvider().put(
      "/product/:id",
      {
        schema: {
          body: ProductSchema.partial(),
          params: z.object({
            id: z.string()
          }),
          summary: "Atualiza o t\xEDtulo de uma \xFAnica lista de produtos",
          tags: ["Products"]
        }
      },
      (request, reply) => __async(this, null, function* () {
        try {
          const productId = request.params.id;
          const data = request.body;
          const existingProduct = yield prisma.product.findUnique({
            where: { id: productId }
          });
          if (!existingProduct) {
            return reply.status(404).send({ error: "Produto n\xE3o encontrado" });
          }
          yield prisma.product.update({
            where: { id: productId },
            data: {
              title: data.title
            }
          });
          const message = "Titulo do produto atualizado com sucesso";
          return reply.status(200).send({ message });
        } catch (error) {
          console.error("Erro ao atualizar o produto:", error);
          return reply.status(400).send({ error: "Erro ao atualizar o produto" });
        }
      })
    );
  });
}

export {
  updateTitle
};
