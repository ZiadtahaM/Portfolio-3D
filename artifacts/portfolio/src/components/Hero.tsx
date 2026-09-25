import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useWebGL } from "../hooks/useWebGL";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

function useScramble(text: string, trigger: boolean, speed = 40) {
  const [output, setOutput] = useState(text);
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const id = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((char, i) =>
            char === " "
              ? " "
              : i < frame / 2
              ? char
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          )
          .join("")
      );
      frame++;
      if (frame / 2 >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [trigger, text, speed]);
  return output;
}

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
      <MeshDistortMaterial color="#7C3AED" attach="material" distort={0.45} speed={2.5} roughness={0.1} metalness={0.8} emissive="#3b0764" emissiveIntensity={0.4} />
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
      <div style={{ width: 300, height: 300, background: "radial-gradient(circle at 38% 38%, #a855f7 0%, #7C3AED 40%, #3b0764 75%, transparent 100%)", borderRadius: "50%", boxShadow: "0 0 120px 50px rgba(124,58,237,0.3), 0 0 60px 20px rgba(6,182,212,0.1)", animation: "orb-float 6s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 370, height: 370, borderRadius: "50%", border: "1px solid rgba(6,182,212,0.4)", animation: "ring-spin-x 7s linear infinite" }} />
      <div style={{ position: "absolute", width: 440, height: 440, borderRadius: "50%", border: "1px solid rgba(124,58,237,0.2)", animation: "ring-spin-y 11s linear infinite reverse" }} />
      <div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle at center, rgba(124,58,237,0.06) 0%, transparent 70%)", filter: "blur(20px)" }} />
    </div>
  );
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const hasWebGL = useWebGL();
  const [scramble, setScramble] = useState(false);
  const alex = useScramble("Alex", scramble, 35);
  const chen = useScramble("Chen", scramble, 35);

  useEffect(() => {
    const t = setTimeout(() => setScramble(true), 600);
    return () => clearTimeout(t);
  }, []);

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
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", color: "#a78bfa" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#7C3AED" }} />
                Available for work
              </span>
              <span className="text-xs font-mono" style={{ color: "#333344" }}>San Francisco, CA</span>
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}>
            <h1 className="font-black leading-[0.95] tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(4rem, 10vw, 7.5rem)" }}>
              <span className="block text-white">{alex}</span>
              <span className="block gradient-text">{chen}</span>
            </h1>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #7C3AED, transparent)" }} />
              <p className="text-sm font-mono tracking-widest uppercase" style={{ color: "#555568" }}>
                Creative Developer &amp; 3D Artist
              </p>
            </div>
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="text-base leading-relaxed max-w-md"
            style={{ color: "#606070" }}
          >
            I build immersive digital experiences at the intersection of code and art —
            pushing what's possible in the browser, one shader at a time.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo("#contact")}
              data-cursor-label="Contact"
              className="magnetic-btn px-7 py-3.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)", boxShadow: "0 0 40px rgba(124,58,237,0.35)" }}
            >
              Get In Touch
            </button>
            <button
              onClick={() => scrollTo("#projects")}
              data-cursor-label="Work"
              className="magnetic-btn px-7 py-3.5 rounded-xl text-sm font-semibold"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#c0c0d0" }}
            >
              View Projects
            </button>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7, delay: 0.3 } } }}
            className="flex items-center gap-8 pt-2"
          >
            {[{ n: "5+", label: "Years" }, { n: "40+", label: "Projects" }, { n: "20+", label: "Clients" }].map((s) => (
              <div key={s.n} className="flex flex-col">
                <span className="text-3xl font-black gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>{s.n}</span>
                <span className="text-xs font-mono mt-1" style={{ color: "#404052" }}>{s.label}</span>
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
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(124,58,237,0.12) 0%, transparent 65%)", filter: "blur(40px)" }} />
          {hasWebGL ? (
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1.8} color="#7C3AED" />
              <pointLight position={[-10, -10, -5]} intensity={1} color="#06B6D4" />
              <Suspense fallback={null}>
                <AnimatedSphere />
                <OrbitRing radius={2.6} speed={0.3} color="#06B6D4" opacity={0.6} />
                <OrbitRing radius={3.2} speed={0.22} color="#7C3AED" opacity={0.3} />
              </Suspense>
            </Canvas>
          ) : (
            <CSSOrb />
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#252535" }}>scroll</span>
        <div className="w-px h-14" style={{ background: "linear-gradient(180deg, rgba(124,58,237,0.5), transparent)" }} />
      </motion.div>
    </section>
  );
}
