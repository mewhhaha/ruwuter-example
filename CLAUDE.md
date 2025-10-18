# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Cloudflare Workers application built with Ruwuter framework (@mewhhaha/ruwuter), using Vite as the build tool and TypeScript for type safety. The application appears to be an e-commerce example with product listing, cart, and account pages.

## Essential Commands

### Development
```bash
pnpm dev              # Start Vite dev server
```

### Build & Deploy
```bash
pnpm build            # Build the application with Vite
pnpm deploy           # Deploy to Cloudflare Workers using Wrangler
```

### Code Quality
```bash
pnpm typecheck        # Run TypeScript type checking
pnpm lint             # Run all linters (ESLint and Oxlint)
pnpm lint:eslint      # Run ESLint only
pnpm lint:oxlint      # Run Oxlint only
```

### Type Generation
```bash
pnpm cf-typegen       # Generate Cloudflare types using Wrangler
```

## Architecture

### Framework: Ruwuter
- File-based routing system similar to Next.js/SvelteKit
- Routes are automatically generated from files in `app/routes/`
- The framework uses suspense for async data loading
- JSX is configured to use Ruwuter's runtime

### Key Directories
- `app/` - Main application code
  - `routes/` - File-based routes (auto-generated to `app/routes.mts`)
  - `assets/` - Static assets including Tailwind CSS
  - `document.tsx` - Root HTML document wrapper
- `worker/` - Cloudflare Worker entry point
- `.router/types/` - Auto-generated route types

### Routing System
1. Routes are defined in `app/routes/` directory
2. The build system auto-generates `app/routes.mts` mapping URLPatterns to route modules
3. `worker/main.ts` creates a router instance that handles incoming requests
4. Each route can export a `loader` function for data fetching

### Styling
- Tailwind CSS v4 is used with Vite integration
- CSS is processed through `@tailwindcss/vite` plugin
- ESLint is configured with Tailwind-specific rules for consistency

### Build Configuration
- Uses Vite with Cloudflare plugin for Worker compatibility
- Configured for ESNext target with proper module resolution
- Images are converted to data URLs during build
- Custom Ruwuter plugin handles route generation and build fixes

### TypeScript Configuration
- Strict mode enabled with exact optional properties
- JSX configured to use Ruwuter's runtime
- Includes type roots for both app code and generated route types
