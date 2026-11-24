# Repository instructions

## Required Git workflow

- `main` is the release branch. `develop` is the integration branch.
- All task commits, including fixes, refactors, configuration, and documentation, belong on a `feature/<short-description>` branch.
- Never commit task changes directly on `main` or `develop`, and never push task changes directly to either branch.
- Start each new, independent task from the latest `origin/develop`. Use a lowercase, hyphen-separated feature name.
- Continue related work on its existing feature branch and PR. Do not branch a new, independent task from another feature branch.
- When a feature is complete, push its branch and create a PR targeting `develop`. Always set the base explicitly; do not rely on GitHub's default branch.
- Do not merge a feature PR unless the user explicitly authorizes the merge. A request to implement a feature includes preparing its PR, not merging it.
- The user owns the final `develop` → `main` PR. Do not create or merge that release PR unless explicitly requested.
- Never force-push, reset shared branch history, or delete `main` or `develop`.

## Before making changes

1. Read this file and any more specific repository instructions for the files being changed.
2. Inspect `git status --short --branch`, the current branch, and its upstream. Preserve unrelated local changes and untracked files. Do not stage, commit, stash, or discard them without authorization.
3. Fetch `origin`. For a new task, switch to `develop`, update it with `git pull --ff-only origin develop`, and create `feature/<short-description>`.
4. If local changes prevent a safe branch switch, preserve them and resolve the situation before proceeding. Do not use a destructive checkout or reset.
5. If `develop` cannot fast-forward or the remote is unavailable, explain the blocker. Do not silently use `main` or overwrite divergent history.

## Implementation expectations

- Use Vue 3 with `<script setup>`, Vite, and Tailwind CSS for the dashboard application.
- Implement both dashboard pages and keep displayed values in JSON files, separate from presentation.
- Follow the supplied Figma design closely and check layout behavior at multiple aspect ratios.
- Discover actual package scripts and project structure before choosing commands. Do not invent run commands, routes, data paths, or passing checks.
- Update the README with installation, run instructions, navigation, data locations, and tradeoffs as the application is implemented.
- Keep changes focused on the requested task.

## Before opening the feature PR

1. Review the final diff and run checks appropriate to the change using commands that actually exist in the repository. For documentation-only changes, inspect Markdown and run `git diff --check`.
2. Stage only task files with explicit paths. Inspect the staged diff for unintended files and secrets before committing.
3. Write a concise commit message describing the change, such as `feat: add population dashboard` or `docs: document branch workflow`.
4. If needed, merge the latest `origin/develop` into the feature branch, resolve conflicts, and repeat affected validation. Do not rewrite published history.
5. Push with `git push -u origin feature/<short-description>` and open the PR with base `develop` and the feature branch as head.
6. Use the PR template. Describe resulting behavior, checks actually run, and known limitations. Include screenshots for visual changes.
7. Verify the PR's base and head, then report its URL and validation results to the user. Leave it open for review.

If publishing or PR creation is blocked, keep the work on its feature branch, report the exact blocker, and provide the remaining step. Do not claim the PR exists until creation is confirmed.

## Release boundary

The repository owner decides when `develop` is ready for `main` and creates the release PR. If explicitly asked to assist with the release, use base `main` and head `develop`, preserve shared history with a merge commit, and retain the `develop` branch.
