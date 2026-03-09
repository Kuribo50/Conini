"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect } from "react";

const PARAGRAPHS = [
  <>
    No sé exactamente cómo nos volvimos a unir después de tantas veces y después
    de tantos años. Que me hayas permitido volverte a conocer y ser parte de tu
    círculo es algo que agradezco con todo el corazón volver a conectar contigo,
    pasar de ser un recuerdo a ser alguien importante, y luego{" "}
    <em style={{ color: "#fde89a", fontStyle: "italic" }}>
      la persona más importante
    </em>
    . Pero pasó, y no me arrepiento ni un segundo.
  </>,
  <>
    Hoy que cumples{" "}
    <em style={{ color: "#b5ead7", fontStyle: "italic" }}>23 años</em>, quiero
    que sepas que me enorgullece enormemente todo lo que eres y la hermosa
    persona en la que te has convertido. Te conozco desde hace mucho tiempo, y
    poder verte evolucionar y cambiar a lo largo de todos estos años es algo
    maravilloso. Los mejores días de tu vida están a punto de comenzar estás a
    punto de empezar una etapa donde tendrás tus cosas, serás más independiente
    y estarás muy feliz con todo lo que conseguiste, porque así lo siento y
    porque así te lo mereces. Te has esforzado tanto para llegar a este momento,
    y así se hará. Me llena de alegría poder estar junto a ti en este proceso.
  </>,
  <>
    Gracias por amarme y por permitirme amarte. Quiero que sepas que me encantas
    en cada sentido tu manera de querer, de reírte, de enfrentar las cosas...
    son actitudes muy maravillosas y valiosas que quizás no notas en ti misma,
    pero que me hacen ser mejor persona sin que te des cuenta.
  </>,
  <>
    Hay días difíciles, sí. Pero siempre que miro hacia un lado,{" "}
    <strong style={{ color: "#ffd6e0", fontWeight: 500 }}>estás tú</strong>. Y
    eso lo cambia todo. Me deja tranquilo al final del día saber que junto a mí
    está una mujer hermosa, valiente, muy inteligente, graciosa, chistosa, linda
    linda linda te amo.
  </>,
  <>
    Así que,{" "}
    <em style={{ color: "#fde89a", fontStyle: "italic" }}>
      feliz cumpleaños, Monita.
    </em>{" "}
    Ojalá este año esté lleno de cosas bonitas, de risas, de momentos que
    después contemos cuando seamos viejos.{" "}
    <motion.span
      animate={{ scale: [1, 1.3, 0.9, 1] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block" }}
    >
      ♡
    </motion.span>
  </>,
];

function Blob({ color, style }: { color: string; style: React.CSSProperties }) {
  const y = useMotionValue(0);
  useEffect(() => {
    let on = true;
    const dur = 7 + Math.random() * 5;
    const loop = async () => {
      while (on) {
        await animate(y, -20, { duration: dur, ease: "easeInOut" });
        await animate(y, 20, { duration: dur, ease: "easeInOut" });
      }
    };
    loop();
    return () => {
      on = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <motion.div
      style={{
        position: "absolute",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        pointerEvents: "none",
        y,
        ...style,
      }}
    />
  );
}

export default function PageLetter() {
  return (
    <>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
        @keyframes plShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes plGlow {
          0%,100% { box-shadow: 0 0 40px rgba(255,179,198,.08), 0 40px 100px rgba(0,0,0,.35); }
          50%      { box-shadow: 0 0 70px rgba(201,184,255,.13), 0 40px 100px rgba(0,0,0,.35); }
        }
        .pl-d { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      <section
        id="p5"
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem 2rem",
          background:
            "linear-gradient(150deg,#1e0d2e 0%,#2d1545 35%,#12302a 100%)",
        }}
      >
        <Blob
          color="rgba(255,179,198,.2)"
          style={{ width: 520, height: 520, top: "-130px", right: "-120px" }}
        />
        <Blob
          color="rgba(181,234,215,.13)"
          style={{ width: 380, height: 380, bottom: "-90px", left: "-70px" }}
        />
        <Blob
          color="rgba(253,232,154,.1)"
          style={{ width: 260, height: 260, top: "40%", left: "4%" }}
        />
        <Blob
          color="rgba(201,184,255,.12)"
          style={{ width: 180, height: 180, top: "18%", right: "5%" }}
        />

        {/* ── CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: "840px",
            width: "100%",
            zIndex: 5,
            position: "relative",
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,179,198,.15)",
            borderRadius: "2rem",
            padding: "clamp(2.5rem,6vw,4.5rem) clamp(2rem,7vw,5.5rem)",
            backdropFilter: "blur(28px)",
            animation: "plGlow 6s ease-in-out infinite",
          }}
        >
          {/* Top line accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "20%",
              right: "20%",
              height: "1.5px",
              background:
                "linear-gradient(90deg,transparent,rgba(255,179,198,.45),transparent)",
              borderRadius: "0 0 3px 3px",
            }}
          />

          {/* Greeting */}
          <p
            className="pl-d"
            style={{
              fontSize: "clamp(1.4rem,3.5vw,2.1rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#ffd6e0",
              marginBottom: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
            }}
          >
            Mi Monita,
            <span
              style={{
                flex: 1,
                height: "1px",
                background:
                  "linear-gradient(to right, rgba(255,179,198,.3), transparent)",
              }}
            />
          </p>

          {/* Body paragraphs */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}
          >
            {PARAGRAPHS.map((text, i) => (
              <motion.p
                key={i}
                className="pl-d"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: "easeOut" }}
                style={{
                  fontSize: "clamp(1.02rem,1.9vw,1.22rem)",
                  lineHeight: 1.95,
                  color: "rgba(253,245,238,.8)",
                  fontWeight: 300,
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255,179,198,.12)",
              textAlign: "right",
            }}
          >
            <p
              className="pl-d"
              style={{
                fontStyle: "italic",
                fontSize: "clamp(1rem,2vw,1.15rem)",
                color: "rgba(255,214,224,.5)",
              }}
            >
              Con amor tuyo y siempre tuyo,
            </p>
            <p
              className="pl-d"
              style={{
                fontSize: "clamp(2.2rem,5vw,3.2rem)",
                fontWeight: 600,
                marginTop: ".3rem",
                background:
                  "linear-gradient(90deg,#ffd6e0,#fde89a,#b5ead7,#c9b8ff,#ffd6e0)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "plShimmer 4s linear infinite",
              }}
            >
              Martín ♡
            </p>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
