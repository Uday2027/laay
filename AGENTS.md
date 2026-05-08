# LAAE Jewelry E-Commerce — Agent Notes

## Project Structure
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 + Custom Gold/Cream Theme
- Prisma ORM + SQLite (file: `./dev.db`)
- NextAuth.js v4 (Credentials provider)
- Zustand for cart state

## Quick Start
```bash
cd my-app
npm run dev      # Start dev server on localhost:3000
npm run build    # Production build
```

## Default Credentials
- **Admin:** admin@laae.com / admin123
- **Database:** SQLite (`prisma/dev.db`)

## Key Files
- `prisma/schema.prisma` — Database schema
- `lib/auth.ts` — NextAuth config
- `lib/discount.ts` — Discount calculation engine
- `store/cart-store.ts` — Zustand cart with localStorage persist
- `.env` — DATABASE_URL, NEXTAUTH_SECRET

## Discount Rules (implemented in `lib/discount.ts`)
1. **5% Member Discount** — Applied when user is logged in
2. **15% Bulk Discount** — Applied when buying 3+ items from same category
3. **10% bKash Advance** — Applied when choosing bKash advance payment

## Admin Panel
Access at `/admin/dashboard` (requires ADMIN role).

## Notes
- Cash on Delivery (COD) and bKash Advance are the only payment methods
- No real payment gateway integrated
- Product images use placeholder paths in `/public/uploads/`
