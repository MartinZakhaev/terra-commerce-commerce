import { defineConfig, loadEnv } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV ?? "development", process.cwd())

const required = (name: string): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is required`)
  }
  return value
}

export default defineConfig({
  projectConfig: {
    databaseUrl: required("TC_POSTGRES_DSN"),
    redisUrl: required("TC_REDIS_URL"),
    http: {
      storeCors: process.env.TC_STOREFRONT_CORS ?? "http://localhost:3002",
      adminCors: process.env.TC_ADMIN_CORS ?? "http://localhost:3000,http://localhost:3001",
      authCors: process.env.TC_AUTH_CORS ?? "http://localhost:3000,http://localhost:3001,http://localhost:3002",
      jwtSecret: required("TC_COMMERCE_JWT_SECRET"),
      cookieSecret: required("TC_COMMERCE_COOKIE_SECRET"),
    },
  },
})
