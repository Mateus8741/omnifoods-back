import {
  prisma
} from "./chunk-TVWJO2T5.js";
import {
  __async
} from "./chunk-5HTTFJTC.js";

// src/routes/Orders/listOrder.ts
function listAllOrder(app) {
  return __async(this, null, function* () {
    app.withTypeProvider().get("/list-all-orders", {
      schema: {
        summary: "Lista todos os pedidos",
        tags: ["Orders"]
      }
    }, (request, reply) => __async(this, null, function* () {
      const data = yield prisma.order.findMany({
        include: { productOrders: true },
        orderBy: { createdAt: "desc" }
      });
      return data;
    }));
  });
}

export {
  listAllOrder
};
