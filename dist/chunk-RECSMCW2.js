// src/middleware/verify-jwt.ts
import fastifyPlugin from "fastify-plugin";
var auth = fastifyPlugin(async (app) => {
  app.addHook("preHandler", async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify();
        return sub;
      } catch {
        throw new Error("Unauthorized");
      }
    };
  });
});

export {
  auth
};
