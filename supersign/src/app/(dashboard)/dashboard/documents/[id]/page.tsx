import { DocumentViewer } from "@/components/documents/DocumentViewer";
import Link from "next/link";

type DocumentPageProps = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function DocumentPage({
  params,
  searchParams,
}: DocumentPageProps) {
  const documentId = params.id;
  return (
    <main className="min-h-screen p-8">
      <div className="mb-8">
        <Link href="/dashboard" className="btn btn-ghost btn-sm">
          ← Voltar para a lista
        </Link>
      </div>
      <DocumentViewer documentId={documentId} />
    </main>
  );
}
