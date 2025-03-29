import { createUser } from "@/lib/user";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = registerSchema.parse(json);

    const user = await createUser(body);

    return NextResponse.json({
      message: "Usuário criado com sucesso",
      user,
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Dados inválidos",
          errors: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    const message =
      error instanceof Error ? error.message : "Erro ao criar usuário";
    return NextResponse.json({ message }, { status: 500 });
  }
}
