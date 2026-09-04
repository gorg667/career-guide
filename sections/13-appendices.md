# Appendices

## Appendix A — Glossary

Terms used in this guide that a high-school senior or parent may not know. Grouped by domain; within each group, roughly in the order you will encounter them.

### Labor-market and economics terms

- **Cobweb cycle** — the lag between a market signal (e.g., "CS grads can't find jobs") and the supply response (fewer students enroll), which means enrollment peaks when the market is worst and troughs when it recovers. The 2027 entrant benefits from the 2025–26 enrollment decline.
- **Cyclical vs. structural** — a *cyclical* downturn reverses with the business cycle (interest rates, capex); a *structural* one reflects a permanent change (AI automating junior tasks). The guide argues the current new-grad crisis is roughly half of each.
- **Underemployment** — working in a job that does not require your degree. The NY Fed measure for CS recent grads is ~19%.
- **Trimodal compensation (Modes 1/2/3)** — the observation (Orosz) that US software pay clusters into three separate distributions: local/non-tech employers, mid-tier tech, and Big Tech/AI labs/HFT. See Section 9.2.
- **Total compensation (TC)** — base salary + bonus + equity (RSUs or options), usually annualized. Levels.fyi figures are TC.
- **RSU** — restricted stock unit; shares granted on a vesting schedule (usually four years). Near-cash at public companies, speculative at private ones.
- **Capex** — capital expenditure; here, the hundreds of billions Big Tech spends annually on AI data centers, which drives infrastructure and semiconductor demand.
- **Section 174 / 174A** — US tax-code provision governing R&D expensing; the 2022 change to five-year amortization suppressed software hiring, and the July 2025 restoration of immediate domestic expensing partially reversed it.
- **BLS OOH** — Bureau of Labor Statistics *Occupational Outlook Handbook*, the standard US source for employment levels, ten-year growth projections, and median pay by occupation.
- **CRA Taulbee Survey** — annual Computing Research Association survey of PhD-granting CS departments; the best source on CS enrollment and degree production.
- **Neo-prime** — a venture-backed defense-technology company (Anduril, Palantir, Shield AI, etc.) competing with traditional defense primes (Lockheed, RTX, Northrop).
- **FFRDC** — Federally Funded Research and Development Center: nonprofit labs operated for the government (MITRE, MIT Lincoln Laboratory, JPL, APL, RAND). Excellent cleared employers.
- **National labs** — DOE-funded research laboratories (Sandia, Lawrence Livermore, Los Alamos, Oak Ridge, Argonne, PNNL, NREL, etc.).

### Degrees, programs, and academic terms

- **CS / CE / EE** — Computer Science / Computer Engineering / Electrical Engineering. See Section 6.
- **ABET** — the accreditation body for US engineering (and some computing) programs. Matters for CE and for certain government and licensure paths; matters little for CS hiring at tech companies.
- **4+1 (or BS/MS)** — a combined program where the master's takes one additional year, often with shared credits and reduced tuition. See Section 8.8.
- **Thesis MS vs. course-based MS** — a thesis master's includes a research project supervised by a professor; more valuable for research-track and PhD-bound students.
- **Co-op** — a cooperative-education program in which students alternate full-time paid work terms with academic terms, usually extending the degree to five years. See Section 6.8.
- **REU** — NSF Research Experiences for Undergraduates: funded summer research programs, often at other universities. A strong year-1/year-2 summer option.
- **Articulation agreement** — a formal contract between a community college and a university specifying which credits transfer.
- **Concentration / track / cluster** — a defined set of electives within a major (e.g., "CS with a systems concentration"). Preferable to a standalone specialized degree in most cases (Section 6.7).
- **SMART Scholarship** — DoD Science, Mathematics, and Research for Transformation: full tuition + stipend + guaranteed job in exchange for a year of DoD civilian service per year funded. Requires US citizenship.
- **CyberCorps SFS** — NSF/OPM Scholarship for Service: the cybersecurity equivalent of SMART, with a government-service commitment.
- **ROTC** — Reserve Officers' Training Corps; scholarship in exchange for a military service commitment; commissions come with clearances.
- **GRFP** — NSF Graduate Research Fellowship Program: the premier US PhD funding award for citizens/permanent residents.

