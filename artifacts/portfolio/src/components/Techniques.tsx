import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import { useWebGL } from "../hooks/useWebGL";

/* ── Mini Three.js scenes ── */
function SpinningGeo({ geo }: { geo: "icosahedron" | "torus" | "box" }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.6;
    ref.current.rotation.y = s.clock.elapsedTime * 0.9;
  });
  return (
    <mesh ref={ref}>
      {geo === "icosahedron" && <icosahedronGeometry args={[1.1, 0]} />}
      {geo === "torus" && <torusGeometry args={[0.9, 0.35, 16, 40]} />}
      {geo === "box" && <boxGeometry args={[1.3, 1.3, 1.3]} />}
      <meshStandardMaterial color="#7C3AED" metalness={0.9} roughness={0.1} emissive="#3b0764" emissiveIntensity={0.4} />
    </mesh>
  );
}

function WireGeo() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.4;
    ref.current.rotation.y = s.clock.elapsedTime * 0.7;
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1.2, 0]} />
      <meshBasicMaterial color="#06B6D4" wireframe />
    </mesh>
  );
}

function ParticleCloud() {
  const ref = useRef<THREE.Points>(null);
  const positions = useRef(
    Float32Array.from({ length: 600 }, () => (Math.random() - 0.5) * 4)
  );
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.15;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#a78bfa" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

/* ── CSS fallback demos ── */
function WaveDemo() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-end justify-center gap-px pb-2">
      {Array.from({ length: 28 }, (_, i) => (
        <div
          key={i}
          style={{
            width: 4,
            borderRadius: 2,
            background: `linear-gradient(180deg, #06B6D4, #7C3AED)`,
            animation: `wave-bar 1.4s ease-in-out ${i * 0.055}s infinite alternate`,
            height: `${20 + Math.sin(i * 0.4) * 15}px`,
          }}
        />
      ))}
    </div>
  );
}

function InstancedDemo() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(6,1fr)" }}>
        {Array.from({ length: 36 }, (_, i) => (
          <div
            key={i}
            style={{
              width: 8, height: 8,
              background: i % 3 === 0 ? "#7C3AED" : i % 3 === 1 ? "#06B6D4" : "#a78bfa",
              borderRadius: 2,
              opacity: 0.4 + (i % 5) * 0.12,
              animation: `cube-pulse ${0.8 + (i % 7) * 0.2}s ease-in-out ${i * 0.04}s infinite alternate`,
              transform: `scale(${0.6 + (i % 4) * 0.15})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function BloomDemo() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div
        style={{
          width: 60, height: 60, borderRadius: "50%",
          background: "radial-gradient(circle, #a855f7, #7C3AED 50%, transparent 80%)",
          boxShadow: "0 0 20px 8px rgba(124,58,237,0.6), 0 0 60px 20px rgba(124,58,237,0.25), 0 0 100px 40px rgba(6,182,212,0.1)",
          animation: "orb-float 3s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 50% 60%, rgba(124,58,237,0.12), transparent 65%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}

function PhysicsDemo() {
  const balls = [
    { size: 14, color: "#7C3AED", delay: 0, x: 30 },
    { size: 10, color: "#06B6D4", delay: 0.3, x: 55 },
    { size: 18, color: "#a78bfa", delay: 0.6, x: 75 },
    { size: 8, color: "#67e8f9", delay: 0.15, x: 20 },
    { size: 12, color: "#7C3AED", delay: 0.45, x: 60 },
  ];
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8 }}>
      {balls.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: b.size, height: b.size,
            borderRadius: "50%",
            background: b.color,
            left: `${b.x}%`,
            bottom: 4,
            boxShadow: `0 0 8px ${b.color}`,
            animation: `bounce-ball ${0.8 + i * 0.15}s cubic-bezier(0.215, 0.61, 0.355, 1) ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function XRDemo() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{ borderRadius: 8 }}>
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(6,182,212,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.08) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          animation: "grid-pan 4s linear infinite",
        }}
      />
      <div style={{ position: "absolute", inset: "25%", border: "1px solid rgba(6,182,212,0.4)", borderRadius: 8 }} />
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#06B6D4", boxShadow: "0 0 12px #06B6D4", animation: "orb-float 2s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: 8, left: 8, right: 8, height: 1, background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)" }} />
    </div>
  );
}

