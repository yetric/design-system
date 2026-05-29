# Agent Guidelines

## Pre-commit Checks

Before every commit, run all CI checks locally:

```bash
npx tsc --noEmit && npm run lint && npm run format:check && npx vitest run --project unit
```

If any step fails, fix it before committing.