### Software and systems terms

- **Systems programming** — writing software that manages hardware and resources directly: operating systems, compilers, databases, networking, embedded firmware. Usually in C, C++, or Rust.
- **Distributed systems** — software running across many machines that must coordinate despite failures and delays. The core of cloud infrastructure.
- **SRE** — Site Reliability Engineer: an engineer responsible for the availability, latency, and performance of production systems; Google's term, now industry-wide.
- **DevOps / platform engineering** — the practice and tooling for deploying, running, and observing software; platform engineering builds the internal tooling that other engineers use.
- **Kubernetes (K8s)** — the dominant open-source system for orchestrating containers across clusters of machines.
- **CRUD** — Create, Read, Update, Delete: the basic operations of database-backed applications; shorthand for routine, easily automated application work.
- **Full-stack** — working across frontend (user interface), backend (server logic), and database layers of a web application.
- **API** — Application Programming Interface: the contract by which software components communicate.
- **Compiler** — software that translates source code into machine code; compiler engineering is a durable, math-heavy systems specialty, now central to ML frameworks (MLIR, XLA, Triton).
- **Formal verification / formal methods** — mathematically proving that software or hardware satisfies a specification. Growing in importance as AI-generated code needs guarantees.
- **Open source** — software with publicly available source code that anyone can inspect and contribute to. Contributions are a credible public record of skill (Section 8.4).
- **Proctored / no-AI screen** — a technical interview conducted without AI assistance, often monitored; increasingly standard alongside AI-allowed rounds.

### AI and machine learning terms

- **ML / MLE** — Machine Learning / Machine Learning Engineer: builds and deploys models in production, as opposed to a researcher who develops new methods.
- **LLM** — Large Language Model (GPT, Claude, Gemini, Llama). The model class behind current AI coding tools.
- **Frontier lab** — a company training the most capable models (OpenAI, Anthropic, Google DeepMind, Meta, xAI).
- **Agent / agentic** — an AI system that takes multi-step actions with tools (running code, browsing, calling APIs) rather than producing a single response. "Agentic coding" is the mode that threatens junior generalist work.
- **Inference** — running a trained model to produce outputs, as opposed to *training* it. Inference optimization (making models faster and cheaper to run) is a hot, hardware-adjacent specialty.
- **MLOps** — the tooling and practice for deploying, monitoring, and retraining ML models in production.
- **RAG** — Retrieval-Augmented Generation: giving an LLM access to a document store so it answers from your data; the most common enterprise AI pattern.
- **Fine-tuning / RLHF** — adapting a pre-trained model to a task or to human preferences.
- **Evals / evaluation engineering** — systematically measuring model behavior, correctness, and safety. An uncrowded and increasingly critical role.
- **VLA (Vision-Language-Action) model** — a model that maps camera input and instructions to robot actions; the basis of current "physical AI."
- **FDE** — Forward-Deployed Engineer: an engineer embedded with a customer to make a product (usually AI) work in their environment. See Section 3.
- **Kaggle** — a platform for ML competitions with public leaderboards.
- **CUDA** — NVIDIA's programming platform for GPUs; the lingua franca of ML systems work.

### Hardware and semiconductor terms

