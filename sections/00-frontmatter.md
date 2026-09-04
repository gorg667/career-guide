# Choosing Your Future
## The Definitive Career Guide for Computer Science & Computer Engineering Students Entering College in Fall 2027

*A data-driven, long-horizon essay and reference guide for the US student who starts a CS or CE degree in September 2027, graduates around May 2031, and will be mid-career in the 2040s.*

**Version:** 2.1 — compiled September 2026; revised after a full self-review and re-based on the BLS 2025–35 employment projections released August 27, 2026 (changes summarized in Section 12.1)

**Length:** ~57,000 words. Read the TL;DR first; pick a reading path below; use the table of contents to jump.

---

## How to Read This Guide

This document is written for three readers:

1. **The high-school junior/senior** deciding whether to apply CS or CE, and worried by headlines about AI eating software jobs.
2. **The parent or counselor** who wants a candid, numbers-first answer to "Is this still a good bet?"
3. **The already-admitted student** who wants a concrete four-year plan (2027–2031) that maximizes their odds of landing in the right career.

Every major statistical claim is tied to a primary source in Section 12.2; supporting figures from secondary reporting are listed in Section 12.3. Where the data is contested, we say so. Where we are making a judgment call, we label it as a judgment. Our projections are for the **2029–2035 hiring window** — the years you will be looking for internships, your first job, and your first promotion — not for today.

### Reading paths

| You have… | Read |
|---|---|
| **5 minutes** | The TL;DR below, then the One-Page Summary (Section 10.6). |
| **30 minutes** | TL;DR → Section 1.5 (three scenarios) → Section 2.2–2.3 (how we score, the three questions) → Section 3.7 (choosing among the Tier 1 six) → Section 10.1 (master scorecard) → Section 7.1 (the master calendar). |
| **Two hours** | Sections 1, 2, 3, 6, 7, and 10 in order, then the FAQ (Section 11.1). |
| **The whole thing** | Front to back; it is written to be read that way. Then keep Appendix B pinned to a wall. |

| You are… | Start with |
|---|---|
| **A high-school student choosing a major** | TL;DR → Section 2.7 (self-assessment: will I like this?) → Section 6 (CS vs. CE) → Section 2.5 (personality and fit) → Section 10.2 (decision matrix) → the "How do I know if I'll like this?" FAQ. |
| **A parent or counselor** | TL;DR → Section 1 (what happened and why) → Section 9.7 (paying for the degree) → Section 11.3 (risks and hedges) → the "I'm a parent — how can I help?" FAQ. |
| **An already-admitted student** | Section 7 (the roadmap) → Section 8 (skills and proof) → Appendix B (checklists) → your target career's profile in Sections 3–4. |
| **An international student** | Section 9.5 first, then the rest — it changes which fields and employers are realistic. |
| **A US citizen open to defense or government** | Section 9.4 (clearances) and Section 8.9 (funded programs) early; they are your largest structural advantage. |

**A note on "rank" versus "tier."** The TL;DR table below ranks careers by *expected value for a strong student who can stand out*, which rewards AI/ML's compensation ceiling and job count. The master scorecard in Section 10.1 sums *robustness* dimensions, which rewards infrastructure's accessibility and semiconductors' moat, and orders them differently. Both orderings are correct for their purpose; Section 2.2 explains the rule, and the honest answer is that any Tier 1 field pursued with depth beats any Tier 2 field pursued generically.

---

## TL;DR — The Short Version

**Is CS/CE still worth it?** Yes — but the *default path* (generic CS degree → LeetCode → generic software job) is no longer a safe bet. The degree remains one of the highest-earning undergraduate credentials in the US (BLS median for software developers: **$135,980** in May 2025; computer hardware engineers: **$161,740**; the computer-and-IT group as a whole, $109,470, more than double the national median of $50,980). What changed is that the *entry ramp* narrowed sharply between 2023 and 2026, and the winners are now those with **depth, specialization, and an AI-native workflow**.

**Why you should be more optimistic than the 2024–2026 graduating classes:**

- You are entering during the trough, not the peak. New CS majors **fell 13%** in 2025 (CRA Taulbee) — the steepest decline of any major — and undergraduate computer-and-information-sciences enrollment fell a further **8.4%** in spring 2026 (National Student Clearinghouse). By 2031 you will graduate into a **smaller competing cohort**, the exact opposite of the 2024–2026 grads who faced record supply and collapsing demand.
- Software job postings bottomed in May 2025 and have risen ~22% since (Indeed Hiring Lab, August 2026), even as overall postings fell — though they remain about a quarter below their February 2020 level. Demand is recovering — but it is recovering toward **senior and AI-fluent roles** (71% of net new SWE postings are senior; 37% mention AI).
- The hardware side of computing — semiconductors, data-center infrastructure, robotics, defense — has **structural shortages** (SIA projects ~67,000 unfilled semiconductor technical jobs by 2030; the AI data-center buildout is short tens of thousands of electrical/computer engineers).

