import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { RefreshTokenSchema } from "../../schemas/refreshTokenSchema.js"

export async function refreshUserToken(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
      '/auth/refresh-token',
      {
        schema: {
          body: RefreshTokenSchema,
          summary: 'Refresh user token',
          tags: ['User'],
        }
      },
      async (request, reply) => {
        const { refreshToken } = request.body
  
        try {
          const decoded = app.jwt.verify(refreshToken)

          const newToken = await reply.jwtSign(
            {
              sub: decoded,
            },
            {
              expiresIn: 120,
            },
          )
  
          return reply.send({
            token: newToken,
          })
        } catch (error) {
          reply.status(401)
          return {
            error: 'Invalid refresh token',
          }
        }
      }
    )
  }
  