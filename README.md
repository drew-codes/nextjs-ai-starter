# AI-Native Next.js Starter

Blazing-fast boilerplate for building AI-powered web apps on the free tiers of Vercel + Supabase.

## ✨ Features

- **Next.js 15 (App Router)** with React 19
- **Tailwind CSS 4** & Tailwind UI ready
- **pnpm workspace**
- **Supabase Postgres + pgvector** for RAG & embeddings
- **Vercel AI SDK 4.x** (upgrade-ready)
- Auth, RLS, Prisma, and pgvector out-of-the-box
- **ESLint 9** flat-config, Prettier, Husky, commitlint
- **GitHub Actions** CI pipeline

---

## 🖇️ Cloning & Re-Using

### Option 1 — GitHub Template

1. Click **Use this template → Create a new repo** on GitHub.
2. Clone your new repo locally.
3. Continue with the quick-start below.

### Option 2 — Degit

```bash
pnpm dlx degit <your-org>/ai-starter my-app
cd my-app
git init && pnpm install
```

---

## 🚀 Quick Start

```bash
# 1) Install dependencies
pnpm install

# 2) Copy env template and add your own keys
cp .env.example .env.local
# → fill in OPENAI_API_KEY, DATABASE_URL, etc.

# 3) Run the dev server
pnpm dev
```

Visit **http://localhost:3000** to see the starter running.

---

## 🗄️ Database Setup (Prisma + Supabase)

> **Run these once per project.** They’re left out of automated scripts so each developer can point the starter at their own Supabase instance.

1. **Initialise Prisma for Postgres**

   ```bash
   npx prisma init --datasource-provider postgresql
   ```

2. **Add your Supabase connection string** to `.env.local`:

   ```env
   DATABASE_URL="postgresql://postgres:<PW>@db.<PROJECT>.supabase.co:6543/postgres"
   ```

3. **Enable **`` inside Supabase (SQL Editor):

   ```sql
   create extension if not exists vector;
   ```

4. **Add the first model** in `prisma/schema.prisma`:

   ```prisma
   model Document {
     id        Int    @id @default(autoincrement())
     content   String
     embedding Vector @db.Vector(1536)
   }
   ```

5. **Generate & apply the migration**

   ```bash
   pnpm prisma migrate dev --name init
   ```

6. _(Optional)_ **Inspect locally**

   ```bash
   pnpm prisma studio
   ```

---

## 🗝️ Required Environment Variables

See `.env.example` for the full list. Minimum set:

| Key                             | Description                         |
| ------------------------------- | ----------------------------------- |
| `OPENAI_API_KEY`                | OpenAI or compatible model key      |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key                   |
| `DATABASE_URL`                  | Supabase Postgres connection string |

---

## 🔧 Common Tasks

| Task                 | Command                     |
| -------------------- | --------------------------- |
| Lint & format        | `pnpm lint` · `pnpm format` |
| Prisma migrations    | `pnpm prisma migrate dev`   |
| Update deps          | `pnpm up -r`                |
| Start local Supabase | `supabase start`            |

---

## 🛫 Deployment

1. Push to **GitHub**.
2. Import the repo on **Vercel**.
3. Add the same environment variables under _Project → Settings → Environment Variables_.
4. Trigger a build — production URL is ready in ~30 sec.

---

## 📝 Customisation Tips

- **RAG Schema**: tweak `prisma/schema.prisma` (e.g., `embedding Vector(1536)`).
- **AI Model**: change the model ID in `lib/ai.ts`.

---
## 🛡️ Local Dev Without Burning Tokens

Developers often want to hack on UI & data plumbing without racking up usage bills.  Two zero‑cost strategies ship with this starter:

| Mode            | How to enable                                                                       | Behaviour                                                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Mock**        | Add `AI_MODE=mock` to `.env.local`                                                  | All calls to `lib/ai.ts` return hard‑coded lorem‑ipsum text and emit a console warning.                                                    |
| **Local Model** | Install [Ollama](https://ollama.ai/) & run `ollama run llama3` Set `AI_MODE=ollama` | The wrapper streams from `http://localhost:11434/api/chat` using the Vercel AI SDK’s **provider override**. No cloud traffic = no credits. |

```ts
// lib/ai.ts (excerpt)
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function chat(messages) {
  if (process.env.AI_MODE === 'mock') {
    console.warn('[AI‑Mock] Returning stub response');
    return { text: 'Mock response for local dev.' };
  }
  if (process.env.AI_MODE === 'ollama') {
    return generateText({
      model: {
        id: 'llama3',
        provider: 'ollama',
        api: 'http://localhost:11434',
      },
      prompt: messages,
    });
  }
  // default → OpenAI
  return generateText({ model: openai('gpt-4o'), prompt: messages });
}
```

> **Tip**: Commit `AI_MODE=mock` only to `.env.example`, never to production envs.

---


## 🤝 Contributing

Pull requests are welcome! Please run `pnpm lint` before committing.

---

## 🪪 License

MIT

---

> Built with ❤️ & 🧠 by Drew Thompson
