"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const BLOBS = [
  {
    w: 520,
    h: 520,
    color: "#ffd6e0",
    top: "-150px",
    left: "-150px",
    delay: 0,
    dur: 8,
  },
  {
    w: 400,
    h: 400,
    color: "#d4f5e9",
    bottom: "-100px",
    right: "-80px",
    delay: 2,
    dur: 6,
  },
  {
    w: 300,
    h: 300,
    color: "#fff4c2",
    top: "30%",
    right: "10%",
    delay: 1,
    dur: 7,
  },
  {
    w: 200,
    h: 200,
    color: "#e2d4f0",
    bottom: "20%",
    left: "8%",
    delay: 3,
    dur: 9,
  },
  {
    w: 260,
    h: 260,
    color: "#ffd8b1",
    top: "55%",
    left: "-60px",
    delay: 1.5,
    dur: 7.5,
  },
];

const DECO = [
  {
    emoji: "🍃",
    top: "4%",
    left: "3%",
    size: "2.2rem",
    op: 0.5,
    delay: 0,
    dur: 5,
  },
  {
    emoji: "🌿",
    top: "8%",
    left: "6.5%",
    size: "1.4rem",
    op: 0.35,
    delay: 1,
    dur: 5,
  },
  {
    emoji: "🍀",
    top: "5%",
    right: "4%",
    size: "2rem",
    op: 0.45,
    delay: 0.5,
    dur: 5,
  },
  {
    emoji: "🌸",
    bottom: "12%",
    left: "4%",
    size: "1.8rem",
    op: 0.4,
    delay: 2,
    dur: 5,
  },
  {
    emoji: "🌺",
    bottom: "8%",
    right: "6%",
    size: "1.6rem",
    op: 0.4,
    delay: 1.5,
    dur: 5,
  },
  {
    emoji: "🐾",
    top: "18%",
    left: "12%",
    size: "1rem",
    op: 0.28,
    delay: 2,
    dur: 5,
  },
  {
    emoji: "🐾",
    bottom: "25%",
    right: "14%",
    size: "1.1rem",
    op: 0.25,
    delay: 1,
    dur: 5,
  },
  {
    emoji: "🔔",
    top: "6%",
    right: "12%",
    size: "1.8rem",
    op: 0.55,
    delay: 3,
    dur: 5,
  },
  {
    emoji: "🌷",
    top: "35%",
    right: "3%",
    size: "1.3rem",
    op: 0.3,
    delay: 2.5,
    dur: 5,
  },
  {
    emoji: "🍄",
    bottom: "30%",
    left: "7%",
    size: "1.2rem",
    op: 0.3,
    delay: 1.8,
    dur: 5,
  },
];

/* Individual floating deco item */
function DecoItem({ item }: { item: (typeof DECO)[0] }) {
  const y = useMotionValue(0);
  const rot = useTransform(y, [-8, 8], [-5, 5]);

  useEffect(() => {
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        await animate(y, -8, {
          duration: item.dur ?? 5,
          ease: "easeInOut",
          delay: item.delay,
        });
        await animate(y, 8, { duration: item.dur ?? 5, ease: "easeInOut" });
      }
    };
    loop();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style: React.CSSProperties = {
    position: "absolute",
    fontSize: item.size,
    opacity: item.op,
    zIndex: 2,
    userSelect: "none",
    pointerEvents: "none",
    ...(item.top && { top: item.top }),
    ...(item.bottom && { bottom: item.bottom }),
    ...(item.left && { left: item.left }),
    ...(item.right && { right: item.right }),
  };

  return (
    <motion.div style={{ ...style, y, rotate: rot }}>{item.emoji}</motion.div>
  );
}

