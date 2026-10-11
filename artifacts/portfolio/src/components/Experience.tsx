import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    id: 1,
    role: "Independent Software Consultant & Freelance Engineer",
    company: "Mostaqel, Khamsat & Nafizly Platforms",
    period: "2023 to Present",
    yearShort: "2023",
    description: "Delivering full-stack web applications, custom CRM platforms, and database architectures for business clients across Egypt, Saudi Arabia, and the UAE.",
    achievements: [
      "Completed 30+ commercial software contracts with 100% on-time milestone delivery",
      "Maintained 5.0 / 5.0 client satisfaction rating across verified regional platforms",
      "Engineered automated PDF invoicing and Egyptian banking / Payoneer clearing workflows",
    ],
    accent: "#2563EB",
    accentAlt: "#60A5FA",
    status: "Active",
  },
  {
    id: 2,
    role: "Backend Software Engineer",
    company: "Huma-volve",
    period: "2024 to 2025",
    yearShort: "2024",
    description: "Engineered scalable REST services, database query optimizations, and background queue workers for high-volume customer workflows.",
    achievements: [
      "Reduced API latency by 35% through PostgreSQL indexing and Redis cache-aside strategies",
      "Implemented strict JWT auth with refresh token rotation and RBAC security boundaries",
      "Wrote end-to-end contract test suites eliminating regression errors before production",
    ],
    accent: "#06B6D4",
    accentAlt: "#67E8F9",
    status: null,
  },
  {
    id: 3,
    role: "Engineering Fellow (Angular Enterprise)",
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    period: "2024 to Present",
    yearShort: "2024",
    description: "Selected for Egypt's flagship government software engineering fellowship, mastering modern enterprise front-end systems and cloud architectures.",
    achievements: [
      "Architected complex state-machine front-ends with Angular 18 and RxJS reactive streams",
      "Built multi-tenant educational portals compliant with Egyptian digital accessibility standards",
      "Collaborated in agile sprint deliveries with automated CI/CD and lint gates",
    ],
    accent: "#10B981",
    accentAlt: "#6EE7B7",
    status: "Fellowship",
  },
  {
    id: 4,
    role: "B.Sc. in Computer Science",
    company: "Egyptian E-Learning University (EELU) Alexandria",
    period: "2022 to 2026",
    yearShort: "2022",
    description: "Core academic training in computer science, distributed algorithms, relational database theory, and operating systems.",
    achievements: [
      "Coursework: Data Structures, Algorithms, Distributed Databases, OS, Computer Networks",
      "Built C99 systems programming tools including custom shell and bytecode interpreter",
      "Active competitive programming participant focusing on graph theory and dynamic programming",
    ],
    accent: "#3B82F6",
    accentAlt: "#93C5FD",
    status: "Class of 2026",
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
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#2563EB" }}>
            04 / Experience
          </span>
          <h2
            className="mt-3 font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            data-testid="experience-heading"
          >
            Verified <span className="gradient-text">Timeline</span>
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
