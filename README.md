# Next.js 14 + Sanity Starter

Production-ready starter for a company/organization website using:

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Sanity Studio embedded at `/studio`

## 1. Install

```bash
npm install
```

## 2. Set environment variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

Example:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

## 3. Run locally

```bash
npm run dev
```

Open:

- Website: `http://localhost:3000`
- Studio: `http://localhost:3000/studio`

## 4. Useful scripts

```bash
npm run lint
npm run typecheck
npm run format
npm run test:e2e
```

## 5. Deploy to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel.
3. Add the same environment variables in Vercel project settings.
4. Deploy.

The embedded Sanity Studio is available at `/studio` in production.