/* Cat ears SVG-like triangles */
function CatEars() {
  return (
    <>
      {[{ left: "20px" }, { right: "20px" }].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "-15px",
            width: 0,
            height: 0,
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            borderBottom: "24px solid rgba(255,179,198,.7)",
            filter: "drop-shadow(0 2px 4px rgba(255,179,198,.4))",
            ...pos,
          }}
        />
      ))}
      {/* Inner ear */}
      {[{ left: "23px" }, { right: "23px" }].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "-8px",
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "16px solid rgba(255,214,224,.8)",
            ...pos,
          }}
        />
      ))}
    </>
  );
}

export default function PageIntro() {
  /* Idle float for center ring */
  const ringY = useMotionValue(0);
  const ringRot = useTransform(ringY, [-12, 12], [-3, 3]);

  useEffect(() => {
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        await animate(ringY, -12, { duration: 2.8, ease: "easeInOut" });
        await animate(ringY, 12, { duration: 2.8, ease: "easeInOut" });
      }
    };
    loop();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Nunito:wght@400;600;700;800;900&display=swap');

        @keyframes shimmerBg {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes lineGrow {
          0%,100% { transform: scaleY(0); opacity: 0; transform-origin: top; }
          50%      { transform: scaleY(1); opacity: 1; transform-origin: top; }
        }
        @keyframes introRainbow {
          to { filter: hue-rotate(360deg); }
        }
        @keyframes bellRing {
          0%,90%,100% { transform: rotate(0deg); }
          92%          { transform: rotate(-18deg); }
          96%          { transform: rotate(14deg); }
          98%          { transform: rotate(-8deg); }
        }
        @keyframes grassWave {
          0%,100% { transform: skewX(0deg) scaleY(1); }
          50%      { transform: skewX(3deg) scaleY(1.04); }
        }
        @keyframes glowRing {
          0%,100% { box-shadow: 0 0 0 16px rgba(255,214,224,.15), 0 0 0 32px rgba(255,214,224,.07), 0 0 24px rgba(255,179,198,.3); }
          50%      { box-shadow: 0 0 0 22px rgba(201,184,255,.18), 0 0 0 44px rgba(201,184,255,.07), 0 0 40px rgba(201,184,255,.35); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .pi-fadeup { animation: fadeUp .85s both; }
        .pi-font-display { font-family: 'Cormorant Garamond', serif; }
        .pi-font-ui      { font-family: 'Nunito', sans-serif; }
      `}</style>

      <section
        id="p1"
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg,#fff0f5 0%,#fce8f5 25%,#eef8ff 55%,#f0fdf4 100%)",
          backgroundSize: "400% 400%",
          animation: "shimmerBg 14s ease infinite",
        }}
      >
        {/* ── BLOBS ── */}
        {BLOBS.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: b.delay === 0 ? 0.6 : b.delay < 2 ? 0.5 : 0.45,
              scale: 1,
            }}
            transition={{ duration: 1.8, delay: i * 0.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: b.w,
              height: b.h,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
              pointerEvents: "none",
              ...(b.top && { top: b.top }),
              ...(b.bottom && { bottom: b.bottom }),
              ...(b.left && { left: b.left }),
              ...(b.right && { right: b.right }),
            }}
            animate-y={[0, -14, 0]}
          />
        ))}

        {/* ── DECO ITEMS ── */}
        {DECO.map((d, i) => (
          <DecoItem key={i} item={d} />
        ))}

        {/* ── BELL (special wiggle animation) ── */}
        <div
          style={{
            position: "absolute",
            top: "6%",
            right: "12%",
            fontSize: "1.8rem",
            opacity: 0.55,
            zIndex: 2,
            transformOrigin: "top center",
            animation: "bellRing 5s 2s ease-in-out infinite",
          }}
        >
          🔔
        </div>

        {/* ── CENTER CONTENT ── */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            textAlign: "center",
            padding: "2rem",
          }}
        >
          {/* Cat ring with rainbow border */}
          <motion.div
            style={{
              y: ringY,
              rotate: ringRot,
              position: "relative",
              width: 148,
              height: 148,
              borderRadius: "50%",
              margin: "0 auto",
              marginBottom: "2.5rem",
              animation: "glowRing 4s ease-in-out infinite",
            }}
          >
            {/* Rainbow spinning ring */}
            <motion.div
              style={{
                position: "absolute",
                inset: -3,
                borderRadius: "50%",
                background:
                  "conic-gradient(#ffb3c6,#fde89a,#b5ead7,#c9b8ff,#ffd8b1,#ffb3c6)",
                opacity: 0.5,
                animation: "introRainbow 6s linear infinite",
              }}
            />
            {/* White fill */}
            <div
              style={{
                position: "absolute",
                inset: 2,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#fff8fb,#faf5ff)",
              }}
            />
            {/* Cat face */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3.8rem",
                zIndex: 1,
              }}
            >
              🐱
            </div>
            {/* Ears */}
            <CatEars />
          </motion.div>

          {/* Tag */}
          <motion.p
            className="pi-font-ui pi-fadeup"
            style={{
              animationDelay: ".2s",
              fontSize: ".68rem",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "#b07aaa",
              marginBottom: ".7rem",
            }}
          >
            ✦ &nbsp; FELIZ CUMPLEAÑOS BELLA HEMRMOSA MUJER &nbsp; ✦
          </motion.p>

          {/* Main name */}
          <motion.h1
            className="pi-font-display pi-fadeup"
            style={{
              animationDelay: ".4s",
              fontSize: "clamp(4.5rem,16vw,12rem)",
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: "-.02em",
              background:
                "linear-gradient(135deg,#d17aaa 0%,#a06ec9 50%,#5cb8a0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Constanza
          </motion.h1>

          {/* Italic name */}
          <motion.h2
            className="pi-font-display pi-fadeup"
            style={{
              animationDelay: ".6s",
              fontSize: "clamp(2.5rem,9vw,7rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "transparent",
              WebkitTextStroke: "1.5px #c98bc0",
              marginTop: ".2rem",
            }}
          >
            Monita
          </motion.h2>

          {/* Years badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.85,
              type: "spring",
              stiffness: 380,
              damping: 18,
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".8rem",
              marginTop: "2rem",
              padding: ".6rem 2rem",
              borderRadius: "999px",
              background: "rgba(255,255,255,.65)",
              backdropFilter: "blur(14px)",
              border: "1.5px solid rgba(255,179,198,.45)",
              boxShadow:
                "0 8px 32px rgba(255,179,198,.22), inset 0 1px 0 rgba(255,255,255,.8)",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>🎂</span>
            <span
              className="pi-font-ui"
              style={{
                fontSize: ".7rem",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "#b07aaa",
                fontWeight: 700,
              }}
            >
              23 años tiene la criatura
            </span>
            <span style={{ fontSize: "1.1rem" }}>🎂</span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.8 }}
            className="pi-font-ui"
            style={{
              marginTop: "1.1rem",
              fontSize: ".88rem",
              color: "rgba(107,71,120,.5)",
              letterSpacing: ".15em",
            }}
          >
            Con todo mi amor y corazon ♡
          </motion.p>
        </div>

        {/* ── SCROLL HINT ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: ".5rem",
            zIndex: 5,
          }}
        >
          <span
            className="pi-font-ui"
            style={{
              fontSize: ".58rem",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "rgba(176,122,170,.5)",
              fontWeight: 700,
            }}
          >
            desliza ↓
          </span>
          <div
            style={{
              width: "1px",
              height: "44px",
              background: "linear-gradient(#ffb3c6, transparent)",
              animation: "lineGrow 2.2s 2s infinite",
            }}
          />
        </motion.div>

        {/* ── GRASS ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60px",
            background:
              "linear-gradient(to top, rgba(181,234,215,.35), transparent)",
            animation: "grassWave 5s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "28px",
            background: "rgba(181,234,215,.2)",
            borderTopLeftRadius: "60% 40px",
            borderTopRightRadius: "60% 40px",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
      </section>
    </>
  );
}
