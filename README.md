# Terra Commerce Commerce Runtime

Medusa v2 commerce engine, Terra Commerce domain modules, and background worker runtime.

## Runtime model

This repository builds two processes from the same source tree:

- `commerce-api`: Medusa HTTP application and Terra Commerce modules.
- `commerce-worker`: outbox publisher, Redis Streams consumers, notifications, reporting, delivery synchronization, reconciliation, and scheduled jobs.

The normative specifications live in `MartinZakhaev/terra-commerce-master-spec`.

## Requirements

- Node.js 24 LTS
- pnpm 11
- PostgreSQL
- Redis

## Commands

```bash
pnpm install
pnpm dev
pnpm worker
pnpm typecheck
```
