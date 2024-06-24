// src/schemas/refreshTokenSchema.ts
import { z } from "zod";
var RefreshTokenSchema = z.object({
  refreshToken: z.string()
});

export {
  RefreshTokenSchema
};