- **Semiconductor / chip / IC** — an integrated circuit; the physical substrate of all computing.
- **RTL** — Register-Transfer Level: the abstraction at which digital hardware is designed, written in SystemVerilog or VHDL. "RTL design" is the core chip-design job.
- **DV** — Design Verification: proving that RTL does what the specification says, usually by simulation with a methodology such as **UVM** (Universal Verification Methodology). The largest single job category in chip design, and one of the least crowded.
- **STA** — Static Timing Analysis: checking that signals arrive on time across a chip.
- **Physical design / place-and-route** — mapping logical design onto actual silicon geometry.
- **EDA** — Electronic Design Automation: the software tools (Synopsys, Cadence, Siemens) used to design chips. EDA software engineering is a contrarian niche (Section 5).
- **FPGA** — Field-Programmable Gate Array: reconfigurable hardware used for prototyping, networking, defense, and finance. A dev board is a standard student tool.
- **ASIC** — Application-Specific Integrated Circuit: a chip designed for one purpose (e.g., an AI accelerator).
- **SoC** — System on Chip: a chip integrating CPU, GPU, memory controllers, and peripherals (every phone chip is an SoC).
- **Computer architecture** — the design of processors and memory systems; the bridge between CE hardware and software.
- **Tape-out** — sending a finished chip design to the fab for manufacturing. Tiny Tapeout lets students do this cheaply.
- **Fab / foundry** — a semiconductor fabrication plant (TSMC, Intel, Samsung). CHIPS Act fabs in Arizona, Ohio, Texas, and New York are new hiring hubs.
- **CHIPS Act** — the 2022 US law funding domestic semiconductor manufacturing and R&D (~$52B).
- **Analog / mixed-signal / RF** — circuits handling continuous signals (amplifiers, converters, radios); EE territory with very high moat.
- **Embedded systems** — computers inside other products (cars, medical devices, drones). Firmware is the software that runs on them.
- **RTOS** — Real-Time Operating System: an OS that guarantees response within fixed time bounds; used in embedded and safety-critical systems.
- **PCB** — Printed Circuit Board.
- **Power electronics / grid** — the hardware and control systems for converting and distributing electrical power; central to energy and data-center roles.
- **HPC** — High-Performance Computing: supercomputers and the software to program them; overlaps with AI infrastructure and national labs.

### Security terms

- **AppSec** — Application Security: finding and fixing vulnerabilities in software.
- **Detection engineering** — building the rules and systems that identify attacks in progress.
- **SOC** — Security Operations Center: the monitoring team; the crowded, partially automatable *analyst* layer.
- **Red team / blue team / purple team** — offensive simulation / defense / combined.
- **CTF** — Capture The Flag: a security competition; results are a recognized credential (Section 8.5).
- **Bug bounty / responsible disclosure** — reporting vulnerabilities to vendors, sometimes for payment; a public record of skill.
- **OT / ICS** — Operational Technology / Industrial Control Systems: the computers running factories, utilities, and infrastructure. A high-moat security specialty.
- **PQC** — Post-Quantum Cryptography: encryption designed to resist quantum computers; a multi-year migration creating demand.
- **Zero trust** — a security architecture that verifies every request regardless of network location.
- **OSCP / CKA / Security+** — certifications: Offensive Security Certified Professional (respected in offensive security), Certified Kubernetes Administrator, CompTIA Security+ (a DoD baseline checkbox).
- **SF-86** — the standard federal security-clearance questionnaire.
- **Secret / TS / TS/SCI / poly** — clearance levels: Secret; Top Secret; Top Secret with Sensitive Compartmented Information access; with polygraph (Counterintelligence or Full-Scope). See Section 9.4.
- **Continuous Vetting (CV)** — automated ongoing monitoring that replaced periodic clearance reinvestigations.
- **Interim clearance** — a provisional clearance granted before the full investigation completes.

### Robotics and physical-AI terms

