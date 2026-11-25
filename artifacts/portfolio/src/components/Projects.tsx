import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "facemark",
    num: "01",
    title: "FaceMark: Face-Recognition Attendance",
    category: "BACKEND & AI",
    year: "2026",
    link: "https://github.com/ZiadtahaM/FaceMark",
    image: "/assets/screenshots/facemark-modern-ops.png",
    descriptionEn: "Challenge: Take attendance by face recognition without one fragile monolith.\nArchitecture: NestJS API with JWT auth and MySQL, calling a separate FastAPI DeepFace service behind a hand-written circuit breaker, with a WAL embedding store.\nStatus: 45 Jest tests passing locally; not yet deployed to a host.",
    descriptionAr: "التحدي: تسجيل الحضور بالتعرف على الوجه دون نظام واحد هش.\nالبنية: واجهة NestJS مع JWT وMySQL، تستدعي خدمة DeepFace منفصلة عبر Circuit Breaker مكتوب يدوياً مع مخزن WAL للبصمات.\nالحالة: 45 اختبار Jest ناجحاً محلياً؛ لم يُنشر بعد على استضافة.",
    tags: ["NestJS", "TypeScript", "MySQL", "DeepFace", "FastAPI"],
    gradient: "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(6,182,212,0.08) 100%)",
    accent: "#2563EB",
    accentAlt: "#60A5FA",
    lines: ["linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)"]
  },
  {
    id: "edu-pro",
    num: "02",
    title: "edu-pro: Educational Management & LMS",
    category: "FULL-STACK & EDUCATION",
    year: "2026",
    link: "https://edu-pro-portal.pages.dev",
    image: "/assets/screenshots/edu-pro-portal.png",
    descriptionEn: "Challenge: Fragmented academic scheduling and gradebook tracking across institutions.\nArchitecture: Angular 18 enterprise front-end with RxJS state machines, NestJS modular backend, and PostgreSQL with Role-Based Access Control.\nStatus: Live demo frontend on Cloudflare Pages; no performance metrics claimed.",
    descriptionAr: "التحدي: تشتت الجداول الدراسية وسجلات الدرجات في المؤسسات التعليمية.\nالبنية: واجهة Angular 18 مؤسسية مع RxJS ومتحكمات خلفية NestJS وقاعدة بيانات PostgreSQL مع صلاحيات RBAC.\nالحالة: واجهة تجريبية منشورة على Cloudflare Pages؛ بدون ادعاء مؤشرات أداء.",
    tags: ["Angular 18", "NestJS", "PostgreSQL", "RxJS", "Tailwind"],
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(37,99,235,0.08) 100%)",
    accent: "#06B6D4",
    accentAlt: "#67E8F9",
    lines: ["linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)"]
  },
  {
    id: "geenora",
    num: "03",
    title: "Geenora: Multilingual E-Commerce Marketplace",
    category: "COMMERCE & MULTILINGUAL",
    year: "2026",
    link: "https://geenora-marketplace.pages.dev",
    image: "/assets/screenshots/geenora-marketplace.png",
    descriptionEn: "Challenge: Severe layout thrashing and slow checkout conversions across Arabic RTL and English catalogs.\nArchitecture: Dual-locale CSS grid system, optimistic cart state management, and edge caching on Cloudflare.\nStatus: Live demo frontend on Cloudflare Pages; no conversion metrics claimed.",
    descriptionAr: "التحدي: عدم استقرار تخطيط الصفحة وتدني معدلات إتمام الشراء بين الكتالوجات العربية والإنجليزية.\nالبنية: نظام شبكة CSS ثنائي الاتجاه، إدارة سلة متفائلة، وتخزين مؤقت على شبكة Cloudflare.\nالحالة: واجهة تجريبية منشورة على Cloudflare Pages؛ بدون ادعاء مؤشرات تحويل.",
    tags: ["React", "TypeScript", "Tailwind CSS", "i18n RTL", "Cloudflare"],
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.08) 100%)",
    accent: "#10B981",
    accentAlt: "#6EE7B7",
    lines: ["linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)"]
  },
  {
    id: "asshifa",
    num: "04",
    title: "As-Shifa: Clinical EHR & Healthcare Management",
    category: "HEALTHCARE & CLINICAL",
    year: "2026",
    link: "https://asshifa-ehr-system.pages.dev",
    image: "/assets/screenshots/asshifa-ehr-system.png",
    descriptionEn: "Challenge: Slow multi-tenant medical record retrieval and patient privacy compliance.\nArchitecture: Multi-tenant PostgreSQL schema with Row-Level Security and indexed JSONB medical histories (privacy-conscious design, not a certified compliance claim).\nStatus: Live demo frontend on Cloudflare Pages; no performance metrics claimed.",
    descriptionAr: "التحدي: بطء استرجاع السجلات الطبية متعددة المستأجرين والتوافق مع خصوصية بيانات المرضى.\nالبنية: قاعدة PostgreSQL متعددة المستأجرين مع أمان مستوى الصف (RLS) وفهارس JSONB للسجلات (تصميم يراعي الخصوصية، وليس ادعاء توافق معتمد).\nالحالة: واجهة تجريبية منشورة على Cloudflare Pages؛ بدون ادعاء مؤشرات أداء.",
    tags: ["TypeScript", "PostgreSQL", "RLS", "Next.js", "Docker"],
    gradient: "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(16,185,129,0.08) 100%)",
    accent: "#2563EB",
    accentAlt: "#93C5FD",
    lines: ["linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)"]
  },
  {
    id: "flowdesk",
    num: "05",
    title: "Flowdesk Egypt: Coworking CRM",
    category: "COMMERCIAL CRM & BILLING",
    year: "2026",
    link: "https://flowdesk-egypt.pages.dev",
    image: "/assets/screenshots/flowdesk-egypt.png",
    descriptionEn: "Challenge: Manual desk booking conflicts and invoice reconciliation errors in shared spaces.\nArchitecture: Centralized booking engine with real-time room calendars, automated PDF receipt generation, and Payoneer/Egyptian bank clearing.\nStatus: Live demo frontend on Cloudflare Pages; no usage metrics claimed.",
    descriptionAr: "التحدي: تعارض حجوزات المكاتب اليدوية وأخطاء تسوية الفواتير في مساحات العمل المشتركة.\nالبنية: محرك حجوزات مركزي مع تقويم فوري وتوليد تلقائي لإيصالات PDF مع تسوية مصرفية.\nالحالة: واجهة تجريبية منشورة على Cloudflare Pages؛ بدون ادعاء مؤشرات استخدام.",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind"],
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(37,99,235,0.08) 100%)",
    accent: "#06B6D4",
    accentAlt: "#67E8F9",
    lines: ["linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)"]
  },
  {
    id: "solarsystem",
    num: "06",
    title: "Solar System 3D: WebGL Planetary Physics",
    category: "GRAPHICS & INTERACTIVE 3D",
    year: "2026",
    link: "https://solar-system-3d-zt.pages.dev",
    image: "/assets/screenshots/solar-system-3d-zt.png",
    descriptionEn: "Challenge: Browser stuttering and GPU overhead during multi-body orbital simulations.\nArchitecture: Pure Three.js and custom GLSL vertex shaders with geometry instancing and procedural orbital trajectory calculation.\nStatus: Live interactive demo on Cloudflare Pages; try it on your own device.",
    descriptionAr: "التحدي: تقطع المتصفح والضغط العالي على معالج الرسومات أثناء محاكاة المدارات الفلكية المتعددة.\nالبنية: مسار Three.js مع مظللات GLSL مخصصة وحساب مسارات مدارية إجرائية.\nالحالة: عرض تفاعلي منشور على Cloudflare Pages؛ جرّبه على جهازك مباشرة.",
    tags: ["Three.js", "WebGL", "GLSL Shaders", "Physics", "Vite"],
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(6,182,212,0.08) 100%)",
    accent: "#3B82F6",
    accentAlt: "#93C5FD",
    lines: ["linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)"]
  }
];

