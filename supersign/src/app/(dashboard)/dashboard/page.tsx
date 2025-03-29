import { LogoutButton } from "@/components/auth/LogoutButton";

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>
      <p>Oi</p>
    </main>
  );
}
