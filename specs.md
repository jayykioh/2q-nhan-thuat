# 2q-nhan-thuat Specification

## Tech Stack
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Architecture & Vercel Best Practices

### 1. Eliminating Waterfalls
- **Parallel Fetching**: Use `Promise.all()` to parallelize non-dependent async requests in Server Components.
- **Suspense Boundaries**: Wrap slow data fetches with `<Suspense>` to stream components independently and improve Time to First Byte (TTFB).

### 2. Bundle Size Optimization
- **Dynamic Imports**: Use `next/dynamic` to lazy-load heavy client-side components that are not critical to the initial page load.
- **Third-Party Scripts**: Defer loading of non-critical third-party scripts (e.g., analytics) using `next/script` with `strategy="afterInteractive"`.
- **Avoid Barrel Files**: Import directly from the source file to avoid loading unnecessary modules (e.g., `import { Button } from '@/components/Button'` instead of `import { Button } from '@/components'`).

### 3. Server-Side Performance
- **React.cache**: Use `React.cache()` to deduplicate identical requests within a single React render pass.
- **Serialization**: Minimize the size of props passed from Server Components to Client Components. Pass only the required fields instead of whole objects.
- **Non-blocking Work**: Utilize the Next.js `unstable_after` (or equivalent) for background tasks (e.g., logging) that shouldn't block the response.

### 4. Client-Side Data Fetching
- Use SWR or React Query for fetching data in Client Components to benefit from caching and request deduplication.

### 5. Re-render Optimization
- Extract state management into small, focused components or custom hooks to prevent unnecessary re-renders of the entire tree.
- Use primitive dependencies in `useEffect` and `useCallback` to avoid accidental infinite loops or excessive updates.

### 6. Rendering Performance
- **Image Optimization**: Strictly use `next/image` for automatic resizing, lazy loading, and modern image formats (WebP/AVIF).
- **Fonts**: Use `next/font` for optimal self-hosted font loading with zero layout shift.

## Folder Structure
```text
src/
├── app/                  # Next.js App Router (pages, layouts, route handlers)
│   ├── layout.tsx        # Root layout (global providers, fonts)
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global Tailwind styles
├── components/           # Reusable UI components
│   ├── ui/               # Base UI components (buttons, inputs)
│   └── layout/           # Layout components (navbar, footer)
├── lib/                  # Utility functions, API clients, and helpers
└── types/                # Global TypeScript definitions
```
