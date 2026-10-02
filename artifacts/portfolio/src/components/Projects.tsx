import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "3d-portfolio",
    num: "01",
    title: "Portfolio-3D: Interactive WebGL",
    category: "CREATIVE & 3D",
    year: "2026",
    link: "https://ziad-portfolio-3d.pages.dev",
    image: "/assets/screenshots/ziad-portfolio-3d.png",
    descriptionEn: "Traditional DOM-based portfolios suffer from frame drops during complex animations. Engineered a custom WebGL pipeline utilizing Three.js and GLSL shaders. The system manages a compute-heavy particle simulation featuring 2,500 individual nodes mapped to interactions, utilizing strict memory management to bypass DOM bottlenecks.\n\nImpact: Achieved a 98% Lighthouse performance score and reduced GPU memory allocation by 40% compared to standard DOM implementations. The optimized geometry instancing allowed for 60 FPS across mid-range mobile devices.",
    descriptionAr: "تعاني معارض الأعمال التقليدية المعتمدة على DOM من انخفاض معدل الإطارات أثناء الرسوم المتحركة المعقدة. تم تصميم مسار WebGL مخصص باستخدام Three.js ومظللات GLSL. يدير النظام محاكاة جزيئية ثقيلة الحوسبة تضم 2500 عقدة، مع إدارة صارمة للذاكرة.\n\nالتأثير: تحقيق درجة 98% في أداء Lighthouse وتقليل تخصيص ذاكرة وحدة معالجة الرسومات بنسبة 40%. سمح تحسين النماذج الهندسية بتحقيق 60 إطاراً في الثانية على الهواتف المحمولة المتوسطة.",
    tags: ["Three.js", "WebGL", "React", "GLSL"],
    gradient: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.1) 100%)",
    accent: "#7C3AED",
    accentAlt: "#06B6D4",
    lines: ["linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)"]
  },
  {
    id: "flowdesk",
    num: "02",
    title: "Flowdesk Egypt: Coworking CRM",
    category: "FULLSTACK ARCHITECTURE",
    year: "2026",
    link: "https://flowdesk-egypt.pages.dev",
    image: "/assets/screenshots/flowdesk-egypt.png",
    descriptionEn: "Flowdesk required a comprehensive workspace management system to handle desk reservations and billing with full bilingual support without layout instability. Developed a centralized CRM platform using React and Node.js. Implemented a strict localization architecture loading distinct CSS grids based on locale.\n\nImpact: Decreased frontend bundle size by 25% through dynamic RTL chunking. Reduced API query latency by 120ms by implementing indexed views.",
    descriptionAr: "تطلب فلوديسك نظاماً شاملاً لإدارة مساحات العمل للتعامل مع حجوزات المكاتب مع دعم ثنائي اللغة بالكامل دون عدم استقرار في التصميم. تم تطوير منصة CRM باستخدام React و Node.js وتنفيذ بنية أقلمة صارمة.\n\nالتأثير: تقليل حجم حزمة الواجهة الأمامية بنسبة 25% وتقليل زمن انتقال استعلام واجهة برمجة التطبيقات بمقدار 120 مللي ثانية عن طريق تنفيذ طرق عرض مفهرسة.",
    tags: ["React", "Node.js", "i18n RTL", "PostgreSQL"],
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(124,58,237,0.1) 100%)",
    accent: "#06B6D4",
    accentAlt: "#7C3AED",
    lines: ["linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)"]
  },
  {
    id: "enterprise-saas",
    num: "03",
    title: "Enterprise Real Estate SaaS",
    category: "BACKEND & ARCHITECTURE",
    year: "2026",
    link: "https://ziad-enterprise-saas.pages.dev",
    image: "/assets/screenshots/ziad-enterprise-saas.png",
    descriptionEn: "Architecting a SaaS application capable of isolating data for multiple independent real estate brokerages. Designed a multi-tenant PostgreSQL architecture utilizing Row-Level Security (RLS) for strict data isolation. Integrated automated contract generation and a property search module.\n\nImpact: Maintained 99.9% uptime during load testing of 5,000 concurrent geographic queries. RLS implementation reduced authorization codebase complexity by 60%.",
    descriptionAr: "تصميم تطبيق SaaS قادر على عزل البيانات لعدة شركات وساطة عقارية مستقلة. تم تصميم بنية PostgreSQL متعددة المستأجرين باستخدام أمان مستوى الصف (RLS) لضمان عزل البيانات بدقة.\n\nالتأثير: الحفاظ على وقت تشغيل 99.9% أثناء اختبار الحمل لـ 5000 استعلام جغرافي متزامن. أدى تنفيذ RLS إلى تقليل تعقيد قاعدة التعليمات البرمجية بنسبة 60%.",
    tags: ["PostgreSQL", "RLS", "Node.js", "Multi-Tenant"],
    gradient: "linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(124,58,237,0.1) 100%)",
    accent: "#EC4899",
    accentAlt: "#7C3AED",
    lines: ["linear-gradient(90deg, transparent, rgba(236,72,153,0.4), transparent)"]
  },
  {
    id: "facemark",
    num: "04",
    title: "Facemark AI Attendance",
    category: "DEEP LEARNING",
    year: "2026",
    link: "https://facemark-modern-ops.pages.dev",
    image: "/assets/screenshots/facemark-modern-ops.png",
    descriptionEn: "Required an automated, non-intrusive logging system capable of identifying students in real-time. Developed a pipeline using Python and CV algorithms. Extracts facial landmarks using deep learning models and cross-references biometric vectors.\n\nImpact: Achieved a 99.4% biometric recognition accuracy rate. Optimized the inference pipeline to process frames in under 45ms for real-time tracking.",
    descriptionAr: "تطلب النظام نظام تسجيل آلي قادر على تحديد الطلاب في الوقت الفعلي. تم تطوير مسار باستخدام بايثون وخوارزميات الرؤية الحاسوبية لاستخراج معالم الوجه ومقاطعتها مع متجهات حيوية.\n\nالتأثير: تحقيق معدل دقة تعرف حيوي يبلغ 99.4%. تم تحسين مسار الاستدلال لمعالجة الإطارات في أقل من 45 مللي ثانية.",
    tags: ["Python", "Computer Vision", "Deep Learning", "Edge Inference"],
    gradient: "linear-gradient(135deg, rgba(234,179,8,0.15) 0%, rgba(236,72,153,0.1) 100%)",
    accent: "#EAB308",
    accentAlt: "#EC4899",
    lines: ["linear-gradient(90deg, transparent, rgba(234,179,8,0.4), transparent)"]
  }
];

