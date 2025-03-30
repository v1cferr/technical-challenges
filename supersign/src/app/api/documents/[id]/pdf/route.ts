import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const document = await prisma.document.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!document) {
      return new NextResponse("Documento não encontrado", { status: 404 });
    }

    const s3Client = new S3Client({
      endpoint: process.env.SUPABASE_STORAGE_URL,
      credentials: {
        accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY || "",
      },
      region: process.env.SUPABASE_REGION || "auto",
      forcePathStyle: true,
    });

    const command = new GetObjectCommand({
      Bucket: "supersign",
      Key: document.fileKey,
    });

    const response = await s3Client.send(command);
    const arrayBuffer = await response.Body?.transformToByteArray();

    if (!arrayBuffer) {
      return new NextResponse("Erro ao carregar o arquivo", { status: 500 });
    }

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${document.name}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar PDF:", error);
    return new NextResponse("Erro ao buscar PDF", { status: 500 });
  }
}
