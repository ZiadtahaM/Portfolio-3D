import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    num: "01",
    title: "3D Web Experiences",
    description:
      "Immersive Three.js applications, custom GLSL shaders, and WebGL pipelines that turn browsers into cinematic spaces.",
    tags: ["Three.js", "WebGL", "GLSL", "R3F"],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 32, height: 32 }}>
        <path d="M20 4L36 13V27L20 36L4 27V13L20 4Z" stroke="#7C3AED" strokeWidth="1.5" />
        <path d="M20 4L20 36M4 13L36 27M36 13L4 27" stroke="#7C3AED" strokeWidth="0.75" strokeOpacity="0.4" />
      </svg>
    ),
    accent: "#7C3AED",
    accentAlt: "#a78bfa",
    from: "From $8,000",
  },
  {
    num: "02",
    title: "Creative Direction",
    description:
      "Full visual strategy — motion language, design systems, and the aesthetic logic that makes a brand feel inevitable.",
    tags: ["Motion", "Branding", "UI/UX", "Figma"],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 32, height: 32 }}>
        <circle cx="20" cy="20" r="14" stroke="#06B6D4" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="7" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="20" cy="20" r="2" fill="#06B6D4" />
        <line x1="20" y1="6" x2="20" y2="12" stroke="#06B6D4" strokeWidth="1.5" />
        <line x1="34" y1="20" x2="28" y2="20" stroke="#06B6D4" strokeWidth="1.5" />
      </svg>
    ),
    accent: "#06B6D4",
    accentAlt: "#67e8f9",
    from: "From $4,000",
  },
  {
    num: "03",
    title: "Performance Engineering",
    description:
      "60fps across all hardware through instancing, LOD systems, frustum culling, and WebWorker offloading strategies.",
    tags: ["WebWorkers", "WASM", "WebGPU", "Profiling"],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 32, height: 32 }}>
        <path d="M8 32L8 20L16 20L16 32" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 32L18 14L26 14L26 32" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
        <path d="M28 32L28 8L36 8L36 32" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round" />
        <path d="M6 32L38 32" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M10 17L19 11L27 14L35 6" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "#7C3AED",
    accentAlt: "#a78bfa",
    from: "From $5,000",
  },
  {
    num: "04",
    title: "WebXR Development",
    description:
      "AR and VR experiences for modern headsets and mobile AR using the WebXR Device API — shipped to production.",
    tags: ["WebXR", "AR", "VR", "A-Frame"],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 32, height: 32 }}>
        <rect x="4" y="14" width="32" height="14" rx="7" stroke="#06B6D4" strokeWidth="1.5" />
        <circle cx="13" cy="21" r="4" stroke="#06B6D4" strokeWidth="1" />
        <circle cx="27" cy="21" r="4" stroke="#06B6D4" strokeWidth="1" />
        <line x1="17" y1="21" x2="23" y2="21" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="13" cy="21" r="1.5" fill="#06B6D4" fillOpacity="0.5" />
        <circle cx="27" cy="21" r="1.5" fill="#06B6D4" fillOpacity="0.5" />
      </svg>
    ),
    accent: "#06B6D4",
    accentAlt: "#67e8f9",
    from: "From $12,000",
  },
];

function ServiceCard({ s, index }: { s: typeof services[0]; index: number }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-cursor-label="Learn"
      className="group relative p-8 rounded-2xl flex flex-col gap-5"
      style={{
        background: hov ? `${s.accent}08` : "rgba(255,255,255,0.018)",
        border: `1px solid ${hov ? s.accent + "35" : "rgba(255,255,255,0.05)"}`,
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hov ? `0 24px 60px ${s.accent}18` : "none",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        cursor: "none",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${s.accent}60, transparent)`,
          opacity: hov ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      <div className="flex items-start justify-between">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ background: `${s.accent}10`, border: `1px solid ${s.accent}20` }}
        >
          {s.icon}
        </div>
        <span className="text-3xl font-black" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0e0e18", transition: "color 0.4s ease" }}>
          {s.num}
        </span>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e0e0f0" }}>
          {s.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#505060" }}>
          {s.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {s.tags.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-lg text-xs" style={{ background: `${s.accent}12`, color: s.accentAlt, border: `1px solid ${s.accent}20` }}>
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <span className="text-xs font-mono" style={{ color: hov ? s.accentAlt : "#2a2a3a", transition: "color 0.3s ease" }}>
          {s.from}
        </span>
        <div
          className="flex items-center gap-1.5 text-xs font-mono"
          style={{ color: s.accentAlt, opacity: hov ? 1 : 0, transform: hov ? "translateX(0)" : "translateX(-8px)", transition: "all 0.3s ease" }}
        >
          Inquire <span>→</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-32 px-6 relative">
      <div className="section-divider mb-32" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#7C3AED" }}>
              What I Build
            </span>
            <h2 className="mt-3 font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              Services &amp; <span className="gradient-text">Expertise</span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#404052" }}>
            End-to-end creative development. From first pixel to production deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.num} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
