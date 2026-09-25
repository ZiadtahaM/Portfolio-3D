import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-cursor-label="Top"
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 9996,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(5,5,8,0.9)",
            border: "1px solid rgba(124,58,237,0.4)",
            boxShadow: "0 0 20px rgba(124,58,237,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "none",
            backdropFilter: "blur(12px)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 11V3M3 7l4-4 4 4" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
