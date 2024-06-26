import {
  createOrder
} from "./chunk-NESRFQNY.js";
import {
  deleteSingleOrder
} from "./chunk-UEFQY47G.js";
import {
  deleteOrdersAfterTime
} from "./chunk-NP5XCEYZ.js";
import {
  listAllOrder
} from "./chunk-ZPYZ2KH3.js";
import {
  updateOrderStatus
} from "./chunk-6GWJFBF2.js";
import {
  uploadFiles
} from "./chunk-VVY6OK4T.js";
import {
  deleteAllFiles
} from "./chunk-LZFEEC37.js";
import {
  loginUser
} from "./chunk-ASSQY3TB.js";
import {
  refreshUserToken
} from "./chunk-WVWG5SRF.js";
import {
  registerUser
} from "./chunk-4J3SWGQF.js";
import {
  createProduct
} from "./chunk-EEQNT26Q.js";
import {
  deleteProduct
} from "./chunk-FTP7H5E6.js";
import {
  listProducts
} from "./chunk-36WRFL5M.js";
import {
  updateProductDetails
} from "./chunk-FQHMPE3R.js";
import {
  updateTitle
} from "./chunk-YAYRG6JK.js";
import "./chunk-TVWJO2T5.js";
import {
  auth
} from "./chunk-RECSMCW2.js";
import "./chunk-7PKT7X3J.js";
import "./chunk-JBQHQ5HM.js";
import "./chunk-DGRVUTU3.js";
import "./chunk-VDSVYAGG.js";

// src/server.ts
import fastify from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import multer from "fastify-multer";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
var app = fastify().withTypeProvider();
app.register(fastifyCookie);
app.register(fastifyJwt, { secret: "supersecret-omniF" });
app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
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
app.register(auth);
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
  host: "0.0.0.0"
}, () => console.log("Server is running on port 3100"));
