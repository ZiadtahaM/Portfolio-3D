import { motion } from "framer-motion";

const MARQUEE_ITEMS = [
  "FULL-STACK SOFTWARE ENGINEER",
  "SYSTEM ARCHITECT",
  "AVAILABLE FOR CONTRACTS",
  "ZIAD TAHA",
  "ANGULAR & NESTJS",
  "ALEXANDRIA, EGYPT",
  "POSTGRESQL & THREE.JS",
  "DEPI FELLOW",
];

function MarqueeBand() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className="w-full max-w-full relative overflow-hidden py-5"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="marquee-track flex gap-0">
        {items.map((item, i) => (
          <div key={i} className="marquee-item flex items-center gap-0 shrink-0">
            <span
              className="text-xs font-mono tracking-widest uppercase px-5"
              style={{ color: i % 4 === 1 ? "#2563EB" : i % 4 === 3 ? "#06B6D4" : "#475569", whiteSpace: "nowrap" }}
            >
              {item}
            </span>
            <span style={{ color: "#334155", fontSize: 8 }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full max-w-full overflow-hidden">
      <MarqueeBand />

      <div className="py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <span
              className="text-2xl font-black gradient-text"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
            >
              ZT
            </span>
            <div className="w-px h-5" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="text-xs font-mono" style={{ color: "#94a3b8" }}>
              Ziad Taha. Full-Stack Software Engineer &amp; System Architect
            </span>
          </motion.div>

          <div className="flex items-center gap-2 text-xs font-mono" style={{ color: "#64748b" }}>
            <span>Built with</span>
            <span style={{ color: "#2563EB" }}>Three.js</span>
            <span>+</span>
            <span style={{ color: "#06B6D4" }}>React</span>
            <span>+</span>
            <span style={{ color: "#60A5FA" }}>Framer Motion</span>
          </div>

          <p className="text-xs font-mono" style={{ color: "#64748b" }}>
            © {new Date().getFullYear()} Ziad Taha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
