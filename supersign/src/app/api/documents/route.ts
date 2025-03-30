import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Configurar o cliente S3 para o Supabase Storage
const s3Client = new S3Client({
  region: process.env.SUPABASE_REGION || "auto",
  forcePathStyle: true,
  endpoint: process.env.SUPABASE_STORAGE_URL,
  credentials: {
    accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY || "",
  },
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Buscar documentos do banco de dados
    const documents = await prisma.document.findMany({
      where: {
        userId: session.user.id as string,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Adicionar URLs de acesso assinadas aos documentos
    const documentsWithUrls = await Promise.all(
      documents.map(async (document) => {
        const command = new GetObjectCommand({
          Bucket: "supersign",
          Key: document.fileKey,
        });
        const signedUrl = await getSignedUrl(s3Client, command, {
          expiresIn: 3600,
        }); // URL válida por 1 hora
        return {
          ...document,
          fileUrl: signedUrl,
        };
      })
    );

    return NextResponse.json(documentsWithUrls);
  } catch (error) {
    console.error("Erro ao buscar documentos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar documentos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const file = formData.get("file") as File;

    if (!name || !file) {
      return NextResponse.json(
        { error: "Nome do documento e arquivo são obrigatórios" },
        { status: 400 }
      );
    }

    // Preparar o arquivo para upload
    const fileKey = `documents/${Date.now()}_${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload do arquivo para o Supabase Storage
    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: "supersign",
          Key: fileKey,
          Body: buffer,
          ContentType: file.type,
        })
      );
    } catch (uploadError) {
      console.error("Erro no upload do arquivo:", uploadError);
      return NextResponse.json(
        { error: "Erro ao fazer upload do arquivo" },
        { status: 500 }
      );
    }

    // Criar o documento no banco de dados
    const document = await prisma.document.create({
      data: {
        name,
        fileKey,
        userId: session.user.id as string,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar documento:", error);
    return NextResponse.json(
      { error: "Erro ao criar documento" },
      { status: 500 }
    );
  }
}
