"use client";
import { useEffect, useRef } from "react";

// Tipos de partícula: 0=pétalo, 1=hoja AC, 2=estrella, 3=corazón, 4=patita
interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rot: number;
  rotSpeed: number;
  alpha: number;
  color: string;
  type: number;
  wobble: number;
}

const PETAL_COLORS = ["#ffb3c6", "#ffd6e0", "#fce8f5", "#f9c6d8"];
const LEAF_COLORS = ["#b5ead7", "#d4f5e9", "#a8d8c8", "#c6eed8"];
const STAR_COLORS = ["#fde89a", "#fff4c2", "#fdedb0", "#ffe066"];
const HEART_COLORS = ["#ffb3c6", "#ff91b0", "#ff6fa0", "#ffd6e0"];
const PAW_COLORS = ["#e2d4f0", "#d4c4e8", "#c9b8ff", "#f0e8ff"];

function drawLeaf(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.bezierCurveTo(size * 0.6, -size * 0.5, size * 0.7, size * 0.3, 0, size);
  ctx.bezierCurveTo(
    -size * 0.7,
    size * 0.3,
    -size * 0.6,
    -size * 0.5,
    0,
    -size,
  );
  ctx.fill();
  // nervio central
  ctx.globalAlpha *= 0.5;
  ctx.beginPath();
  ctx.moveTo(0, -size * 0.85);
  ctx.lineTo(0, size * 0.85);
  ctx.strokeStyle = "#79c4a8";
  ctx.lineWidth = 0.8;
  ctx.stroke();
}

function drawStar(ctx: CanvasRenderingContext2D, size: number) {
  const points = 5;
  const outer = size,
    inner = size * 0.45;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI) / points - Math.PI / 2;
    i === 0
      ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
      : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath();
  ctx.fill();
}

function drawHeart(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  ctx.moveTo(0, size * 0.3);
  ctx.bezierCurveTo(size * 0.8, -size * 0.4, size * 1.2, size * 0.5, 0, size);
  ctx.bezierCurveTo(
    -size * 1.2,
    size * 0.5,
    -size * 0.8,
    -size * 0.4,
    0,
    size * 0.3,
  );
  ctx.fill();
}

function drawPaw(ctx: CanvasRenderingContext2D, size: number) {
  // Almohadilla central
  ctx.beginPath();
  ctx.ellipse(0, size * 0.25, size * 0.5, size * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  // 3 almohadillas pequeñas
  const pads = [
    [-size * 0.45, -size * 0.2],
    [0, -size * 0.55],
    [size * 0.45, -size * 0.2],
  ];
  pads.forEach(([px, py]) => {
    ctx.beginPath();
    ctx.ellipse(px, py, size * 0.22, size * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
  });
}

export default function PetalCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let particles: Particle[] = [];
    let frame = 0;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const pickType = () => {
      // Probabilidades: 50% pétalo, 22% hoja, 12% estrella, 8% corazón, 8% patita
      const r = Math.random();
      if (r < 0.5) return 0;
      if (r < 0.72) return 1;
      if (r < 0.84) return 2;
      if (r < 0.92) return 3;
      return 4;
    };

    const colorFor = (type: number) => {
      const palettes = [
        PETAL_COLORS,
        LEAF_COLORS,
        STAR_COLORS,
        HEART_COLORS,
        PAW_COLORS,
      ];
      const p = palettes[type];
      return p[Math.floor(Math.random() * p.length)];
    };

    const spawn = () => {
      const type = pickType();
      const baseSize =
        type === 2
          ? 4 + Math.random() * 5 // estrella más pequeña
          : type === 3
            ? 4 + Math.random() * 4 // corazón pequeño
            : type === 4
              ? 5 + Math.random() * 6 // patita
              : 5 + Math.random() * 9; // pétalo/hoja
      particles.push({
        x: Math.random() * canvas.width,
        y: -24,
        size: baseSize,
        speed: 0.3 + Math.random() * 0.7,
        drift: (Math.random() - 0.5) * 0.6,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        alpha: 0.12 + Math.random() * 0.38,
        color: colorFor(type),
        type,
        wobble: Math.random() * Math.PI * 2,
      });
    };

    // Pre-poblar un poco
    for (let i = 0; i < 18; i++) {
      spawn();
      particles[particles.length - 1].y = Math.random() * canvas.height;
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Frecuencia variable: más petals, menos patitas
      if (frame % 32 === 0) spawn();

      particles = particles.filter((p) => p.y < canvas.height + 40);

      particles.forEach((p) => {
        p.wobble += 0.018;
        p.y += p.speed;
        p.x += p.drift + Math.sin(p.wobble) * 0.5;
        p.rot += p.rotSpeed;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);

        switch (p.type) {
          case 0: // pétalo
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.42, p.size, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 1: // hoja AC
            drawLeaf(ctx, p.size * 0.9);
            break;
          case 2: // estrella
            drawStar(ctx, p.size);
            break;
          case 3: // corazón
            drawHeart(ctx, p.size * 0.75);
            break;
          case 4: // patita
            drawPaw(ctx, p.size * 0.7);
            break;
        }
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      id="petals"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}
    />
  );
}
