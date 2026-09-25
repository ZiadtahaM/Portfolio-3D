import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { name: "Three.js / WebGL", level: 97, color: "#7C3AED" },
  { name: "React & TypeScript", level: 95, color: "#06B6D4" },
  { name: "React Three Fiber", level: 93, color: "#7C3AED" },
  { name: "GLSL Shaders", level: 88, color: "#06B6D4" },
  { name: "GSAP Animation", level: 90, color: "#7C3AED" },
  { name: "Node.js", level: 85, color: "#06B6D4" },
  { name: "Blender 3D", level: 80, color: "#7C3AED" },
  { name: "WebXR / AR / VR", level: 78, color: "#06B6D4" },
];

const domains = [
  { label: "Realtime 3D", sub: "Three.js · WebGL · GLSL · R3F", color: "#7C3AED" },
  { label: "Frontend", sub: "React · TypeScript · Framer Motion", color: "#06B6D4" },
  { label: "Backend", sub: "Node.js · PostgreSQL · Redis", color: "#7C3AED" },
  { label: "Creative", sub: "Blender · WebXR · AR / VR · GSAP", color: "#06B6D4" },
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
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#7C3AED" }}>
            02 / Skills
          </span>
          <h2
            className="mt-3 font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            data-testid="skills-heading"
          >
            Expertise &amp; <span className="gradient-text">Craft</span>
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
                  <span className="text-sm font-medium" style={{ color: "#b0b0c0" }}>{skill.name}</span>
                  <span className="text-xs font-mono tabular-nums" style={{ color: skill.color === "#7C3AED" ? "#a78bfa" : "#67e8f9" }}>
                    {skill.level}
                  </span>
                </div>
                <div className="relative h-px" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <motion.div
                    className="absolute left-0 top-0 h-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color === "#7C3AED" ? "#06B6D4" : "#7C3AED"})`,
                      boxShadow: `0 0 8px ${skill.color}80`,
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                    initial={{ left: "0%" }}
                    animate={inView ? { left: `${skill.level}%` } : { left: "0%" }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    style={{ background: skill.color === "#7C3AED" ? "#a78bfa" : "#67e8f9", boxShadow: `0 0 6px ${skill.color}` }}
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
                  <p className="text-sm font-semibold mb-1" style={{ color: d.color === "#7C3AED" ? "#a78bfa" : "#67e8f9" }}>{d.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#404052" }}>{d.sub}</p>
                </motion.div>
              ))}
            </div>

            <div
              className="p-7 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: "#333345" }}>Philosophy</p>
              <p className="text-sm leading-relaxed" style={{ color: "#505060" }}>
                My stack evolves constantly — but the core never changes:{" "}
                <span style={{ color: "#a78bfa" }}>performance</span>,{" "}
                <span style={{ color: "#67e8f9" }}>craft</span>, and{" "}
                <span style={{ color: "#a78bfa" }}>obsessive attention to detail</span>.
                Every tool I pick up earns its place through results.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
