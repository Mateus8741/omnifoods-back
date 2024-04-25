import { FastifyInstance } from "fastify";
import multer from "fastify-multer";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import fs from "fs";
import crypto from "node:crypto";
import { extname } from "node:path";

const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

// Função para criar uma pasta se ela não existir
const createFolderIfNotExists = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { fieldname } = file;
    const uploadDir = `./uploads/${fieldname}`;

    // Cria a pasta de upload se ela não existir
    createFolderIfNotExists(uploadDir);
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, res) => {
      const filename = res.toString("hex") + extname(file.originalname);
      if (err) return cb(err, filename);
      cb(null, filename);
    });
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Apenas ${allowedTypes.join(", ")} são permitidos`));
    }
  },
});

export async function uploadFiles(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/upload-files",
    { 
      schema: { 
        summary: "Faz o upload de arquivos de fotos (Cover e Thumbnail)",
        tags: ["Files"]
      },
      preHandler: upload.fields([
        { name: "Cover", maxCount: 1 }, 
        { name: "Thumbnail", maxCount: 1 }
      ])
    } as never,
    (request, reply) => {
      const { files } = request as any;

      // Verifica se os arquivos foram enviados
      if (!files || !files["Cover"] || !files["Thumbnail"]) {
        return reply.code(400).send({ error: "Files not uploaded" });
      }

      const coverFile = files["Cover"][0];
      const thumbnailFile = files["Thumbnail"][0];

      // Retorna os detalhes dos arquivos enviados
      return reply.code(201).send({
        ok: true,
        cover: coverFile,
        thumbnail: thumbnailFile,
      });
    }
  );
}
