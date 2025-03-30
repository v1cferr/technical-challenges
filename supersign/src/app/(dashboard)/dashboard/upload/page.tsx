import Link from "next/link";
import { DocumentUpload } from "@/components/documents/DocumentUpload";

export default function UploadPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="mb-8">
        <Link href="/dashboard" className="btn btn-outline btn-sm">
          ← Voltar para o Dashboard
        </Link>
      </div>

      <DocumentUpload />
    </main>
  );
}
