import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../prisma/prisma-client.js";
import { ProductSchema } from "../../schemas/productSchema.js";

export async function updateTitle(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put("/product/:id", {
        schema:{ 
            body: ProductSchema.partial(),
            params: z.object({
                id: z.string()
            }),
            summary: "Atualiza o título de uma única lista de produtos",
            tags: ["Products"],
        }
    }, async (request, reply) => {
        try {
            const userId = await request.getCurrentUserId();

            const productId = request.params.id;
            const data = request.body;

            if (!userId) {
                return reply.status(401).send({ error: "Usuário não autenticado" });
            }
            
            const existingProduct = await prisma.product.findUnique({
                where: { id: productId },
            });

            if (!existingProduct) {
                return reply.status(404).send({ error: "Produto não encontrado" });
            }

            if (existingProduct.userId !== userId) {
                return reply.status(403).send({ error: "Você não tem permissão para atualizar este produto" });
            }

            await prisma.product.update({
                where: { id: productId },
                data: {
                    title: data.title,
                },
            });

            const message = "Titulo do produto atualizado com sucesso";

            return reply.status(200).send({ message });
        } catch (error) {
            console.error("Erro ao atualizar o produto:", error);
            return reply.status(400).send({ error: "Erro ao atualizar o produto" });
        }

    }
)
}