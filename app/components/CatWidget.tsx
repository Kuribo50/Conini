"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const STICKERS = [
  "🐾",
  "🐱",
  "💕",
  "🌸",
  "🍃",
  "🔔",
  "⭐",
  "🌿",
  "💖",
  "🍀",
  "🌻",
  "🍄",
  "🎀",
  "✨",
  "🌺",
  "🐟",
  "🎵",
  "🍎",
  "🌷",
  "🦋",
  "🫧",
  "🍰",
  "🎐",
  "🌈",
  "💫",
  "🪷",
  "🍓",
  "🫶",
  "🐇",
  "🌙",
];

const MOODS = [
  { emoji: "🐱", bubble: "ฅ^•ﻌ•^ฅ", color: "#ffb3c6" },
  { emoji: "😸", bubble: "Mrrrow~ ♡", color: "#b5ead7" },
  { emoji: "😻", bubble: "¡Nyaa~! 🌸", color: "#fde89a" },
  { emoji: "🐈", bubble: "Purr purr...", color: "#c9b8ff" },
  { emoji: "😼", bubble: "Hehe~ 🍃", color: "#ffd8b1" },
  { emoji: "🙀", bubble: "¡WOW! ✨", color: "#ffb3c6" },
  { emoji: "😹", bubble: "jajaja~ 💕", color: "#b5ead7" },
];

