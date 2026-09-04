# Research Notes 01 — Macro labor market, AI impact, BLS projections
(Collected 2026-09-03. Keep URLs so guide claims are traceable.)

## BLS Occupational Outlook Handbook — Computer & IT group (2024–34 projections; page modified Aug 28 2025)
Source: https://www.bls.gov/ooh/computer-and-information-technology/
- Group projected to grow "much faster than average" 2024–34; ~317,700 openings/yr (growth + replacement).
- Group median wage May 2024: $105,990 (vs $49,500 all occupations).
- Total US employment projected +3.1% 2024–34 (170.0M → 175.2M, +5.2M). Source: https://www.bls.gov/opub/mlr/2026/article/industry-and-occupational-employment-projections-overview.htm
- Median pay (May 2024) by occupation:
  | Occupation | Entry ed | Median 2024 |
  |---|---|---|
  | Computer & information research scientists | Master's | $140,910 |
  | Computer network architects | Bachelor's | $130,390 |
  | Software developers, QA analysts & testers | Bachelor's | $131,450 |
  | Information security analysts | Bachelor's | $124,910 |
  | Database administrators & architects | Bachelor's | $123,100 |
  | Computer systems analysts | Bachelor's | $103,790 |
  | Computer programmers | Bachelor's | $98,670 |
  | Network & computer sys admins | Bachelor's | $96,800 |
  | Web developers & digital designers | Bachelor's | $95,380 |
  | Computer support specialists | varies | $61,550 |
- Growth rates (2024–34) — TODO verify on individual pages. Widely cited: software developers ~+15%, info security analysts ~+29%, data scientists ~+34%, computer & info research scientists ~+20%, computer programmers negative (~-6%), computer hardware engineers ~+5%, electrical/electronics engineers ~+7%.

## New-grad unemployment (NY Fed "Labor Market for Recent College Graduates")
Source: https://www.newyorkfed.org/research/college-labor-market
- Recent grads overall (22–27, BA): unemployment ~5.6%, underemployment ~41.8–42% (2025Q3 highest since 2020) — Feb 2026 update.
- By major (NY Fed table, most recent): Computer Science unemployment ~6.1–7.0%, underemployment ~19.1%, median early-career wage ~$80–87k. Computer Engineering unemployment ~7.5% (2025 release) / underemployment ~15.8%.
  - Important nuance: CS/CE have HIGH unemployment but LOW underemployment vs other majors → when CS grads get jobs they are degree-relevant; the problem is getting the first job, not being stuck in non-degree jobs.
- Forbes summary: https://www.forbes.com/sites/michaeltnietzel/2026/02/23/unemployment-and-underemployment-rates-among-recent-college-graduates/

## Stanford Digital Economy Lab — "Canaries in the Coal Mine" (Brynjolfsson, Chandar, Chen; revised Aug 12 2026)
Source: https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/
Six facts (ADP payroll data through June 2026):
1. No evidence of widespread economy-wide displacement.
2. Employment of 22–25 y/o in AI-exposed occupations is now **19% below** where it would be had it kept pace with less-exposed peers (was 13% in Aug 2025). Experienced workers: no comparable gap.
3. Divergence has widened steadily since Aug 2025.
4. Operates via **reduced hiring** of young workers, not increased separations.
5. Declines concentrated where AI **substitutes** for tasks; where AI **complements** workers employment flat/rising esp. for experienced.
6. Adjustment through employment, not base pay.
- Persists excluding tech firms and computer occupations; attenuates when controlling for education; some trends predate genAI.
- Fortune Jun 2026: most AI-exposed occupations contracted only 0.2% YoY as of Apr 2026 vs +0.1% for least-exposed. https://fortune.com/2026/06/27/what-is-ai-impact-entry-level-jobs-stanford-adp-canaries-brynjolfsson-richardson/
- WEF "AI and the Future of Entry-Level Work" 2026: https://reports.weforum.org/docs/WEF_Artificial_Intelligence_and_the_Future_of_Entry_Level_Work_2026.pdf

