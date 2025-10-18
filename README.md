# Ruwuter E-commerce Example

A modern e-commerce application built with **Ruwuter** (@mewhhaha/ruwuter), a file-based routing framework for Cloudflare Workers with streaming HTML and a custom JSX runtime. This project demonstrates a full-featured shopping experience with product listings, cart functionality, and account management.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **pnpm** (or npm/yarn)
- **Cloudflare account** (for deployment)
- **Wrangler CLI** (installed automatically with dependencies)

### Setup Instructions

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd squarehole-example
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   ```
   Your app will be available at `http://localhost:5173`

3. **Configure Cloudflare (for deployment):**
   ```bash
   npx wrangler login
   # Update wrangler.toml with your worker name
   ```

4. **Deploy to Cloudflare Workers:**
   ```bash
   pnpm deploy
   ```

## 🏗️ Project Structure

```
├── app/                    # Main application code
│   ├── routes/            # File-based routes (auto-generated routing)
│   │   ├── _index.tsx     # Home page (redirects to /products)
│   │   ├── products.tsx   # Product catalog with API integration
│   │   ├── cart.tsx       # Shopping cart functionality
│   │   └── account.tsx    # User account management
│   ├── document.tsx       # Root HTML document wrapper
│   ├── routes.mts         # Auto-generated route definitions
│   ├── assets/           # Static assets (CSS, JS, images)
│   └── utils/            # Shared utilities
├── worker/               # Cloudflare Worker entry point
│   └── main.ts          # Router initialization and request handling
└── .router/types/       # Auto-generated TypeScript route types
```

## 🔄 Understanding the Ruwuter Router

### File-Based Routing System

Ruwuter uses a **flat file-based routing** approach optimized for Cloudflare Workers:

#### How Routes Are Generated

1. **File Creation**: Create `.tsx` files in `app/routes/`
2. **Auto-Generation**: The build system scans route files and generates `app/routes.mts`
3. **Route Mapping**: Files are mapped to URL patterns automatically:
   - `routes/_index.tsx` → `/` (index route)
   - `routes/products.tsx` → `/products`
   - `routes/account.tsx` → `/account`
   - `routes/cart.tsx` → `/cart`

#### Route Structure Example

```typescript
// app/routes/products.tsx
export default function Route() {
  return <div class="container">Product page content</div>;
}

// Optional: Add a loader for data fetching
export const loader = async () => {
  const response = await fetch('https://api.example.com/products');
  return response.json();
};
```

Note: Ruwuter renders directly to HTML; use `class` instead of `className`.

#### Generated Route Configuration

The build system generates `app/routes.mts` which maps URLPatterns to route modules:

```typescript
// Auto-generated app/routes.mts
export const routes: route[] = [
  [new URLPattern({ pathname: "/products" }), [$document, $$products]],
  [new URLPattern({ pathname: "/cart" }), [$document, $$cart]],
  [new URLPattern({ pathname: "/account" }), [$document, $$account]],
  [new URLPattern({ pathname: "/" }), [$document, $$_index]]
];
```

### Router Integration with Cloudflare Workers

The router handles incoming requests through a simple integration:

```typescript
// worker/main.ts
import { routes } from "../app/routes.mjs";
import { Router } from "@mewhhaha/ruwuter";

const router = Router(routes);
const handler: ExportedHandler<Cloudflare.Env> = {
  fetch: router.handle,
};

export default handler;
```

### Key Router Features

- **URLPattern-based matching**: Uses Web Standards URLPattern API
- **Nested layouts**: Document wrapper automatically applied to all routes
- **Suspense support**: Built-in async data loading with fallback states
- **JSX-to-HTML rendering**: Lightweight JSX that compiles directly to HTML strings
- **TypeScript integration**: Auto-generated types for route parameters and data
- **Edge runtime optimized**: Designed for Cloudflare Workers' V8 isolates

### Data Loading with Suspense

Ruwuter provides streaming Suspense:

```typescript
import { Suspense } from "@mewhhaha/ruwuter/components";
import { query } from "../utils/query";

export default function Route() {
  return (
    <Suspense
      fallback={<div>Loading products...</div>}
    >
      {async () => {
        const response = await query('https://api.example.com/products');
        const products = await response.json();
        
        return (
          <div class="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        );
      }}
    </Suspense>
  );
}
```

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build application for production |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm lint` | Run all linters (ESLint + Oxlint) |
| `pnpm lint:eslint` | Run ESLint only |
| `pnpm lint:oxlint` | Run Oxlint only |
| `pnpm cf-typegen` | Generate Cloudflare Worker types |
| `pnpm deploy` | Deploy to Cloudflare Workers |

## 🎨 Tech Stack

- **Framework**: [Ruwuter](https://jsr.io/@mewhhaha/ruwuter) - File-based routing with streaming JSX for Cloudflare Workers
- **Runtime**: Cloudflare Workers (Edge runtime)
- **Build Tool**: Vite with custom Ruwuter plugin
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript with strict configuration
- **Linting**: ESLint + Oxlint for code quality
- **Data Fetching**: Built-in suspense-based async loading
- **JSX Runtime**: Ruwuter's custom JSX that renders directly to HTML

## 📝 Key Features Demonstrated

- **File-based routing** with automatic route generation
- **Suspense-based data loading** with loading states
- **API integration** with external services (Fake Store API)
- **Responsive design** with Tailwind CSS
- **TypeScript** with auto-generated route types
- **Edge deployment** ready for Cloudflare Workers
- **Lightweight JSX-to-HTML** rendering without React overhead

## 🔧 Build Configuration

The project uses a custom Vite plugin that:
- Watches route files and regenerates routing configuration
- Fixes `import.meta.url` references for Worker compatibility
- Integrates Tailwind CSS processing
- Handles TypeScript compilation with proper module resolution
- Configures Ruwuter's JSX runtime for HTML generation

## 📚 Learn More

- [Ruwuter Documentation](https://jsr.io/@mewhhaha/ruwuter/doc)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
