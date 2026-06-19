# FlowLedger ERP (Web)

Next.js frontend for the FlowLedger ERP system — marketing site, authentication, and admin modules.

## Setup

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL (default `http://localhost:2001/api/v1`) |

## Demo accounts (local seed)

| Role | Email | Password |
|------|-------|----------|
| Super Admin | `superadmin@gmail.com` | `1qazxsw2` |
| Company | `company@gmail.com` | `1qazxsw2` |

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint
