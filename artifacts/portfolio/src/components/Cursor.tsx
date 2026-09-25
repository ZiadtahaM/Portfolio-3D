import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      setHovering(true);
      const lbl = el.getAttribute("data-cursor-label") || "";
      setLabel(lbl);
    };

    const onLeave = () => {
      setHovering(false);
      setLabel("");
    };

    const attachHovers = () => {
      document
        .querySelectorAll("a, button, [data-cursor]")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };

    const loop = () => {
      const r = ring.current;
      r.x += (pos.current.x - r.x) * 0.11;
      r.y += (pos.current.y - r.y) * 0.11;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        const size = hovering ? 60 : 36;
        const offset = size / 2;
        ringRef.current.style.transform = `translate(${r.x - offset}px, ${r.y - offset}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${pos.current.x + 16}px, ${pos.current.y - 10}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    attachHovers();
    raf.current = requestAnimationFrame(loop);

    const observer = new MutationObserver(attachHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, [visible, hovering]);

  if (!visible) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: "50%",
          background: hovering ? "#06B6D4" : "#7C3AED",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "background 0.2s ease",
          mixBlendMode: "normal",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          borderRadius: "50%",
          border: hovering
            ? "1.5px solid rgba(6,182,212,0.8)"
            : "1.5px solid rgba(124,58,237,0.5)",
          background: hovering ? "rgba(6,182,212,0.05)" : "transparent",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform, width, height",
          transition: "border-color 0.3s ease, background 0.3s ease, width 0.25s ease, height 0.25s ease",
        }}
      />
      {label && (
        <div
          ref={labelRef}
          style={{
            position: "fixed",
            top: 0, left: 0,
            pointerEvents: "none",
            zIndex: 9999,
            fontSize: 10,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#06B6D4",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {label}
        </div>
      )}
    </>
  );
}
