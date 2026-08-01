# Cyrus Personal Website

> A quiet corner of the Internet I keep for myself, where words and thoughts find a place to stay.

My personal site, mostly for sharing works, blog posts, and whatever is on my mind.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS** + shadcn/ui components (built on Radix UI)
- **lucide-react** icons, **next-themes** for theme switching
- **recharts** for charts, **SWR** for data fetching
- **react-hook-form** + **zod** for form validation
- **sonner** toasts, **vaul** drawers, **date-fns** for dates
- Package manager: **pnpm**

## Structure

```
app/          Pages and API routes (about / blog / works / contact)
components/   Components, including shadcn-style ui/ primitives
data/         Static content data (JSON)
hooks/        Custom hooks
lib/          Utilities
public/       Static assets
```

## Notes

- Blog RSS is generated at `app/api/blog/rss`
- GitHub contributions chart fetches from GitHub at `app/api/github/contributions`
- Content is driven by static JSON data — no database, good enough for a personal site
