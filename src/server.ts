import fastify from "fastify";
import { ZodTypeProvider, jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createOrder } from "./routes/Orders/createOrder";
import { listAllOrder } from "./routes/Orders/listOrder";
import { createProduct } from "./routes/Products/createProduct";
import { listProducts } from "./routes/Products/listProducts";
import { updateProductDetails } from "./routes/Products/updateProductDetails";
import { updateTitle } from "./routes/Products/updateTitle";

import multer from "fastify-multer";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import fastifyCors from "@fastify/cors";
import { deleteOrdersAfterTime } from "./routes/Orders/deleteordersAfterTime";
import { uploadFiles } from "./routes/Products/Files/createFiles";
import { deleteAllFiles } from "./routes/Products/Files/deleteFiles";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: "https://omnifoods-back.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
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

app.register(uploadFiles);
app.register(deleteAllFiles);

app.register(createProduct);
app.register(listProducts);
app.register(updateTitle);
app.register(updateProductDetails);

app.register(createOrder);
app.register(listAllOrder);
app.register(deleteOrdersAfterTime);


app.listen({
    port: 3100,
    host: "0.0.0.0",
}, () => console.log('Server is running on port 3100'));
