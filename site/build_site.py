#!/usr/bin/env python3
"""
Static-site generator for the 2027 CS/CE Career Guide.

    python3 site/build_site.py          # writes ./docs (GitHub Pages: main -> /docs)

Design (see HANDOFF.md, Phase 3):
- Source of truth is sections/*.md. The site never forks the prose.
- One HTML page per guide section; 03a+03b are merged into one Section 3 page;
  the appendices are split into glossary.html (App. A) and checklists.html (App. B).
- Heading IDs are deterministic (sec-3-1, sec-3-1-<slug>, appendix-b-2) so that
  "Section X.Y" / "Appendix B" mentions in the prose can be auto-linked.
- Emits docs/search-index.json (one record per h2/h3 block) for client-side search.
- Interactive tool pages (explorer, compare, quiz, roadmap) are static HTML shells
  under site/pages/ that load site/data/*.json copied to docs/data/.

Dependencies: pip install markdown pymdown-extensions
"""
from __future__ import annotations

import html
import json
import os
import re
import shutil
import sys
from pathlib import Path

import markdown

ROOT = Path(__file__).resolve().parent.parent
SECTIONS = ROOT / "sections"
SITE = ROOT / "site"
OUT = ROOT / "docs"

SITE_TITLE = "The 2027 CS/CE Career Guide"
SITE_TAGLINE = "Choosing Your Future — careers for students entering CS or CE in Fall 2027"
REPO_URL = "https://github.com/gorg667/career-guide"
SITE_URL = "https://gorg667.github.io/career-guide/"  # links to this prefix in the MD become relative on the site
WPM = 230  # reading speed for the estimate

# ---------------------------------------------------------------------------
# Page map: (output file, short nav title, list of source md files, section number or None)
# ---------------------------------------------------------------------------
PAGES = [
    ("index.html",        "Start here",            ["00-frontmatter.md"], None),
    ("01-landscape.html", "1 · The landscape",     ["01-landscape.md"], 1),
    ("02-framework.html", "2 · The framework",     ["02-framework.md"], 2),
    ("03-tier1.html",     "3 · Tier 1 careers",    ["03a-tier1-part1.md", "03b-tier1-part2.md"], 3),
    ("04-tier2.html",     "4 · Tier 2 careers",    ["04-tier2.md"], 4),
    ("05-tier3.html",     "5 · Tier 3 & contrarian", ["05-tier3.md"], 5),
    ("06-cs-vs-ce.html",  "6 · CS vs. CE",         ["06-cs-vs-ce.md"], 6),
    ("07-roadmap.html",   "7 · Four-year roadmap", ["07-roadmap.md"], 7),
    ("08-skills.html",    "8 · Skills & proof",    ["08-skills.md"], 8),
    ("09-market.html",    "9 · Market, comp, visas", ["09-market.md"], 9),
    ("10-tables.html",    "10 · Master tables",    ["10-tables.md"], 10),
    ("11-faq.html",       "11 · FAQ, myths, risks", ["11-faq.md"], 11),
    ("12-sources.html",   "12 · Sources",          ["12-sources.md"], 12),
    ("glossary.html",     "A · Glossary",          ["13-appendices.md#A"], "A"),
    ("checklists.html",   "B · Checklists",        ["13-appendices.md#B"], "B"),
]

TOOLS = [
    ("explorer.html",  "Career explorer",  "Sortable, filterable scorecard of all 29 careers — re-weight the six dimensions to match your priorities."),
    ("compare.html",   "Compare careers",  "Put two or three careers side by side: scores, comp bands, majors, scenario robustness."),
    ("quiz.html",      "Which career fits me?", "Ten questions that turn the §10.2 decision matrix into a ranked shortlist."),
    ("roadmap.html",   "Interactive timeline", "The Summer 2027 → May 2031 master calendar with recruiting windows and a 'you are here' marker."),
    ("checklists.html", "Checklists",       "Semester-by-semester, recruiting-season, and offer checklists that remember what you have ticked."),
    ("glossary.html",  "Glossary",         "~105 terms with instant filtering."),
]

SECTION_PAGE = {p[3]: p[0] for p in PAGES if p[3] is not None}

