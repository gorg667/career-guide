# The 2027 CS/CE Career Guide

A comprehensive, data-driven guide to the best careers for a student enrolling in a
Computer Science or Computer Engineering major in the United States in September 2027.

**Read it as a website:** https://gorg667.github.io/career-guide/ — one page per section, site-wide search (`/`), dark mode, printable career cards, and seven interactive tools built from the guide's own data.

> **Publishing status:** the site is built and committed in `docs/`, but GitHub Pages must be switched on once by the repository owner (the automation token cannot do it): **Settings → Pages → Source "Deploy from a branch" → `main` / `/docs` → Save.** Details and an optional Actions workflow in [`deploy/README.md`](deploy/README.md). Until then the URL above returns 404; open `docs/index.html` locally instead.

**Read it as one file:** [`CS_CE_Career_Guide_2027.md`](CS_CE_Career_Guide_2027.md) — **Version 2.1** (September 2026; re-based on the BLS 2025–35 projections released August 27, 2026), ~57,000 words, 12 sections + 2 appendices.

## The website
| Page | What it does |
|---|---|
| [Career explorer](https://gorg667.github.io/career-guide/explorer.html) | All 29 careers, sortable and filterable; re-weight the six scoring dimensions with sliders or presets and watch the ranking change |
| [Compare careers](https://gorg667.github.io/career-guide/compare.html) | Two or three careers side by side — scores, comp bands, degree, grad school, citizenship, scenario grades; shareable URL |
| [Which career fits me?](https://gorg667.github.io/career-guide/quiz.html) | Ten questions → ranked shortlist with the reasoning shown; hard constraints (citizenship, grad school) filter rather than penalize |
| [Interactive timeline](https://gorg667.github.io/career-guide/roadmap.html) | The Summer 2027 → May 2031 master calendar with a "today" marker, open recruiting windows, and a Gantt view |
| [Is the guide still right?](https://gorg667.github.io/career-guide/indicators.html) | The five falsifiable predictions (§1.4) and seven yearly indicators (§12.5) as a checklist: threshold, last known value, where to look, what to conclude if it fails |
| [Checklists](https://gorg667.github.io/career-guide/checklists.html) | Appendix B as tickable boxes, saved in your browser, with progress bars |
| [Glossary](https://gorg667.github.io/career-guide/glossary.html) | Appendix A with instant filtering |

Every literal "Section X.Y" / "Appendix B" mention in the prose is auto-linked. The explorer and compare pages can print a one-page **career card** per career (scores, comp bands, degree, scenarios, link back) for a counselor or parent. Pages carry OpenGraph/JSON-LD metadata and there is a `sitemap.xml`. No framework, no tracking, no build step beyond Python; the whole site is static files in `docs/`.

## What's inside
1. The landscape 2022–2026 and three scenarios for 2031
2. A seven-dimension framework for scoring any tech career, plus a 12-signal self-assessment ("is this field for me?")
3. Tier 1 careers (AI/ML, security, semiconductors, infrastructure, robotics/embedded, data engineering) — full profiles with a day-in-the-life and a new-grad week-in-the-life for each
4. Tier 2 careers (FDE, defense, quantum, health, fintech/quant, energy, PM, enterprise cloud, graphics, devtools, general SWE at top-tier employers)
5. Tier 3, niche, and contrarian paths — including the honest take on web development
6. CS vs. CE: which degree for which career; verdicts on "AI"/"Data Science"/"Cybersecurity" majors; co-op programs; schools by specialty (where the pipelines actually are)
7. Year-by-year roadmap, Summer 2027 → May 2031, keyed to the recruiting calendar
8. Skills, portfolio, open source, competitions, certifications, interviews, grad school, scholarships, networking/referrals
9. Geography, compensation, employer types, clearances (incl. interim/Continuous Vetting), immigration (2026 wage-weighted H-1B rule, the vacated $100k fee, the F-1 duration-of-status rule), paying for the degree
10. Master scorecard (29 careers), decision matrix, comp table, major map, scenario stress test, one-line-per-career summary
11. FAQ (26 questions), myths, risks and hedges
12. Sources (30+ primary + secondary sources with URLs), methodology, v2.0 and v2.1 change logs, and how to keep the guide current

**Appendices:** A. Glossary (~105 terms) · B. Checklists (semester-by-semester, recruiting season, offer evaluation)

## Structure
- `sections/` — the guide, written section by section
- `research/` — research notes and sources
- `build.sh` — concatenates `sections/*.md` into the final MD
- `site/` — website generator: `build_site.py`, `templates/base.html`, `static/` (CSS/JS), `pages/` (tool shells), `data/careers.json` (structured copy of §10 used by the tools; the build fails if its scores drift from §10.1), `data/indicators.json` (the predictions/indicators dashboard)
- `deploy/` — GitHub Pages instructions and an optional Actions workflow
- `docs/` — generated site (committed; served by GitHub Pages from `main` → `/docs`)
- `HANDOFF.md` — progress log (for continuation if the writing process is interrupted)
- `REVIEW.md` — the v1.0 → v2.0 self-review: itemized critique (A/B/C/D items) and execution order
- `OUTLINE.md` — master outline

## Build
```bash
bash build.sh                              # -> CS_CE_Career_Guide_2027.md
pip install markdown pymdown-extensions    # once
python3 site/build_site.py                 # -> docs/
cd docs && python3 -m http.server 8080     # local preview
```
Editing rule: the Markdown in `sections/` is the canonical source. The site never forks the prose — change the MD, rebuild. The exceptions are `site/data/careers.json` (mirror of §10.1/10.3/10.4/10.5; the build checks D1–D6 and tier against §10.1 and exits non-zero on drift), `site/data/indicators.json` (mirror of §1.4/§12.5), and the §7.1 calendar transcribed in `site/static/roadmap.js`. The footer version and dates are read from `sections/00-frontmatter.md` at build time.

## Keeping it current
The guide is a September 2026 snapshot. Each year, open the [indicators page](https://gorg667.github.io/career-guide/indicators.html), re-check the five predictions and seven indicators against their sources, and update `sections/` (and the two JSON mirrors) accordingly. Section 12.5 spells out the decision rule for when a failed prediction should change the advice.
