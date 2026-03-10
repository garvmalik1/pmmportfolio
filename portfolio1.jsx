import { useState, useEffect, useRef } from "react";

// ─── THEME ──────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: "#0a0a0a",
    bgSecondary: "#111111",
    bgCard: "#141414",
    bgCardHover: "#1a1a1a",
    border: "#222222",
    borderHover: "#333333",
    text: "#f0f0f0",
    textSecondary: "#888888",
    textMuted: "#444444",
    accent: "#e8ff47",
    accentText: "#0a0a0a",
  },
  light: {
    bg: "#fafaf8",
    bgSecondary: "#f4f4f0",
    bgCard: "#ffffff",
    bgCardHover: "#f9f9f6",
    border: "#e8e8e4",
    borderHover: "#d0d0c8",
    text: "#111111",
    textSecondary: "#555555",
    textMuted: "#aaaaaa",
    accent: "#1a1a1a",
    accentText: "#fafaf8",
  },
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const projects = [
  {
    id: "vutto-explain",
    title: "Product Positioning for Vutto",
    category: "Product Marketing",
    tag: "GTM",
    description: "Repositioned a used two wheeler brand from features to JTBD for consumer",
    year: "2025",
    color: "#e8ff47",
    problem: "People couldn’t understand what the company did from the website or the showroom. 'Vutto: Quality Bikes, Best Price' was the communication being used when I joined.",
    insight: "The name “Vutto” wasn’t self-explanatory and had nothing to do with used two wheelers for most people, as compared to competitors like Cars24.",
    strategy: "Changing brand name wasn’t an option. We were dealing with an audience with a lower economic and education background, that could have difficulty in understanding complex terms. During customer interviews, we discovered that 25% of people expressed confusion on whether the bikes were new or old. Also, 34% of people had no idea what Vutto was, despite being in the store or having signed up on the website.",
    execution: "Rewrote the website, built new sales enablement materials, launched a 6-week campaign targeting RevOps communities, and trained the sales team on outcome-based selling.",
    impact: "34% lift in trial-to-paid conversions. Sales cycle shortened from 42 days to 28 days. NPS increased from 31 to 58 within one quarter.",
  },
  {
    id: "creator-growth",
    title: "Creator Economy Expansion",
    category: "Growth Experiments",
    tag: "Growth",
    description: "Designed and ran 12 growth experiments over 90 days for a creator monetization platform, resulting in 2.1x revenue per user.",
    year: "2024",
    color: "#ff6b47",
    problem: "A creator platform had strong top-of-funnel but poor monetization. Most creators signed up but never activated revenue features.",
    insight: "The activation gap wasn't a product problem — it was a belief problem. Creators didn't think they could make meaningful income on the platform.",
    strategy: "Built a 'First $100' activation framework: a guided journey to first revenue milestone that replaced generic onboarding.",
    execution: "Ran 12 A/B experiments targeting the activation funnel. Launched social proof campaigns featuring creator earnings. Built a Slack community for early monetizers.",
    impact: "2.1x revenue per user. Activation rate improved from 12% to 31%. Creator retention at 6 months improved by 40%.",
  },
  {
    id: "competitive-intel",
    title: "Competitive Intelligence System",
    category: "Competitive Intelligence",
    tag: "Intel",
    description: "Built a full-stack competitive intelligence program from scratch — battlecards, win/loss analysis, and a quarterly CI report used by sales and product.",
    year: "2023",
    color: "#47b4ff",
    problem: "Sales team was losing deals to two key competitors without understanding why. There was no systematic way to track competitor moves.",
    insight: "Win/loss interviews revealed the team consistently over-indexed on pricing objections when the real issue was feature perception and trust signals.",
    strategy: "Created a three-tier CI system: real-time monitoring (news/social), quarterly deep dives, and a live battlecard library synced to the CRM.",
    execution: "Built automated monitoring using RSS and keyword alerts. Conducted 40+ win/loss interviews. Created 8 battlecards for top competitors. Ran monthly CI briefings.",
    impact: "Win rate vs. top competitor improved from 31% to 44% in 6 months. Sales team confidence scores increased significantly. Battlecards became standard in all deals.",
  },
  {
    id: "launch-campaign",
    title: "Product Launch Campaign",
    category: "Campaign Strategy",
    tag: "Campaign",
    description: "Orchestrated a multi-channel product launch that generated 50K waitlist signups and $2M ARR in the first 90 days.",
    year: "2023",
    color: "#b847ff",
    problem: "New product entering a crowded project management space. The challenge: launch with signal in a noisy market with limited budget.",
    insight: "The target audience (design-led teams) was underserved by existing tools that prioritized developers. There was a gap for a 'designer-first' narrative.",
    strategy: "Positioned the product as 'the project tool your design team will actually use.' Built the launch around earned media in design communities rather than paid acquisition.",
    execution: "Seeded with 200 design influencers pre-launch. Built a Product Hunt launch strategy. Created a 30-day content drip on design-adjacent platforms. PR outreach to design publications.",
    impact: "50K waitlist before launch. $2M ARR in first 90 days. Featured in 12 design publications. Product Hunt #1 Product of the Day.",
  },
  {
    id: "content-engine",
    title: "Content Marketing Engine",
    category: "Content Marketing",
    tag: "Content",
    description: "Built a content engine from zero that became the #1 organic acquisition channel, driving 40% of new pipeline within 8 months.",
    year: "2023",
    color: "#47ffb4",
    problem: "Company was 100% dependent on paid acquisition with rising CAC. No organic presence and no content strategy.",
    insight: "SEO analysis revealed high-intent, low-competition keywords in adjacent problem spaces. The audience searched for how-to content before searching for solutions.",
    strategy: "Built a 'Problem-Led Content' strategy targeting the top 5 pain points before purchase. Created a content hub structure rather than a traditional blog.",
    execution: "Hired two writers. Built a 12-month editorial calendar. Launched a weekly newsletter. Created 30 cornerstone pieces in 4 months. Built internal linking strategy.",
    impact: "40% of new pipeline from organic within 8 months. Newsletter grew to 12K subscribers. 3 cornerstone pieces rank on page 1 for competitive keywords.",
  },
  {
    id: "positioning-overhaul",
    title: "B2B Messaging Overhaul",
    category: "Messaging & Positioning",
    tag: "Messaging",
    description: "Led a full messaging architecture redesign for a Series B fintech — from ICP refinement to website copy and sales deck.",
    year: "2022",
    color: "#ffb447",
    problem: "Post-Series B, the company had grown into multiple segments but was still speaking to its original niche. New enterprise buyers weren't resonating with the messaging.",
    insight: "The company was trying to be everything to everyone. Interviews showed enterprise buyers needed regulatory compliance messaging, not speed messaging.",
    strategy: "Segmented the market into three distinct ICPs and built separate messaging pillars for each. Created a messaging matrix that sales could use for customization.",
    execution: "12-week messaging sprint. Conducted 25 customer interviews. Built messaging architecture document. Rewrote website, sales deck, email sequences, and one-pagers.",
    impact: "Enterprise deal size increased 60% within two quarters. Sales team reported significantly higher response rates on outbound. Time-to-close improved by 15 days.",
  },
];

