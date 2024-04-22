import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../prisma/prisma-client";
import { DetailSchema } from "../../schemas/productSchema";

export async function updateProductDetails(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().patch("/product/:productId/details/:detailId", {
        schema: {
            params: z.object({
                productId: z.string(),
                detailId: z.string(),
            }),
            body: DetailSchema.partial(),
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

            const updatedDetail = await prisma.detail.update({
                where: { id: detailId },
                data: updatedDetailData,
            });

            const message = `Produto "${updatedDetailData.name}" foi atualizado com sucesso`;

            return reply.status(200).send({ detail: updatedDetail, message });
        } catch (error) {
            console.error("Erro ao atualizar o detalhe:", error);
            return reply.status(400).send({ error: "Erro ao atualizar o detalhe" });
        }
    });
}
