import {
  prisma
} from "./chunk-TVWJO2T5.js";
import {
  DetailSchema
} from "./chunk-JBQHQ5HM.js";

// src/routes/Products/updateProductDetails.ts
import { z } from "zod";
async function updateProductDetails(app) {
  app.withTypeProvider().patch("/product/:productId/details/:detailId", {
    schema: {
      params: z.object({
        productId: z.string(),
        detailId: z.string()
      }),
      body: DetailSchema.partial(),
      summary: "Atualiza detalhes de um \xFAnico produto",
      tags: ["Products"]
    }
  }, async (request, reply) => {
    const userId = await request.getCurrentUserId();
    if (!userId) {
      return reply.status(401).send({ error: "Usu\xE1rio n\xE3o autenticado" });
    }
    try {
      const { productId, detailId } = request.params;
      const updatedDetailData = request.body;
      const existingDetail = await prisma.detail.findUnique({
        where: {
          id: detailId
        },
        include: {
          product: true
        }
      });
      if (!existingDetail || existingDetail.productId !== productId) {
        return reply.status(404).send({ error: "Detalhe n\xE3o encontrado" });
      }
      if (existingDetail.product.userId !== userId) {
        return reply.status(403).send({ error: "Voc\xEA n\xE3o tem permiss\xE3o para atualizar este produto" });
      }
      await prisma.detail.updateMany({
        where: { id: detailId },
        data: updatedDetailData
      });
      const message = "Produto foi atualizado com sucesso";
      return reply.status(200).send({ message });
    } catch (error) {
      console.error("Erro ao atualizar o detalhe:", error);
      return reply.status(400).send({ error: "Erro ao atualizar o detalhe" });
    }
  });
}

export {
  updateProductDetails
};
