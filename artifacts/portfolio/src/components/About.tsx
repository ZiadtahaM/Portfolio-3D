import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import { useWebGL } from "../hooks/useWebGL";

function IcosahedronMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.25;
    ref.current.rotation.y = state.clock.elapsedTime * 0.35;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial color="#2563EB" metalness={0.9} roughness={0.1} emissive="#1e3a8a" emissiveIntensity={0.4} wireframe={false} />
    </mesh>
  );
}

function WireframeIco() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = -state.clock.elapsedTime * 0.2;
    ref.current.rotation.y = -state.clock.elapsedTime * 0.3;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.85, 0]} />
      <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

function CSSIcosahedron() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        style={{
          width: 200,
          height: 200,
          background: "linear-gradient(135deg, #2563EB 0%, #1d4ed8 60%, #1e3a8a 100%)",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          boxShadow: "0 0 60px 20px rgba(37,99,235,0.3), 0 0 100px 30px rgba(37,99,235,0.1)",
          animation: "orb-float 5s ease-in-out infinite",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 240,
          height: 240,
          border: "1px solid rgba(6,182,212,0.35)",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          animation: "ring-spin-x 8s linear infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle at center, rgba(37,99,235,0.12) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const highlights = [
  { label: "Angular 18 & RxJS", color: "#2563EB" },
  { label: "NestJS & Node.js", color: "#06B6D4" },
  { label: "PostgreSQL & RLS", color: "#2563EB" },
  { label: "Three.js & WebGL", color: "#06B6D4" },
  { label: "Docker & Linux", color: "#2563EB" },
  { label: "DEPI Engineering Fellow", color: "#10B981" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const hasWebGL = useWebGL();

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="section-divider mb-32" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[380px] hidden lg:block"
        >
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(circle at center, rgba(37, 99, 235, 0.12) 0%, transparent 70%)", filter: "blur(30px)" }}
          />
          {hasWebGL ? (
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[5, 5, 5]} intensity={2} color="#2563EB" />
              <pointLight position={[-5, -5, -5]} intensity={1} color="#06B6D4" />
              <Suspense fallback={null}>
                <IcosahedronMesh />
                <WireframeIco />
              </Suspense>
            </Canvas>
          ) : (
            <CSSIcosahedron />
          )}
        </motion.div>

        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#2563EB" }}>01 / About</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold leading-tight tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }} data-testid="about-heading">
            Practical <span className="gradient-text">Engineering</span>, Real Delivery
          </motion.h2>

          <motion.p variants={itemVariants} className="text-base leading-relaxed" style={{ color: "#cbd5e1" }} data-testid="about-bio">
            I am Ziad Taha, a Computer Science undergraduate at the Egyptian E-Learning University (EELU) Alexandria (Class of 2026), an engineering fellow of the Digital Egypt Pioneers Initiative (DEPI), and an active software consultant across Mostaqel, Khamsat, and Nafizly.
          </motion.p>

          <motion.p variants={itemVariants} className="text-base leading-relaxed" style={{ color: "#94a3b8" }}>
            I build full-stack web applications, distributed APIs, and real-time interactive interfaces engineered for speed, reliability, and architectural clarity. Over 30 commercial projects delivered with 100% completion ratings across MENA platforms.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-2">
            {highlights.map((h) => (
              <span
                key={h.label}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: `${h.color}18`,
                  border: `1px solid ${h.color}40`,
                  color: h.color === "#2563EB" ? "#93c5fd" : h.color === "#10B981" ? "#6ee7b7" : "#67e8f9",
                }}
                data-testid={`about-tag-${h.label.replace(/\s+/g, "-").toLowerCase()}`}
              >
                {h.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
