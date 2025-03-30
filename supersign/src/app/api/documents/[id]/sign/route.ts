import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    const documentId = params.id;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { signatureImg } = await req.json();

    if (!signatureImg) {
      return NextResponse.json(
        { error: "Assinatura não fornecida" },
        { status: 400 }
      );
    }

    // Verificar se o documento existe
    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Documento não encontrado" },
        { status: 404 }
      );
    }

    // Verificar se o documento já foi assinado
    if (document.status === "SIGNED") {
      return NextResponse.json(
        { error: "Documento já foi assinado" },
        { status: 400 }
      );
    }

    // Criar a assinatura e atualizar o status do documento
    const [signature] = await prisma.$transaction([
      prisma.signature.create({
        data: {
          documentId,
          userId: session.user.id,
          signatureImg,
          signedAt: new Date(),
        },
      }),
      prisma.document.update({
        where: {
          id: documentId,
        },
        data: {
          status: "SIGNED",
        },
      }),
    ]);

    return NextResponse.json(signature, { status: 201 });
  } catch (error) {
    console.error("Erro ao assinar documento:", error);
    return NextResponse.json(
      { error: "Erro ao assinar documento" },
      { status: 500 }
    );
  }
}
