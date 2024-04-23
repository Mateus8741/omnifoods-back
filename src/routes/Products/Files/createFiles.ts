import { FastifyInstance } from "fastify";
import multer from "fastify-multer";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import mime from "mime";
import crypto from "node:crypto";
import { extname } from "node:path";

const allowedTypes = ["image/png", "image/jpeg", "image/gif"];

const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => { // basicamente renomeia para um hash
      crypto.randomBytes(16, (err, res) => {
        const filename = res.toString("hex") + extname(file.originalname);
        if (err) return cb(err, filename);

        return cb(null, filename);
      });
    },
  }),
  fileFilter: (request, file, cb) => { // filtra somente com arquivos permitidos
    if (allowedTypes.includes(file.mimetype)) {
      return cb(null, true);
    }
    cb(null, false);
    return cb(
      new Error(
        `Only ${allowedTypes
          .map((a) => mime.getExtension(a))
          .join(", ")} formats are allowed`
      )
    );
  },
});


export async function createFile(app: FastifyInstance) { //função em si
  app.withTypeProvider<ZodTypeProvider>().post(
    "/files",
    { preHandler: upload.single("image") as never }, // erro de checagem :'(
    (request, reply) => {
      return reply.code(201).send({ ok: true });
    }
  );
}