const artifacts = [
  { id: 1, title: "SaaS Positioning Framework", type: "Positioning", description: "A structured framework for defining category, ICP, and core value proposition for B2B SaaS products.", pages: "12 pages", icon: "◈" },
  { id: 2, title: "Competitive Battlecard Template", type: "Battlecard", description: "Head-to-head comparison format covering strengths, weaknesses, objection handling, and win themes.", pages: "4 pages", icon: "⊞" },
  { id: 3, title: "Messaging Architecture Doc", type: "Messaging", description: "Full messaging hierarchy from company narrative down to feature-level proof points, segmented by ICP.", pages: "18 pages", icon: "≡" },
  { id: 4, title: "Go-To-Market Launch Plan", type: "GTM Planning", description: "90-day launch playbook with channel strategy, milestone tracking, and cross-functional RACI.", pages: "24 pages", icon: "◎" },
  { id: 5, title: "Win/Loss Analysis Template", type: "Competitive Research", description: "Interview guide and analysis framework for systematic win/loss research with synthesis methodology.", pages: "8 pages", icon: "△" },
  { id: 6, title: "ICP & Buyer Persona Doc", type: "Audience Research", description: "Deep ICP definition template with psychographic profiling, job-to-be-done mapping, and trigger events.", pages: "10 pages", icon: "○" },
];

