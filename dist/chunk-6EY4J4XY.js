import {
  OrderSchema
} from "./chunk-NTUY3D3Q.js";
import {
  prisma
} from "./chunk-TVWJO2T5.js";
import {
  __async
} from "./chunk-5HTTFJTC.js";

// src/routes/Orders/createOrder.ts
function createOrder(app) {
  return __async(this, null, function* () {
    app.withTypeProvider().post("/order", {
      schema: {
        body: OrderSchema,
        summary: "Cria um novo pedido",
        tags: ["Orders"]
      }
    }, (request, reply) => __async(this, null, function* () {
      const data = request.body;
      const { productOrders, tableNumber } = data;
      const order = yield prisma.order.create({
        data: {
          tableNumber,
          createdAt: /* @__PURE__ */ new Date(),
          productOrders: {
            createMany: {
              data: productOrders
            }
          }
        },
        include: {
          productOrders: true
        }
      });
      const message = "Pedido criado com sucesso!";
      return reply.code(201).send({ order, message });
    }));
  });
}

export {
  createOrder
};
