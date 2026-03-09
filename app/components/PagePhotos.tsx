"use client";
import { useState } from "react";

interface Photo {
  src: string;
  caption: string;
  emoji: string;
  col: string;
  row: string;
  grad: string;
  rotate?: number;
}

const PHOTOS: Photo[] = [
  // ── Fila 1 (techo) ──
  {
    src: "/foto9.jpg",
    caption: "Bajo el sol",
    emoji: "🌞",
    col: "1/2",
    row: "1/2",
    grad: "linear-gradient(135deg,#ffd8b1,#fde89a)",
  },
  {
    src: "/foto12.jpg",
    caption: "Explorando",
    emoji: "🏛️",
    col: "2/3",
    row: "1/2",
    grad: "linear-gradient(135deg,#e2d4f0,#c9b8ff)",
  },
  {
    src: "/foto2.jpg",
    caption: "Juntos",
    emoji: "✨",
    col: "3/5",
    row: "1/2",
    grad: "linear-gradient(135deg,#ffd6e0,#e2d4f0)",
  },
  {
    src: "/foto4.jpg",
    caption: "Mi gatito",
    emoji: "🐾",
    col: "5/6",
    row: "1/2",
    grad: "linear-gradient(135deg,#d4f5e9,#b5ead7)",
  },
  {
    src: "/foto8.jpg",
    caption: "Brindando",
    emoji: "🥂",
    col: "6/7",
    row: "1/2",
    grad: "linear-gradient(135deg,#d4f5e9,#fde89a)",
  },
  // ── Laterales filas 2-3 ──
  {
    src: "/foto3.jpg",
    caption: "Coni",
    emoji: "🥤",
    col: "1/2",
    row: "2/4",
    grad: "linear-gradient(135deg,#ff9a9a,#ffdde1)",
  },
  {
    src: "/foto5.jpg",
    caption: "Pochi Pochi",
    emoji: "🧋",
    col: "2/3",
    row: "2/3",
    grad: "linear-gradient(135deg,#ffd6e0,#b5ead7)",
  },
  {
    src: "/foto16.jpg",
    caption: "Dia lindo",
    emoji: "🌸",
    col: "2/3",
    row: "3/4",
    grad: "linear-gradient(135deg,#ffd6e0,#e2d4f0)",
  },
  // ── CENTRO: foto17 horizontal, llena toda la celda ──
  {
    src: "/foto17.jpg",
    caption: "Todxs juntos",
    emoji: "🥂",
    col: "3/5",
    row: "2/4",
    grad: "linear-gradient(135deg,#d4f5e9,#e2d4f0)",
  },
  {
    src: "/foto10.jpg",
    caption: "Happy Meal",
    emoji: "🍟",
    col: "5/6",
    row: "2/3",
    grad: "linear-gradient(135deg,#ffe566,#ffd8b1)",
  },
  {
    src: "/foto7.jpg",
    caption: "Casa de jengibre",
    emoji: "🏠",
    col: "6/7",
    row: "2/3",
    grad: "linear-gradient(135deg,#fde89a,#ffd8b1)",
  },
  {
    src: "/foto13.jpg",
    caption: "Ramen casero",
    emoji: "🍜",
    col: "5/6",
    row: "3/4",
    grad: "linear-gradient(135deg,#ffd8b1,#fff4c2)",
  },
  {
    src: "/foto15.jpg",
    caption: "Noche de sushi",
    emoji: "💜",
    col: "6/7",
    row: "3/4",
    grad: "linear-gradient(135deg,#c9b8ff,#e2d4f0)",
  },
  // ── Fila 4 (suelo) ──
  {
    src: "/foto6.jpg",
    caption: "Sushi date",
    emoji: "🍣",
    col: "1/3",
    row: "4/5",
    grad: "linear-gradient(135deg,#fff4c2,#ffd8b1)",
  },
  {
    src: "/foto11.jpg",
    caption: "Cafe y torta",
    emoji: "☕",
    col: "3/5",
    row: "4/5",
    grad: "linear-gradient(135deg,#ffd6e0,#fff4c2)",
  },
  {
    src: "/foto18.jpg",
    caption: "Momento especial",
    emoji: "💛",
    col: "5/6",
    row: "4/5",
    grad: "linear-gradient(135deg,#fde89a,#fff4c2)",
  },
  {
    src: "/foto14.jpg",
    caption: "Sushi iluminado",
    emoji: "🌸",
    col: "6/7",
    row: "4/5",
    grad: "linear-gradient(135deg,#ffd6e0,#e2d4f0)",
  },
];

