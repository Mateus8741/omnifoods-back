import {
  DetailSchema
} from "./chunk-JBQHQ5HM.js";
import {
  prisma
} from "./chunk-TVWJO2T5.js";
import {
  __async
} from "./chunk-5HTTFJTC.js";

// src/routes/Products/updateProductDetails.ts
import { z } from "zod";
function updateProductDetails(app) {
  return __async(this, null, function* () {
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
    }, (request, reply) => __async(this, null, function* () {
      try {
        const { productId, detailId } = request.params;
        const updatedDetailData = request.body;
        const existingDetail = yield prisma.detail.findUnique({
          where: { id: detailId }
        });
        if (!existingDetail || existingDetail.productId !== productId) {
          return reply.status(404).send({ error: "Detalhe n\xE3o encontrado" });
        }
        yield prisma.detail.update({
          where: { id: detailId },
          data: updatedDetailData
        });
        const message = "Produto foi atualizado com sucesso";
        return reply.status(200).send({ message });
      } catch (error) {
        console.error("Erro ao atualizar o detalhe:", error);
        return reply.status(400).send({ error: "Erro ao atualizar o detalhe" });
      }
    }));
  });
}

export {
  updateProductDetails
};
