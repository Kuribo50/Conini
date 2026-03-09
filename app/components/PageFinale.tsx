"use client";

const COLORS = [
  "#ffb3c6",
  "#ffd6e0",
  "#b5ead7",
  "#d4f5e9",
  "#fde89a",
  "#fff4c2",
  "#e2d4f0",
  "#ffd8b1",
  "#c9b8ff",
  "#fff",
];

function launchConfetti() {
  for (let i = 0; i < 200; i++) {
    setTimeout(() => {
      const p = document.createElement("div");
      const size = 7 + Math.random() * 10;
      p.style.cssText = `
        position:fixed; top:-20px;
        left:${Math.random() * 100}vw;
        width:${size}px; height:${size}px;
        background:${COLORS[Math.floor(Math.random() * COLORS.length)]};
        border-radius:${Math.random() > 0.4 ? "50%" : "3px"};
        pointer-events:none; z-index:9999;
        animation:confettiFall ${1.8 + Math.random() * 2.5}s ease-in forwards;
        animation-delay:${Math.random() * 0.7}s;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 6000);
    }, i * 16);
  }
}

export default function PageFinale() {
  return (
    <section
      className="page"
      id="p6"
      style={{
        background:
          "linear-gradient(135deg,#fff0f5 0%,#f0fdf7 30%,#fffbee 60%,#f5f0ff 100%)",
        backgroundSize: "400% 400%",
        animation: "shimmerBg 10s ease infinite",
        textAlign: "center",
        padding: "4rem 2rem",
      }}
    >
      {/* big blobs */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle,#ffd6e0 0%,transparent 65%)",
          top: "-180px",
          left: "-180px",
          opacity: 0.5,
          animation: "floatY 10s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle,#d4f5e9 0%,transparent 65%)",
          bottom: "-150px",
          right: "-150px",
          opacity: 0.4,
          animation: "floatY 8s 2s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle,#fde89a 0%,transparent 65%)",
          top: "35%",
          right: "5%",
          opacity: 0.35,
          animation: "floatY 7s 1s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle,#e2d4f0 0%,transparent 65%)",
          bottom: "25%",
          left: "8%",
          opacity: 0.4,
          animation: "floatY 9s 3s ease-in-out infinite",
        }}
      />

      {/* Decoraciones AC / gato */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "5%",
          fontSize: "2rem",
          opacity: 0.45,
          animation: "leafSway 5s ease-in-out infinite",
          zIndex: 2,
        }}
      >
        🍃
      </div>
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "9%",
          fontSize: "1.3rem",
          opacity: 0.35,
          animation: "leafSway 3.5s 1s ease-in-out infinite",
          zIndex: 2,
        }}
      >
        🐾
      </div>
      <div
        style={{
          position: "absolute",
          top: "6%",
          right: "8%",
          fontSize: "1.8rem",
          opacity: 0.4,
          animation: "bellRing 4s 2s ease-in-out infinite",
          transformOrigin: "top center",
          zIndex: 2,
        }}
      >
        🔔
      </div>
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: "5%",
          fontSize: "1.4rem",
          opacity: 0.38,
          animation: "floatY 6s 1.5s ease-in-out infinite",
          zIndex: 2,
        }}
      >
        🌸
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: "3%",
          fontSize: "1.6rem",
          opacity: 0.4,
          animation: "floatY 5s 0.5s ease-in-out infinite",
          zIndex: 2,
        }}
      >
        🐱
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "28%",
          right: "6%",
          fontSize: "1.2rem",
          opacity: 0.3,
          animation: "leafSway 6s 2.5s ease-in-out infinite",
          zIndex: 2,
        }}
      >
        🍀
      </div>

      <div style={{ position: "relative", zIndex: 5 }}>
        {/* Top badge */}
        <div
          className="reveal"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "1rem",
            padding: ".5rem 1.5rem",
            borderRadius: "999px",
            background: "rgba(255,255,255,.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,179,198,.4)",
            marginBottom: "2rem",
            fontSize: ".72rem",
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "#b07aaa",
          }}
        >
          🎂 &nbsp; 23 Marzo · 23 años &nbsp; 🎂
        </div>

        {/* Main heading */}
        <h2
          className="display reveal"
          style={{
            fontSize: "clamp(3.5rem,12vw,9rem)",
            fontWeight: 600,
            lineHeight: 0.95,
            background:
              "linear-gradient(135deg,#d17aaa 0%,#9b72cf 35%,#5cb8a0 65%,#c4a23a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            transitionDelay: ".1s",
          }}
        >
          Feliz
          <br />
          cumpleaños
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>Constanza</em>
        </h2>

        {/* Sub */}
        <p
          className="reveal"
          style={{
            fontSize: "clamp(.95rem,2.5vw,1.15rem)",
            color: "#6b4778",
            maxWidth: "400px",
            margin: "1.5rem auto 3rem",
            lineHeight: 1.75,
            transitionDelay: ".2s",
          }}
        >
          Que este año sea tan especial como tú lo eres para mí.
          <br />
          Te amo más de lo que las palabras alcanzan. ♡
        </p>

        {/* Button */}
        <button
          className="reveal"
          onClick={() => {
            launchConfetti();
            setTimeout(() => window.open("/Ticket.pdf", "_blank"), 600);
          }}
          style={{
            background: "linear-gradient(135deg,#ffb3c6,#9b72cf,#5cb8a0)",
            border: "none",
            color: "#fff",
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.15rem",
            letterSpacing: ".08em",
            padding: "1.1rem 3.2rem",
            borderRadius: "999px",
            cursor: "pointer",
            transitionDelay: ".3s",
            boxShadow: "0 12px 40px rgba(155,114,207,.3)",
            transition: "transform .25s ease, box-shadow .25s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "scale(1.07) translateY(-3px)";
            el.style.boxShadow = "0 20px 60px rgba(155,114,207,.4)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "scale(1) translateY(0)";
            el.style.boxShadow = "0 12px 40px rgba(155,114,207,.3)";
          }}
        >
          ¡Celebrar! 🎉
        </button>

        {/* Hearts + AC items */}
        <div
          className="reveal"
          style={{
            marginTop: "3.5rem",
            display: "flex",
            gap: "1.6rem",
            justifyContent: "center",
            fontSize: "2rem",
            transitionDelay: ".45s",
          }}
        >
          {["🌸", "💕", "🐱", "✨", "🎀", "🍃", "🔔"].map((e, i) => (
            <span
              key={i}
              style={{
                animation: `heartBeat ${1.6 + i * 0.2}s ${i * 0.22}s ease-in-out infinite`,
                display: "inline-block",
                filter: "drop-shadow(0 2px 6px rgba(255,179,198,.4))",
              }}
            >
              {e}
            </span>
          ))}
        </div>

        {/* Slogan AC-style */}
        <p
          className="reveal"
          style={{
            marginTop: "2.5rem",
            fontSize: ".72rem",
            letterSpacing: ".25em",
            textTransform: "uppercase",
            color: "rgba(155,114,207,.55)",
            fontFamily: "Nunito, DM Sans, sans-serif",
            fontWeight: 700,
            transitionDelay: ".55s",
          }}
        >
          🐾 &nbsp; Hecho con amor &nbsp; 🐾
        </p>
      </div>

      {/* Pasto AC en la parte inferior */}
      <div className="ac-grass" />
    </section>
  );
}
