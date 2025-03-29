import { RegisterForm } from "@/components/auth/RegisterForm";

export default async function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <RegisterForm />
    </main>
  );
}
