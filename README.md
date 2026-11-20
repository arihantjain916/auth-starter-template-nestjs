# NestJS + Prisma 7 Auth Starter

A NestJS backend starter with Prisma 7, PostgreSQL (or MySQL), JWT auth, roles and validated environment config.

It goes with the guide [How to Use NestJS, Prisma and PostgreSQL Together](https://www.arihantjain.cv/blogs/nestjs-prisma-postgresql-backend-stack).

## What's included

- **Auth:** `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`. Passwords are hashed with bcrypt, and the JWT comes back in the response body and as a signed, httpOnly cookie.
- **Guards:** `AuthGuard` accepts a Bearer token or the cookie. `RolesGuard` works with `@Roles('ADMIN')`. `WsJwtGuard` does the same for Socket.IO.
- **Prisma 7:** the `prisma-client` generator and a driver adapter. PostgreSQL is the default, and MySQL is a commented switch.
- **Env validation:** [`src/config/app.config.ts`](src/config/app.config.ts) checks every variable at startup. A missing or invalid one stops the app with a clear message.
- **Security basics:** helmet, a `ValidationPipe` that strips unknown fields, and cookie signing.
- **Infra:** a Redis client module, Swagger at `/api/docs` (outside production), Docker Compose for local databases and a production Dockerfile.

## Quick start

Requires Node.js 20.19+ (22 or 24 recommended) and Docker.

```bash
git clone https://github.com/arihantjain916/auth-starter-template-nestjs.git
cd auth-starter-template-nestjs

cp .env.example .env              # then replace JWT_SECRET and COOKIE_SECRET
docker compose up -d              # PostgreSQL + Redis

corepack enable
pnpm install                      # also runs prisma generate
pnpm prisma migrate dev           # creates the tables
pnpm start:dev
```

The API runs on http://localhost:3000 and the docs are at http://localhost:3000/api/docs.

Try it:

```bash
curl -X POST localhost:3000/auth/register -H 'Content-Type: application/json' \
  -d '{"name":"Jane","email":"jane@example.com","password":"a-long-password"}'
```

## Using MySQL instead of PostgreSQL

1. In `prisma/schema.prisma`, set `provider = "mysql"`.
2. In `src/prisma/prisma.service.ts`, comment out the `PrismaPg` adapter and uncomment the `PrismaMariaDb` import and block.
3. Set `DATABASE_URL=mysql://user:password@localhost:3306/db_name`.
4. In `docker-compose.yml`, swap the `postgres` service for the commented `mysql` one.
5. Delete `prisma/migrations` if it exists (migrations are database-specific), then run `pnpm prisma migrate dev`.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm start:dev` | Start in watch mode |
| `pnpm build` / `pnpm start:prod` | Build to `dist/` and run it |
| `pnpm prisma migrate dev --name <name>` | Create and apply a migration after a schema change |
| `pnpm prisma generate` | Regenerate the Prisma client (run after every schema change) |
| `pnpm prisma:deploy` | Apply migrations in production |
| `pnpm test` / `pnpm test:e2e` | Unit and e2e tests (e2e needs the database running) |
| `pnpm lint` | ESLint with autofix |

## Project structure

```text
src/
├── auth/            register, login, logout, me + token verification
├── config/          env validation and Swagger setup
├── decorators/      @Roles(), @UserInfo()
├── guards/          AuthGuard, RolesGuard, WsJwtGuard
├── generated/       Prisma client (generated, gitignored)
├── prisma/          PrismaService + global module
├── redis/           Redis client module (inject 'REDIS_CLIENT')
├── utils/           bcrypt, JWT and OTP email helpers
└── main.ts
prisma/
└── schema.prisma
```

## Docker

```bash
docker build -t auth-starter .
docker run -p 3000:3000 --env-file .env auth-starter
```

The container runs `prisma migrate deploy` before it starts the API. Inside Docker, `localhost` is the container itself, so point `DATABASE_URL` and `REDIS_HOST` at hosts the container can reach.

## License

MIT
