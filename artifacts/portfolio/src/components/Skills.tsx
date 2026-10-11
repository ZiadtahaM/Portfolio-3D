import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { name: "Angular 18 & RxJS", level: 95, color: "#2563EB" },
  { name: "NestJS & Node.js", level: 92, color: "#06B6D4" },
  { name: "PostgreSQL & Database Optimization", level: 90, color: "#2563EB" },
  { name: "Three.js & WebGL Simulations", level: 88, color: "#06B6D4" },
  { name: "Docker & Linux Administration", level: 85, color: "#2563EB" },
  { name: "Redis Caching & Streams", level: 86, color: "#06B6D4" },
  { name: "C & Systems Programming", level: 82, color: "#2563EB" },
  { name: "RESTful & GraphQL API Architecture", level: 92, color: "#06B6D4" },
];

const domains = [
  { label: "Frontend Systems", sub: "Angular · React · TypeScript · RxJS", color: "#2563EB" },
  { label: "Backend Architecture", sub: "NestJS · Node.js · Express · Java", color: "#06B6D4" },
  { label: "Data & Storage", sub: "PostgreSQL · Redis · RLS · ACID", color: "#2563EB" },
  { label: "Graphics & 3D", sub: "Three.js · WebGL · GLSL · Canvas", color: "#06B6D4" },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 px-6 relative">
      <div className="section-divider mb-32" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#2563EB" }}>
            02 / Technical Skills
          </span>
          <h2
            className="mt-3 font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            data-testid="skills-heading"
          >
            Engineering &amp; <span className="gradient-text">Core Stack</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
            className="flex flex-col gap-6"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } }}
                data-testid={`skill-${skill.name.replace(/\s+/g, "-").toLowerCase()}`}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: "#cbd5e1" }}>{skill.name}</span>
                  <span className="text-xs font-mono tabular-nums" style={{ color: skill.color === "#2563EB" ? "#93c5fd" : "#67e8f9" }}>
                    {skill.level}%
                  </span>
                </div>
                <div className="relative h-px" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <motion.div
                    className="absolute left-0 top-0 h-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color === "#2563EB" ? "#06B6D4" : "#2563EB"})`,
                      boxShadow: `0 0 8px ${skill.color}80`,
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                    initial={{ left: "0%" }}
                    animate={inView ? { left: `${skill.level}%` } : { left: "0%" }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    style={{ background: skill.color === "#2563EB" ? "#93c5fd" : "#67e8f9", boxShadow: `0 0 6px ${skill.color}` }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="grid grid-cols-2 gap-4">
              {domains.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="p-5 rounded-2xl"
                  style={{ background: `${d.color}08`, border: `1px solid ${d.color}20` }}
                >
                  <div className="w-6 h-px mb-3" style={{ background: d.color }} />
                  <p className="text-sm font-semibold mb-1" style={{ color: d.color === "#2563EB" ? "#93c5fd" : "#67e8f9" }}>{d.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>{d.sub}</p>
                </motion.div>
              ))}
            </div>

            <div
              className="p-7 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: "#64748b" }}>Architecture Principles</p>
              <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                Deep modules with compact public interfaces, strict schema boundaries with input validation, append-only logs for critical state transitions, and responsive multi-platform user journeys. Every technology selected serves verified throughput, maintainability, and end-user speed.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