**The ten careers we rate highest for a 2031 graduate** (full analysis in Sections 3–5):

| Rank | Career | Why | Best major |
|---|---|---|---|
| 1 | **AI / ML Engineer (applied)** | Fastest-growing, highest-paid engineering discipline; AI-eng openings +60% YoY vs +7% for SWE; median MLE comp ~$279k | CS (+ math) |
| 2 | **Security Engineer** (cloud, AppSec, AI security) | BLS +21% growth 2025–35 (trimmed from +29% in the prior cycle, still ~5× the all-occupation rate); ~500k unfilled US cyber roles; AI both attacks and defends; citizenship moat in gov/defense | CS or CE |
| 3 | **Semiconductor / Chip Design & Verification Engineer** | Highest median pay of any computing occupation ($161,740), and the BLS *raised* its growth forecast to +9%; acute talent shortage; CHIPS Act fabs coming online 2027–2030; AI accelerator race | CE (or EE) |
| 4 | **Infrastructure / Distributed Systems / Platform Engineer** | The "picks and shovels" of AI: GPU clusters, inference serving, observability (Datadog +68% eng headcount); hard to automate | CS or CE |
| 5 | **Robotics / Embedded / Autonomy Engineer** ("Physical AI") | Humanoids, drones, autonomous vehicles, defense; needs hardware+software+ML — a rare combination | CE (or CS + robotics) |
| 6 | **Data Engineer / Data Scientist (engineering-heavy)** | BLS +35% growth for data scientists 2025–35 (a top-ten fastest-growing occupation nationally); every AI system is a data pipeline | CS (+ stats) |
| 7 | **Forward Deployed Engineer / AI Solutions Engineer** | Postings +800–1,100% in a year; TC $350–550k at AI labs; combines engineering with customer-facing judgment — AI-resistant | CS |
| 8 | **Defense, Aerospace & National-Security Software/Firmware** | Clearance = citizen-only moat; Anduril/SpaceX/Palantir hiring 50% more intensely than average software cos; huge budgets | CE or CS (US citizens) |
| 9 | **Quantum Computing Engineer** (long-dated bet) | Tiny field today (~16.5k globally) but heavy capital inflow; ideal for CE/physics-minded students who plan on grad school | CE + physics, then MS/PhD |
| 10 | **Healthcare / Biotech Computing** (computational biology, medical devices, health AI) | Aging population + AI drug discovery + regulated (slow to automate) + FDA moat | CS + bio, or CE for devices |

**The three careers we rate lowest relative to their historical reputation:** generic frontend/web development (frontend-only titles are disappearing fastest of any engineering title), native mobile development (declining), and manual QA / IT support (BLS projects computer programmer employment to *shrink 7%* by 2035).

**The single most important strategic insight:** In 2031, employers will not pay you to write code. They will pay you to *own outcomes* in a domain where mistakes are expensive — security, silicon, infrastructure, safety-critical systems, regulated industries, or AI systems themselves. Pick a domain with a **moat** (hardware, physics, regulation, clearance, or deep math), become AI-native from day one, and aim to be "senior-like" by graduation through internships and serious projects.

**CS or CE?** If you are drawn to hardware, physics, or "how does it actually work down to the transistor," choose **CE** — it is the scarcer degree, it unlocks semiconductors/robotics/embedded/defense, and every CE can still become a software engineer. If you are drawn to math, algorithms, AI, and abstraction, choose **CS** — but add depth (math minor, systems focus, or a domain double-major). Section 6 goes deep on this.

---

## Table of Contents

**1. The Landscape: What Happened 2022–2026 and What 2031 Will Look Like**
1.1 The Shock: 2022–2026 in Numbers · 1.2 Structural vs. Cyclical · 1.3 The Cobweb Cycle · 1.4 What the 2031 Market Will Probably Look Like (incl. falsifiable predictions) · 1.5 Three Scenarios for 2031 · 1.6 Key Takeaways

**2. A Framework for Evaluating Any Tech Career**
2.1 The Seven Dimensions · 2.2 How We Combine Them (tiering rule; tier ≠ rank) · 2.3 The Three Questions to Ask About Any Role · 2.4 The CS-vs-CE Lens · 2.5 Personality and Fit · 2.6 Worked Example: Scoring a Career This Guide Does Not Cover · 2.7 Self-Assessment: Will I Actually Like This? (twelve signals)