# ---------------------------------------------------------------------------
# Markdown helpers
# ---------------------------------------------------------------------------
def slugify(text: str) -> str:
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"[*_`]", "", text)
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text[:60].rstrip("-")


HEADING_RE = re.compile(r"^(#{1,4})\s+(.*?)\s*$")
LIST_START_RE = re.compile(r"^(\s*)([-*+]|\d+\.)\s+")


def normalize_lists(md_text: str) -> str:
    """Python-Markdown (unlike GitHub) needs a blank line before a list that follows
    a paragraph, otherwise the list is absorbed into the paragraph. Insert them."""
    out, in_code = [], False
    lines = md_text.splitlines()
    for i, line in enumerate(lines):
        if line.startswith("```"):
            in_code = not in_code
        if (not in_code and i > 0 and LIST_START_RE.match(line) and lines[i - 1].strip()
                and not LIST_START_RE.match(lines[i - 1]) and not lines[i - 1].lstrip().startswith(("|", "#", ">"))
                and not lines[i - 1].startswith(("  ", "\t"))):
            out.append("")
        out.append(line)
    return "\n".join(out)


def assign_heading_ids(md_text: str, page_kind):
    """Insert {#id} attr_list markers on every heading; return (md, headings).

    headings: list of dicts {level, text, id}
    ID scheme:
      '## 3.1 Title'         -> sec-3-1
      '### Sub'  under 3.1   -> sec-3-1-sub-slug
      '# Section 3 — ...'    -> sec-3
      '## Appendix A — ...'  -> appendix-a
      '### B.2 ...'          -> appendix-b-2
      other                  -> slug (deduplicated)
    """
    out, headings, seen = [], [], set()
    current_h2 = None
    in_code = False
    for line in md_text.splitlines():
        if line.startswith("```"):
            in_code = not in_code
        m = HEADING_RE.match(line) if not in_code else None
        if not m:
            out.append(line)
            continue
        hashes, text = m.groups()
        level = len(hashes)
        plain = re.sub(r"[*_`]", "", text)
        hid = None
        if level == 1:
            mm = re.match(r"Section (\d+)", plain)
            ma = re.match(r"Appendix ([AB])\b", plain)
            hid = f"sec-{mm.group(1)}" if mm else f"appendix-{ma.group(1).lower()}" if ma else slugify(plain)
        elif level == 2:
            mm = re.match(r"(\d+)\.(\d+)\b", plain)
            ma = re.match(r"Appendix ([AB])\b", plain)
            if mm:
                hid = f"sec-{mm.group(1)}-{mm.group(2)}"
            elif ma:
                hid = f"appendix-{ma.group(1).lower()}"
            else:
                hid = slugify(plain)
            current_h2 = hid
        else:
            mb = re.match(r"B\.(\d)\b", plain)
            if mb:
                hid = f"appendix-b-{mb.group(1)}"
            else:
                base = slugify(plain)
                hid = f"{current_h2}-{base}" if current_h2 else base
        base_id, n = hid, 2
        while hid in seen:
            hid = f"{base_id}-{n}"
            n += 1
        seen.add(hid)
        headings.append({"level": level, "text": plain, "id": hid})
        out.append(f"{hashes} {text} {{#{hid}}}")
    return "\n".join(out), headings


# Cross-reference auto-linking ------------------------------------------------
def _page_for_section(n: int) -> str | None:
    return SECTION_PAGE.get(n)


