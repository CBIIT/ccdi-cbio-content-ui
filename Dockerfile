# Setup Node
FROM node:24-alpine3.22 AS base
# Refresh index and upgrade OpenSSL so all stages get patched version (fixes CVE-2025-15467, CVE-2025-4575, CVE-2026-2673).
# apk update is required so the build sees the latest openssl/libssl3; both packages must be upgraded.
RUN apk update && apk upgrade --no-cache \
    && apk add --no-cache --upgrade openssl

# # Upgrade npm (pin version for reproducibility; use npm@latest if you prefer)
# RUN npm install -g npm@latest \
#   && npm --version \
#   && npm ls -g glob --depth=0 || true

# Install dependencies
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk --no-cache add git
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_VERSION
ENV NEXT_PUBLIC_VERSION=${NEXT_PUBLIC_VERSION}
# Create .env file
RUN echo "NEXT_PUBLIC_VERSION=${NEXT_PUBLIC_VERSION}" >> .env
RUN npm run build

# Production image, copy all the files and run next
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1
# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Copy necessary files from build
COPY --from=build /app/public ./public
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

# Remove npm as it's no longer needed in the runtime image.
# This is a temporary workaround to eliminate the vulnerability warning (CVE-2025-64756).
# See reference: https://medium.com/@balazs.csaba.diy/whats-this-glob-npm-madness-suddenly-every-node-js-image-is-vulnerable-but-why-1ba1b0cbad97
# Once the latest version of npm (> 11.6.3) is released, we can remove this step.
RUN npm r -g npm

# Switch to non-root user
USER nextjs
# Expose port
EXPOSE 3001
# Set the environment variable for the port
ENV PORT=3001
ARG NEXT_PUBLIC_VERSION
ENV NEXT_PUBLIC_VERSION=${NEXT_PUBLIC_VERSION}

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]

# docker build --build-arg NEXT_PUBLIC_VERSION=<your_version_here> -t ccdi-cbio-content-ui .