/* ── Case Study Tabs Component ── */
function CaseStudyTabs({ p, hov }: { p: typeof projects[0], hov?: boolean }) {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex gap-2 mb-1" style={{ zIndex: 20 }}>
        <button 
          data-lang="en"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLang('en'); }} 
          className="px-2 py-0.5 rounded text-xs font-bold transition-all" 
          style={{ background: lang === 'en' ? p.accent : 'rgba(255,255,255,0.05)', color: lang === 'en' ? '#fff' : '#888', pointerEvents: 'auto', border: `1px solid ${p.accent}40` }}
        >
          EN
        </button>
        <button 
          data-lang="ar"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLang('ar'); }} 
          className="px-2 py-0.5 rounded text-xs font-bold transition-all" 
          style={{ background: lang === 'ar' ? p.accent : 'rgba(255,255,255,0.05)', color: lang === 'ar' ? '#fff' : '#888', pointerEvents: 'auto', border: `1px solid ${p.accent}40` }}
        >
          العربية
        </button>
      </div>
      {lang === 'en' ? (
        <p className="text-sm leading-relaxed" style={{ color: hov ? "#a0a0b5" : "#606075", transition: "color 0.3s", whiteSpace: "pre-wrap" }}>
          {p.descriptionEn}
        </p>
      ) : (
        <p className="text-sm leading-relaxed" style={{ color: hov ? "#a0a0b5" : "#606075", transition: "color 0.3s", whiteSpace: "pre-wrap", textAlign: "right", direction: "rtl", fontFamily: "sans-serif" }}>
          {p.descriptionAr}
        </p>
      )}
    </div>
  );
}

