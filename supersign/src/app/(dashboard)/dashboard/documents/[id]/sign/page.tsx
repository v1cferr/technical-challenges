import Link from "next/link";
import { DocumentSignature } from "@/components/documents/DocumentSignature";

interface SignDocumentPageProps {
  params: {
    id: string;
  };
}

export default async function SignDocumentPage({
  params,
}: SignDocumentPageProps) {
  const documentId = params.id;

  return (
    <main className="min-h-screen p-8">
      <div className="mb-8">
        <Link
          href={`/dashboard/documents/${documentId}`}
          className="btn btn-outline btn-sm">
          ← Voltar para o Documento
        </Link>
      </div>

      <DocumentSignature documentId={documentId} />
    </main>
  );
}
