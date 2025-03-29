import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <LoginForm />
    </main>
  );
}
