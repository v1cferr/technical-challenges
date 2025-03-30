"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const uploadSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  file: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length === 1,
      "Selecione um arquivo"
    )
    .refine(
      (files) =>
        files instanceof FileList && files[0]?.type === "application/pdf",
      "Apenas arquivos PDF são permitidos"
    ),
});

type UploadFormData = z.infer<typeof uploadSchema>;

export const DocumentUpload = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const onSubmit = async (data: UploadFormData) => {
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("file", data.file[0]);

      const response = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Falha ao fazer upload do documento"
        );
      }

      // Redirecionar para a página de documentos após o upload bem-sucedido
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Erro ao fazer upload:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao fazer upload do documento. Tente novamente mais tarde."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload de Documento</h2>

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nome do documento</span>
          </label>
          <input
            type="text"
            className={`input input-bordered w-full ${
              errors.name ? "input-error" : ""
            }`}
            {...register("name")}
          />
          {errors.name && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.name.message}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Arquivo (PDF)</span>
          </label>
          <input
            type="file"
            accept=".pdf"
            className={`file-input file-input-bordered w-full ${
              errors.file ? "file-input-error" : ""
            }`}
            {...register("file")}
          />
          {errors.file?.message && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.file.message as string}
              </span>
            </label>
          )}
        </div>

        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={uploading}>
            {uploading ? (
              <>
                <span className="loading loading-spinner"></span>
                Enviando...
              </>
            ) : (
              "Fazer Upload"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
