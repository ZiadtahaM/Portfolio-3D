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
      <meshStandardMaterial color="#7C3AED" metalness={0.9} roughness={0.1} emissive="#1a0040" emissiveIntensity={0.5} wireframe={false} />
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
          background: "linear-gradient(135deg, #7C3AED 0%, #4c1d95 60%, #1a0040 100%)",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          boxShadow: "0 0 60px 20px rgba(124,58,237,0.3), 0 0 120px 40px rgba(124,58,237,0.1)",
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
          background: "radial-gradient(circle at center, rgba(124,58,237,0.12) 0%, transparent 70%)",
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
  { label: "WebGL & Three.js", color: "#7C3AED" },
  { label: "React & TypeScript", color: "#06B6D4" },
  { label: "GLSL Shaders", color: "#7C3AED" },
  { label: "3D Animation", color: "#06B6D4" },
  { label: "WebXR / VR", color: "#7C3AED" },
  { label: "Creative Direction", color: "#06B6D4" },
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
            style={{ background: "radial-gradient(circle at center, rgba(124, 58, 237, 0.12) 0%, transparent 70%)", filter: "blur(30px)" }}
          />
          {hasWebGL ? (
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[5, 5, 5]} intensity={2} color="#7C3AED" />
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
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#7C3AED" }}>01 / About</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold leading-tight tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }} data-testid="about-heading">
            Crafting the <span className="gradient-text">impossible</span> in the browser
          </motion.h2>

          <motion.p variants={itemVariants} className="text-base leading-relaxed" style={{ color: "#707080" }} data-testid="about-bio">
            I'm Alex Chen — a creative developer and 3D artist based in San Francisco.
            My work lives at the boundary of what browsers can render and what humans
            can imagine. I started writing WebGL shaders at 3am and never looked back.
          </motion.p>

          <motion.p variants={itemVariants} className="text-base leading-relaxed" style={{ color: "#606070" }}>
            Today I partner with studios and startups to build immersive digital experiences
            — from real-time 3D product configurators to full WebXR environments. Every
            project starts with the question: what should feel impossible but shouldn't?
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-2">
            {highlights.map((h) => (
              <span
                key={h.label}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: `${h.color}18`,
                  border: `1px solid ${h.color}40`,
                  color: h.color === "#7C3AED" ? "#a78bfa" : "#67e8f9",
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
