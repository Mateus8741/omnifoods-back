import fastify, { FastifyInstance } from "fastify";
import { prisma } from "./prisma/prisma-client";
import { productSchema } from "./schemas/productSchema";

const app: FastifyInstance = fastify({logger: true});

app.get("/product", async (request, reply) => {
    return { hello: "world" };
});

app.post("/product", async (request, reply) => {
    const data = productSchema.parse(request.body);

    const product = await prisma.product.create({
        data,
    });

    const message = `Produto "${product.name}" foi criado com sucesso`;

    return reply.status(201).send({ product: product.name, message });
});

app.listen({
    port: 3100,
}, () => console.log('Server is running on port 3100'));
