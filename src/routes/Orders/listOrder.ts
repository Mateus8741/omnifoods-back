import { FastifyInstance } from "fastify";

export async function listOrder(app: FastifyInstance) {
    app.get("/order", async (request, reply) => {
        return {
            message: "List of orders",
        }
    });
    
}