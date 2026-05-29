# Agent Guidelines

## Pre-commit Checks

Before every commit, run all CI checks locally:

```bash
npx tsc --noEmit && npm run lint && npm run format:check && npx vitest run --project unit
```

If any step fails, fix it before committing.

## Release Process

**Never manually bump the version or create tags/releases.** release-please handles this automatically:

1. Merge a feature branch PR into `main` (use `feat:` / `fix:` commit prefixes)
2. release-please opens a CHANGELOG + version bump PR on `main`
3. Merge that PR → release-please creates the git tag and GitHub Release
4. The GitHub Release triggers `publish.yml` → npm publish to `@yetric/ui`