/* ── Case Study Tabs Component ── */
function CaseStudyTabs({ p, hov }: { p: typeof projects[0], hov?: boolean }) {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex gap-2 mb-1" style={{ zIndex: 20 }}>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLang('en'); }} 
          className="px-2 py-0.5 rounded text-xs font-bold transition-all" 
          style={{ background: lang === 'en' ? p.accent : 'rgba(255,255,255,0.05)', color: lang === 'en' ? '#fff' : '#888', pointerEvents: 'auto', border: `1px solid ${p.accent}40` }}
        >
          EN
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLang('ar'); }} 
          className="px-2 py-0.5 rounded text-xs font-bold transition-all" 
          style={{ background: lang === 'ar' ? p.accent : 'rgba(255,255,255,0.05)', color: lang === 'ar' ? '#fff' : '#888', pointerEvents: 'auto', border: `1px solid ${p.accent}40` }}
        >
          AR
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
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#7C3AED" }}>
                03 / Projects
              </span>
              <h2
                className="mt-3 font-bold tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                data-testid="projects-heading"
              >
                Selected <span className="gradient-text">Work</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#404052" }}>
              {isDesktop ? "Scroll to explore — or drag horizontally." : "A curated set of immersive projects."}
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
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5))" }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#252535" }}>drag to explore</span>
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