def link_crossrefs(md_text: str, this_page: str) -> str:
    """Turn 'Section 9.5', 'Sections 3–4', 'Appendix B.2', '(3.4)' into links.

    Runs on markdown before rendering. Skips headings, code, and existing links.
    """
    def href(page, anchor=None):
        if page == this_page:
            return f"#{anchor}" if anchor else "#top"
        return f"{page}#{anchor}" if anchor else page

    def sub_sec(m):
        word, a, b = m.group(1), int(m.group(2)), m.group(3)
        page = _page_for_section(a)
        if not page:
            return m.group(0)
        anchor = f"sec-{a}-{int(b)}" if b else f"sec-{a}"
        return f"[{m.group(0)}]({href(page, anchor)})"

    def sub_secs_range(m):
        # 'Sections 3–5' or 'Sections 3.1–3.3' — link the whole phrase to the first
        a = int(m.group(1)); b = m.group(2)
        page = _page_for_section(a)
        if not page:
            return m.group(0)
        anchor = f"sec-{a}-{int(b)}" if b else f"sec-{a}"
        return f"[{m.group(0)}]({href(page, anchor)})"

    def sub_app(m):
        letter, num = m.group(1), m.group(2)
        page = "glossary.html" if letter == "A" else "checklists.html"
        anchor = f"appendix-b-{num}" if (num and letter == "B") else f"appendix-{letter.lower()}"
        return f"[{m.group(0)}]({href(page, anchor)})"

    def sub_paren(m):
        a, b = int(m.group(1)), int(m.group(2))
        page = _page_for_section(a)
        if not page or a > 12:
            return m.group(0)
        return f"([{a}.{b}]({href(page, f'sec-{a}-{b}')}))"

    out = []
    in_code = False
    for line in md_text.splitlines():
        if line.startswith("```"):
            in_code = not in_code
            out.append(line); continue
        if in_code or line.lstrip().startswith("#"):
            out.append(line); continue
        # protect existing links and inline code
        parts = re.split(r"(\[[^\]]*\]\([^)]*\)|`[^`]*`)", line)
        for i, part in enumerate(parts):
            if i % 2 == 1:
                continue
            part = re.sub(r"\b(Sections?) (\d{1,2})(?:\.(\d{1,2}))?(?=[^\d–-]|$)(?![–-]\d)", sub_sec, part)
            part = re.sub(r"\bSections (\d{1,2})(?:\.(\d{1,2}))?[–-]\d{1,2}(?:\.\d{1,2})?", sub_secs_range, part)
            part = re.sub(r"\bAppendix ([AB])(?:\.(\d))?", sub_app, part)
            part = re.sub(r"\((\d{1,2})\.(\d{1,2})\)", sub_paren, part)
            parts[i] = part
        out.append("".join(parts))
    return "\n".join(out)


def render_markdown(md_text: str) -> str:
    md = markdown.Markdown(
        extensions=[
            "tables", "attr_list", "fenced_code", "sane_lists", "md_in_html",
            "pymdownx.tasklist", "pymdownx.betterem", "pymdownx.superfences",
        ],
        extension_configs={
            "pymdownx.tasklist": {"custom_checkbox": True, "clickable_checkbox": True},
        },
        output_format="html5",
    )
    return md.convert(md_text)


def postprocess_html(body: str) -> str:
    # Wrap tables for horizontal scrolling on mobile; mark numeric-heavy tables sortable.
    body = re.sub(r"<table>", '<div class="table-wrap"><table class="sortable">', body)
    body = body.replace("</table>", "</table></div>")
    # Links to the published site itself become relative (work at any base path / file://)
    body = body.replace(f'<a href="{SITE_URL}', '<a href="')
    # External links open in new tab
    body = re.sub(r'<a href="(https?://[^"]+)"', r'<a href="\1" target="_blank" rel="noopener"', body)
    return body


def strip_tags(s: str) -> str:
    return html.unescape(re.sub(r"<[^>]+>", " ", s)).strip()


# ---------------------------------------------------------------------------
# Search index: split rendered HTML into blocks per h2/h3
# ---------------------------------------------------------------------------
def build_search_records(page_file: str, page_title: str, body_html: str):
    records = []
    parts = re.split(r"(<h[23][^>]*>.*?</h[23]>)", body_html, flags=re.S)
    cur_title, cur_id, buf = page_title, "top", []
    def flush():
        text = re.sub(r"\s+", " ", strip_tags(" ".join(buf))).strip()
        if text or cur_id != "top":
            records.append({"p": page_file, "a": cur_id, "t": cur_title, "pt": page_title, "x": text[:1200]})
    for part in parts:
        m = re.match(r"<h[23][^>]*id=\"([^\"]+)\"[^>]*>(.*?)</h[23]>", part, flags=re.S)
        if m:
            flush()
            cur_id, cur_title, buf = m.group(1), strip_tags(m.group(2)), []
        else:
            buf.append(part)
    flush()
    return records


