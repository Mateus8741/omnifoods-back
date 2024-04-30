import { prisma } from "../src/prisma/prisma-client";


const details = [
    {
        name: "X-Salada",
        price: 29.90,
        description: "Um hamburger tão bonito que me deu fome quanto jogar vôlei na praia. O bacon é crocante e o queijo derretido...",
        cover: "https://drive.google.com/file/d/1jcTHmRD4jBbzocOJVhzOp_o8svJytNto/view?usp=share_link",
        thumbnail: "https://drive.google.com/file/d/1I_YYamkLuekR-p0iACvl7ZLxbugb8cqv/view?usp=share_link",
        ingredients: 
            'Pão brioche, 2x carnes smash (blend da casa) de 80g, Queijo cheddar, Alface, Tomate, Picles, Cebola, Molho da casa',
    },
    {
        name: "X-Bacon",
        price: 29.90,
        description: "Um hamburger tão bonito que me deu fome quanto jogar vôlei na praia. O bacon é crocante e o queijo derretido...",
        cover: "https://drive.google.com/file/d/1yjf2vW9O7JNN0m_ccXcUq9Ps2ml2Z8et/view?usp=share_link",
        thumbnail: "https://drive.google.com/file/d/1jyUp9uodLlxZnv4ouKdHPgMe0twn51wW/view?usp=share_link",
        ingredients: 'Pão brioche, 2x carnes smash (blend da casa) de 80g, Queijo cheddar, Alface, Tomate, Picles, Cebola, Molho da casa',
    },
    {
        name: "X-Tudo",
        price: 29.90,
        description: "Um hamburger tão bonito que me deu fome quanto jogar vôlei na praia. O bacon é crocante e o queijo derretido...",
        cover: "https://drive.google.com/file/d/1Z0Y2PV9B2wVg0CG-l4nJyJ6IpSUIoGER/view?usp=share_link",
        thumbnail: "https://drive.google.com/file/d/1gucGZnVUxofKH-c02PPJ3ICaDu0twn7w/view?usp=share_link",
        ingredients: 'Pão brioche, 2x carnes smash (blend da casa) de 80g, Queijo cheddar, Alface, Tomate, Picles, Cebola, Molho da casa'
    },
    {
        name: "X-Veggie",
        price: 29.90,
        description: "Um hamburger tão bonito que me deu fome quanto jogar vôlei na praia. O bacon é crocante e o queijo derretido...",
        cover: "https://drive.google.com/file/d/1mMB7J_sCSsQ7F8wFYypm2lgJtX8DeVpJ/view?usp=share_link",
        thumbnail: "https://drive.google.com/file/d/1gucGZnVUxofKH-c02PPJ3ICaDu0twn7w/view?usp=share_link",
        ingredients: "Pão brioche, 2x carnes smash (blend da casa) de 80g, Queijo cheddar, Alface, Tomate, Picles, Cebola, Molho da casa",
    }
]


const createBurg = async () => {
const detail = await prisma.product.create({
    data: {
        title: "Burguers",
        details: {
            createMany: {
                data: details
            }
        },
    },
});

//   const order = await prisma.order.create({
//     data: {
//       productOrders: {
//         create: [
//           {
//             productName: "X-Salada",
//             productPrice: 29.90,
//             quantity: 1,
//           },
//         ],
//       },
//       tableNumber: 1,
//       changeToOrder: "No changes",
//     },
//   });

//   console.log(`Created detail: ${detail.title}`);
//   console.log(`Created order with id: ${order.id}`);
};

const dessert = [
    {
        name: "Sorvete com Brownie",
        price: 29.90,
        description: 'Uma sobremesa deliciosa para saborear. Escolha o sorvete e a calda que desejar...',
        cover: "https://drive.google.com/file/d/1KuuBW4SSq17yRfmY0uiiMzgzB5AH-ZJK/view?usp=share_link",
        thumbnail: "https://drive.google.com/file/d/1P2pCFSa15ut4uYOypyUWjQhXHn2gNLEj/view?usp=share_link",
        ingredients: '1x Brownie, 1x Bola de sorvete a sua escolha, Escolha sua calda'
    },
    {
        name: 'Cupcake',
        price: 22.9,
        description: 'Um delicioso Cupcake para adoçar. Escolha o sabor que você gosta...',
        cover: "https://drive.google.com/file/d/1wcpLyrRAVh6MEE-LjNVcBrmiKKEMLF4R/view?usp=share_link",
        thumbnail: "https://drive.google.com/file/d/1RHlnfLsVgxh6kNBQ9UIxLM_x3p6YPFPM/view?usp=share_link",
        ingredients: 'Escolha o sabor, Chantilly',
      },
]


const createDessert = async () => {
const detail = await prisma.product.create({
    data: {
        title: "Sobremesas",
        details: {
            createMany: {
                data: dessert
            }
        },
    },
});

//   const order = await prisma.order.create({
//     data: {
//       productOrders: {
//         create: [
//           {
//             productName: "X-Salada",
//             productPrice: 29.90,
//             quantity: 1,
//           },
//         ],
//       },
//       tableNumber: 1,
//       changeToOrder: "No changes",
//     },
//   });

//   console.log(`Created detail: ${detail.title}`);
//   console.log(`Created order with id: ${order.id}`);
};

const drinks = [
    {
        name: "Coca-Cola 350ml",
        price: 6.90,
        description: 'Uma coca super gelada para acompanhar o seu super lanche...',
        cover: "https://drive.google.com/file/d/1e29fYozEv0l5GaVSy2jdiK46FqCsD0Ds/view?usp=share_link",
        thumbnail: "https://drive.google.com/file/d/12z-1R30CmoDhNUU17zm_1vemGpuZXLq7/view?usp=share_link",
        ingredients: 'Coca-Cola 350ml'
    },
]

const createDrinks = async () => {
const detail = await prisma.product.create({
    data: {
        title: "Bebidas",
        details: {
            createMany: {
                data: drinks
            }
        },
    },
});

//   const order = await prisma.order.create({
//     data: {
//       productOrders: {
//         create: [
//           {
//             productName: "X-Salada",
//             productPrice: 29.90,
//             quantity: 1,
//           },
//         ],
//       },
//       tableNumber: 1,
//       changeToOrder: "No changes",
//     },
//   });

//   console.log(`Created detail: ${detail.title}`);
//   console.log(`Created order with id: ${order.id}`);
};

const main = async () => {
  await createBurg();
  await createDessert();
  await createDrinks();
};

main()
  .then(() => {
    console.log("Seed do banco de dados realizado com sucesso!");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
