import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../prisma/prisma-client.js";
import { DetailSchema } from "../../schemas/productSchema.js";


export async function updateProductDetails(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().patch("/product/:productId/details/:detailId", {
        schema: {
            params: z.object({
                productId: z.string(),
                detailId: z.string(),
            }),
            body: DetailSchema.partial(),
            summary: "Atualiza detalhes de um único produto",
            tags: ["Products"],
        },
    }, async (request, reply) => {
        try {
            const { productId, detailId } = request.params;
            const updatedDetailData = request.body;

            const existingDetail = await prisma.detail.findUnique({
                where: { id: detailId },
            });

            if (!existingDetail || existingDetail.productId !== productId) {
                return reply.status(404).send({ error: "Detalhe não encontrado" });
            }

            await prisma.detail.update({
                where: { id: detailId },
                data: updatedDetailData,
            });

            const message = "Produto foi atualizado com sucesso";

            return reply.status(200).send({ message });
        } catch (error) {
            console.error("Erro ao atualizar o detalhe:", error);
            return reply.status(400).send({ error: "Erro ao atualizar o detalhe" });
        }
    });
}
