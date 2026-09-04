# REVIEW.md — Phase 2 Critique of the v1.0 Guide (2026-09-03)

Purpose: a complete, honest critique of `sections/*.md` as of commit 633a6f5, plus the
fix plan. Written BEFORE any edits so a successor agent can execute the plan even if
this session is cut off. Each item has an ID; the Phase 2 progress table in HANDOFF.md
references these IDs.

Overall verdict: the guide is strong — coherent thesis, good data density, correct
structure. Its weaknesses are (1) internal inconsistencies between sections written in
separate passes, (2) a few over-precise or un-sourced claims, (3) several real content
gaps that a demanding reader (student, parent, counselor) would notice, and (4) some
readability barriers for a 17-year-old (dense acronyms, no glossary, no fast reading
path).

---

## A. INTERNAL INCONSISTENCIES (must fix; highest priority, lowest risk)

| ID | Issue | Where | Fix |
|---|---|---|---|
| A1 | Front matter says "~30,000 words"; actual 36.6k and will grow. Version "1.0". | 00 | Update to ~40k after rebuild; bump to v2.0; note revision date. |
| A2 | Front matter claims "Every major claim is tied to a source in Section 12" — not true (Live Data Tech, SignalFire, Layoffs.fyi, Workforce.ai, TrueUp, McKinsey, Orosz, CyberSeek, Introl, WSJ, FT, IBM breach cost, BNEF, etc. are cited in text but absent from §12). | 00, 12 | Soften to "every major statistical claim"; add §12.3 "Secondary sources cited via primary reporting" with URLs where confident. |
| A3 | §1.4 uses "Tier 1/2/3" for the *compensation* trimodal distribution — collides with career Tier 1/2/3 used everywhere else. §9.2 correctly uses "mode 1/2/3". | 01 | Rewrite §1.4 comp bullet to use "mode". |
| A4 | §2.2 states Tier 1 requires ≥4 on D1, D2, **D3**. But AI/ML is scored D3=3 and Data Eng is D2=3, D3=3 — both violate the stated rule while being Tier 1. Defense (5,5,5,3.5,3,5) and Energy (5,5,4,3,3,5) *satisfy* the rule but are Tier 2. | 02, 03, 04 | Amend §2.2: Tier 1 = ≥4 on D1 and D2 (or ≥4 on D2 for the engineering-heavy majority of the field), ≥3 on D3/D4/D6, **and** at least one major sub-specialty at ≥4 on D3; Tier 2 additionally triggered by citizenship gate, small absolute job count, comp band well below Tier 1, or MS/PhD requirement. Explicitly name AI/ML and Data as "Tier 1 with caveats" and Defense/Energy as "would be Tier 1 but for X". |
| A5 | Section 5 scorecards ≠ §10.1 master table for: Web dev (5.1: 3,2,1,3,4,5=18 vs 10.1: 2,2,1,2–3,3,5=15–16), Mobile (D6 4 vs 5), Games (5.5: 2,2,2,2,3,3=14 vs 10.1: 2,3,3,2,3,4=17), Research/PhD (5.6: D2=5, D4=2/5, D5=4 vs 10.1: 4,3,3), QA/IT (5.3 ranges vs 10.1 point values). | 05, 10 | Make ONE canonical set and apply to both. Canonical: Web 2,2,1,3,4,5=17; Mobile 2,2,2,3,3,4=16; Games 2,2,2,2,3,3=14; Research 3,5,5,3*,4,1=21 (*avg of 2 academia / 5 labs); QA/IT 1,1,1,1,3,5=12. |
| A6 | §10.1 says rows are ranked by Total with tie-breaks, but rows are not sorted by Total (Semis 26–27 listed above Infra 28). Also front-matter TL;DR ranks AI/ML #1 while the scorecard puts it ~5th. The reader will notice. | 00, 10 | Sort §10.1 within tier by Total; add an explicit note reconciling the two orderings: TL;DR = "expected value for a strong student who can stand out (weights comp ceiling + job count)"; §10.1 = "robustness-weighted". Add a one-line pointer in §00. |
| A7 | D1 horizon labelled "2031–2045" in §2.1 but "2027–35" in §10.1. | 02, 10 | Use "2031–2045" everywhere (career horizon), note BLS window is 2024–34/2025–35 input data. |
| A8 | Contrarian niches list differs: §5.11 (COBOL, analog/RF, power, PLC/OT, medical firmware, formal verification, PQC, accessibility) vs §10.1 row 20 (COBOL, embedded legacy, **EDA tools, HPC**, controls). EDA-tool development and HPC/scientific computing are genuinely good niches and missing from §5.11. | 05, 10 | Add EDA software engineering and HPC/scientific computing to §5.11; align §10.1 row label. |
| A9 | New-grad comp bands drift slightly between §3 profiles, §9.2 and §10.3 (e.g., AI/ML: §3.1 "$140–220k Big Tech/labs; $110–150k other tech" vs §9.2 "$150–220k typical (BS)"). | 03, 09, 10 | Set AI/ML typical BS band to "$130–220k" in 9.2/10.3; spot-check others. |
| A10 | §7.1 lists specific freshman programs (Meta University, Amazon Propel, etc.) — several are renamed/paused year to year. | 07 | Add hedge "names and existence change yearly; check each fall". |
| A11 | §9.4 says "a quarter to a third of US CS graduates (international)"; §9.5 says "roughly a third of US CS/CE undergrads … international". Too high for bachelor's (CRA: ~15–20% at research universities; majority at master's). | 09 | Correct to "roughly 15–20% of bachelor's at research universities and a majority of master's graduates". |
| A12 | §12.1 says "Any figure with a specific number … traces to one of the sources below" — same over-claim as A2. | 12 | Soften. |

