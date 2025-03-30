# Supersign Challenge

- **Deploy:** <https://supersign-challenge.vercel.app/login>
- **Codebase:** <https://github.com/v1cferr/technical-challenges/tree/main/supersign>

## Passos da Jornada

> Em ordem cronológica inversa (do mais recente ao mais antigo)
> Estou seguindo o: [REQUIREMENTS](./REQUIREMENTS.md)

- [x] 3. Assinatura Digital
  - [x] Assinatura de documentos utilizando `react-signature-canvas`
- [x] 2. (CRUD) Gerênciamento de documentos
  - [x] Listagem de documentos do usuário
  - [x] Upload de novos documentos
    - [x] `@aws-sdk/client-s3` para o upload no Supabase Storage
  - [x] Visualização de documentos
    - [x] `react-pdf` para renderizar/visualizar documentos PDF
  - [x] Exclusão de documentos
- [x] 1. Configuração do Auth; para a página de login, registro e logout
  - [x] `zod` e `@hookform/resolvers` para validação de dados dos formulários
  - [x] `bcryptjs` para criptografia de senhas
  - [x] `next-auth` para autenticação
  - [x] `next-auth/providers/google` para autenticação com Google
  - [x] `next-auth/providers/credentials` para login/registro com email e senha
- [x] Configuração do **Tailwind** e **DaisyUI**; para estilização
- [x] Configuração do **ESLint**; para regras e padronização do código
- [x] Configuração do **Prisma**; para facilitar as queries e manipulação de dados
- [x] Configuração do `.env`; variáveis de ambiente do:
  - [x] Next.js
  - [x] Google
  - [x] Supabase
- [x] Configuração do **PostgreSQL Supabase** (BaaS); como escolha do banco de dados
- [x] Configuração do **Next.js** (`create-next-app`); boilerplate clean inicial
- [x] Organização da documentação em Markdown (Com base no PDF que foi fornecido)

## Principais dificuldades

Eu tava com um erro de build persistente que não conseguia resolver de jeito nenhum. Pesquisei e utilizei o Cline + Gemini 2.5 Pro para me auxiliar com o Pair Programming e consegui :D

- Fazer o visualizador de PDF funcionar
- Adicionar a assinatura dentro do PDF

> Manipular documentos PDF no geral, o restante foi relativamente tranquilo.

## Melhorias

- [ ] Mobile-first
- [ ] Melhorar UI/UX
- [ ] Escolha da localização da assinatura no documento

## Execução

Caso queira rodar o projeto localmente:

- Configure o `.env` com as variáveis de ambiente do Next.js, Google e Supabase
  - `NEXTAUTH_URL` (url base) e `NEXTAUTH_SECRET` (um random base64) são obrigatórias para o funcionamento do `next-auth`
  - `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET` são obrigatórias para o funcionamento do `next-auth` com Google
  - `SUPABASE_PROJECT_URL` e `SUPABASE_API_KEY` são obrigatórias para o funcionamento do PostgreSQL Supabase
  - `DATABASE_URL` e `DIRECT_URL` para conectar ao banco de dados do Supabase
  - `SUPABASE_S3_ACCESS_KEY_ID`, `SUPABASE_S3_SECRET_ACCESS_KEY` e `SUPABASE_STORAGE_URL` são obrigatórias para o funcionamento do Supabase Storage
- Instale o `pnpm` globalmente com `npm install -g pnpm`
- Instalar as dependências com `pnpm install`
- Rodar o projeto com `pnpm run dev`

---

Legado do `create-next-app`:

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<!-- apenas testando o ignored build step do deploy na Vercel -->
<!-- Ignored Build Step
When a commit is pushed to the Git repository that is connected with your Project, its SHA will determine if a new Build has to be issued. If the SHA was deployed before, no new Build will be issued.
You can customize this behavior with a command that exits with code 1 (new Build needed) or code 0. -->
