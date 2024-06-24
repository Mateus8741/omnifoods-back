import bcrypt from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '../../prisma/prisma-client.js'
import { RegisterSchema } from '../../schemas/registerSchema.js'


export async function loginUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/auth/login',
    {
      schema: {
        body: RegisterSchema,
        summary: 'Login a user',
        tags: ['User'],
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (!user) {
        reply.status(401)
        return {
          error: 'Invalid credentials',
        }
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        reply.status(401)
        return {
          error: 'Invalid credentials',
        }
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          expiresIn: '60d',
        },
      )

      return reply.send({
        token,
        email: user.email,
      })
    },
  )
}
