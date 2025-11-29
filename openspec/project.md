# Project Context

## Purpose

Subscription management web application built with modern Next.js.

- It manage user subscriptions
- Supports multiple currencies
- Supports notice of expiry

## Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5 (strict mode enabled)
- **Database**: MongoDB
- **Styling**: TailwindCSS 4 with PostCSS
- **Build Tool**: Turbopack (for both dev and production builds)
- **Fonts**: Geist Sans & Geist Mono (via next/font)
- **UI Utilities**:
  - class-variance-authority (CVA) for variant-based component styling
  - clsx & tailwind-merge for className composition
  - lucide-react for icons
- **Linting**: ESLint with Next.js config (core-web-vitals & TypeScript)

## Project Conventions

### Code Style

- **TypeScript**: Strict mode enabled with ES2017 target
- **Module Resolution**: Bundler mode with path aliases (`@/*` maps to project root)
- **File Organization**: Next.js App Router structure (`/app` directory)
- **Component Style**: React Server Components by default (use 'use client' directive when needed)
- **Styling**: Utility-first with TailwindCSS, prefer composition over custom CSS

### Architecture Patterns

- **Routing**: Next.js App Router (file-system based routing in `/app`)
- **Data Fetching**: Server Components for data fetching where possible
- **State Management**: React hooks and Server Components (no global state library yet)
- **Type Safety**: TypeScript for all files, avoid `any` types

### Testing Strategy

No Testing.

### Git Workflow

- **Main Branch**: `main`
- **Commit Conventions**: To be established
- **Pre-commit Hooks**: None configured yet

## Domain Context

Subscription management domain - handling user subscriptions, and billing cycles.

## Important Constraints

- Must maintain type safety throughout the application
- Performance-first approach (leveraging Turbopack and React Server Components)
- Mobile-responsive design required (TailwindCSS responsive utilities)

## External Dependencies

None configured yet. Future integrations may include:

- Payment processing (Stripe, Paddle, etc.)
- Authentication provider
- Database (to be determined)
