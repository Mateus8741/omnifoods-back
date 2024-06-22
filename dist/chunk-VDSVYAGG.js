// src/schemas/registerSchema.ts
import { z } from "zod";
var RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export {
  RegisterSchema
};
