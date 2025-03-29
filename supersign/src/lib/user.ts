import { hash } from "bcryptjs";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

export async function createUser({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) {
  try {
    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // Remover o campo password antes de retornar
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("Email já está em uso");
      }
    }
    throw new Error("Erro ao criar usuário: " + (error as Error).message);
  }
}