const mediaItems = [
  { id: 1, type: "youtube", title: "GTM Strategy Breakdown", desc: "A 10-minute walkthrough of my framework for positioning digital products in competitive markets.", thumb: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80", duration: "10:24" },
  { id: 2, type: "instagram", title: "Launch Day Behind-the-Scenes", desc: "The 48 hours before a major product launch — what a PMM actually does.", thumb: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&q=80", duration: "2:15" },
  { id: 3, type: "youtube", title: "Competitive Intelligence Deep Dive", desc: "How to build a CI system your sales team will actually use.", thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80", duration: "18:40" },
  { id: 4, type: "campaign", title: "Creator Platform Campaign", desc: "Visual identity and creative direction for the Creator Economy Expansion campaign.", thumb: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&q=80" },
  { id: 5, type: "instagram", title: "Messaging Workshop Recap", desc: "Highlights from a live messaging workshop with a Series B startup team.", thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80", duration: "3:45" },
  { id: 6, type: "campaign", title: "SaaS Relaunch Creative", desc: "Campaign creative assets from the B2B analytics platform relaunch.", thumb: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80" },
];

const tagColors = { GTM: "#e8ff47", Growth: "#ff6b47", Intel: "#47b4ff", Campaign: "#b847ff", Content: "#47ffb4", Messaging: "#ffb447" };

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
function GlobalStyles({ t }) {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: ${t.bg}; color: ${t.text}; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; transition: background 0.3s ease, color 0.3s ease; }
      * { transition: background-color 0.3s ease, border-color 0.3s ease, color 0.2s ease; }
      ::selection { background: ${t.accent}; color: ${t.accentText}; }
      ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: ${t.bg}; } ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 2px; }
      .syne { font-family: 'Syne', sans-serif; }
      .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
      .reveal.visible { opacity: 1; transform: translateY(0); }
      .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important; }
      .card-hover:hover { transform: translateY(-3px); border-color: ${t.borderHover} !important; }
      a { text-decoration: none; color: inherit; }
      button { cursor: pointer; font-family: 'DM Sans', sans-serif; }
    `}</style>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, dark, setDark, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { id: "work", label: "Work" },
    { id: "artifacts", label: "Artifacts" },
    { id: "media", label: "Media" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? (dark ? "rgba(10,10,10,0.92)" : "rgba(250,250,248,0.92)") : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent" }}>
      <button onClick={() => setPage("home")} className="syne" style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", background: "none", border: "none", color: t.text }}>
        AK<span style={{ color: t.accent, opacity: dark ? 1 : 0.7 }}>.</span>
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {navLinks.map(l => (
          <button key={l.id} onClick={() => { setPage(l.id); setMenuOpen(false); }} style={{ padding: "8px 14px", background: "none", border: "none", fontSize: 13, fontWeight: 500, color: page === l.id ? t.text : t.textSecondary, borderRadius: 8 }}>
            {l.label}
          </button>
        ))}
        <button onClick={() => setDark(!dark)} style={{ marginLeft: 8, width: 36, height: 36, borderRadius: 8, background: t.bgCard, border: `1px solid ${t.border}`, color: t.text, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {dark ? "○" : "●"}
        </button>
      </div>
    </nav>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({ setPage, setCaseStudy, t, dark }) {
  const [heroRef, heroVisible] = useScrollReveal();
  const [featRef, featVisible] = useScrollReveal();

  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 40px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div ref={heroRef} className={`reveal ${heroVisible ? "visible" : ""}`}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#47ff6b", boxShadow: "0 0 8px #47ff6b" }} />
            <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: t.textSecondary }}>Available for projects</span>
          </div>

          <h1 className="syne" style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", color: t.text, marginBottom: 32 }}>
            Product<br />
            <span style={{ color: dark ? t.accent : "#666" }}>Marketing</span><br />
            & GTM
          </h1>

          <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", color: t.textSecondary, fontWeight: 300, maxWidth: 480, lineHeight: 1.6, marginBottom: 48 }}>
            I help digital products position, scale and retain — turning strategic clarity into measurable growth.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setPage("work")} className="syne" style={{ padding: "14px 28px", background: t.accent, color: t.accentText, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, letterSpacing: "0.02em" }}>
              View Selected Work →
            </button>
            <button onClick={() => setPage("contact")} style={{ padding: "14px 28px", background: "none", color: t.text, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: 14, fontWeight: 500 }}>
              Get in Touch
            </button>
          </div>

          <div style={{ display: "flex", gap: 32, marginTop: 80, paddingTop: 40, borderTop: `1px solid ${t.border}` }}>
            {[["6+", "Years in PMM"], ["$12M+", "Pipeline influenced"], ["40+", "Products launched"]].map(([n, l]) => (
              <div key={l}>
                <div className="syne" style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", color: t.text }}>{n}</div>
                <div style={{ fontSize: 12, color: t.textSecondary, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Pills */}
      <section style={{ padding: "0 40px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Product Marketing", "Go-To-Market", "Competitive Intelligence", "Growth Experiments", "Content Marketing", "Campaign Strategy", "Positioning & Messaging", "Creator Economy"].map(s => (
            <span key={s} style={{ padding: "8px 16px", border: `1px solid ${t.border}`, borderRadius: 100, fontSize: 12, fontWeight: 500, color: t.textSecondary, letterSpacing: "0.02em" }}>{s}</span>
          ))}
        </div>
      </section>

      {/* Featured Work */}
      <section style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div ref={featRef} className={`reveal ${featVisible ? "visible" : ""}`}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <h2 className="syne" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", color: t.text }}>Featured Work</h2>
            <button onClick={() => setPage("work")} style={{ fontSize: 13, color: t.textSecondary, background: "none", border: "none", textDecoration: "underline", textUnderlineOffset: 4 }}>All projects →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
            {projects.slice(0, 3).map((p, i) => (
              <ProjectCard key={p.id} project={p} t={t} dark={dark} setPage={setPage} setCaseStudy={setCaseStudy} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ overflow: "hidden", borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: "16px 0", marginBottom: 80 }}>
        <div style={{ display: "flex", gap: 48, animation: "marquee 20s linear infinite", width: "max-content" }}>
          {[...Array(3)].map((_, ri) => ["GTM Strategy", "Competitive Intelligence", "Messaging Architecture", "Product Positioning", "Launch Planning", "Growth Experiments", "Content Marketing", "Win/Loss Analysis"].map(s => (
            <span key={`${ri}-${s}`} style={{ fontSize: 13, fontWeight: 500, color: t.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{s}</span>
          )))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }`}</style>
      </div>

      {/* CTA */}
      <section style={{ padding: "80px 40px 120px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <h2 className="syne" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", color: t.text, marginBottom: 20 }}>
          Let's build something<br /><span style={{ color: dark ? t.accent : "#888" }}>worth launching.</span>
        </h2>
        <p style={{ color: t.textSecondary, fontSize: 16, marginBottom: 36 }}>Open to consulting, advisory, and full-time PMM roles.</p>
        <button onClick={() => setPage("contact")} className="syne" style={{ padding: "16px 36px", background: t.accent, color: t.accentText, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700 }}>
          Start a Conversation →
        </button>
      </section>
    </div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ project: p, t, dark, setPage, setCaseStudy, delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={`reveal card-hover ${visible ? "visible" : ""}`} onClick={() => { setCaseStudy(p); setPage("case-study"); }} style={{ animationDelay: `${delay}ms`, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 28, cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <span style={{ padding: "4px 10px", borderRadius: 100, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", fontSize: 11, fontWeight: 600, color: tagColors[p.tag] || t.accent, letterSpacing: "0.06em" }}>
          {p.category}
        </span>
        <span style={{ fontSize: 12, color: t.textMuted }}>{p.year}</span>
      </div>
      <h3 className="syne" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: t.text, marginBottom: 10 }}>{p.title}</h3>
      <p style={{ fontSize: 14, color: t.textSecondary, lineHeight: 1.6, marginBottom: 24 }}>{p.description}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: t.accent, fontWeight: 500 }}>
        <span>View Case Study</span>
        <span>→</span>
      </div>
    </div>
  );
}

