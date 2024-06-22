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
        const userId = await request.getCurrentUserId();

        if (!userId) {
            return reply.status(401).send({ error: "Usuário não autenticado" });
        }

        try {
            const { productId, detailId } = request.params;
            const updatedDetailData = request.body;

            const existingDetail = await prisma.detail.findUnique({
                where: {
                    id: detailId,
                },
                include: {
                    product: true,
                },
            });

            if (!existingDetail || existingDetail.productId !== productId) {
                return reply.status(404).send({ error: "Detalhe não encontrado" });
            }

            if (existingDetail.product.userId !== userId) {
                return reply.status(403).send({ error: "Você não tem permissão para atualizar este produto" });
            }

            await prisma.detail.updateMany({
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
