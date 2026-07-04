import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(_request: MedusaRequest, response: MedusaResponse): Promise<void> {
  response.status(200).json({
    status: "ready",
    service: "terra-commerce-commerce",
  })
}
