import fastify, { FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createOrder } from "./routes/Orders/createOrder";
import { listOrder } from "./routes/Orders/listOrder";
import { createProduct } from "./routes/Products/createProduct";
import { listProducts } from "./routes/Products/listProducts";

const app: FastifyInstance = fastify({
    logger: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createProduct);
app.register(listProducts);

app.register(createOrder);
app.register(listOrder);

app.listen({
    port: 3100,
}, () => console.log('Server is running on port 3100'));
