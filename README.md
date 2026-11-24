# Vizzio Test

A two-page dashboard exercise using Vue 3 (`<script setup>`), Vite, and Tailwind CSS.

Planned pages:

- **Population & School-Age Structure:** demographic chart, age-bracket statistics, and regional distribution.
- **Foreign Direct Investment:** total investment, investment sectors, source economies, and a stock ticker.

All displayed dashboard values must come from JSON files. Both pages should closely follow the supplied Figma design and adapt to different aspect ratios.

## Project status

The repository is being prepared. The application, package scripts, routes, and JSON data files have not been scaffolded yet. Add the exact installation and run commands, page URLs, data locations, and implementation tradeoffs here when those exist.

## Branch workflow

```text
main
  └── develop
        └── feature/<short-description>
              └── pull request → develop

develop → pull request → main (created by the repository owner)
```

| Branch | Purpose | How it receives changes |
| --- | --- | --- |
| `main` | Release branch | Owner-created PR from `develop` |
| `develop` | Integration branch | PRs from `feature/*` branches |
| `feature/<short-description>` | One focused task, including fixes and documentation | Development commits |

Every new task starts from an up-to-date `develop` branch. Commit all work on a `feature/*` branch; do not commit or push changes directly to `main` or `develop`. Continue an existing feature on its current branch until its PR is complete.

### Start a task

First check the working tree. Preserve any existing local changes before switching branches; do not discard them.

```bash
git status --short --branch
git switch develop
git pull --ff-only origin develop
git switch -c feature/short-description
```

Use lowercase, hyphen-separated names such as `feature/dashboard-layout`, `feature/fix-chart-responsiveness`, or `feature/update-readme`.

### Complete a task

1. Finish the feature and run the relevant available checks.
2. Review the diff and stage only files belonging to the task.
3. Commit with a clear message, then publish the feature branch.
4. Open a PR with **base `develop`** and **head `feature/<short-description>`**.
5. Include the changes, validation results, and any limitations. Add screenshots for visual changes.
6. Wait for review and approval. Opening a PR does not authorize an agent to merge it.

Example, after staging the intended files:

```bash
git diff --cached
git commit -m "feat: add dashboard layout"
git push -u origin feature/dashboard-layout
gh pr create --base develop --head feature/dashboard-layout
```

Replace the example branch and message with your task's values. If GitHub CLI is unavailable, open the PR in GitHub and explicitly select `develop` as its base; GitHub may otherwise default to `main`.

If `develop` advances during the task, fetch and merge `origin/develop` into the feature branch, resolve conflicts, rerun relevant checks, and push the feature branch. Avoid rewriting published history.

### Release to main

The repository owner creates the final PR with **base `main`** and **head `develop`**, reviews the integrated changes, and merges it when ready. Agents must not create or merge this release PR unless the owner explicitly requests it.

Use a merge commit for `develop` → `main` to preserve the shared branch history. Keep `develop` as the long-lived integration branch after a release.

## Repository instructions

[AGENTS.md](AGENTS.md) contains the instructions for coding agents. The [PR template](.github/pull_request_template.md) provides the review checklist.

These files document the workflow; they do not configure GitHub branch protection. Repository rules for `main` and `develop` should require PRs if server-side enforcement is wanted.
