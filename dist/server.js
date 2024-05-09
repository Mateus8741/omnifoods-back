import {
  listProducts
} from "./chunk-ZKVNQQ5M.js";
import {
  updateProductDetails
} from "./chunk-CKX2X4K4.js";
import {
  updateTitle
} from "./chunk-S6RIPNJ5.js";
import {
  uploadFiles
} from "./chunk-3BZBQPWH.js";
import {
  deleteAllFiles
} from "./chunk-LZFEEC37.js";
import {
  createOrder
} from "./chunk-6XK7RS35.js";
import "./chunk-JCEUT3GH.js";
import {
  deleteOrdersAfterTime
} from "./chunk-NP5XCEYZ.js";
import {
  listAllOrder
} from "./chunk-2WSY5XT2.js";
import {
  createProduct
} from "./chunk-ZW3T2JMS.js";
import "./chunk-JBQHQ5HM.js";
import "./chunk-TVWJO2T5.js";

// src/server.ts
import fastify from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import multer from "fastify-multer";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
var app = fastify().withTypeProvider();
app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"]
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "OmniFoods API",
      description: "Rotas do OmniFoods",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
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
  host: "0.0.0.0"
}, () => console.log("Server is running on port 3100"));
