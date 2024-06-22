// src/routes/Products/Files/createFiles.ts
import multer from "fastify-multer";
import fs from "fs";
import crypto from "crypto";
import { extname } from "path";
var allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
var createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { fieldname } = file;
    const uploadDir = `./uploads/${fieldname}`;
    createFolderIfNotExists(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, res) => {
      const filename = res.toString("hex") + extname(file.originalname);
      if (err) return cb(err, filename);
      cb(null, filename);
    });
  }
});
var upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Apenas ${allowedTypes.join(", ")} s\xE3o permitidos`));
    }
  }
});
async function uploadFiles(app) {
  app.withTypeProvider().post(
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
    },
    (request, reply) => {
      const { files } = request;
      if (!files || !files["Cover"] || !files["Thumbnail"]) {
        return reply.code(400).send({ error: "Files not uploaded" });
      }
      const coverFile = files["Cover"][0];
      const thumbnailFile = files["Thumbnail"][0];
      return reply.code(201).send({
        ok: true,
        cover: coverFile,
        thumbnail: thumbnailFile
      });
    }
  );
}

export {
  uploadFiles
};
