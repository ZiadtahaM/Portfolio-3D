import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(`#${id}`);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        background: scrolled ? "rgba(5,5,8,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          data-cursor-label="Top"
          className="text-xl font-black gradient-text select-none"
          style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.04em" }}
          data-testid="nav-logo"
        >
          AC
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="relative text-sm font-medium transition-colors duration-300"
              style={{ color: active === link.href ? "#e0e0f0" : "#404052" }}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
              {active === link.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, #7C3AED, #06B6D4)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            data-cursor-label="Hire"
            className="magnetic-btn px-4 py-2 text-xs font-semibold rounded-lg text-white font-mono tracking-wider uppercase"
            style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)", boxShadow: "0 0 20px rgba(124,58,237,0.25)" }}
            data-testid="nav-cta"
          >
            Hire Me
          </a>
        </div>

        <button
          className="md:hidden text-white/40 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="nav-menu-toggle"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-3 flex flex-col gap-1 overflow-hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="pt-3 pb-2 text-sm font-medium transition-colors"
                style={{ color: active === link.href ? "#a78bfa" : "#404052" }}
                data-testid={`mobile-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
