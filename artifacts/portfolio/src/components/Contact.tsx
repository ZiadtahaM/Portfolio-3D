import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const socials = [
  {
    label: "WhatsApp & Phone",
    handle: "+20 102 878 5511",
    href: "https://wa.me/201028785511",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.941-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.45 1.741 1.706 2.296.222.098.406.15.539.192.179.057.34.049.467.031.143-.021.439-.18.57-.354.13-.174.13-.323.091-.383-.039-.06-.144-.096-.288-.168z"/>
      </svg>
    ),
    color: "#10B981",
  },
  {
    label: "GitHub",
    handle: "@ZiadtahaM",
    href: "https://github.com/ZiadtahaM",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: "#2563EB",
  },
  {
    label: "LinkedIn",
    handle: "ziad-taha-271216285",
    href: "https://linkedin.com/in/ziad-taha-271216285",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "#06B6D4",
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
    <section id="contact" className="py-32 px-4 sm:px-6 relative w-full max-w-full overflow-hidden">
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
            05 / Direct Communication
          </span>
          <h2
            className="mt-3 font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            data-testid="contact-heading"
          >
            Start a <span className="gradient-text">Technical Discussion</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            Available for full-stack engineering contracts, platform architecture reviews, and cohort mentoring engagements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 sm:gap-16 w-full max-w-full">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            data-testid="contact-form"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono tracking-widest uppercase" style={{ color: "#64748b" }}>Name</label>
                <input
                  type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(37,99,235,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.07)")}
                  data-testid="input-name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono tracking-widest uppercase" style={{ color: "#64748b" }}>Email</label>
                <input
                  type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="work@company.com"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(37,99,235,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.07)")}
                  data-testid="input-email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono tracking-widest uppercase" style={{ color: "#64748b" }}>Requirements</label>
              <textarea
                required rows={6} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Detail technical requirements, architecture scope, or timeline..."
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(37,99,235,0.5)")}
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
                  ? "linear-gradient(135deg, #10B981, #059669)"
                  : "linear-gradient(135deg, #2563EB, #06B6D4)",
                boxShadow: "0 0 30px rgba(37,99,235,0.3)",
                transition: "background 0.4s ease",
              }}
              data-testid="button-submit"
            >
              {sent ? "Message Sent ✓" : "Send Message Directly"}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col gap-5 w-full max-w-full overflow-hidden"
          >
            <div
              className="p-6 rounded-2xl"
              style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.15)" }}
            >
              <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: "#64748b" }}>Direct Email</p>
              <a
                href="mailto:ziad.taha3456@gmail.com"
                className="text-base font-semibold transition-colors"
                style={{ color: "#93c5fd" }}
                data-testid="link-email"
              >
                ziad.taha3456@gmail.com
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
                    style={{ background: `${social.color}15`, border: `1px solid ${social.color}25`, color: social.color }}
                  >
                    {social.icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: "#cbd5e1" }}>{social.label}</p>
                    <p className="text-xs font-mono" style={{ color: "#64748b" }}>{social.handle}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#94a3b8" }}>
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
