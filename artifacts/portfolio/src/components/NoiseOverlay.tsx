export default function NoiseOverlay() {
  return (
    <>
      <svg style={{ position: "fixed", width: 0, height: 0 }}>
        <defs>
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9990,
          pointerEvents: "none",
          opacity: 0.028,
          filter: "url(#noise)",
          background: "white",
          animation: "grain-shift 0.5s steps(1) infinite",
        }}
      />
    </>
  );
}
