import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../prisma/prisma-client";
import { ProductSchema } from "../../schemas/productSchema";

export async function updateTitle(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put("/product/:id", {
        schema:{ 
            body: ProductSchema.partial(),
            params: z.object({
                id: z.string()
            })
        }
    }, async (request, reply) => {
        try {
            const productId = request.params.id;
            const data = request.body;
            
            const existingProduct = await prisma.product.findUnique({
                where: { id: productId },
            });

            if (!existingProduct) {
                return reply.status(404).send({ error: "Produto não encontrado" });
            }

            const updatedTitle = await prisma.product.update({
                where: { id: productId },
                data: {
                    title: data.title,
                },
                include: {
                    details: true,
                },
            });

            const message = `Produto "${updatedTitle.title}" foi atualizado com sucesso`;

            return reply.status(200).send({ product: updatedTitle, message });
        } catch (error) {
            console.error("Erro ao atualizar o produto:", error);
            return reply.status(400).send({ error: "Erro ao atualizar o produto" });
        }

    }
)
}