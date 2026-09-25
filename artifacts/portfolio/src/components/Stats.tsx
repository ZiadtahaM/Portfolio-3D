import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 500, suffix: "K+", label: "Users Reached", color: "#7C3AED" },
  { value: 15, suffix: "+", label: "Shipped Products", color: "#06B6D4" },
  { value: 40, suffix: "+", label: "Client Projects", color: "#7C3AED" },
  { value: 5, suffix: "+", label: "Years of Craft", color: "#06B6D4" },
];

function Counter({ value, suffix, color, trigger }: { value: number; suffix: string; color: string; trigger: boolean }) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    start.current = null;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start.current) start.current = ts;
      const elapsed = ts - start.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [trigger, value]);

  return (
    <span style={{ color }}>
      {count}
      <span style={{ fontSize: "0.6em", marginLeft: 2, color }}>{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, overflow: "hidden" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center py-10 px-6 text-center relative"
              style={{
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color}40, transparent)` }}
              />
              <div
                className="text-4xl md:text-5xl font-black mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}
              >
                <Counter value={s.value} suffix={s.suffix} color={s.color} trigger={inView} />
              </div>
              <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "#404050" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
