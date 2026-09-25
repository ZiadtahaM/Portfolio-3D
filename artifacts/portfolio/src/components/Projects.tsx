import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1, num: "01",
    title: "Nebula Dashboard",
    description: "Real-time 3D data visualization transforming complex datasets into navigable spatial environments for enterprise clients managing millions of data points.",
    tags: ["Three.js", "React", "D3", "WebGL", "Node.js"],
    accent: "#7C3AED", accentAlt: "#a78bfa",
    year: "2024", category: "Data Visualization",
    gradient: "linear-gradient(135deg, #0d0020 0%, #1a0040 50%, #0a1020 100%)",
    lines: ["linear-gradient(90deg, rgba(124,58,237,0.4), transparent)", "rgba(124,58,237,0.15)", "rgba(124,58,237,0.08)"],
  },
  {
    id: 2, num: "02",
    title: "Void Protocol",
    description: "Immersive WebGL game set in a procedurally generated cosmos. Full GLSL shader pipeline, custom physics engine, WebXR support for VR headsets.",
    tags: ["Three.js", "GLSL", "WebXR", "Cannon.js"],
    accent: "#06B6D4", accentAlt: "#67e8f9",
    year: "2024", category: "Interactive Experience",
    gradient: "linear-gradient(135deg, #001520 0%, #002838 50%, #001018 100%)",
    lines: ["linear-gradient(90deg, rgba(6,182,212,0.4), transparent)", "rgba(6,182,212,0.15)", "rgba(6,182,212,0.08)"],
  },
  {
    id: 3, num: "03",
    title: "Prism UI",
    description: "Design system featuring live 3D component previews. Designers interact with components spatially before handoff — reducing revision cycles by 60%.",
    tags: ["React", "R3F", "Storybook", "TypeScript"],
    accent: "#7C3AED", accentAlt: "#a78bfa",
    year: "2023", category: "Design System",
    gradient: "linear-gradient(135deg, #100018 0%, #1c0030 50%, #080814 100%)",
    lines: ["linear-gradient(90deg, rgba(124,58,237,0.4), transparent)", "rgba(124,58,237,0.15)", "rgba(124,58,237,0.08)"],
  },
  {
    id: 4, num: "04",
    title: "Aurora API",
    description: "High-performance REST API with a real-time 3D analytics dashboard. Sub-10ms response times at 50k req/s with zero-downtime deployments.",
    tags: ["Node.js", "PostgreSQL", "Redis", "WebSockets"],
    accent: "#06B6D4", accentAlt: "#67e8f9",
    year: "2023", category: "Backend / Infra",
    gradient: "linear-gradient(135deg, #001018 0%, #001c28 50%, #001015 100%)",
    lines: ["linear-gradient(90deg, rgba(6,182,212,0.4), transparent)", "rgba(6,182,212,0.15)", "rgba(6,182,212,0.08)"],
  },
  {
    id: 5, num: "05",
    title: "Helix Studio",
    description: "Browser-based 3D model editor with real-time collaboration. Teams sculpt, texture, and animate assets together with WebRTC-powered shared cursors.",
    tags: ["Three.js", "WebRTC", "CRDT", "React"],
    accent: "#7C3AED", accentAlt: "#a78bfa",
    year: "2023", category: "Creative Tool",
    gradient: "linear-gradient(135deg, #0d0020 0%, #180030 50%, #0a0818 100%)",
    lines: ["linear-gradient(90deg, rgba(124,58,237,0.4), transparent)", "rgba(124,58,237,0.15)", "rgba(124,58,237,0.08)"],
  },
  {
    id: 6, num: "06",
    title: "Phantom Commerce",
    description: "Next-gen e-commerce with AR try-on and 3D product configurator. Customers place true-to-scale products via WebXR before purchasing.",
    tags: ["WebXR", "Three.js", "Next.js", "Shopify"],
    accent: "#06B6D4", accentAlt: "#67e8f9",
    year: "2022", category: "E-Commerce",
    gradient: "linear-gradient(135deg, #001018 0%, #00202e 50%, #001020 100%)",
    lines: ["linear-gradient(90deg, rgba(6,182,212,0.4), transparent)", "rgba(6,182,212,0.15)", "rgba(6,182,212,0.08)"],
  },
];

/* ── Single horizontal card ── */
function HCard({ p, index }: { p: typeof projects[0]; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="h-card group relative shrink-0 flex flex-col justify-between rounded-2xl overflow-hidden"
      style={{
        width: "min(480px, 85vw)",
        height: "100%",
        background: p.gradient,
        border: `1px solid ${p.accent}25`,
        transform: hov ? "scale(1.02)" : "scale(1)",
        boxShadow: hov ? `0 30px 80px ${p.accent}20` : "none",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        cursor: "none",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-cursor-label="View"
    >
      {/* Top glow line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: p.lines[0], opacity: hov ? 1 : 0.4, transition: "opacity 0.4s" }} />

      {/* Decorative geometry */}
      <div style={{ position: "absolute", top: 24, right: 24, opacity: 0.15 }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <polygon points="40,4 76,22 76,58 40,76 4,58 4,22" stroke={p.accent} strokeWidth="1" fill="none" />
          <polygon points="40,16 64,28 64,52 40,64 16,52 16,28" stroke={p.accent} strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative p-8 pb-4 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: p.accentAlt }}>
            {p.category}
          </span>
          <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${p.accent}18`, color: p.accentAlt }}>
            {p.year}
          </span>
        </div>

        <h3
          className="font-black tracking-tight leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#f0f0f8" }}
          data-testid={`project-title-${p.id}`}
        >
          {p.title}
        </h3>

        <p className="text-sm leading-relaxed" style={{ color: "#606075" }} data-testid={`project-desc-${p.id}`}>
          {p.description}
        </p>
      </div>

      <div className="relative p-8 pt-4 flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-lg text-xs" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#707080" }}>
              {tag}
            </span>
          ))}
        </div>

        <div
          className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase"
          style={{ color: p.accentAlt, opacity: hov ? 1 : 0.4, transform: hov ? "translateX(0)" : "translateX(-6px)", transition: "all 0.3s ease" }}
        >
          View Case Study
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Number watermark */}
      <div
        className="absolute bottom-4 right-6 font-black"
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
        cursor: "none",
      }}
      data-testid={`project-card-${p.id}`}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: p.lines[0] }} />
      <div className="flex justify-between items-start">
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: p.accentAlt }}>{p.category}</span>
        <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${p.accent}18`, color: p.accentAlt }}>{p.year}</span>
      </div>
      <h3 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#f0f0f8" }}>{p.title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "#606075" }}>{p.description}</p>
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
      {/* Section header — always visible above the scroll */}
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
