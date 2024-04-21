import { FastifyInstance } from "fastify";
import { prisma } from "../prisma/prisma-client";

export async function listProducts(app:FastifyInstance) {
    
    app.get("/product", async (request, reply) => {
        const data = await prisma.product.findMany({
            include: { details: true },
        });
        
        return data;
    });
}