import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    id: 1,
    role: "Senior Creative Developer",
    company: "Studio Zero",
    period: "2022 — Present",
    yearShort: "2022",
    description: "Lead creative technologist for a boutique studio specializing in immersive digital experiences. Built WebXR environments for Fortune 500 brands, shipped 15+ production Three.js projects.",
    achievements: [
      "Led development of a real-time 3D configurator used by 500k+ users",
      "Reduced render overhead 40% through custom frustum culling pipeline",
      "Mentored 4 junior developers in WebGL and shader programming",
    ],
    accent: "#7C3AED",
    accentAlt: "#a78bfa",
    status: "Current",
  },
  {
    id: 2,
    role: "Frontend Engineer",
    company: "Luminary Labs",
    period: "2020 — 2022",
    yearShort: "2020",
    description: "Full-stack frontend at a Y Combinator–backed startup. Built the core product UI from 0→1, including a canvas-based design tool handling 10k+ simultaneous collaborative sessions.",
    achievements: [
      "Architected collaborative real-time canvas with CRDT and WebRTC",
      "Shipped design system adopted by 3 product teams",
      "Improved Lighthouse performance score from 42 to 96",
    ],
    accent: "#06B6D4",
    accentAlt: "#67e8f9",
    status: null,
  },
  {
    id: 3,
    role: "Creative Technologist",
    company: "Pixel Forge",
    period: "2019 — 2020",
    yearShort: "2019",
    description: "Creative technologist at a digital agency, bridging design and engineering for interactive campaigns. Pioneered WebGL-first production pipelines for major entertainment brands.",
    achievements: [
      "Delivered award-winning WebGL campaign for major film studio",
      "Built internal WebGL boilerplate adopted agency-wide",
      "First engineer to ship WebXR feature to production at the agency",
    ],
    accent: "#7C3AED",
    accentAlt: "#a78bfa",
    status: null,
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-32 px-6 relative">
      <div className="section-divider mb-32" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#7C3AED" }}>
            04 / Experience
          </span>
          <h2
            className="mt-3 font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            data-testid="experience-heading"
          >
            Career <span className="gradient-text">Timeline</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`experience-${exp.id}`}
              className="group grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-12 py-10 border-b"
              style={{ borderColor: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex md:flex-col gap-3 md:gap-2">
                <span
                  className="font-black text-3xl md:text-4xl leading-none transition-colors duration-500"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1a1a2a" }}
                >
                  {exp.yearShort}
                </span>
                <div className="flex items-center gap-2 md:mt-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: exp.accent }} />
                  {exp.status && (
                    <span className="text-xs font-mono" style={{ color: exp.accentAlt }}>{exp.status}</span>
                  )}
                </div>
              </div>

              <div
                className="p-7 rounded-2xl transition-all duration-500"
                style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.04)" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e8e8f0" }}
                      data-testid={`exp-role-${exp.id}`}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium mt-0.5" style={{ color: exp.accentAlt }}>
                      {exp.company}
                    </p>
                  </div>
                  <span
                    className="text-xs font-mono px-3 py-1.5 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#444454" }}
                  >
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-6" style={{ color: "#555565" }}>
                  {exp.description}
                </p>

                <ul className="flex flex-col gap-2.5">
                  {exp.achievements.map((a, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm" style={{ color: "#707080" }}>
                      <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: exp.accent }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
