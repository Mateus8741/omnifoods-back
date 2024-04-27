import {
  createOrder
} from "./chunk-DFWVGEZZ.js";
import {
  deleteOrdersAfterTime
} from "./chunk-3KWJVCHH.js";
import {
  listAllOrder
} from "./chunk-Q4GQGETK.js";
import {
  uploadFiles
} from "./chunk-PWLLZGE4.js";
import {
  deleteAllFiles
} from "./chunk-QV2QDNAO.js";
import "./chunk-JCEUT3GH.js";
import {
  createProduct
} from "./chunk-SFR3FTCD.js";
import {
  listProducts
} from "./chunk-MM7QLOQE.js";
import {
  updateProductDetails
} from "./chunk-4ICQX7FR.js";
import {
  updateTitle
} from "./chunk-7CGX52ID.js";
import "./chunk-JBQHQ5HM.js";
import "./chunk-TVWJO2T5.js";
import "./chunk-5HTTFJTC.js";

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
  methods: ["GET", "POST", "PUT", "DELETE"],
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
