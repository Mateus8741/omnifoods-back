import {
  prisma
} from "./chunk-TVWJO2T5.js";
import {
  __async
} from "./chunk-5HTTFJTC.js";

// src/routes/Products/listProducts.ts
function listProducts(app) {
  return __async(this, null, function* () {
    app.get("/product", (request, reply) => __async(this, null, function* () {
      const data = yield prisma.product.findMany({
        include: { details: true }
      });
      return data;
    }));
  });
}

export {
  listProducts
};
