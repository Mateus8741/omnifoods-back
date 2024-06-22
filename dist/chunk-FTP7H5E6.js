import {
  prisma
} from "./chunk-TVWJO2T5.js";

// src/routes/Products/deleteProduct.ts
import { z } from "zod";
async function deleteProduct(app) {
  app.withTypeProvider().delete("/product/:productId", {
    schema: {
      params: z.object({
        productId: z.string()
      }),
      summary: "Deleta um produto pelo ID",
      tags: ["Products"]
    }
  }, async (request, reply) => {
    const userId = await request.getCurrentUserId();
    if (!userId) {
      return reply.status(401).send({ error: "Usu\xE1rio n\xE3o autenticado" });
    }
    try {
      const { productId } = request.params;
      console.log(productId);
      const existingProduct = await prisma.product.findUnique({
        where: {
          id: productId
        }
      });
      console.log(existingProduct);
      if (!existingProduct || existingProduct.userId !== userId) {
        return reply.status(404).send({ error: "Produto n\xE3o encontrado" });
      }
      await prisma.detail.deleteMany({
        where: {
          productId
        }
      });
      await prisma.product.delete({
        where: { id: productId }
      });
      return reply.status(200).send({ message: "Produto deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar o produto:", error);
      return reply.status(400).send({ error: "Erro ao deletar o produto" });
    }
  });
}

export {
  deleteProduct
};