const PARTICLE_SHAPES = ["✦", "✧", "⋆", "•", "❋", "✿", "❀", "⊹", "◦"];
const PASTEL = [
  "#ffb3c6",
  "#ffd6e0",
  "#b5ead7",
  "#d4f5e9",
  "#fde89a",
  "#fff4c2",
  "#c9b8ff",
  "#e2d4f0",
  "#ffd8b1",
  "#ffe5d9",
];

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface Sticker {
  id: number;
  x: number;
  y: number;
  emoji: string;
  rot: number;
  scale: number;
  color: string;
}
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  shape: string;
  color: string;
  size: number;
}
interface TrailDot {
  id: number;
  x: number;
  y: number;
  color: string;
  age: number;
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function CatWidget() {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [mood, setMood] = useState(0);
  const [isHappy, setIsHappy] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [sparkleOn, setSparkleOn] = useState(false);

  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trailRef = useRef<number>(0);

  // Spring physics for the cat button
  const scaleS = useSpring(1, { stiffness: 380, damping: 14 });
  const rotS = useSpring(0, { stiffness: 220, damping: 11 });

  // Idle float
  const floatY = useMotionValue(0);
  const floatRot = useTransform(floatY, [-12, 12], [-4, 4]);

  useEffect(() => {
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        await animate(floatY, -12, { duration: 2.4, ease: "easeInOut" });
        await animate(floatY, 12, { duration: 2.4, ease: "easeInOut" });
      }
    };
    loop();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mood timer
  useEffect(() => {
    const iv = setInterval(() => {
      if (!isHappy) setMood(Math.floor(Math.random() * MOODS.length));
    }, 6500);
    return () => clearInterval(iv);
  }, [isHappy]);

  // Cursor trail
  useEffect(() => {
    let frame: number;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setTrail((prev) => {
          const dot: TrailDot = {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            color: PASTEL[Math.floor(Math.random() * PASTEL.length)],
            age: 0,
          };
          return [...prev.slice(-20), dot];
        });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Fade trail
  useEffect(() => {
    clearTimeout(trailRef.current);
    trailRef.current = window.setTimeout(() => setTrail([]), 600);
  }, [trail]);

  const spawnParticles = useCallback((cx: number, cy: number) => {
    const ps: Particle[] = Array.from({ length: 20 }, (_, i) => {
      const angle = (i / 20) * Math.PI * 2 + Math.random() * 0.4;
      const speed = 55 + Math.random() * 130;
      return {
        id: Date.now() + i + Math.random(),
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        shape: PARTICLE_SHAPES[i % PARTICLE_SHAPES.length],
        color: PASTEL[Math.floor(Math.random() * PASTEL.length)],
        size: 10 + Math.random() * 14,
      };
    });
    setParticles((p) => [...p.slice(-80), ...ps]);
    setTimeout(
      () =>
        setParticles((p) => p.filter((x) => !ps.find((n) => n.id === x.id))),
      1200,
    );
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);

      scaleS.set(1.5);
      rotS.set((Math.random() - 0.5) * 32);
      setTimeout(() => {
        scaleS.set(1);
        rotS.set(0);
      }, 450);

      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      setShowBubble(true);
      setIsHappy(true);
      setSparkleOn(true);
      setPulseKey((k) => k + 1);
      setMood((m) => (m + 1) % MOODS.length);

      bubbleTimer.current = setTimeout(() => {
        setShowBubble(false);
        setIsHappy(false);
        setSparkleOn(false);
      }, 2200);

      setStickers((prev) => [
        ...prev.slice(-28),
        {
          id: Date.now() + Math.random(),
          x: 8 + Math.random() * 80,
          y: 8 + Math.random() * 78,
          emoji: STICKERS[Math.floor(Math.random() * STICKERS.length)],
          rot: (Math.random() - 0.5) * 40,
          scale: 0.8 + Math.random() * 0.7,
          color: PASTEL[Math.floor(Math.random() * PASTEL.length)],
        },
      ]);
      setClickCount((c) => c + 1);
    },
    [scaleS, rotS, spawnParticles],
  );

  const cm = MOODS[mood];

  return (
    <>
      {/* FONTS */}
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&family=Klee+One:wght@400;600&display=swap');
        .nf { font-family: 'Nunito', sans-serif; }
        .kf { font-family: 'Klee One', cursive; }

        @keyframes cwFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes cwGlow {
          0%,100% { box-shadow: 0 0 18px 4px rgba(255,179,198,.4); }
          50%      { box-shadow: 0 0 36px 12px rgba(201,184,255,.55); }
        }
        @keyframes cwRainbow {
          to { filter: hue-rotate(360deg); }
        }
        @keyframes cwPulse {
          to { transform: scale(2.6); opacity: 0; }
        }
        @keyframes cwSparkle {
          0%   { transform: rotate(var(--sd)) translateX(40px) scale(0); opacity: 1; }
          60%  { transform: rotate(var(--sd)) translateX(44px) scale(1.2); opacity: 1; }
          100% { transform: rotate(var(--sd)) translateX(52px) scale(0); opacity: 0; }
        }
        @keyframes cwStickerFloat {
          0%,100% { translate: 0 0; }
          50%      { translate: 0 -7px; }
        }
        @keyframes cwTrailFade {
          to { transform: scale(0); opacity: 0; }
        }
        @keyframes cwShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      {/* ── CURSOR TRAIL ── */}
      {trail.map((dot, i) => (
        <div
          key={dot.id}
          style={{
            position: "fixed",
            left: dot.x,
            top: dot.y,
            width: `${5 + i * 0.5}px`,
            height: `${5 + i * 0.5}px`,
            background: dot.color,
            borderRadius: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            zIndex: 9000,
            opacity: (i / trail.length) * 0.5,
            animation: "cwTrailFade .6s ease forwards",
          }}
        />
      ))}

      {/* ── BURST PARTICLES ── */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: p.x, y: p.y, scale: 1.2, opacity: 1 }}
          animate={{ x: p.x + p.vx, y: p.y + p.vy + 50, scale: 0, opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.8, 1] }}
          style={{
            position: "fixed",
            translate: "-50% -50%",
            fontSize: p.size,
            color: p.color,
            pointerEvents: "none",
            zIndex: 9500,
            fontWeight: 900,
            textShadow: `0 0 10px ${p.color}`,
          }}
        >
          {p.shape}
        </motion.div>
      ))}

      {/* ── STICKERS ── */}
      <AnimatePresence>
        {stickers.map((s) => (
          <motion.div
            key={s.id}
            initial={{ scale: 0, rotate: s.rot - 25, opacity: 0, y: -10 }}
            animate={{ scale: s.scale, rotate: s.rot, opacity: 1, y: 0 }}
            exit={{ scale: 0, rotate: s.rot + 20, opacity: 0 }}
            whileHover={{ scale: s.scale * 1.35, rotate: s.rot + 12, y: -5 }}
            whileTap={{ scale: 0, rotate: s.rot + 30 }}
            transition={{ type: "spring", stiffness: 450, damping: 18 }}
            onClick={() => setStickers((p) => p.filter((x) => x.id !== s.id))}
            style={{
              position: "fixed",
              left: `${s.x}vw`,
              top: `${s.y}vh`,
              fontSize: `${1.4 + s.scale * 0.55}rem`,
              cursor: "pointer",
              zIndex: 300,
              filter: `drop-shadow(0 3px 8px ${s.color}80)`,
              userSelect: "none",
              animation: `cwStickerFloat ${2.8 + s.scale * 0.8}s ease-in-out infinite`,
            }}
          >
            {s.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── MAIN WIDGET ── */}
      <div
        style={{
          position: "fixed",
          bottom: "1.8rem",
          left: "1.8rem",
          zIndex: 500,
        }}
      >
        {/* Pulse ring on click */}
        <div
          key={pulseKey}
          style={{
            position: "absolute",
            inset: "-6px",
            borderRadius: "50%",
            border: `2.5px solid ${cm.color}`,
            animation: "cwPulse .9s ease-out forwards",
            pointerEvents: "none",
          }}
        />

        {/* Orbiting sparkles */}
        {sparkleOn &&
          [0, 60, 120, 180, 240, 300].map((deg, i) => (
            <div
              key={`sp-${pulseKey}-${i}`}
              style={
                {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 10,
                  height: 10,
                  marginLeft: -5,
                  marginTop: -5,
                  color: PASTEL[i % PASTEL.length],
                  fontSize: 11,
                  fontWeight: 900,
                  pointerEvents: "none",
                  zIndex: 510,
                  animation: `cwSparkle .7s ${i * 0.08}s ease-out forwards`,
                  "--sd": `${deg}deg`,
                } as React.CSSProperties
              }
            >
              ✦
            </div>
          ))}

        {/* Speech bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              key={`bub-${pulseKey}`}
              initial={{ scale: 0, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: 6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 520, damping: 22 }}
              className="kf"
              style={{
                position: "absolute",
                bottom: "calc(100% + .9rem)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(255,255,255,.94)",
                backdropFilter: "blur(16px)",
                border: `2px solid ${cm.color}`,
                borderRadius: "1.3rem",
                padding: ".5rem 1.1rem",
                fontSize: ".9rem",
                color: "#5a3a6a",
                fontWeight: 600,
                whiteSpace: "nowrap",
                boxShadow: `0 10px 32px ${cm.color}55, 0 2px 8px rgba(0,0,0,.06)`,
              }}
            >
              {cm.bubble}
              <div
                style={{
                  position: "absolute",
                  bottom: -9,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: `9px solid ${cm.color}`,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click counter */}
        <AnimatePresence>
          {clickCount > 0 && (
            <motion.div
              key={clickCount}
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 15 }}
              className="nf"
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                background: "linear-gradient(135deg,#ffb3c6,#c9b8ff)",
                color: "#fff",
                borderRadius: "999px",
                minWidth: 22,
                height: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: ".62rem",
                fontWeight: 800,
                boxShadow: "0 3px 12px rgba(255,179,198,.55)",
                padding: "0 5px",
                zIndex: 520,
                border: "2px solid #fff",
              }}
            >
              {clickCount > 99 ? "99+" : clickCount}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── THE CAT BUTTON ── */}
        <motion.div
          onClick={handleClick}
          style={{
            scale: scaleS,
            rotate: rotS,
            y: floatY,
            width: 74,
            height: 74,
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            animation: "cwGlow 3s ease-in-out infinite",
          }}
          drag
          dragConstraints={{ left: -220, right: 220, top: -420, bottom: 110 }}
          dragElastic={0.22}
          dragTransition={{ bounceStiffness: 380, bounceDamping: 22 }}
          whileHover={{ scale: 1.1 }}
        >
          {/* Rainbow border ring */}
          <motion.div
            style={{
              position: "absolute",
              inset: -3,
              borderRadius: "50%",
              background:
                "conic-gradient(#ffb3c6,#fde89a,#b5ead7,#c9b8ff,#ffd8b1,#ffb3c6)",
              opacity: isHappy ? 1 : 0.45,
              transition: "opacity .35s",
              animation: "cwRainbow 2.5s linear infinite",
            }}
          />

          {/* White inner disc */}
          <div
            style={{
              position: "absolute",
              inset: 2.5,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#fff8fb,#faf5ff)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,.9)",
            }}
          />

          {/* Cat face */}
          <motion.div
            style={{
              fontSize: "2.15rem",
              zIndex: 1,
              rotate: floatRot,
              filter: isHappy
                ? "drop-shadow(0 0 12px rgba(255,179,198,.9)) drop-shadow(0 0 6px rgba(255,179,198,.6))"
                : "none",
              transition: "filter .3s",
            }}
          >
            {cm.emoji}
          </motion.div>
        </motion.div>

        {/* Label pill */}
        <motion.div
          className="nf"
          animate={
            isHappy
              ? {
                  backgroundPosition: ["0% center", "200% center"],
                }
              : { backgroundPosition: "0% center" }
          }
          transition={{
            duration: 1.4,
            repeat: isHappy ? Infinity : 0,
            ease: "linear",
          }}
          style={{
            marginTop: ".55rem",
            textAlign: "center",
            fontSize: ".6rem",
            fontWeight: 800,
            padding: ".22rem .75rem",
            borderRadius: "999px",
            color: "#7a5090",
            background: isHappy
              ? "linear-gradient(90deg,#ffb3c6,#fde89a,#b5ead7,#c9b8ff,#ffb3c6)"
              : "linear-gradient(90deg,#fce4ef,#eee4fc)",
            backgroundSize: "300% 100%",
            border: "1px solid rgba(255,179,198,.4)",
            boxShadow: "0 2px 10px rgba(255,179,198,.2)",
            letterSpacing: ".04em",
          }}
        >
          {clickCount === 0
            ? "¡Gatito! 🐾"
            : `${clickCount} sticker${clickCount !== 1 ? "s" : ""} ♡`}
        </motion.div>
      </div>

      {/* ── ONBOARDING HINT ── */}
      <AnimatePresence>
        {clickCount === 0 && (
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ delay: 1.4, duration: 0.55 }}
            className="kf"
            style={{
              position: "fixed",
              bottom: "5.6rem",
              left: "6rem",
              background: "rgba(255,255,255,.9)",
              backdropFilter: "blur(14px)",
              border: "1.5px solid rgba(255,179,198,.5)",
              borderRadius: "1rem",
              padding: ".4rem .9rem",
              fontSize: ".7rem",
              color: "#b07aaa",
              fontWeight: 600,
              pointerEvents: "none",
              zIndex: 400,
              boxShadow: "0 4px 18px rgba(255,179,198,.22)",
              letterSpacing: ".04em",
              whiteSpace: "nowrap",
            }}
          >
            ← Click o arrastra 🐾✨
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CLEAR BUTTON ── */}
      <AnimatePresence>
        {stickers.length >= 5 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.07, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
            onClick={() => {
              setStickers([]);
              setClickCount(0);
            }}
            className="nf"
            style={{
              position: "fixed",
              bottom: "1.8rem",
              right: "1.8rem",
              background: "rgba(255,255,255,.88)",
              backdropFilter: "blur(14px)",
              border: "1.5px solid rgba(255,179,198,.45)",
              borderRadius: "999px",
              padding: ".45rem 1.2rem",
              fontSize: ".68rem",
              color: "#b07aaa",
              fontWeight: 700,
              cursor: "pointer",
              zIndex: 500,
              boxShadow: "0 4px 18px rgba(255,179,198,.22)",
              letterSpacing: ".05em",
            }}
          >
            Limpiar todo 🧹
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