- **Perception / planning / controls** — the three classic robotics software layers: sensing the world, deciding what to do, executing motion.
- **SLAM** — Simultaneous Localization and Mapping.
- **ROS** — Robot Operating System: the dominant open-source robotics middleware.
- **Sim-to-real** — training in simulation and transferring to physical robots.
- **Autonomy stack** — the full software system of a self-driving vehicle or autonomous drone.
- **Humanoid** — general-purpose bipedal robots (Figure, Tesla Optimus, Agility Digit, Boston Dynamics Atlas).
- **Functional safety standards** — ISO 26262 (automotive), DO-178C (avionics software), IEC 62304 (medical device software), IEC 61508 (industrial). Regulated fields where expertise is a moat.

### Immigration terms (for international students)

- **F-1** — the standard US student visa.
- **CPT** — Curricular Practical Training: work authorization for internships that are part of the curriculum; must be arranged in advance. "Day-1 CPT" programs are a red flag (Section 9.5).
- **OPT / STEM OPT** — Optional Practical Training: 12 months of post-graduation work authorization, extendable by 24 months for STEM degrees. Under policy pressure as of 2026.
- **H-1B** — the main US skilled-worker visa; capped at 85,000/year and allocated by lottery, now wage-weighted (Section 9.5).
- **Cap-exempt** — employers (universities, affiliated nonprofits, research organizations) that can file H-1B petitions outside the annual lottery.
- **OEWS wage levels I–IV** — Department of Labor prevailing-wage tiers; the number of lottery entries under the 2026 rule.
- **O-1** — visa for individuals of "extraordinary ability"; no lottery; requires a documented record (publications, awards, press).
- **L-1** — intra-company transfer visa; the route by which a foreign-office hire moves to a US office.
- **Green card / PERM** — permanent residency and the employer-sponsored labor-certification process that usually precedes it.

### Recruiting terms

- **Return offer** — a full-time offer extended to an intern at the end of the summer; the primary path to a first job.
- **Referral** — an employee submitting your application internally; roughly triples interview odds (Section 8.10).
- **Hiring freeze / headcount** — a pause on new hiring / the number of approved positions.
- **Leveling (L3/L4, E3/E4, IC1/IC2)** — company-specific job-grade schemes; new grads enter at the bottom level.
- **Exploding offer** — an offer with a short acceptance deadline; can usually be extended by asking.
- **Competing offer** — the main lever in negotiation (Section 9.2).
- **APM** — Associate Product Manager program; the formal entry path into product management at a few large companies.

---

## Appendix B — Checklists

Print these. They compress Sections 7–9 into things you can tick off. Items in **bold** are the ones that most determine outcomes; everything else is a multiplier. The roadmap is a menu — two or three sustained commitments beat ten shallow ones.

### B.1 Semester-by-semester checklist (Summer 2027 → Spring 2031)

**Summer 2027 — before you arrive**
- [ ] Comfortable in Python; started C (or C++/Rust); can use a Linux terminal and Git
- [ ] Built one real thing end-to-end and put it on GitHub
- [ ] Read Sections 3–4; wrote down three candidate tracks and why
- [ ] Reviewed your school's CS/CE curriculum and the specialty electives available (Section 7.3)
- [ ] International: confirmed CPT/OPT rules with the international office; know the timeline
- [ ] Citizen: read Section 9.4; noted SMART/SFS deadlines (typically Dec–Feb)

**Fall 2027 — Year 1**
- [ ] **Joined one hardware/competition club and one software club** (robotics, CTF, ICPC, FPGA, Kaggle, solar car, rocketry)
- [ ] Attended the career fair to observe, collected 5 recruiters' names
- [ ] Applied to Year-1 programs that opened Aug–Oct (STEP, Explore, Meta University, Propel, INSIGHT, Path) — even if a long shot
- [ ] Started a weekly practice habit (CTF, Advent of Code, Kaggle, or LeetCode-lite)
- [ ] Learned every fundamental in your courses *without* AI first (two-pass rule, Section 8.2)
- [ ] Set up LinkedIn with a photo, school, and one project; GitHub profile README

