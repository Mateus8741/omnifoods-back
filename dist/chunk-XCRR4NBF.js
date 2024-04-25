import {
  prisma
} from "./chunk-TVWJO2T5.js";
import {
  __async
} from "./chunk-5HTTFJTC.js";

// src/routes/Orders/listOrder.ts
function listOrder(app) {
  return __async(this, null, function* () {
    app.get("/order", (request, reply) => __async(this, null, function* () {
      const data = yield prisma.order.findMany({
        include: { productOrders: true },
        orderBy: { createdAt: "desc" }
      });
      return data;
    }));
  });
}

export {
  listOrder
};
