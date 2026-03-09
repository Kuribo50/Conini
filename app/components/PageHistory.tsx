"use client";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,.5)",
        backdropFilter: "blur(8px)",
      }}
    >
      <span
        style={{
          fontSize: "2rem",
          animation: "heartBeat 1.2s ease-in-out infinite",
        }}
      >
        🗺️
      </span>
    </div>
  ),
});

export default function PageHistory() {
  return (
    <section
      className="page"
      id="p2"
      style={{
        background:
          "linear-gradient(160deg,#f0fdf7 0%,#fef9ff 50%,#fffbf0 100%)",
        padding: "2.5rem 2rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* blobs */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle,#d4f5e9 0%,transparent 70%)",
          top: "-80px",
          right: "-60px",
          opacity: 0.5,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle,#fde89a 0%,transparent 70%)",
          bottom: "-60px",
          left: "5%",
          opacity: 0.4,
          zIndex: 0,
        }}
      />

      {/* decoraciones */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "5%",
          fontSize: "1.6rem",
          opacity: 0.4,
          animation: "leafSway 5s ease-in-out infinite",
          zIndex: 2,
        }}
      >
        🍃
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "3%",
          fontSize: "1.4rem",
          opacity: 0.35,
          animation: "floatY 6s 2s ease-in-out infinite",
          zIndex: 2,
        }}
      >
        🐾
      </div>

      <div
        style={{
          maxWidth: "720px",
          width: "100%",
          position: "relative",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          height: "min(calc(100vh - 100px), 820px)",
        }}
      >
        {/* header */}
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <p className="tag" style={{ color: "#7abda0" }}>
            ✦ Nuestros lugares
          </p>
          <h2
            className="display"
            style={{
              fontSize: "clamp(1.8rem,5vw,3.2rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              background:
                "linear-gradient(135deg,#5cb8a0 0%,#9b72cf 60%,#d17aaa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Donde hemos estado
            <br />
            <em>juntos</em>
          </h2>
        </div>

        {/* leyenda */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".4rem",
              fontSize: ".8rem",
              color: "#5a4060",
              background: "rgba(255,255,255,.7)",
              padding: ".3rem .9rem",
              borderRadius: "99px",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#d17aaa,#9b72cf)",
                display: "inline-block",
              }}
            />
            Visitados
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".4rem",
              fontSize: ".8rem",
              color: "#5a4060",
              background: "rgba(255,255,255,.7)",
              padding: ".3rem .9rem",
              borderRadius: "99px",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#c4b0e0",
                display: "inline-block",
              }}
            />
            Próximamente
          </span>
        </div>

        {/* mapa */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <MapView />
        </div>

        {/* ciudades pills */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {[
            { name: "Quillón", emoji: "🏡", done: true },
            { name: "Concepción", emoji: "🌆", done: true },
            { name: "Tomé", emoji: "🌊", done: true },
            { name: "Niebla", emoji: "🌫️", done: true },
            { name: "Valdivia", emoji: "🦭", done: true },
            { name: "Santiago", emoji: "✨", done: false },
          ].map((p) => (
            <span
              key={p.name}
              style={{
                padding: ".35rem 1rem",
                borderRadius: "99px",
                fontSize: ".8rem",
                fontWeight: p.done ? 600 : 400,
                background: p.done
                  ? "linear-gradient(135deg,rgba(212,245,233,.9),rgba(181,234,215,.9))"
                  : "linear-gradient(135deg,rgba(237,231,246,.9),rgba(209,196,233,.9))",
                color: p.done ? "#2e7d5a" : "#7e57c2",
                backdropFilter: "blur(8px)",
                border: p.done
                  ? "1px solid rgba(92,184,160,.3)"
                  : "1px solid rgba(155,114,207,.3)",
              }}
            >
              {p.emoji} {p.name} {!p.done && "· Mayo 2026"}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
