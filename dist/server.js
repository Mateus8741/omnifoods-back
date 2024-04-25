import {
  createOrder
} from "./chunk-OF64OJKM.js";
import {
  listOrder
} from "./chunk-XCRR4NBF.js";
import {
  createFile
} from "./chunk-M4ES2MJ2.js";
import "./chunk-JCEUT3GH.js";
import {
  createProduct
} from "./chunk-3ERNXGC5.js";
import {
  listProducts
} from "./chunk-IU3Q4PXN.js";
import {
  updateProductDetails
} from "./chunk-EPWAOZEC.js";
import {
  updateTitle
} from "./chunk-YUTGEPQ6.js";
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
  origin: "*"
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
app.register(createFile);
app.register(createProduct);
app.register(listProducts);
app.register(updateTitle);
app.register(updateProductDetails);
app.register(createOrder);
app.register(listOrder);
app.listen({
  port: 3100,
  host: "0.0.0.0"
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
