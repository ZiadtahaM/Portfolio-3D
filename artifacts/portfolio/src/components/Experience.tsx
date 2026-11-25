import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    id: 1,
    role: "Freelance Full-Stack Developer",
    company: "Mostaqel, Khamsat & Nafizly Platforms",
    period: "2023 to Present",
    yearShort: "2023",
    description: "Building storefronts, dashboards and booking tooling for freelance clients on regional platforms.",
    achievements: [
      "Delivered freelance work across storefront, education and coworking projects",
      "Implemented PDF invoicing and payment-record workflows for a coworking platform",
      "Documented every project repo with setup instructions and honest scope notes",
    ],
    accent: "#2563EB",
    accentAlt: "#60A5FA",
    status: "Active",
  },
  {
    id: 2,
    role: "Backend Project Work: FaceMark and APIs",
    company: "Self-directed",
    period: "2024 to Present",
    yearShort: "2024",
    description: "Designed and built NestJS APIs with JWT auth, MySQL models and a circuit-breaker-guarded face-recognition service.",
    achievements: [
      "45 Jest tests passing locally across 9 suites (auth, users, courses, attendance)",
      "JWT auth with refresh rotation, bcrypt hashing and required strong secrets",
      "Added MySQL TLS support and honest deployment notes for hosted databases",
    ],
    accent: "#06B6D4",
    accentAlt: "#67E8F9",
    status: null,
  },
  {
    id: 3,
    role: "Angular Training Participant",
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    period: "2024 to Present",
    yearShort: "2024",
    description: "Completed the Digital Egypt Pioneers Initiative (DEPI) Angular front-end track and earned the DEPI Angular certificate.",
    achievements: [
      "Built Angular interfaces with RxJS state management and SSR rendering",
      "Shipped an Angular 17 SSR storefront on a third-party commerce API",
      "Wrote a public dev.to article on what SSR actually changes",
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
      "Coursework projects in C and TypeScript",
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
