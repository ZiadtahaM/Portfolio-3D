import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useWebGL } from "../hooks/useWebGL";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });
  return (
    <Sphere ref={meshRef} args={[1.8, 128, 128]}>
      <MeshDistortMaterial color="#2563EB" attach="material" distort={0.25} speed={1.5} roughness={0.15} metalness={0.7} emissive="#1e3a8a" emissiveIntensity={0.3} />
    </Sphere>
  );
}

function OrbitRing({ radius, speed, color, opacity }: { radius: number; speed: number; color: string; opacity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed;
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.4;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.01, 12, 100]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function CSSOrb() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div style={{ width: 300, height: 300, background: "radial-gradient(circle at 38% 38%, #3b82f6 0%, #2563EB 40%, #1e3a8a 75%, transparent 100%)", borderRadius: "50%", boxShadow: "0 0 100px 30px rgba(37,99,235,0.25), 0 0 50px 15px rgba(6,182,212,0.1)", animation: "orb-float 6s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 370, height: 370, borderRadius: "50%", border: "1px solid rgba(6,182,212,0.3)", animation: "ring-spin-x 7s linear infinite" }} />
      <div style={{ position: "absolute", width: 440, height: 440, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.2)", animation: "ring-spin-y 11s linear infinite reverse" }} />
      <div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle at center, rgba(37,99,235,0.06) 0%, transparent 70%)", filter: "blur(20px)" }} />
    </div>
  );
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const hasWebGL = useWebGL();
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: "80px" }}>
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
          className="flex flex-col gap-7"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)", color: "#93c5fd" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#2563EB" }} />
                Available for Engineering Contracts
              </span>
              <span className="text-xs font-mono text-slate-400">Alexandria, Egypt</span>
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}>
            <h1 className="font-black leading-[0.95] tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(3.5rem, 8vw, 6.5rem)" }}>
              <span className="block text-white">Ziad</span>
              <span className="block gradient-text">Taha</span>
            </h1>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #2563EB, transparent)" }} />
              <p className="text-sm font-mono tracking-widest uppercase text-slate-300">
                Full-Stack Developer: Angular, NestJS &amp; TypeScript
              </p>
            </div>
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="text-base leading-relaxed max-w-md text-slate-300"
          >
            Building web applications and APIs with Angular, NestJS and TypeScript. About two years with Angular and about one with NestJS, across storefront, attendance and education projects. DEPI Angular certificate holder.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo("#projects")}
              className="magnetic-btn px-7 py-3.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #2563EB, #06B6D4)", boxShadow: "0 0 30px rgba(37,99,235,0.3)" }}
            >
              Explore Projects
            </button>
            <a
              href="https://ziadtaha.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold"
              style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.35)", color: "#93c5fd" }}
            >
              Engineering Dossier
            </a>
            <a
              href="https://wa.me/201028785511"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-300"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              WhatsApp (+20 102 878 5511)
            </a>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7, delay: 0.3 } } }}
            className="flex items-center gap-8 pt-2"
          >
            {[{ n: "~2y", label: "Angular" }, { n: "~1y", label: "NestJS" }, { n: "45", label: "Jest tests passing" }].map((s) => (
              <div key={s.n} className="flex flex-col">
                <span className="text-3xl font-black gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>{s.n}</span>
                <span className="text-xs font-mono mt-1 text-slate-400">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative h-[460px] md:h-[560px] w-full"
        >
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(37,99,235,0.12) 0%, transparent 65%)", filter: "blur(40px)" }} />
          {hasWebGL ? (
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1.8} color="#2563EB" />
              <pointLight position={[-10, -10, -5]} intensity={1} color="#06B6D4" />
              <Suspense fallback={null}>
                <AnimatedSphere />
                <OrbitRing radius={2.6} speed={0.3} color="#06B6D4" opacity={0.6} />
                <OrbitRing radius={3.2} speed={0.22} color="#2563EB" opacity={0.3} />
              </Suspense>
            </Canvas>
          ) : (
            <CSSOrb />
          )}
        </motion.div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-xs font-mono tracking-widest uppercase text-slate-500">scroll</span>
        <div className="w-px h-14" style={{ background: "linear-gradient(180deg, rgba(37,99,235,0.5), transparent)" }} />
      </div>
    </section>
  );
}
