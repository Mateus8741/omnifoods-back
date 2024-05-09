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
async function deleteAllFiles(app) {
  app.withTypeProvider().delete("/delete-all-files", {
    schema: {
      summary: "Deleta TODOS os arquivos de fotos",
      tags: ["Files"]
    }
  }, async (request, reply) => {
    const uploadDir = "./uploads";
    if (!fs.existsSync(uploadDir)) {
      return new Error("O diret\xF3rio de uploads n\xE3o existe");
    }
    deleteFilesRecursive(uploadDir);
    reply.code(200).send({ message: "Todos os arquivos de fotos foram exclu\xEDdos com sucesso" });
  });
}

export {
  deleteAllFiles
};
