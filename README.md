# portfolio-batch

Azure Batch job package for heavy workloads (Phase 2+).

## Jobs (planned)

| Job | Description |
| --- | ----------- |
| `projection` | Multi-scenario tax / net worth grid |
| `backfill` | Bulk transaction repair |
| `monte-carlo` | Probabilistic net worth (Phase 3) |

## MVP

Scaffold only — pool autoscale 0↔1 defined in `portfolio-infra/infra/azure/serverless/batch.bicep`.

## Run locally (dry-run)

```bash
npm install && npm run build
npm start -- --job=echo --householdId=local-household
```
