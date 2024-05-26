import fastify from "fastify";
import { ZodTypeProvider, jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

import multer from "fastify-multer";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import fastifyCors from "@fastify/cors";
import { createOrder } from "./routes/Orders/createOrder.js";
import { deleteSingleOrder } from "./routes/Orders/deleteSingleOrder.js";
import { deleteOrdersAfterTime } from "./routes/Orders/deleteordersAfterTime.js";
import { listAllOrder } from "./routes/Orders/listOrder.js";
import { updateOrderStatus } from "./routes/Orders/updateOrder.js";
import { uploadFiles } from "./routes/Products/Files/createFiles.js";
import { deleteAllFiles } from "./routes/Products/Files/deleteFiles.js";
import { createProduct } from "./routes/Products/createProduct.js";
import { listProducts } from "./routes/Products/listProducts.js";
import { updateProductDetails } from "./routes/Products/updateProductDetails.js";
import { updateTitle } from "./routes/Products/updateTitle.js";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
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
app.register(updateOrderStatus);
app.register(deleteOrdersAfterTime);
app.register(deleteSingleOrder);


app.listen({
    port: 3100,
    host: "0.0.0.0",
}, () => console.log('Server is running on port 3100'));
