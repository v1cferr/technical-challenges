"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import SignatureCanvas from "react-signature-canvas";

interface DocumentSignatureProps {
  documentId: string;
}

export const DocumentSignature = ({ documentId }: DocumentSignatureProps) => {
  const router = useRouter();
  const signatureRef = useRef<SignatureCanvas>(null);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  const handleSign = async () => {
    if (!signatureRef.current || signatureRef.current.isEmpty()) {
      setError("Por favor, faça sua assinatura antes de continuar");
      return;
    }

    setSigning(true);
    setError(null);

    try {
      // Obter a imagem da assinatura como base64
      const signatureImg = signatureRef.current.toDataURL("image/png");

      const response = await fetch(`/api/documents/${documentId}/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signatureImg }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao assinar documento");
      }

      // Redirecionar para a página de visualização do documento após a assinatura
      router.push(`/dashboard/documents/${documentId}`);
      router.refresh();
    } catch (err) {
      console.error("Erro ao assinar documento:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao assinar documento. Tente novamente mais tarde."
      );
    } finally {
      setSigning(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Assinar Documento</h2>

      {error && (
        <div className="alert alert-error shadow-lg mb-4">
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
      )}

      <div className="card bg-base-200 p-6">
        <p className="mb-4">Desenhe sua assinatura no campo abaixo:</p>

        <div className="border border-gray-300 rounded-lg bg-white">
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{
              className: "w-full h-48",
            }}
            backgroundColor="white"
          />
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button
            type="button"
            className="btn btn-outline"
            onClick={clearSignature}>
            Limpar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSign}
            disabled={signing}>
            {signing ? (
              <>
                <span className="loading loading-spinner"></span>
                Assinando...
              </>
            ) : (
              "Assinar Documento"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
