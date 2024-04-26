import {
  prisma
} from "./chunk-TVWJO2T5.js";
import {
  __async
} from "./chunk-5HTTFJTC.js";

// src/routes/Orders/deleteordersAfterTime.ts
function deleteOrdersAfterTime(app) {
  return __async(this, null, function* () {
    app.delete("/delete-all-orders", {
      schema: {
        summary: "Deleta todos os pedidos criados",
        tags: ["Orders"]
      }
    }, (request, reply) => __async(this, null, function* () {
      const currentTime = /* @__PURE__ */ new Date();
      const orders = yield prisma.order.findMany({
        where: {
          createdAt: {
            lt: currentTime
          }
        }
      });
      const [deletedOrders] = yield Promise.all([
        prisma.productOrders.deleteMany({
          where: {
            orderId: {
              in: orders.map((order) => order.id)
            }
          }
        }),
        prisma.order.deleteMany({
          where: {
            id: {
              in: orders.map((order) => order.id)
            }
          }
        })
      ]);
      return deletedOrders.count;
    }));
  });
}

export {
  deleteOrdersAfterTime
};