**Spring 2028 — Year 1**
- [ ] **Emailed at least 5 professors about summer research** (with a specific reference to their work)
- [ ] Applied to REUs (deadlines Jan–Feb) and to any Year-1 internship still open
- [ ] Shipped project #2 in a candidate track (dev board, CTF write-ups, a small model, a distributed toy)
- [ ] First open-source contribution (documentation counts)
- [ ] Narrowed to two leading tracks; dropped one

**Summer 2028**
- [ ] **Research, REU, or a small/local internship** — or, failing all three, a serious self-directed project with real users or an open-source streak
- [ ] Kept a log of what you built and learned (this becomes résumé bullets)
- [ ] Citizen: SMART/SFS applications drafted if pursuing; defense-prime intern portals bookmarked
- [ ] Résumé at one page, reviewed by someone who has hired engineers

**Fall 2028 — Year 2**
- [ ] **Applied to 100+ summer-2029 internships between August and November** — Big Tech, semis, defense primes, national labs, security vendors, data-infra, quant if relevant
- [ ] Career fair in earnest: 15+ conversations, follow-up emails within 48 hours
- [ ] Asked 3–5 alumni or seniors for referrals (Section 8.10)
- [ ] Taking architecture/OS and algorithms; first specialty elective
- [ ] Decided CS vs CE (Section 6.5) — or confirmed the choice
- [ ] Practicing for both proctored no-AI screens and AI-allowed rounds
- [ ] Citizen interested in cleared work: applied to defense/FFRDC/lab internships by October (processing takes months)

**Spring 2029 — Year 2**
- [ ] Interviewed; kept applying to late-cycle roles through April
- [ ] Started a flagship project in your leading track (the one you will talk about in every interview for two years)
- [ ] Continued research or club with visible output (poster, release, competition entry)
- [ ] Attended one conference or meetup in your field as a student volunteer (Section 8.10)
- [ ] International: began building an O-1-relevant record (publication, competition, open-source) and met with the international office about OPT timelines

**Summer 2029 — Internship #1**
- [ ] **Performed: shipped something, asked for feedback at week 4 and week 8, documented impact**
- [ ] Secured a return offer or an explicit glowing reference
- [ ] Networked inside the company: 5+ coffee chats, including one with a hiring manager in your target team
- [ ] Updated résumé within a week of finishing

**Fall 2029 — Year 3**
- [ ] **Applied for summer-2030 internships August–October** — targeted at brand names and deep relevance; used referrals
- [ ] **Decided MS/PhD vs industry by December** (Section 8.8); if grad school, identified 2 recommenders and told them
- [ ] Specialty courses #3–4; research credits if research-track
- [ ] Applied for SMART/SFS/GEM/NSF fellowships if eligible and relevant (deadlines Oct–Dec)
- [ ] Mock interviews: at least 4, including 1 proctored no-AI

**Spring 2030 — Year 3**
- [ ] **Published or shipped something visible** — paper, tape-out, competition result, open-source release, disclosed CVE
- [ ] Capstone chosen in your specialty with an industry or research partner if possible
- [ ] Grad-school track: research statement drafted; GRE only if required
- [ ] Reviewed Sections 9.1–9.3 and listed 15 target employers by type and hub

**Summer 2030 — Internship #2 (the one that converts)**
- [ ] **Treated the 12 weeks as an interview; asked for the return-offer timeline in week 6**
- [ ] Return offer in hand by September — or a clear reason and a backup plan
- [ ] Kept the relationship with internship #1's manager warm (a second return offer is negotiation leverage)

**Fall 2030 — Year 4**
- [ ] **Full-time recruiting August–November**; return offer used as an anchor, not a ceiling
- [ ] Negotiated every offer with a competing offer (Section 9.2) — the highest-hourly-rate activity of your senior year
- [ ] Grad-school applications submitted (PhD Dec 1–15; MS Dec–Mar)
- [ ] Defense track: clearance paperwork (SF-86) started; honest and complete
- [ ] International: employer's H-1B/OPT plan confirmed in writing; OEWS wage level of the offer understood (Section 9.5)

