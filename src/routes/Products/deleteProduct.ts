import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../prisma/prisma-client.js";

export async function deleteProduct(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete("/product/:productId", {
        schema: {
            params: z.object({
                productId: z.string(),
            }),
            summary: "Deleta um produto pelo ID",
            tags: ["Products"],
        },
    }, async (request, reply) => {
        const userId = await request.getCurrentUserId();

        if (!userId) {
            return reply.status(401).send({ error: "Usuário não autenticado" });
        }
        
        try {
            const { productId } = request.params;
            console.log(productId);

            const existingProduct = await prisma.product.findUnique({
                where: {
                    id: productId,
                },
            });

            console.log(existingProduct);

            if (!existingProduct || existingProduct.userId !== userId) {
                return reply.status(404).send({ error: "Produto não encontrado" });
            }

            await prisma.detail.deleteMany({
                where: {
                    productId: productId,
                },
            });

            await prisma.product.delete({
                where: { id: productId },
            });

            return reply.status(200).send({ message: "Produto deletado com sucesso" });
        } catch (error) {
            console.error("Erro ao deletar o produto:", error);
            return reply.status(400).send({ error: "Erro ao deletar o produto" });
        }
    });}