## B. FACTUAL-RISK CLAIMS (verify or soften)

| ID | Claim | Where | Action |
|---|---|---|---|
| B1 | "Anthropic $65B round at $965B valuation; Anthropic and OpenAI both filed for IPOs in June 2026" — not in research notes; over-precise. | 01 §1.2, 05 §5.7 | One web check; if unconfirmed, soften to "record private rounds and reported IPO preparations by the leading labs in 2026". |
| B2 | H-1B: guide says wage-weighted selection "would favor" — DHS proposed a weighted-selection rule Sept 2025 and (per author's recollection) finalized it Dec 2025 for the FY2027 lottery (Mar 2026). If final, update tense and implications. | 09 §9.5 | One web check; update. |
| B3 | "Section 174 partially restored … in 2025 legislation" — true (July 2025 tax law restored immediate domestic R&D expensing). Make precise. | 01 | Name the law ("the July 2025 tax law, often called the One Big Beautiful Bill Act") and say "fully restored for domestic R&D". |
| B4 | "CS PhD production record 1,909 in 2025, +51% in five years" — plausible (CRA) but not in notes. | 05 §5.6 | Hedge: "a record (~1,900 in 2025 per CRA Taulbee)". |
| B5 | "Indeed index peaked May 2022 at roughly 2.2× pre-pandemic". | 01 | Hedge to "roughly double". |
| B6 | "OpenAI reportedly spent ~$170M on Datadog in a single year" — already hedged "reportedly". OK. | 03b | Leave. |
| B7 | "H-1B lottery odds for bachelor's holders 20–30%" — depends on year; FY2026 selection ~35% of eligible registrations overall. | 09 | Hedge to "historically roughly one-in-three to one-in-four, lower for bachelor's-only, and now weighted by wage level" (pending B2). |
| B8 | §6.1 class sizes "~110,000+ CS bachelor's; ~12,000–15,000 CE" — approximately right (NCES/ASEE) but should be labelled approximate with source (NCES IPEDS, ASEE). | 06 | Add "(approx.; NCES/ASEE)". |
| B9 | Several "will not reverse" absolutes (§1.2, §10.1). | 01, 10 | Soften one or two to "very unlikely to reverse before 2031". |

## C. CONTENT GAPS (net-new material; the "make it the best" part)

| ID | Gap | Why it matters | Where to add | Size |
|---|---|---|---|---|
| C1 | **General software engineering (backend/product) at strong employers has no profile.** It is Tier-3'd implicitly via "web/full-stack", yet §9.2/§10.3 list "Software Engineer, Big Tech $140–200k". A reader asks: "Is SWE at Google a bad career now?" | Most common real outcome; the guide must take a position. | New §4.11 "General Software Engineering (Backend / Product / Full-Stack) at Top-Tier Employers — the honest baseline" (Tier 2: 4,3,2,5,5,4=23). Update §4.12 summary, §6.2 table, §10.1, §10.3, §10.5. | ~500 words |
| C2 | **Specialized majors** (BS in AI, Data Science, Cybersecurity, Software Engineering, IT, "CSE") — not addressed. CRA notes students are shifting to them. Parents ask. | Very common 2027 decision. | New §6.7 "What about 'AI', 'Data Science', 'Cybersecurity', 'Software Engineering', and IT majors?" — verdict: prefer CS/CE + electives unless program is rigorous; EE vs CE note. Renumber 6.7→6.8 etc. | ~500 words |
| C3 | **Co-op programs** (Northeastern, Drexel, Cincinnati, Georgia Tech, Purdue, RIT, Waterloo-style) never mentioned — yet the guide's core thesis is "internships are the conversion funnel". | Directly actionable for a student choosing a school in 2026–27. | Add to §6 (school choice) and §11 FAQ "Which school". | ~250 words |
| C4 | **Paying for it: cost, debt, ROI.** Only a one-liner in FAQ/risks. | Parents' #1 question. | New §9.7 "Paying for the degree: cost, debt, and return" with rules of thumb (total borrowing < expected first-year salary; in-state; 4+1 economics; SMART/SFS/ROTC as funding), then renumber summary to 9.8. | ~450 words |
| C5 | **Networking, conferences, referrals** — referrals mentioned once. Student-volunteer programs at DEF CON, KubeCon, NeurIPS, ISCA/MICRO/DAC, Grace Hopper, Tapia, SHPE/NSBE/SWE; alumni outreach templates; LinkedIn hygiene. | Warm referral ≈ 3× interview odds; cheap, under-used. | New §8.10 "Networking, Conferences, and Referrals"; renumber summary to 8.11. | ~400 words |
| C6 | **Underrepresented students / women** — not addressed at all. | Equity + practical (targeted programs, fellowships, conferences). Keep brief and practical. | Paragraph in §6.8 Special Considerations. | ~150 words |
| C7 | **Glossary.** Guide uses RTL, DV, UVM, EDA, FPGA, ASIC, SoC, RTOS, SRE, FDE, OT/ICS, PQC, RAG, VLA, MLOps, STA, TS/SCI, OPT/CPT/H-1B/O-1, ABET, ISO 26262, DO-178C, IEC 62304 … unexplained. A high-school junior is lost. | Readability for the stated audience. | New `sections/13-appendices.md`: Appendix A Glossary (~80 terms). | ~1,200 words |
| C8 | **Checklists.** The roadmap is long prose+table; a one-page semester checklist is what students actually pin up. | Actionability. | Appendix B in 13: semester-by-semester checklists (Summer 2027 → Spring 2031) + "before each recruiting season" checklist + "offer evaluation" checklist. | ~700 words |
| C9 | **Reading paths** ("5 minutes / 30 minutes / whole thing"; "if you are a parent / a junior / already admitted"). | Audience is three-fold per §00 but there's no navigation help. | Add to §00 "How to Read". | ~150 words |
| C10 | **FAQ additions**: community-college/transfer; AP/dual-enrollment credit strategy; "EE instead of CE?"; "BS in AI/DS?" (pointer to §6.7); "how many hours/week"; "double major worth it?"; "I want to work abroad"; "parent: how can I help?". | Real questions from the audience. | §11.1 | ~600 words |
| C11 | **Teaching assistantships / campus jobs** as signal + income (TA, research assistant, IT helpdesk, tutoring). | Cheap credibility; often overlooked. | §7.4/7.5 | ~100 words |
| C12 | **Clearance details**: clearance "currency" (reinstatable ~24 months after leaving a cleared role), Continuous Vetting, interim clearances. | Practical accuracy. | §9.4 | ~100 words |
| C13 | **International: cap-exempt employers** (universities, university-affiliated labs, nonprofits) as an H-1B path; "Day-1 CPT" program warning. | Practical safety. | §9.5 | ~120 words |
| C14 | **Worked example of applying the framework** to a career not covered (e.g., AR/VR or ed-tech), to prove §2's claim that the reader can "re-run the analysis". | Fulfils a promise the guide makes. | §2.6 | ~250 words |
| C15 | **§1: a "what would falsify this guide" box** — §12.4 has indicators; §1.4 promises "falsifiable expectations" but doesn't list them crisply. | Intellectual honesty; helps the 2029 reader. | Small table at end of §1.4: 5 falsifiable predictions with the number to check. | ~200 words |

## D. STYLE / READABILITY

| ID | Issue | Fix |
|---|---|---|
| D1 | SMART/SFS repeated ~10 times. Acceptable as a key message but trim two mentions. | Light edit. |
| D2 | Some very long table cells in §9.3 and §10.2. | Leave; MD renders fine. |
| D3 | TOC lacks the new §4.11, §6.7, §9.7, §8.10, appendices. | Update §00 TOC after edits. |
| D4 | README word count. | Update after rebuild. |

## E. EXECUTION ORDER (each step = one commit + push; update HANDOFF table)

1. REVIEW.md (this file).  
2. A3, A4, A7, B3, B5, B9, C15 → edit 01, 02. (Also C14 in 02.)  
3. A5, A8 → edit 05.  
4. C1 → edit 04 (add 4.11, renumber summary 4.12).  
5. A5, A6, A7, A8, C1 → edit 10 (sort, harmonize, add SWE row, notes).  
6. C2, C3, C6, B8 → edit 06.  
7. A10, C11, C8-lite → edit 07.  
8. C5 → edit 08.  
9. A9, A11, B2, B7, C4, C12, C13 → edit 09 (after one web check for B2).  
10. B1, B4 → edit 01 §1.2 and 05 §5.6 (after one web check for B1).  
11. C10 → edit 11.  
12. A2, A12 → edit 12 (secondary sources).  
13. C7, C8 → new 13-appendices.md.  
14. A1, A6-note, C9, D3 → edit 00.  
15. build.sh, README, HANDOFF final, PR description update.

Rationale for order: pure consistency fixes first (cannot make the guide worse), then
net-new sections in descending value, then the front matter last (it depends on final
numbering and word count).
