import { FastifyInstance } from "fastify";
import { prisma } from "../prisma/prisma-client";

export async function listProducts(app:FastifyInstance) {
    const data = prisma.product.findMany({
        include: { details: true }
    });

    app.get("/product", async (request, reply) => {

        return data;
    });
}