import fastify, { FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createProduct } from "./routes/createProduct";
import { listProducts } from "./routes/listProducts";

const app: FastifyInstance = fastify({logger: true});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createProduct, listProducts);

app.listen({
    port: 3100,
}, () => console.log('Server is running on port 3100'));