function PhotoCell({ p, onOpen }: { p: Photo; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const isCenter = p.src === "/foto17.jpg";

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: p.col,
        gridRow: p.row,
        borderRadius: isCenter ? "20px" : "10px",
        overflow: "hidden",
        position: "relative",
        background: p.grad,
        cursor: "pointer",
        boxShadow: isCenter
          ? hovered
            ? "0 30px 80px rgba(58,37,64,.38), 0 0 0 4px rgba(155,114,207,.6)"
            : "0 16px 50px rgba(58,37,64,.28), 0 0 0 3px rgba(155,114,207,.35)"
          : hovered
            ? "0 16px 50px rgba(58,37,64,.25), 0 0 0 2px rgba(155,114,207,.25)"
            : "0 2px 8px rgba(58,37,64,.08)",
        transition:
          "box-shadow .35s ease, transform .35s cubic-bezier(.34,1.56,.64,1)",
        transform: isCenter
          ? hovered
            ? "scale(1.04) translateY(-5px)"
            : "scale(1.01)"
          : hovered
            ? "scale(1.03) translateY(-3px)"
            : "scale(1)",
        zIndex: isCenter ? (hovered ? 10 : 4) : hovered ? 5 : 1,
      }}
    >
      {/* lupa hint al hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(30,16,42,.18)",
            backdropFilter: "blur(1px)",
            animation: "popIn .18s ease",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: "1.6rem",
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,.4))",
            }}
          >
            🔍
          </span>
        </div>
      )}

      {!imgErr && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.src}
          alt={p.caption}
          onError={() => setImgErr(true)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transformOrigin: "center",
            transform: p.rotate
              ? `translate(-50%,-50%) rotate(${p.rotate}deg) scale(2.1)`
              : `translate(-50%,-50%) scale(${hovered ? 1.08 : 1})`,
            transition: p.rotate
              ? "none"
              : "transform .55s cubic-bezier(.4,0,.2,1)",
          }}
        />
      )}

      {imgErr && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: ".4rem",
          }}
        >
          <span style={{ fontSize: "2rem", opacity: 0.45 }}>{p.emoji}</span>
          <span
            style={{
              fontSize: ".55rem",
              color: "rgba(58,37,64,.35)",
              letterSpacing: ".08em",
              textAlign: "center",
            }}
          >
            {p.src.slice(1)}
          </span>
        </div>
      )}
    </div>
  );
}

function Lightbox({ p, onClose }: { p: Photo; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(15,8,24,.88)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "popIn .22s cubic-bezier(.34,1.56,.64,1)",
        cursor: "zoom-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 40px 120px rgba(0,0,0,.6)",
          animation: "popIn .28s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.src}
          alt={p.caption}
          style={{
            display: "block",
            maxWidth: "88vw",
            maxHeight: "88vh",
            objectFit: "contain",
            transform: p.rotate ? `rotate(${p.rotate}deg)` : "none",
          }}
        />
      </div>
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "1.2rem",
          right: "1.5rem",
          background: "rgba(255,255,255,.15)",
          border: "none",
          color: "#fff",
          width: "2.4rem",
          height: "2.4rem",
          borderRadius: "50%",
          fontSize: "1.1rem",
          cursor: "pointer",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background .2s",
        }}
      >
        ✕
      </button>
    </div>
  );
}

export default function PagePhotos() {
  const [open, setOpen] = useState<Photo | null>(null);

  return (
    <section
      id="p3"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(160deg,#fdf0f8 0%,#f0fdf7 50%,#fffbee 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "1.8rem 2rem .8rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background:
            "linear-gradient(to bottom, rgba(253,240,248,.94) 0%, transparent 100%)",
        }}
      >
        <p className="tag reveal" style={{ color: "#9b72cf" }}>
          &#10022; Nuestra galeria
        </p>
        <h2
          className="display reveal"
          style={{
            fontSize: "clamp(1.8rem,5vw,3.5rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            background:
              "linear-gradient(135deg,#d17aaa 0%,#9b72cf 50%,#5cb8a0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textAlign: "center",
          }}
        >
          Los momentos <em>que mas quiero</em>
        </h2>
      </div>

      {/* Grid */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 12px 14px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1440px",
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridTemplateRows: "repeat(4, minmax(1fr, 1fr))",
            gap: "8px",
            height: "min(calc(100vh - 110px), 880px)",
          }}
        >
          {PHOTOS.map((p) => (
            <PhotoCell key={p.src} p={p} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open && <Lightbox p={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
