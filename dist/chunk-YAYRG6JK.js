import {
  prisma
} from "./chunk-TVWJO2T5.js";
import {
  ProductSchema
} from "./chunk-JBQHQ5HM.js";

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
        const userId = await request.getCurrentUserId();
        const productId = request.params.id;
        const data = request.body;
        if (!userId) {
          return reply.status(401).send({ error: "Usu\xE1rio n\xE3o autenticado" });
        }
        const existingProduct = await prisma.product.findUnique({
          where: { id: productId }
        });
        if (!existingProduct) {
          return reply.status(404).send({ error: "Produto n\xE3o encontrado" });
        }
        if (existingProduct.userId !== userId) {
          return reply.status(403).send({ error: "Voc\xEA n\xE3o tem permiss\xE3o para atualizar este produto" });
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
