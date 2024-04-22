import fastify from "fastify";
import { ZodTypeProvider, jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createOrder } from "./routes/Orders/createOrder";
import { listOrder } from "./routes/Orders/listOrder";
import { createProduct } from "./routes/Products/createProduct";
import { listProducts } from "./routes/Products/listProducts";
import { updateProductDetails } from "./routes/Products/updateProductDetails";
import { updateTitle } from "./routes/Products/updateTitle";

import multer from "fastify-multer";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: "*",
});

app.register(fastifySwagger, {
    swagger: {
        consumes: ["application/json"],
        produces: ["application/json"],
        info: {
            title: "OmniFoods API",
            description: "Rotas do OmniFoods",
            version: "1.0.0",
        },
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
})

app.register(multer.contentParser);

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
    host: "0.0.0.0",
}, () => console.log('Server is running on port 3100'));