const techniques = [
  {
    title: "ShaderMaterial",
    api: "THREE.ShaderMaterial",
    desc: "Custom vertex & fragment shaders running on the GPU. Infinite visual possibilities.",
    color: "#7C3AED",
    colorAlt: "#a78bfa",
    grade: 5,
    cssFallback: <WaveDemo />,
    r3fScene: null as null | "particles",
  },
  {
    title: "InstancedMesh",
    api: "THREE.InstancedMesh",
    desc: "Render 100,000 objects in a single draw call using matrix transforms on the GPU.",
    color: "#06B6D4",
    colorAlt: "#67e8f9",
    grade: 4,
    cssFallback: <InstancedDemo />,
    r3fScene: null,
  },
  {
    title: "Particle System",
    api: "THREE.Points",
    desc: "BufferGeometry-backed point clouds with custom attributes and animated shaders.",
    color: "#7C3AED",
    colorAlt: "#a78bfa",
    grade: 3,
    cssFallback: null,
    r3fScene: "particles" as const,
  },
  {
    title: "Post-Processing",
    api: "EffectComposer",
    desc: "Bloom, chromatic aberration, SSAO, and custom GLSL passes composited per frame.",
    color: "#06B6D4",
    colorAlt: "#67e8f9",
    grade: 5,
    cssFallback: <BloomDemo />,
    r3fScene: null,
  },
  {
    title: "Physics Sim",
    api: "Rapier + Three.js",
    desc: "WASM-powered rigid body physics with collision detection synced to render loop.",
    color: "#7C3AED",
    colorAlt: "#a78bfa",
    grade: 4,
    cssFallback: <PhysicsDemo />,
    r3fScene: null,
  },
  {
    title: "WebXR / AR",
    api: "WebXR Device API",
    desc: "AR passthrough and VR immersion using the browser-native XR session API.",
    color: "#06B6D4",
    colorAlt: "#67e8f9",
    grade: 5,
    cssFallback: <XRDemo />,
    r3fScene: null,
  },
];

function TechCard({ t, index }: { t: typeof techniques[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const hasWebGL = useWebGL();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Demo area */}
      <div
        className="relative h-36 overflow-hidden"
        style={{ background: "rgba(0,0,0,0.4)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        {hasWebGL && t.r3fScene === "particles" ? (
          <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
            <ambientLight intensity={0.4} />
            <Suspense fallback={null}>
              <ParticleCloud />
            </Suspense>
          </Canvas>
        ) : t.cssFallback ? (
          <div className="w-full h-full p-3">{t.cssFallback}</div>
        ) : (
          <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[3, 3, 3]} intensity={2} color={t.color} />
            <Suspense fallback={null}>
              {index === 0 && <WireGeo />}
              {index === 5 && <SpinningGeo geo="icosahedron" />}
            </Suspense>
          </Canvas>
        )}
        <div
          className="absolute top-2 right-2 flex gap-0.5"
          title={`Complexity: ${t.grade}/5`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: 1, background: i < t.grade ? t.color : "rgba(255,255,255,0.08)" }} />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-xs font-mono mb-1" style={{ color: t.colorAlt }}>
            {t.api}
          </p>
          <h3 className="text-base font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#d0d0e0" }}>
            {t.title}
          </h3>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "#454555" }}>
          {t.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Techniques() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="techniques" className="py-32 px-6 relative">
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
            Three.js Capabilities
          </span>
          <h2 className="mt-3 font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Under the <span className="gradient-text">Hood</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed" style={{ color: "#404052" }}>
            Every project draws from this toolkit. Filled squares show technique complexity — five means cutting-edge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {techniques.map((t, i) => (
            <TechCard key={t.title} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
