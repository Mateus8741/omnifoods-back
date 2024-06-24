import {
  prisma
} from "./chunk-TVWJO2T5.js";
import {
  RegisterSchema
} from "./chunk-VDSVYAGG.js";

// src/routes/Auth/loginUser.ts
import bcrypt from "bcryptjs";
async function loginUser(app) {
  app.withTypeProvider().post(
    "/auth/login",
    {
      schema: {
        body: RegisterSchema,
        summary: "Login a user",
        tags: ["User"]
      }
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const user = await prisma.user.findFirst({
        where: {
          email
        }
      });
      if (!user) {
        reply.status(401);
        return {
          error: "Invalid credentials"
        };
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        reply.status(401);
        return {
          error: "Invalid credentials"
        };
      }
      const token = await reply.jwtSign(
        {
          sub: user.id
        },
        {
          expiresIn: "1m"
        }
      );
      return reply.send({
        token,
        email: user.email
      });
    }
  );
}

export {
  loginUser
};
