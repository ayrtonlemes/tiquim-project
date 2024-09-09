import { PrismaClient } from "@prisma/client"
import { genSalt, hash } from "bcryptjs";
import { UserType } from "../src/resources/userType/userType.constants"
import { PaymentMethodType } from "../src/resources/paymentMethodType/paymentMethodType.constants"
const prisma = new PrismaClient();

const seed = async () => {
    await prisma.paymentMethodType.createMany({
        data: [
            { id: PaymentMethodType.CREDIT, label: "credit" },
            { id: PaymentMethodType.PIX, label: "pix" }
        ]
    })

    await prisma.userType.createMany({
        data: [
            { id: UserType.ADMIN, label: "admin" },
            { id: UserType.CLIENT, label: "client" }
        ]
    })

    const existingAdmin = await prisma.user.findFirst({
        where: { userTypeId: UserType.ADMIN },
      });
      if (!existingAdmin) {
        const rounds = parseInt("10");
        const salt = await genSalt(rounds);
        const password = await hash("webacademy123", salt);
    
        await prisma.user.create({
          data: {
            name: "Tiquim",
            email: "tiquim@gmail.com",
            password: password,
            userTypeId: UserType.ADMIN,
            state: "AM",
            city: "MANAUS"
          },
        });
    
        console.log("Usuário admin criado");
      } else {
        console.log("Já existe um usuário admin. Nenhuma ação realizada.");
      }
}

seed().then(async () => {
    await prisma.$disconnect();
})
    .catch(async (err) => {
        console.log(err);
        await prisma.$disconnect();
    })