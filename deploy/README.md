# Deploying the site

The site is fully static and already built into `docs/` (committed). Two ways to publish it at
https://gorg667.github.io/career-guide/ — either takes under a minute in the GitHub UI.

## Option A (simplest): Deploy from branch
Repo **Settings → Pages → Build and deployment → Source: "Deploy from a branch"** → Branch `main`, folder `/docs` → Save.
The site appears within ~1 minute. No workflow needed; every merge to `main` that touches `docs/` republishes.

## Option B: GitHub Actions
Copy `deploy/github-pages-workflow.yml` to `.github/workflows/pages.yml` on `main` (the AI agent's token is
not permitted to create workflow files, which is why it lives here), then **Settings → Pages → Source: "GitHub Actions"**.
The workflow enables Pages itself (`enablement: true`) and rebuilds `docs/` as a check.

```bash
mkdir -p .github/workflows && cp deploy/github-pages-workflow.yml .github/workflows/pages.yml
git add .github && git commit -m "ci: pages workflow" && git push
```

## Any other static host
Point Netlify / Cloudflare Pages / Vercel at the repo with **publish directory `docs`** and no build command.
All links in the site are relative, so it works from any base path — including opening `docs/index.html` from disk.
