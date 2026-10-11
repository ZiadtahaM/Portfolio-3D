import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full max-w-full overflow-hidden border-t border-white/5 bg-[#07080d]">
      <div className="py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <span
              className="text-lg font-bold text-white tracking-wider font-mono"
            >
              ZT
            </span>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-xs font-mono text-slate-400">
              Ziad Taha &bull; Full-Stack Software Engineer &bull; Alexandria, Egypt
            </span>
          </motion.div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <a
              href="https://ziadtaha.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              Engineering Dossier
            </a>
            <span>&bull;</span>
            <a
              href="https://github.com/ZiadtahaM"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
            <span>&bull;</span>
            <a
              href="https://linkedin.com/in/ziad-taha-271216285"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>

          <p className="text-xs font-mono text-slate-500">
            &copy; {new Date().getFullYear()} Ziad Taha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
