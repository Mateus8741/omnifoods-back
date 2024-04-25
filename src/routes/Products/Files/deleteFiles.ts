import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import fs from "fs";
import path from "path";

function deleteFilesRecursive(directory: string) {
  const items = fs.readdirSync(directory);

  items.forEach(item => {
    const itemPath = path.join(directory, item);

    if (fs.lstatSync(itemPath).isDirectory()) {

      deleteFilesRecursive(itemPath);
    } else {

      fs.unlinkSync(itemPath);
    //   console.log(`Arquivo ${itemPath} excluído com sucesso.`);
    }
  });

  fs.rmdirSync(directory);
}

export async function deleteAllFiles(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete("/delete-all-files", {
        schema: {
            summary: "Deleta TODOS os arquivos de fotos",
            tags: ["Files"],
        },
    }, async (request, reply) => {
        const uploadDir = "./uploads";

        if (!fs.existsSync(uploadDir)) {
            return new Error("O diretório de uploads não existe");
        }

        deleteFilesRecursive(uploadDir);

        reply.code(200).send({ message: "Todos os arquivos de fotos foram excluídos com sucesso" });
    });
}
