# Agent Guidelines

## Pre-commit Checks

Before every commit, run all CI checks locally:

```bash
npx tsc --noEmit && npm run lint && npm run format:check && npx vitest run --project unit
```

If any step fails, fix it before committing.

## Release Process

> **Note:** release-please currently does not auto-detect squash merge commits reliably. Use the manual process below.

### Manual Release (current process)

1. Merge the feature PR into `main` via squash merge
2. Update `package.json` version, `.release-please-manifest.json`, and `CHANGELOG.md` on `main`
3. Commit as `chore(main): release X.Y.Z`
4. `git tag vX.Y.Z && git push origin vX.Y.Z`
5. `gh release create vX.Y.Z --title "vX.Y.Z" --notes "..."`
6. The GitHub Release triggers `publish.yml` → npm publish to `@yetric/ui`

### Version bumping rules (pre-1.0)

Both `feat:` and `fix:` bump the **patch** version while major is 0. Breaking changes (`feat!:`) bump minor.

### Automated (intended future flow)

1. Merge a feature branch PR into `main` via squash merge (PR title must be a conventional commit)
2. release-please opens a CHANGELOG + version bump PR on `main`
3. Merge that PR → release-please creates the git tag and GitHub Release
4. The GitHub Release triggers `publish.yml` → npm publish to `@yetric/ui`
