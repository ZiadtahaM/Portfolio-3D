import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWebGL } from "../hooks/useWebGL";

function Particles() {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      const t = Math.random();
      if (t < 0.5) {
        colors[i * 3] = 0.49; colors[i * 3 + 1] = 0.23; colors[i * 3 + 2] = 0.93;
      } else {
        colors[i * 3] = 0.02; colors[i * 3 + 1] = 0.71; colors[i * 3 + 2] = 0.83;
      }
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function FloatingRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });
  return (
    <mesh ref={ref} position={[8, 2, -5]}>
      <torusGeometry args={[2, 0.05, 16, 80]} />
      <meshBasicMaterial color="#7C3AED" transparent opacity={0.3} />
    </mesh>
  );
}

function FloatingRing2() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.12;
    ref.current.rotation.x = state.clock.elapsedTime * 0.08;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.4 + 1) * 0.4;
  });
  return (
    <mesh ref={ref} position={[-8, -1, -6]}>
      <torusGeometry args={[1.5, 0.04, 16, 60]} />
      <meshBasicMaterial color="#06B6D4" transparent opacity={0.25} />
    </mesh>
  );
}

function CSSParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 220;
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.2 + 0.4,
      color: Math.random() < 0.5 ? "rgba(124,58,237," : "rgba(6,182,212,",
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `${d.color}${d.alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

export default function ParticleBackground() {
  const hasWebGL = useWebGL();

  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
        <CSSParticleBackground />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.2} />
        <Particles />
        <FloatingRing />
        <FloatingRing2 />
      </Canvas>
    </div>
  );
}
