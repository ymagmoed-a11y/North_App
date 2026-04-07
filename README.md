## North - Personal Operating System

North is a premium personal strategy dashboard built with Next.js and Supabase.

### Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase Auth + Postgres + Realtime
- Vercel deployment target

## Getting Started

1. Copy `.env.example` to `.env.local` and fill Supabase values.
2. Run the SQL in `supabase/migrations/0001_north_schema.sql` in your Supabase SQL editor.
3. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), create an account, and start using modules:

- Dashboard
- North Star
- Life Layers
- Execution
- Progress
- Decisions
- Knowledge

### Deployment (Vercel)

Add the same environment variables in Vercel project settings, then deploy.
