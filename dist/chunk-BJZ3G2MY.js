import {
  RegisterSchema
} from "./chunk-VDSVYAGG.js";
import {
  prisma
} from "./chunk-TVWJO2T5.js";

// src/routes/Auth/registerUser.ts
import bcrypt from "bcryptjs";
async function registerUser(app) {
  app.withTypeProvider().post(
    "/user",
    {
      schema: {
        body: RegisterSchema,
        summary: "Register a new user",
        tags: ["User"]
      }
    },
    async (request, reply) => {
      try {
        const { email, password } = request.body;
        const alreadyExistsSameEmail = await prisma.user.findFirst({
          where: {
            email
          }
        });
        if (alreadyExistsSameEmail) {
          return reply.status(400).send({
            message: "Email already exists"
          });
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        await prisma.user.create({
          data: {
            email,
            password: hashedPassword
          }
        });
        return reply.status(201).send({
          message: "User registered successfully"
        });
      } catch (error) {
        console.error("Error registering user:", error);
        return reply.status(500).send({
          message: "Internal Server Error"
        });
      }
    }
  );
}

export {
  registerUser
};
