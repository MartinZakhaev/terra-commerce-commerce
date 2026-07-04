type WorkerComponent = {
  name: string
  concurrency: number
}

const positiveInteger = (name: string, fallback: number): number => {
  const raw = process.env[name]
  if (!raw) return fallback

  const value = Number.parseInt(raw, 10)
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer`)
  }
  return value
}

const components: WorkerComponent[] = [
  { name: "outbox-publisher", concurrency: 1 },
  { name: "notification", concurrency: positiveInteger("TC_WORKER_CONCURRENCY_NOTIFICATION", 4) },
  { name: "sse-projector", concurrency: positiveInteger("TC_WORKER_CONCURRENCY_SSE", 4) },
  { name: "delivery", concurrency: positiveInteger("TC_WORKER_CONCURRENCY_DELIVERY", 2) },
  { name: "report", concurrency: positiveInteger("TC_WORKER_CONCURRENCY_REPORT", 1) },
  { name: "reservation-expiry", concurrency: 1 },
]

const run = async (): Promise<void> => {
  const abortController = new AbortController()

  for (const signal of ["SIGINT", "SIGTERM"] as const) {
    process.on(signal, () => abortController.abort(signal))
  }

  console.info(JSON.stringify({
    level: "info",
    message: "commerce worker started",
    components,
  }))

  await new Promise<void>((resolve) => {
    abortController.signal.addEventListener("abort", () => resolve(), { once: true })
  })

  console.info(JSON.stringify({
    level: "info",
    message: "commerce worker stopped",
    reason: abortController.signal.reason,
  }))
}

run().catch((error: unknown) => {
  console.error(JSON.stringify({
    level: "error",
    message: "commerce worker failed",
    error: error instanceof Error ? error.message : String(error),
  }))
  process.exitCode = 1
})
