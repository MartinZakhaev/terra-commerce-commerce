FROM node:24-alpine
WORKDIR /app
RUN npm install --global pnpm@11.9.0
COPY package.json pnpm-workspace.yaml ./
RUN NODE_OPTIONS=--max-old-space-size=3072 pnpm install --no-frozen-lockfile --network-concurrency=4 --child-concurrency=1
COPY . .
ENV TC_POSTGRES_DSN=postgres://build:build@localhost:5432/build
ENV TC_REDIS_URL=redis://localhost:6379/0
ENV TC_COMMERCE_JWT_SECRET=build-only-secret-with-at-least-32-characters
ENV TC_COMMERCE_COOKIE_SECRET=build-only-cookie-secret-with-at-least-32-characters
RUN NODE_OPTIONS=--max-old-space-size=3072 pnpm build
ENV NODE_ENV=production
EXPOSE 9000
CMD ["pnpm", "start"]