## Indeed Hiring Lab — "AI and Job Postings: From Destruction to Creation?" (Jul 8 2026)
Source: https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/
- US software dev postings **+~15%** since Claude Code launch (late Feb 2025) while overall postings −7%.
- BUT still **~27.5% below pre-pandemic (Feb 2020)** level; overall postings ≈ Feb 2020 level.
- 2022→2026: more AI-exposed occupations fell more. 2025→2026: relationship FLIPPED — more exposed rebounded most.
- **71% of the increase** in SWE postings May 2025→May 2026 came from **senior roles**; **37%** from jobs with "AI" in title. → "seniority-biased technological change" (SSRN 5425555).
- Rebound visible in US, UK, most English-speaking economies; Germany/France still declining.
- FRED series: IHLIDXUSTPSOFTDEVE.

## Pragmatic Engineer — "State of the software engineering job market in 2026" (May 26 2026)
Source: https://newsletter.pragmaticengineer.com/p/state-of-the-job-market-2026
- "Top" tech companies hiring ~20% more SWEs than a year ago (TrueUp). Steady increase since Mar 2023.
- 2023 was worst year for SWE in two decades (industry shrank). Layoff waves cluster Aug–Oct; hiring clusters Mar–Jun.
- Big Tech SWE headcount 2yr: Meta ~+20% then 10% layoff (May 2026); Apple +10%; Google +5%; Microsoft −1.1%; Amazon −1.3%.
- Fast growers 2yr: Ramp +94%, Wiz (security) +84%, Datadog +68%, Rippling +55%, Figma +41%, Netflix +37%. Stripe +29%, Shopify +36%, Atlassian +23%.
- Most openings: Apple, IBM, Amazon. New in top 20: Accenture, Tesla, Cadence (EDA/hardware), HPE, SpaceX. Oracle announced up to 30k layoffs Mar 2026. Micron, Qualcomm, AMD have many more SWE openings than last year → hardware companies hiring software.
- **AI engineering: "explosive demand"**; companies prioritizing AI eng over SWE; AI eng comp > SWE comp; top AI labs now more attractive than Big Tech.
- Part 2: harder for new grads & interns; **mobile & frontend demand drops; AI & FDE (forward-deployed engineer) surges**; management "great flattening"; Big Tech seniority & tenure rising.
- Fastest growing sectors: fintech, observability, security.

## Synthesis for the guide
- The 2023–2026 period is the worst new-grad SWE market in 20 years, driven by (a) 2021–22 overhiring correction, (b) interest rates/Section 174 tax change, (c) AI-driven seniority bias, (d) record CS enrollment supply.
- But: total SWE demand is rebounding, and it is pulling toward senior + AI-fluent roles. For a 2027 entrant graduating 2031 the key question is how to become "senior-like" by graduation (depth, AI-native workflow, specialization with moats).
- Fields with structural tailwinds: AI engineering, security, infrastructure/observability, semiconductors/hardware-adjacent software, fintech, defense/aerospace.
- Fields with headwinds: generic frontend/mobile, generic web dev, "computer programmer" role, QA manual testing, IT support.

## Phase 2 fact checks (2026-09-03)
- B1 CONFIRMED: Anthropic closed $65B Series H at $965B post-money (late May 2026; prior $30B at $380B Feb 2026). Anthropic filed confidential S-1 early June 2026; OpenAI filed confidentially Jun 8 2026 (Reuters https://www.reuters.com/technology/openai-files-us-ipo-after-anthropic-ai-giants-head-public-markets-2026-06-08/ ; TechCrunch https://techcrunch.com/2026/06/08/following-anthropic-openai-files-confidentially-for-ipo/). OpenAI raised $122B in March 2026. CNBC Aug 19 2026: OpenAI CFO says public "in 2027 or sooner".
- B2 CONFIRMED: DHS final rule "Weighted Selection Process for Registrants and Petitioners Seeking to File Cap-Subject H-1B Petitions", Federal Register Dec 29 2025 (https://www.federalregister.gov/documents/2025/12/29/2025-23853/...), effective Feb 27 2026, applied to FY2027 registration (March 2026). Registrations entered N times where N = OEWS wage level (IV=4, III=3, II=2, I=1). Implication: new-grad offers are usually Level I–II → fewer entries; high-paying AI/quant roles at Level III–IV strongly favored. USCIS page updated Jul 17 2026 confirms weighted selection in use.
