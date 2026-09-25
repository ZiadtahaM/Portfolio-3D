import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const socials = [
  {
    label: "GitHub",
    handle: "@alexchen",
    href: "https://github.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: "#7C3AED",
  },
  {
    label: "LinkedIn",
    handle: "alex-chen-dev",
    href: "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "#06B6D4",
  },
  {
    label: "Twitter / X",
    handle: "@alexchen3d",
    href: "https://twitter.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "#7C3AED",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    color: "#e0e0e8",
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 14,
    outline: "none",
    width: "100%",
    transition: "border-color 0.3s ease",
    fontFamily: "inherit",
  } as const;

  return (
    <section id="contact" className="py-32 px-6 relative">
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
            05 / Contact
          </span>
          <h2
            className="mt-3 font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            data-testid="contact-heading"
          >
            Let's Build <span className="gradient-text">Together</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed" style={{ color: "#505060" }}>
            Have a project that deserves something extraordinary? I'm selective about what I take on —
            which means I'm fully committed when I do.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            data-testid="contact-form"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono tracking-widest uppercase" style={{ color: "#444454" }}>Name</label>
                <input
                  type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.07)")}
                  data-testid="input-name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono tracking-widest uppercase" style={{ color: "#444454" }}>Email</label>
                <input
                  type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.07)")}
                  data-testid="input-email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono tracking-widest uppercase" style={{ color: "#444454" }}>Message</label>
              <textarea
                required rows={6} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.07)")}
                data-testid="input-message"
              />
            </div>

            <button
              type="submit"
              data-cursor-label={sent ? "Sent!" : "Send"}
              className="magnetic-btn w-full py-4 rounded-xl text-sm font-semibold text-white"
              style={{
                background: sent
                  ? "linear-gradient(135deg, #06B6D4, #0891b2)"
                  : "linear-gradient(135deg, #7C3AED, #06B6D4)",
                boxShadow: "0 0 40px rgba(124,58,237,0.25)",
                transition: "background 0.4s ease",
              }}
              data-testid="button-submit"
            >
              {sent ? "Message Sent ✓" : "Send Message"}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col gap-5"
          >
            <div
              className="p-6 rounded-2xl"
              style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.15)" }}
            >
              <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: "#444454" }}>Direct Email</p>
              <a
                href="mailto:alex@alexchen.dev"
                className="text-base font-semibold transition-colors"
                style={{ color: "#a78bfa" }}
                data-testid="link-email"
              >
                alex@alexchen.dev
              </a>
            </div>

            <div className="flex flex-col gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="Open"
                  className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${social.color}15`, border: `1px solid ${social.color}25`, color: social.color === "#7C3AED" ? "#a78bfa" : "#67e8f9" }}
                  >
                    {social.icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: "#909098" }}>{social.label}</p>
                    <p className="text-xs font-mono" style={{ color: "#404050" }}>{social.handle}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#555565" }}>
                    <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
