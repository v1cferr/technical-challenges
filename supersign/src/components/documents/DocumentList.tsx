"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Document } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const DocumentList = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch("/api/documents");

        if (!response.ok) {
          throw new Error("Falha ao carregar documentos");
        }

        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        setError("Erro ao carregar documentos. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este documento?")) {
      return;
    }

    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Falha ao excluir documento");
      }

      // Atualizar a lista de documentos após a exclusão
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      setError("Erro ao excluir documento. Tente novamente mais tarde.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
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
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center my-8">
        <p className="text-gray-500 mb-4">Nenhum documento encontrado</p>
        <Link href="/dashboard/upload" className="btn btn-primary">
          Fazer upload de um documento
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Status</th>
            <th>Data de criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.name}</td>
              <td>
                <span
                  className={`badge ${
                    doc.status === "SIGNED" ? "badge-success" : "badge-warning"
                  }`}>
                  {doc.status === "SIGNED" ? "Assinado" : "Pendente"}
                </span>
              </td>
              <td>
                {formatDistanceToNow(new Date(doc.createdAt), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </td>
              <td className="flex gap-2">
                <Link
                  href={`/dashboard/documents/${doc.id}`}
                  className="btn btn-sm btn-info">
                  Visualizar
                </Link>
                {doc.status === "PENDING" && (
                  <Link
                    href={`/dashboard/documents/${doc.id}/sign`}
                    className="btn btn-sm btn-primary">
                    Assinar
                  </Link>
                )}
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="btn btn-sm btn-error">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
