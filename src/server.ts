import fastify, { FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createOrder } from "./routes/Orders/createOrder";
import { listOrder } from "./routes/Orders/listOrder";
import { createProduct } from "./routes/Products/createProduct";
import { listProducts } from "./routes/Products/listProducts";
import { updateProductDetails } from "./routes/Products/updateProductDetails";
import { updateTitle } from "./routes/Products/updateTitle";

const app: FastifyInstance = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createProduct);
app.register(listProducts);
app.register(updateTitle);
app.register(updateProductDetails);

app.register(createOrder);
app.register(listOrder);

app.listen({
    port: 3100,
}, () => console.log('Server is running on port 3100'));