# ---------------------------------------------------------------------------
# Templates
# ---------------------------------------------------------------------------
def load_template(name: str) -> str:
    return (SITE / "templates" / name).read_text(encoding="utf-8")


def nav_html(active: str) -> str:
    items = []
    items.append('<div class="nav-group">Guide</div>')
    for file, title, _, _ in PAGES:
        cls = ' class="active"' if file == active else ""
        items.append(f'<a href="{file}"{cls}>{html.escape(title)}</a>')
    items.append('<div class="nav-group">Tools</div>')
    for file, title, _ in TOOLS:
        if file in ("glossary.html", "checklists.html"):
            continue
        cls = ' class="active"' if file == active else ""
        items.append(f'<a href="{file}"{cls}>{html.escape(title)}</a>')
    items.append('<div class="nav-group">Download</div>')
    items.append('<a href="CS_CE_Career_Guide_2027.md" download>Full guide (Markdown)</a>')
    items.append(f'<a href="{REPO_URL}" target="_blank" rel="noopener">Source on GitHub</a>')
    return "\n".join(items)


def toc_html(headings, min_level=2, max_level=3) -> str:
    items = []
    for h in headings:
        if h["level"] < min_level or h["level"] > max_level:
            continue
        items.append(f'<li class="toc-l{h["level"]}"><a href="#{h["id"]}">{html.escape(h["text"])}</a></li>')
    return "<ul>" + "\n".join(items) + "</ul>" if items else ""


def prevnext_html(idx: int) -> str:
    parts = []
    if idx > 0:
        f, t, _, _ = PAGES[idx - 1]
        parts.append(f'<a class="pn prev" href="{f}"><span>← Previous</span><strong>{html.escape(t)}</strong></a>')
    else:
        parts.append("<span></span>")
    if idx < len(PAGES) - 1:
        f, t, _, _ = PAGES[idx + 1]
        parts.append(f'<a class="pn next" href="{f}"><span>Next →</span><strong>{html.escape(t)}</strong></a>')
    return "".join(parts)


def render_page(template: str, **ctx) -> str:
    out = template
    for k, v in ctx.items():
        out = out.replace("{{" + k + "}}", v)
    return out


# ---------------------------------------------------------------------------
# Special handling for the front matter (index) page
# ---------------------------------------------------------------------------
def build_generated_toc(all_headings: dict) -> str:
    """Site-wide table of contents from the real headings of every page."""
    blocks = []
    for file, title, _, num in PAGES[1:]:
        hs = all_headings.get(file, [])
        h1 = next((h for h in hs if h["level"] == 1), None)
        label = h1["text"] if h1 else title
        label = re.sub(r"^Section \d+ — ", "", label)
        subs = [h for h in hs if h["level"] == 2]
        lis = "".join(f'<li><a href="{file}#{h["id"]}">{html.escape(h["text"])}</a></li>' for h in subs)
        prefix = f"{num}. " if isinstance(num, int) else f"Appendix {num}: "
        blocks.append(f'<details class="toc-block"><summary><a href="{file}">{html.escape(prefix + label)}</a></summary><ul>{lis}</ul></details>')
    return '<div class="site-toc">' + "".join(blocks) + "</div>"


