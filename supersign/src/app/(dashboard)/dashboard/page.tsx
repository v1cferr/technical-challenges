import { LogoutButton } from "@/components/auth/LogoutButton";
import { DocumentList } from "@/components/documents/DocumentList";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/upload" className="btn btn-primary">
            Novo Documento
          </Link>
          <LogoutButton />
        </div>
      </div>

      <DocumentList />
    </main>
  );
}
