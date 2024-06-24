import {
  RefreshTokenSchema
} from "./chunk-DGRVUTU3.js";

// src/routes/Auth/refreshToken.ts
async function refreshUserToken(app) {
  app.withTypeProvider().post(
    "/auth/refresh-token",
    {
      schema: {
        body: RefreshTokenSchema,
        summary: "Refresh user token",
        tags: ["User"]
      }
    },
    async (request, reply) => {
      const { refreshToken } = request.body;
      try {
        const decoded = app.jwt.verify(refreshToken);
        const newToken = await reply.jwtSign(
          {
            sub: decoded
          },
          {
            expiresIn: "1m"
          }
        );
        return reply.send({
          token: newToken
        });
      } catch (error) {
        reply.status(401);
        return {
          error: "Invalid refresh token"
        };
      }
    }
  );
}

export {
  refreshUserToken
};