def tools_cards_html() -> str:
    cards = []
    for file, title, desc in TOOLS:
        cards.append(f'<a class="card" href="{file}"><h3>{html.escape(title)}</h3><p>{html.escape(desc)}</p></a>')
    return '<div class="cards">' + "".join(cards) + "</div>"


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    (OUT / "data").mkdir()
    shutil.copytree(SITE / "static", OUT / "static")
    for f in (SITE / "data").glob("*.json"):
        shutil.copy(f, OUT / "data" / f.name)
    shutil.copy(ROOT / "CS_CE_Career_Guide_2027.md", OUT / "CS_CE_Career_Guide_2027.md")
    (OUT / ".nojekyll").write_text("")

    base = load_template("base.html")
    search_records = []
    all_headings = {}
    page_bodies = {}

    # Pass 1: read and prepare markdown for every page (need all headings for the index TOC)
    prepared = []
    for idx, (file, title, sources, num) in enumerate(PAGES):
        md_parts = []
        for src in sources:
            name, _, part = src.partition("#")
            text = (SECTIONS / name).read_text(encoding="utf-8")
            if part == "A":
                text = text.split("## Appendix B")[0]
                text = text.replace("# Appendices\n", "", 1)
                text = text.replace("## Appendix A — Glossary\n", "# Appendix A — Glossary\n", 1)
            elif part == "B":
                text = "## Appendix B" + text.split("## Appendix B", 1)[1]
                text = text.replace("## Appendix B — Checklists\n", "# Appendix B — Checklists\n", 1)
            md_parts.append(text)
        md_text = normalize_lists("\n\n".join(md_parts))
        if file == "index.html":
            # Replace the static TOC block with a generated one (placeholder token)
            md_text = re.sub(r"## Table of Contents.*$", "## Table of Contents\n\n@@SITE_TOC@@\n", md_text, flags=re.S)
            md_text = md_text.replace("---\n\n## How to Read This Guide", "@@TOOLS@@\n\n---\n\n## How to Read This Guide", 1)
        md_text, headings = assign_heading_ids(md_text, num)
        all_headings[file] = headings
        prepared.append((idx, file, title, md_text, headings))

    # Pass 2: render
    for idx, file, title, md_text, headings in prepared:
        md_text = link_crossrefs(md_text, file)
        body = postprocess_html(render_markdown(md_text))
        if file == "index.html":
            body = body.replace("<p>@@SITE_TOC@@</p>", build_generated_toc(all_headings))
            body = body.replace("<p>@@TOOLS@@</p>", '<h2 id="tools">Interactive tools</h2>' + tools_cards_html())
        words = len(strip_tags(body).split())
        h1 = next((h for h in headings if h["level"] == 1), None)
        page_title = h1["text"] if h1 else title
        if file == "index.html":
            page_title = SITE_TITLE
        search_records += build_search_records(file, page_title, body)
        page_html = render_page(
            base,
            title=html.escape(page_title),
            site_title=SITE_TITLE,
            description=html.escape(SITE_TAGLINE),
            nav=nav_html(file),
            toc=toc_html(headings),
            body=body,
            prevnext=prevnext_html(idx),
            reading=f"{max(1, round(words / WPM))} min read · {words:,} words",
            extra_head="",
            extra_scripts=('<script src="static/checklists.js" defer></script>' if file == "checklists.html"
                           else '<script src="static/glossary.js" defer></script>' if file == "glossary.html" else ""),
            body_class=f"page-{file.replace('.html', '')}",
        )
        (OUT / file).write_text(page_html, encoding="utf-8")
        print(f"  {file:22s} {words:6,} words  {len(headings):3d} headings")

    # Tool pages (static shells in site/pages/*.html get the same chrome)
    for f in sorted((SITE / "pages").glob("*.html")):
        raw = f.read_text(encoding="utf-8")
        m = re.search(r"<!--\s*title:\s*(.*?)\s*-->", raw)
        ptitle = m.group(1) if m else f.stem.title()
        ms = re.search(r"<!--\s*scripts:\s*(.*?)\s*-->", raw)
        scripts = ms.group(1) if ms else ""
        page_html = render_page(
            base,
            title=html.escape(ptitle), site_title=SITE_TITLE, description=html.escape(SITE_TAGLINE),
            nav=nav_html(f.name), toc="", body=raw, prevnext="", reading="Interactive tool",
            extra_head="", extra_scripts=scripts, body_class=f"page-tool page-{f.stem}",
        )
        (OUT / f.name).write_text(page_html, encoding="utf-8")
        print(f"  {f.name:22s} (tool)")

    (OUT / "search-index.json").write_text(json.dumps(search_records, ensure_ascii=False), encoding="utf-8")
    # 404 page → index
    (OUT / "404.html").write_text('<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=./index.html"><a href="./index.html">Home</a>')
    print(f"Built {len(prepared)} pages + tools; search index {len(search_records)} records -> {OUT}")


if __name__ == "__main__":
    sys.exit(main())
