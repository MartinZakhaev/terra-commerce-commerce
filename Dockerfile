FROM node:24-alpine
WORKDIR /app
RUN corepack enable
COPY package.json ./
RUN pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm build
ENV NODE_ENV=production
EXPOSE 9000
CMD ["pnpm", "start"]
