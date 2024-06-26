import fastify from "fastify";
import { ZodTypeProvider, jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

import multer from "fastify-multer";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import fastifyCookie from '@fastify/cookie';
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { auth } from "./middleware/verify-jwt.js";
import { loginUser } from "./routes/Auth/loginUser.js";
import { refreshUserToken } from "./routes/Auth/refreshToken.js";
import { registerUser } from "./routes/Auth/registerUser.js";
import { createOrder } from "./routes/Orders/createOrder.js";
import { deleteSingleOrder } from "./routes/Orders/deleteSingleOrder.js";
import { deleteOrdersAfterTime } from "./routes/Orders/deleteordersAfterTime.js";
import { listAllOrder } from "./routes/Orders/listOrder.js";
import { updateOrderStatus } from "./routes/Orders/updateOrder.js";
import { uploadFiles } from "./routes/Products/Files/createFiles.js";
import { deleteAllFiles } from "./routes/Products/Files/deleteFiles.js";
import { createProduct } from "./routes/Products/createProduct.js";
import { deleteProduct } from "./routes/Products/deleteProduct.js";
import { listProducts } from "./routes/Products/listProducts.js";
import { updateProductDetails } from "./routes/Products/updateProductDetails.js";
import { updateTitle } from "./routes/Products/updateTitle.js";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCookie)
app.register(fastifyJwt, { secret: 'supersecret-omniF' })

app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
app.register(auth)

app.register(uploadFiles);
app.register(deleteAllFiles);

app.register(createProduct);
app.register(listProducts);
app.register(updateTitle);
app.register(updateProductDetails);
app.register(deleteProduct);

app.register(createOrder);
app.register(listAllOrder);
app.register(updateOrderStatus);
app.register(deleteOrdersAfterTime);
app.register(deleteSingleOrder);

app.register(registerUser);
app.register(loginUser);
app.register(refreshUserToken);

app.listen({
    port: 3100,
    host: "0.0.0.0",
}, () => console.log('Server is running on port 3100'));