// ─── WORK PAGE ────────────────────────────────────────────────────────────────
function WorkPage({ t, dark, setPage, setCaseStudy }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "GTM Strategy", "Growth Experiments", "Competitive Intelligence", "Campaign Strategy", "Content Marketing", "Messaging & Positioning"];
  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <div style={{ paddingTop: 120, paddingBottom: 120, maxWidth: 1100, margin: "0 auto", padding: "120px 40px" }}>
      <PageHeader title="Selected Work" subtitle="Six projects spanning GTM strategy, campaigns, competitive intelligence, and growth." t={t} />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding: "8px 16px", borderRadius: 100, border: `1px solid ${filter === c ? t.accent : t.border}`, background: filter === c ? (dark ? t.accent : t.accent) : "none", color: filter === c ? t.accentText : t.textSecondary, fontSize: 12, fontWeight: 500 }}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
        {filtered.map((p, i) => <ProjectCard key={p.id} project={p} t={t} dark={dark} setPage={setPage} setCaseStudy={setCaseStudy} delay={i * 80} />)}
      </div>
    </div>
  );
}

// ─── CASE STUDY PAGE ──────────────────────────────────────────────────────────
function CaseStudyPage({ project: p, t, dark, setPage }) {
  if (!p) return null;
  const sections = [
    { label: "Problem", content: p.problem, icon: "◎" },
    { label: "Insight", content: p.insight, icon: "◈" },
    { label: "Strategy", content: p.strategy, icon: "△" },
    { label: "Execution", content: p.execution, icon: "⊞" },
    { label: "Impact", content: p.impact, icon: "★" },
  ];

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Hero */}
      <div style={{ padding: "60px 40px 80px", background: t.bgSecondary, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <button onClick={() => setPage("work")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: t.textSecondary, fontSize: 13, marginBottom: 32 }}>
            ← Back to Work
          </button>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 100, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", fontSize: 11, fontWeight: 600, color: tagColors[p.tag] || t.accent, letterSpacing: "0.06em", marginBottom: 20 }}>
            {p.category}
          </div>
          <h1 className="syne" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", color: t.text, marginBottom: 16 }}>{p.title}</h1>
          <p style={{ fontSize: 18, color: t.textSecondary, lineHeight: 1.6 }}>{p.description}</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 40px" }}>
        {sections.map((s, i) => {
          const [ref, visible] = [useRef(null), useState(false)];
          return (
            <SectionBlock key={s.label} section={s} t={t} dark={dark} index={i} />
          );
        })}

        {/* Media placeholder */}
        <div style={{ marginTop: 64 }}>
          <h2 className="syne" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: t.text, marginBottom: 24 }}>Media & Assets</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {["Embedded Video", "Campaign Creative", "Social Post", "Downloadable Brief"].map(item => (
              <div key={item} style={{ background: t.bgCard, border: `1px dashed ${t.border}`, borderRadius: 12, padding: "32px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>+</div>
                <div style={{ fontSize: 13, color: t.textMuted }}>{item}</div>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 6 }}>Placeholder — replace with real asset</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionBlock({ section: s, t, dark, index }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""}`} style={{ marginBottom: 48, animationDelay: `${index * 80}ms` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 18, color: dark ? t.accent : "#888" }}>{s.icon}</span>
        <span className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: t.textSecondary }}>{s.label}</span>
      </div>
      <p style={{ fontSize: 16, color: t.text, lineHeight: 1.8, paddingLeft: 30, borderLeft: `2px solid ${s.label === "Impact" ? (dark ? t.accent : "#888") : t.border}` }}>{s.content}</p>
    </div>
  );
}

// ─── ARTIFACTS PAGE ───────────────────────────────────────────────────────────
function ArtifactsPage({ t, dark }) {
  return (
    <div style={{ padding: "120px 40px", maxWidth: 1100, margin: "0 auto" }}>
      <PageHeader title="PMM Artifacts" subtitle="Strategic marketing documents, frameworks, and templates from real engagements." t={t} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        {artifacts.map((a, i) => {
          const [ref, visible] = useScrollReveal();
          return (
            <div ref={ref} key={a.id} className={`reveal card-hover ${visible ? "visible" : ""}`} style={{ animationDelay: `${i * 80}ms`, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <span style={{ fontSize: 28, color: dark ? t.accent : "#888" }}>{a.icon}</span>
                <span style={{ padding: "3px 10px", borderRadius: 100, background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", fontSize: 11, color: t.textSecondary, fontWeight: 500 }}>{a.type}</span>
              </div>
              <h3 className="syne" style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em", color: t.text, marginBottom: 10 }}>{a.title}</h3>
              <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.6, marginBottom: 20 }}>{a.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: t.textMuted }}>{a.pages}</span>
                <button style={{ padding: "6px 14px", background: "none", border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 12, color: t.textSecondary }}>
                  Preview →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 80, padding: 40, background: t.bgCard, border: `1px dashed ${t.border}`, borderRadius: 14, textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 16 }}>+</div>
        <h3 className="syne" style={{ fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 8 }}>More artifacts coming</h3>
        <p style={{ fontSize: 14, color: t.textSecondary }}>Templates are being anonymized and prepared. Check back or reach out for specific document types.</p>
      </div>
    </div>
  );
}

// ─── MEDIA PAGE ───────────────────────────────────────────────────────────────
function MediaPage({ t, dark }) {
  const typeIcons = { youtube: "▶", instagram: "◈", campaign: "◎" };
  const typeLabels = { youtube: "YouTube", instagram: "Instagram", campaign: "Campaign" };

  return (
    <div style={{ padding: "120px 40px", maxWidth: 1100, margin: "0 auto" }}>
      <PageHeader title="Media & Campaigns" subtitle="Videos, social content, and campaign creatives." t={t} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        {mediaItems.map((m, i) => {
          const [ref, visible] = useScrollReveal();
          return (
            <div ref={ref} key={m.id} className={`reveal card-hover ${visible ? "visible" : ""}`} style={{ animationDelay: `${i * 80}ms`, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ position: "relative", height: 200, background: t.bgSecondary, overflow: "hidden" }}>
                <img src={m.thumb} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", top: 12, left: 12, padding: "4px 10px", borderRadius: 100, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", fontSize: 11, fontWeight: 600, color: "#fff", letterSpacing: "0.04em" }}>
                  {typeIcons[m.type]} {typeLabels[m.type]}
                </div>
                {m.duration && (
                  <div style={{ position: "absolute", bottom: 12, right: 12, padding: "2px 8px", borderRadius: 4, background: "rgba(0,0,0,0.7)", fontSize: 11, color: "#fff" }}>{m.duration}</div>
                )}
              </div>
              <div style={{ padding: 20 }}>
                <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 8 }}>{m.title}</h3>
                <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.5 }}>{m.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 48, padding: 40, background: t.bgCard, border: `1px dashed ${t.border}`, borderRadius: 14, textAlign: "center" }}>
        <p style={{ fontSize: 14, color: t.textMuted }}>Placeholder thumbnails shown. Replace with actual embedded media using YouTube iframes, Instagram embeds, or hosted video.</p>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ t, dark, setPage }) {
  const [ref, visible] = useScrollReveal();
  const skills = [
    { area: "Product Marketing", items: ["Positioning & Messaging", "ICP Definition", "Launch Strategy", "Sales Enablement"] },
    { area: "GTM Strategy", items: ["Market Segmentation", "Channel Strategy", "Pricing Narratives", "Partnership GTM"] },
    { area: "Growth", items: ["Funnel Analysis", "Experiment Design", "Activation Frameworks", "Retention Loops"] },
    { area: "Research & Intel", items: ["Win/Loss Analysis", "Competitive Battlecards", "Customer Interviews", "Market Research"] },
  ];

  return (
    <div style={{ padding: "120px 40px", maxWidth: 900, margin: "0 auto" }}>
      <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {/* Bio */}
          <div>
            <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 100, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", fontSize: 11, fontWeight: 600, color: t.textSecondary, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
              About
            </div>
            <h1 className="syne" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", color: t.text, marginBottom: 32, lineHeight: 1.0 }}>
              Strategist,<br />
              <span style={{ color: dark ? t.accent : "#888" }}>Storyteller,</span><br />
              Builder.
            </h1>

            <div style={{ fontSize: 16, color: t.textSecondary, lineHeight: 1.9, maxWidth: 680 }}>
              <p style={{ marginBottom: 20 }}>I'm a Product Marketing and GTM strategist with 6+ years helping digital products cut through the noise. My work sits at the intersection of strategic clarity and creative execution — I don't just write copy, I build systems for how products communicate, compete, and grow.</p>
              <p style={{ marginBottom: 20 }}>My background spans B2B SaaS, consumer apps, and the creator economy. I've taken products from pre-launch to $10M ARR, rebuilt messaging architectures that unlocked enterprise sales, and built content engines that became companies' primary acquisition channel.</p>
              <p>Before going deep on PMM, I spent time in content and community — which means I understand how real people talk about their problems, not just how marketers want to frame them. That human context informs everything I do strategically.</p>
            </div>
          </div>

          {/* Skills Grid */}
          <div>
            <h2 className="syne" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: t.text, marginBottom: 24 }}>Areas of Depth</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {skills.map(s => (
                <div key={s.area} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 12, padding: 20 }}>
                  <div className="syne" style={{ fontSize: 13, fontWeight: 700, color: dark ? t.accent : "#888", marginBottom: 12, letterSpacing: "0.02em" }}>{s.area}</div>
                  {s.items.map(item => (
                    <div key={item} style={{ fontSize: 13, color: t.textSecondary, marginBottom: 6, paddingLeft: 12, borderLeft: `1px solid ${t.border}` }}>{item}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="syne" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: t.text, marginBottom: 24 }}>Experience</h2>
            {[
              { role: "Head of Product Marketing", org: "Series B SaaS (Fintech)", period: "2022 – Present", desc: "Led GTM for 3 major product launches. Rebuilt messaging architecture. Built and led a team of 3 PMMs." },
              { role: "Product Marketing Lead", org: "Creator Platform (Startup)", period: "2021 – 2022", desc: "Owned positioning, launch strategy, and content marketing. Grew organic acquisition from 0 to 40% of pipeline." },
              { role: "Growth Marketing Manager", org: "B2B Analytics SaaS", period: "2019 – 2021", desc: "Ran growth experiments across activation and retention. Managed content and SEO strategy." },
              { role: "Content & Community Lead", org: "Creator Media Company", period: "2018 – 2019", desc: "Built editorial strategy and community programs for a creator-focused media brand." },
            ].map(e => (
              <div key={e.role} style={{ padding: "20px 0", borderBottom: `1px solid ${t.border}`, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span className="syne" style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{e.role}</span>
                  <span style={{ fontSize: 12, color: t.textMuted }}>{e.period}</span>
                </div>
                <span style={{ fontSize: 13, color: dark ? t.accent : "#888", fontWeight: 500 }}>{e.org}</span>
                <span style={{ fontSize: 13, color: t.textSecondary }}>{e.desc}</span>
              </div>
            ))}
          </div>

          <div>
            <button onClick={() => setPage("contact")} className="syne" style={{ padding: "14px 28px", background: t.accent, color: t.accentText, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700 }}>
              Work Together →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage({ t, dark }) {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);
  const [ref, visible] = useScrollReveal();

  return (
    <div style={{ padding: "120px 40px", maxWidth: 700, margin: "0 auto" }}>
      <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
        <PageHeader title="Let's Talk" subtitle="Open to consulting projects, advisory roles, and select full-time opportunities." t={t} />

        {!sent ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <InputField label="Your Name" value={form.name} onChange={v => setForm({ ...form, name: v })} t={t} dark={dark} />
              <InputField label="Email Address" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} t={t} dark={dark} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Engagement Type</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Consulting Project", "Advisory Role", "Full-time Role", "Speaking", "Just Saying Hi"].map(opt => (
                  <button key={opt} onClick={() => setForm({ ...form, type: opt })} style={{ padding: "8px 16px", borderRadius: 100, border: `1px solid ${form.type === opt ? t.accent : t.border}`, background: form.type === opt ? (dark ? "rgba(232,255,71,0.1)" : "rgba(0,0,0,0.05)") : "none", color: form.type === opt ? (dark ? t.accent : t.text) : t.textSecondary, fontSize: 13 }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Tell me about what you're working on..." style={{ width: "100%", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, padding: "14px 16px", color: t.text, fontSize: 14, resize: "vertical", outline: "none", fontFamily: "'DM Sans', sans-serif" }} />
            </div>
            <button onClick={() => setSent(true)} className="syne" style={{ padding: "14px 28px", background: t.accent, color: t.accentText, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, alignSelf: "flex-start" }}>
              Send Message →
            </button>
          </div>
        ) : (
          <div style={{ padding: 40, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
            <h3 className="syne" style={{ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 8 }}>Message sent!</h3>
            <p style={{ fontSize: 14, color: t.textSecondary }}>I'll get back to you within 48 hours.</p>
          </div>
        )}

        <div style={{ marginTop: 64, paddingTop: 40, borderTop: `1px solid ${t.border}`, display: "flex", gap: 24 }}>
          {[{ label: "LinkedIn", val: "linkedin.com/in/your-handle" }, { label: "Email", val: "hello@yourname.com" }, { label: "Twitter / X", val: "@yourhandle" }].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: t.textSecondary }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", t, dark }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: t.textSecondary, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, padding: "12px 16px", color: t.text, fontSize: 14, outline: "none", fontFamily: "'DM Sans', sans-serif" }} />
    </div>
  );
}

// ─── PAGE HEADER ──────────────────────────────────────────────────────────────
function PageHeader({ title, subtitle, t }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""}`} style={{ marginBottom: 56 }}>
      <h1 className="syne" style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, letterSpacing: "-0.04em", color: t.text, marginBottom: 16 }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 16, color: t.textSecondary, maxWidth: 520, lineHeight: 1.6 }}>{subtitle}</p>}
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ t, dark, setPage }) {
  return (
    <footer style={{ borderTop: `1px solid ${t.border}`, padding: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <button onClick={() => setPage("home")} className="syne" style={{ fontSize: 14, fontWeight: 700, background: "none", border: "none", color: t.text }}>
        AK<span style={{ color: dark ? t.accent : "#888" }}>.</span>
      </button>
      <span style={{ fontSize: 12, color: t.textMuted }}>Product Marketing & GTM Strategist — © {new Date().getFullYear()}</span>
      <div style={{ display: "flex", gap: 20 }}>
        {["Work", "Artifacts", "Media", "About", "Contact"].map(l => (
          <button key={l} onClick={() => setPage(l.toLowerCase())} style={{ fontSize: 12, color: t.textMuted, background: "none", border: "none" }}>{l}</button>
        ))}
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home");
  const [caseStudy, setCaseStudy] = useState(null);
  const t = themes[dark ? "dark" : "light"];

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const navigate = (p) => setPage(p);

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <GlobalStyles t={t} />
      <Nav page={page} setPage={navigate} dark={dark} setDark={setDark} t={t} />
      <main>
        {page === "home" && <HomePage setPage={navigate} setCaseStudy={setCaseStudy} t={t} dark={dark} />}
        {page === "work" && <WorkPage t={t} dark={dark} setPage={navigate} setCaseStudy={setCaseStudy} />}
        {page === "case-study" && <CaseStudyPage project={caseStudy} t={t} dark={dark} setPage={navigate} />}
        {page === "artifacts" && <ArtifactsPage t={t} dark={dark} />}
        {page === "media" && <MediaPage t={t} dark={dark} />}
        {page === "about" && <AboutPage t={t} dark={dark} setPage={navigate} />}
        {page === "contact" && <ContactPage t={t} dark={dark} />}
      </main>
      <Footer t={t} dark={dark} setPage={navigate} />
    </div>
  );
}
