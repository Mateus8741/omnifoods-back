import {
  ProductSchema
} from "./chunk-JBQHQ5HM.js";
import {
  prisma
} from "./chunk-TVWJO2T5.js";

// src/routes/Products/updateTitle.ts
import { z } from "zod";
async function updateTitle(app) {
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
    async (request, reply) => {
      try {
        const productId = request.params.id;
        const data = request.body;
        const existingProduct = await prisma.product.findUnique({
          where: { id: productId }
        });
        if (!existingProduct) {
          return reply.status(404).send({ error: "Produto n\xE3o encontrado" });
        }
        await prisma.product.update({
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
    }
  );
}

export {
  updateTitle
};
