# Base: real Node 22.23.4, with the Bun binary copied in for installs
FROM node:22.23.4-alpine AS base
RUN apk add --no-cache libstdc++ libgcc libc6-compat
COPY --from=oven/bun:1-alpine /usr/local/bin/bun /usr/local/bin/bun

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb* bun.lock* ./
RUN bun install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build

# Production image (Node only, no Bun needed)
FROM node:22.23.4-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3004

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN mkdir -p media
RUN chown nextjs:nodejs .next
RUN chown nextjs:nodejs media

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3004

CMD ["node", "server.js"]
