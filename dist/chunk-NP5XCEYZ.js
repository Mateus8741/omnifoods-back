import {
  prisma
} from "./chunk-TVWJO2T5.js";

// src/routes/Orders/deleteordersAfterTime.ts
async function deleteOrdersAfterTime(app) {
  app.delete("/delete-all-orders", {
    schema: {
      summary: "Deleta todos os pedidos criados",
      tags: ["Orders"]
    }
  }, async (request, reply) => {
    const currentTime = /* @__PURE__ */ new Date();
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          lt: currentTime
        }
      }
    });
    const [deletedOrders] = await Promise.all([
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
  });
}

export {
  deleteOrdersAfterTime
};
