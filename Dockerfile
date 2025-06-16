# Stage 0: Base Image for consistent environment
# Using a Node.js LTS (Long Term Support) Alpine image is generally recommended for smaller size
FROM node:20-alpine AS base

# Stage 1: Dependency Installation
# This stage installs dependencies, leveraging Docker's build cache.
# Changes to package.json will invalidate this cache layer.
FROM base AS deps
WORKDIR /app
# Install libc6-compat for some Node.js libraries on Alpine, if needed.
# e.g., for `sharp` image optimization library.
RUN apk add --no-cache libc6-compat

# Copy package.json and lock files (yarn.lock, pnpm-lock.yaml, or package-lock.json)
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Choose your package manager and install dependencies
# If using npm:
RUN npm install --frozen-lockfile

# If using yarn:
# RUN yarn install --frozen-lockfile

# If using pnpm:
# RUN corepack enable pnpm && pnpm install --frozen-lockfile


# Stage 2: Build the Next.js Application
# This stage builds the Next.js application for production.
FROM base AS builder
WORKDIR /app
# Copy installed node_modules from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application source code
COPY . .

# Disable Next.js telemetry during build if desired
ENV NEXT_TELEMETRY_DISABLED 1

# Run the Next.js build command
# This command generates the .next directory, including the 'standalone' output
RUN npm run build


# Stage 3: Production Runner Image
# This final stage contains only the necessary files to run the Next.js app,
# resulting in the smallest possible production image.
FROM base AS runner
WORKDIR /app

# Set production environment and expose port 3000
ENV NODE_ENV production
# Cloud Run injects the PORT environment variable, so explicitly setting it here
# for EXPOSE is primarily for local testing and documentation.
EXPOSE 3000

# Create a non-root user for security best practices
# Next.js standalone output runs as a non-root user (nextjs) by default
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy the standalone output from the 'builder' stage
# The 'standalone' output copies necessary files into ./.next/standalone itself
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy public assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# Copy static files (e.g., /app/.next/static)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


# Command to start the Next.js server
# The standalone output creates a server.js file at the root of the standalone folder
CMD ["node", "server.js"]