**Spring 2031 — Year 4**
- [ ] Accepted by March–April (industry) or April 15 (grad school)
- [ ] Failure-mode plan executed if needed (Section 7.6): funded MS, defense/government, adjacent field, contract-to-hire
- [ ] Moved to your field's hub (Section 9.1); budgeted debt service on base salary only (Section 9.7)
- [ ] Thanked every professor, mentor, and referrer who helped — you will need them again

### B.2 Before each recruiting season (run every August and January)

- [ ] Résumé: one page; every bullet has a verb, a technology, and a measurable result; no AI-generated filler
- [ ] GitHub: pinned repos are your best 4–6; each has a README with a screenshot or a diagram and a one-paragraph "why"
- [ ] LinkedIn: current title, school, graduation date, one-line headline naming your specialty, open-to-work set to recruiters-only
- [ ] Target list: 30–50 companies by type and hub (Section 9.3), with the application-open date for each
- [ ] Referral list: 10 people who can refer you, with the date you last spoke; message each before applying
- [ ] Interview readiness: can solve medium algorithm problems in 25 minutes without AI; can explain every project on your résumé for 10 minutes; have 3 behavioral stories (conflict, failure, impact)
- [ ] Specialty readiness: the field-specific screen you will face (RTL/DV questions; system design; security fundamentals; ML systems; controls) — reviewed in the last 30 days
- [ ] Logistics: interview-quality webcam, microphone, quiet room; calendar blocked for the season; job-tracker spreadsheet started
- [ ] International: CPT/OPT timing confirmed for the internship or start date in question
- [ ] Citizen: clearance-eligibility questions answered honestly in your own notes (drug use, foreign contacts, debt) so nothing surprises you on the SF-86

### B.3 Offer evaluation checklist

Score each offer before comparing. Do not decide on comp alone; do not decide on mission alone.

**Comp (Section 9.2)**
- [ ] Base, sign-on, annual bonus target, equity grant value and vesting schedule written down
- [ ] Equity valued at zero for debt planning if private; at current price with a 25% haircut if public
- [ ] Cost-of-living adjusted (a $150k Austin/Phoenix/Pittsburgh offer ≈ $200k+ Bay Area)
- [ ] Which comp mode (1/2/3) does this employer sit in, and does it give access to mode-3 employers later?

**Learning rate and brand (Section 9.3)**
- [ ] Will I have a senior engineer as a direct mentor? (Ask who; ask how many juniors per senior on the team)
- [ ] Is this a name that opens doors in 3 years — Big Tech, semis leader, frontier lab, top security/infra vendor, neo-prime, national lab?
- [ ] Is the team's work in my Tier 1 specialty, or is it generalist work at a Tier 1 company?

**Moat and optionality (Section 2)**
- [ ] Does this role build a moat (clearance, hardware depth, regulated-domain expertise, deep systems) or only tool familiarity?
- [ ] Will I be able to move to another company, city, or field from here in 3 years?

**Risk**
- [ ] Employer's layoff history 2022–26 and current headcount trend
- [ ] For startups: runway, last round date, and whether the offer has a return-offer alternative
- [ ] For defense: is the offer contingent on clearance, and what happens if adjudication is slow?
- [ ] For international students: sponsorship confirmed in writing; OEWS wage level; cap-exempt or not; green-card policy

**Fit (Section 10.2)**
- [ ] I met the team, not just the recruiter
- [ ] The daily work matches how I actually like to spend a day (Section 2.5)
- [ ] I would take this offer even if the comp were 10% lower — if not, comp is doing too much of the work

**Negotiation**
- [ ] I have at least one competing offer or a credible pending process
- [ ] I asked for an extension before the deadline if I needed one
- [ ] I negotiated once, specifically, and in writing

---

*End of guide.*
