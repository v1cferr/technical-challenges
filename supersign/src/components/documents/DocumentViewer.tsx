"use client";

import { useState, useEffect } from "react";
import { Document as PrismaDocument, Signature } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface DocumentWithSignatures extends PrismaDocument {
  signatures: Signature[];
}

interface DocumentViewerProps {
  documentId: string;
}

export const DocumentViewer = ({ documentId }: DocumentViewerProps) => {
  const [document, setDocument] = useState<DocumentWithSignatures | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`/api/documents/${documentId}`);

        if (!response.ok) {
          throw new Error("Falha ao carregar documento");
        }

        const data = await response.json();
        setDocument(data);
      } catch (err) {
        setError("Erro ao carregar documento. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentId]);

  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="alert alert-error shadow-lg my-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error || "Documento não encontrado"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{document.name}</h2>
        {document.status === "PENDING" && (
          <Link
            href={`/dashboard/documents/${document.id}/sign`}
            className="btn btn-primary">
            Assinar Documento
          </Link>
        )}
      </div>

      <div className="text-sm">
        <p>
          <strong>ID:</strong> {document.id}
        </p>
        <p>
          <strong>Criado em:</strong>{" "}
          {formatDistanceToNow(new Date(document.createdAt), {
            addSuffix: true,
            locale: ptBR,
          })}
        </p>
        <p>
          <strong>Última atualização:</strong>{" "}
          {formatDistanceToNow(new Date(document.updatedAt), {
            addSuffix: true,
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="w-full h-full">
        <iframe
          src={`/api/documents/${documentId}/pdf`}
          className="w-full h-full"
          title="Visualizador de PDF"
        />
      </div>

      {/* Exibir informações da assinatura se o documento estiver assinado */}
      {document.status === "SIGNED" && document.signatures.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Informações da Assinatura
          </h3>
          <div className="card bg-base-200 p-4">
            <p>
              <strong>Assinado em:</strong>{" "}
              {formatDistanceToNow(new Date(document.signatures[0].createdAt), {
                addSuffix: true,
                locale: ptBR,
              })}
            </p>
            <div className="mt-2">
              <p>
                <strong>Assinatura:</strong>
              </p>
              <div className="mt-1 border border-gray-300 rounded p-2 bg-white">
                <img
                  src={document.signatures[0].signatureImg}
                  alt="Assinatura"
                  className="max-h-20"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
