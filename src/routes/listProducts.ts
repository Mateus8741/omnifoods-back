import { FastifyInstance } from "fastify";

export async function listProducts(app:FastifyInstance) {
    app.get("/product", async (request, reply) => {
        return { hello: "world" };
    });
}