import {
  __async
} from "./chunk-5HTTFJTC.js";

// src/routes/Products/Files/deleteFiles.ts
import fs from "fs";
import path from "path";
function deleteFilesRecursive(directory) {
  const items = fs.readdirSync(directory);
  items.forEach((item) => {
    const itemPath = path.join(directory, item);
    if (fs.lstatSync(itemPath).isDirectory()) {
      deleteFilesRecursive(itemPath);
    } else {
      fs.unlinkSync(itemPath);
    }
  });
  fs.rmdirSync(directory);
}
function deleteAllFiles(app) {
  return __async(this, null, function* () {
    app.withTypeProvider().delete("/delete-all-files", {
      schema: {
        summary: "Deleta TODOS os arquivos de fotos",
        tags: ["Files"]
      }
    }, (request, reply) => __async(this, null, function* () {
      const uploadDir = "./uploads";
      if (!fs.existsSync(uploadDir)) {
        return new Error("O diret\xF3rio de uploads n\xE3o existe");
      }
      deleteFilesRecursive(uploadDir);
      reply.code(200).send({ message: "Todos os arquivos de fotos foram exclu\xEDdos com sucesso" });
    }));
  });
}

export {
  deleteAllFiles
};