/* ── Single horizontal card ── */
function HCard({ p, index }: { p: typeof projects[0]; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="h-card relative rounded-[2rem] p-8 flex-shrink-0 flex flex-col justify-between overflow-hidden"
      style={{
        width: 480,
        background: p.gradient,
        border: `1px solid ${p.accent}30`,
        boxShadow: hov ? `0 20px 40px -20px ${p.accent}40` : "none",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: hov ? "translateY(-8px)" : "translateY(0)"
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-cursor-label="Explore"
      data-testid={`project-card-${p.id}`}
    >
      {/* Decorative lines */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: p.lines[0] }} />

      <div className="relative z-10 flex flex-col gap-6 h-full">
        <div className="flex justify-between items-start">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: p.accentAlt }}>{p.category}</span>
          <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: `${p.accent}15`, color: p.accentAlt }}>{p.year}</span>
        </div>

        {p.image && (
          <div style={{ width: '100%', height: '180px', overflow: 'hidden', borderRadius: '12px' }}>
            <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <div>
          <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#f0f0f8", letterSpacing: "-0.02em" }}>
            {p.title}
          </h3>
          <CaseStudyTabs p={p} hov={hov} />
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pb-6">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg text-xs"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: hov ? "#a0a0b5" : "#707080", transition: "all 0.3s" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <a href={p.link} target="_blank" rel="noreferrer"
          className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase"
          style={{ color: p.accentAlt, opacity: hov ? 1 : 0.4, transform: hov ? "translateX(0)" : "translateX(-6px)", transition: "all 0.3s ease", pointerEvents: "auto" }}
        >
          View Live Project
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Number watermark */}
      <div
        className="absolute bottom-4 right-6 font-black pointer-events-none"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "6rem", lineHeight: 1, color: p.accent, opacity: 0.06, userSelect: "none" }}
      >
        {p.num}
      </div>
    </div>
  );
}

/* ── Mobile vertical card ── */
function VCard({ p, index }: { p: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-cursor-label="View"
      className="relative rounded-2xl overflow-hidden p-6 flex flex-col gap-4"
      style={{
        background: p.gradient,
        border: `1px solid ${hov ? p.accent + "40" : p.accent + "18"}`,
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.4s ease",
      }}
      data-testid={`project-card-${p.id}`}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: p.lines[0] }} />
      {p.image && (
          <div style={{ width: '100%', height: '140px', overflow: 'hidden', borderRadius: '8px' }}>
            <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
      )}
      <div className="flex justify-between items-start">
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: p.accentAlt }}>{p.category}</span>
        <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${p.accent}18`, color: p.accentAlt }}>{p.year}</span>
      </div>
      <h3 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#f0f0f8" }}>{p.title}</h3>
      <CaseStudyTabs p={p} hov={hov} />
      <div className="flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-lg text-xs" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#707080" }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main section ── */
export default function Projects() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  /* Horizontal scroll refs */
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const totalScroll = () => track.scrollWidth - section.clientWidth + 96;

        const mainTween = gsap.to(track, {
          x: () => -totalScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            start: "top top",
            end: () => `+=${totalScroll()}`,
            scrub: 1.2,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.utils.toArray<HTMLElement>(".h-card").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.35, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: mainTween,
                start: "left 90%",
                end: "left 45%",
                scrub: true,
              },
            }
          );
        });
      });
    });

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section id="projects" className="relative">
      {/* Section header – always visible above the scroll */}
      <div className="px-6">
        <div className="section-divider mb-32" />
        <div className="max-w-7xl mx-auto mb-16">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#2563EB" }}>
                03 / Selected Projects
              </span>
              <h2
                className="mt-3 font-bold tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                data-testid="projects-heading"
              >
                Project <span className="gradient-text">Case Studies</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#94a3b8" }}>
              {isDesktop ? "Scroll or drag to inspect case studies and architectures." : "Production case studies with measured outcomes."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Desktop: GSAP horizontal pinned scroll */}
      {isDesktop && (
        <div ref={sectionRef} className="relative overflow-hidden" style={{ height: "100vh" }}>
          <div
            ref={trackRef}
            className="flex gap-6 items-stretch absolute top-0 left-0 h-full"
            style={{ padding: "0 48px", paddingRight: 120 }}
          >
            {projects.map((p, i) => (
              <HCard key={p.id} p={p} index={i} />
            ))}
          </div>

          {/* Scroll hint */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
            style={{ pointerEvents: "none" }}
          >
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.5))" }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#64748b" }}>drag to explore</span>
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.5), transparent)" }} />
          </div>
        </div>
      )}

      {/* Mobile/Tablet: Vertical stack */}
      {!isDesktop && (
        <div className="px-6 pb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <VCard key={p.id} p={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
