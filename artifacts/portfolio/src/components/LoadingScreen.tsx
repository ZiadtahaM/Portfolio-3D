import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = [
  "COMPILING SHADERS",
  "LOADING ASSETS",
  "BUILDING SCENE",
  "CALIBRATING 3D ENGINE",
  "READY",
];

interface Props {
  onDone: () => void;
}

export default function LoadingScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const intervals: ReturnType<typeof setInterval>[] = [];

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        const next = p + (Math.random() * 8 + 2);
        if (next >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setExiting(true);
            setTimeout(onDone, 900);
          }, 400);
          return 100;
        }
        return next;
      });
    }, 80);

    intervals.push(progressInterval);

    const stageInterval = setInterval(() => {
      setStage((s) => Math.min(s + 1, STAGES.length - 1));
    }, 320);
    intervals.push(stageInterval);

    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 1200);
    intervals.push(glitchInterval);

    return () => intervals.forEach(clearInterval);
  }, [onDone]);

  const pct = Math.min(Math.floor(progress), 100);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#050508" }}
        >
          <div className="relative flex flex-col items-center gap-8 select-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div
                className="text-7xl md:text-9xl font-black tracking-tighter"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: glitch ? "blur(1px)" : "none",
                  transform: glitch ? `translate(${Math.random() * 4 - 2}px, 0)` : "none",
                  transition: glitch ? "none" : "filter 0.1s, transform 0.1s",
                }}
              >
                AC
              </div>
              {glitch && (
                <>
                  <div
                    className="absolute inset-0 text-7xl md:text-9xl font-black tracking-tighter"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#06B6D4",
                      opacity: 0.4,
                      transform: "translate(-3px, 0)",
                      clipPath: "inset(20% 0 60% 0)",
                    }}
                  >
                    AC
                  </div>
                  <div
                    className="absolute inset-0 text-7xl md:text-9xl font-black tracking-tighter"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#7C3AED",
                      opacity: 0.4,
                      transform: "translate(3px, 0)",
                      clipPath: "inset(60% 0 20% 0)",
                    }}
                  >
                    AC
                  </div>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-4 w-64"
            >
              <div className="relative w-full h-px bg-white/5 overflow-hidden rounded-full">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
                    boxShadow: "0 0 12px rgba(124,58,237,0.8)",
                    transition: "width 0.08s linear",
                  }}
                />
              </div>

              <div className="flex w-full justify-between items-center">
                <span
                  className="text-xs font-mono tracking-widest"
                  style={{ color: "#444454" }}
                >
                  {STAGES[stage]}
                </span>
                <span
                  className="text-xs font-mono tabular-nums"
                  style={{ color: pct === 100 ? "#06B6D4" : "#555565" }}
                >
                  {pct.toString().padStart(3, "0")}%
                </span>
              </div>
            </motion.div>
          </div>

          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono tracking-widest uppercase"
            style={{ color: "#1a1a2a" }}
          >
            alexchen.dev
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
