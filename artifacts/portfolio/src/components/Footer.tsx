import { motion } from "framer-motion";

const MARQUEE_ITEMS = [
  "CREATIVE DEVELOPER",
  "3D ARTIST",
  "AVAILABLE FOR WORK",
  "ALEX CHEN",
  "WEBGL ENGINEER",
  "SAN FRANCISCO",
  "OPEN TO REMOTE",
  "THREE.JS",
];

function MarqueeBand() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className="relative overflow-hidden py-5"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="marquee-track flex gap-0">
        {items.map((item, i) => (
          <div key={i} className="marquee-item flex items-center gap-0 shrink-0">
            <span
              className="text-xs font-mono tracking-widest uppercase px-5"
              style={{ color: i % 4 === 1 ? "#7C3AED" : i % 4 === 3 ? "#06B6D4" : "#1e1e30", whiteSpace: "nowrap" }}
            >
              {item}
            </span>
            <span style={{ color: "#1a1a28", fontSize: 8 }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer>
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
              AC
            </span>
            <div className="w-px h-5" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="text-xs font-mono" style={{ color: "#252535" }}>
              Alex Chen — Creative Developer
            </span>
          </motion.div>

          <div className="flex items-center gap-2 text-xs font-mono" style={{ color: "#202030" }}>
            <span>Built with</span>
            <span style={{ color: "#7C3AED" }}>Three.js</span>
            <span>+</span>
            <span style={{ color: "#06B6D4" }}>React</span>
            <span>+</span>
            <span style={{ color: "#a78bfa" }}>Framer Motion</span>
          </div>

          <p className="text-xs font-mono" style={{ color: "#181828" }}>
            © {new Date().getFullYear()} Alex Chen
          </p>
        </div>
      </div>
    </footer>
  );
}
