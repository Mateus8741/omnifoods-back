import {
  OrderSchema
} from "./chunk-JCEUT3GH.js";
import {
  prisma
} from "./chunk-TVWJO2T5.js";

// src/routes/Orders/createOrder.ts
async function createOrder(app) {
  app.withTypeProvider().post("/order", {
    schema: {
      body: OrderSchema,
      summary: "Cria um novo pedido",
      tags: ["Orders"]
    }
  }, async (request, reply) => {
    const data = request.body;
    const { productOrders, tableNumber, changeToOrder } = data;
    const order = await prisma.order.create({
      data: {
        tableNumber,
        changeToOrder,
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
  });
}

export {
  createOrder
};