**3. Tier 1 Careers — Highest Conviction**
3.1 AI / Machine Learning Engineer · 3.2 Security Engineer · 3.3 Semiconductor / Chip Design, Verification & Architecture · 3.4 Infrastructure / Distributed Systems / Platform (incl. AI Infrastructure) · 3.5 Robotics, Embedded & Autonomy ("Physical AI") · 3.6 Data Engineer / Data Scientist (Engineering-Heavy) · 3.7 How to Choose Among the Tier 1 Six

**4. Tier 2 Careers — Strong Options**
4.1 Forward Deployed Engineer · 4.2 Defense, Aerospace & National Security · 4.3 Quantum Computing · 4.4 Healthcare, Biotech & Life-Sciences Computing · 4.5 Fintech & Quantitative Development · 4.6 Energy, Climate & Grid · 4.7 Technical Product Management · 4.8 Cloud / DevOps at Non-Tech Enterprises · 4.9 Graphics, Game Engines & Spatial Computing · 4.10 Developer Tools & DevRel · 4.11 General Software Engineering at Top-Tier Employers · 4.12 Tier 2 Summary

**5. Tier 3, Niche, and Contrarian Paths**
5.1 Generalist Web / Full-Stack — The Honest Take · 5.2 Native Mobile · 5.3 QA / IT Support / SysAdmin · 5.4 Data / BI Analyst · 5.5 Game Development (Studios) · 5.6 Research Scientist / Academia · 5.7 Founding a Startup · 5.8 Computing + Law / Policy · 5.9 Computing + Medicine · 5.10 Teaching CS · 5.11 Contrarian Bets (COBOL/mainframe, EDA, HPC, and more) · 5.12 Tier 3 Summary

**6. CS vs. CE: Which Degree, Which Careers**
6.1 What Each Degree Is · 6.2 Which Careers Favor Which Degree · 6.3 The Case for CE · 6.4 The Case for CS · 6.5 A Decision Procedure · 6.6 Hybrids, Doubles, Minors, 4+1 · 6.7 "AI," "Data Science," "Cybersecurity," "Software Engineering" and Other Specialized Majors · 6.8 Co-op Programs · 6.9 Schools by Specialty (where the pipelines are) · 6.10 Special Considerations (incl. under-represented students) · 6.11 Myths · 6.12 Bottom Line

**7. The Four-Year Roadmap: Summer 2027 → May 2031**
7.1 The Master Calendar · 7.2 Summer 2027 · 7.3 Year 1 · 7.4 Year 2 (incl. campus jobs as credentials) · 7.5 Year 3 · 7.6 Year 4 and failure-mode plans · 7.7 Two Sample Paths · 7.8 Roadmap Principles

**8. The Durable Skill Stack, Projects, Competitions, Certifications, Interviews, Grad School, and Networking**
8.1 The Durable Skill Stack · 8.2 The Two-Pass Rule · 8.3 The Portfolio · 8.4 Open Source · 8.5 Competitions · 8.6 Certifications · 8.7 Interview Preparation · 8.8 The Grad-School Decision · 8.9 Scholarships and Funded Programs · 8.10 Networking, Conferences, and Referrals · 8.11 Summary

**9. Geography, Compensation, Employer Types, Clearances, Immigration, and Paying for the Degree**
9.1 Geography · 9.2 Compensation (the three modes) · 9.3 Employer Types · 9.4 Security Clearances (incl. interim, Continuous Vetting, reinstatement) · 9.5 International Students (incl. the wage-weighted H-1B lottery, cap-exempt employers) · 9.6 Remote and Hybrid · 9.7 Paying for the Degree: Cost, Debt, and Return · 9.8 Summary

**10. Master Comparison Tables and Decision Matrix**
10.1 Master Scorecard · 10.2 Personality → Career Decision Matrix · 10.3 Compensation Summary · 10.4 Major → Career Map · 10.5 Scenario Stress Test · 10.6 One-Page Summary · 10.7 Every Career in One Line

**11. FAQs, Myths, Risks, and Hedges**
11.1 FAQ (26 questions, incl. transfer, AP credit, EE vs CE, specialized majors, hours/week, double majors, working abroad, and a parents' guide) · 11.2 Myths · 11.3 Risks and Hedges · 11.4 A Note on Uncertainty

**12. Sources, Methodology, and How to Keep This Guide Current**
12.1 Methodology and Version 2.0 changes · 12.2 Primary Sources · 12.3 Secondary Sources · 12.4 Programs and Institutions · 12.5 Indicators to Re-check Each Year

**Appendices**
A. Glossary (~105 terms) · B. Checklists: semester-by-semester, before each recruiting season, offer evaluation
