export default function PageReasons() {
  const reasons = [
    "Tus manos siempre están frías y me dejas calentarlas.",
    "La forma en que piensas en todos con un interés verdadero.",
    "Tu honestidad, aunque a veces duela un poquito.",
    " Por todos los sushis que hemos compartido.",
    "Los abrazos tan cálidos que das, que me hacen sentir seguro.",
    "Tu manera única de ver el mundo.",
    "Que me haces mejor sin proponértelo.",
    "Las noches hablando de cualquier cosa.",
    "Las ganas de superarte día a día.",
    "Que seas tan sensible y preocupada.",
    "Lo detallista que eres conmigo.",
    "Tu paciencia, sobre todo conmigo.",
    "Los momentos de diversión que hemos pasado.",
    "Tu cara cuando algo te emociona de verdad.",
    "Que encuentras lo bonito en lo simple.",
    "Lo cálida que eres con los demás.",
    "Tu perseverancia ante lo difícil.",
    "Que me eliges a mí cada día.",
    "Los planes improvisados que salen perfectos.",
    "Tu forma de cuidarme.",
    "Que conviertes momentos pequeños en recuerdos inolvidables.",
    "Lo mucho que has crecido y todo lo que seguirás creciendo.",
    "Que existes, y que eres exactamente tú.",
  ];

  const cardGrads = [
    "linear-gradient(135deg, rgba(255,240,245,0.95), rgba(252,228,240,0.9))",
    "linear-gradient(135deg, rgba(240,253,247,0.95), rgba(212,245,233,0.9))",
    "linear-gradient(135deg, rgba(255,251,238,0.95), rgba(255,244,194,0.9))",
    "linear-gradient(135deg, rgba(245,240,255,0.95), rgba(226,212,240,0.9))",
    "linear-gradient(135deg, rgba(255,245,238,0.95), rgba(255,216,177,0.9))",
  ];

  return (
    <>
      <section className="page-reasons" id="p4">
        <div className="page-reasons__blob page-reasons__blob--one" />
        <div className="page-reasons__blob page-reasons__blob--two" />

        <div className="page-reasons__float page-reasons__float--leaf">🍀</div>
        <div className="page-reasons__float page-reasons__float--flower">
          🌸
        </div>
        <div className="page-reasons__float page-reasons__float--cat">🐱</div>
        <div className="page-reasons__float page-reasons__float--paw">🐾</div>

        <div className="page-reasons__container">
          <p className="page-reasons__tag reveal">✦ 23 razones</p>

          <h2 className="page-reasons__title reveal">
            Por qué eres
            <br />
            <span>mi persona favorita</span>
          </h2>

          <div className="page-reasons__grid">
            {reasons.map((reason, i) => (
              <article
                key={i}
                className="reason-card reveal-scale"
                style={{
                  background: cardGrads[i % cardGrads.length],
                  animationDelay: `${i * 0.04}s`,
                }}
              >
                <div className="reason-card__number">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="reason-card__text">{reason}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        :root {
          --pink: #d17aaa;
          --lav: #9b72cf;
          --mint: #5cb8a0;
          --plum: #5a3a6a;
          --text-soft: #6f5878;
          --white-soft: rgba(255, 255, 255, 0.82);
          --shadow-soft: 0 10px 30px rgba(58, 37, 64, 0.08);
          --shadow-hover: 0 16px 40px rgba(58, 37, 64, 0.14);
        }

        * {
          box-sizing: border-box;
        }

        .page-reasons {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          padding: 5rem 1.5rem;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: linear-gradient(
            135deg,
            #fef9ff 0%,
            #f0fdf7 40%,
            #fffbf0 80%,
            #fdf0f8 100%
          );
        }

        .page-reasons__container {
          width: 100%;
          max-width: 1100px;
          position: relative;
          z-index: 5;
        }

        .page-reasons__tag {
          margin: 0 0 0.85rem;
          text-align: center;
          color: var(--lav);
          font-size: 0.95rem;
          letter-spacing: 0.08em;
          font-weight: 600;
        }

        .page-reasons__title {
          margin: 0 0 3rem;
          text-align: center;
          font-size: clamp(2.2rem, 7vw, 4.5rem);
          font-weight: 700;
          line-height: 1.05;
          background: linear-gradient(
            135deg,
            #9b72cf 0%,
            #d17aaa 50%,
            #5cb8a0 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 10px 30px rgba(155, 114, 207, 0.12);
        }

        .page-reasons__title span {
          font-style: italic;
          font-weight: 600;
        }

        .page-reasons__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 1rem;
        }

        .reason-card {
          min-height: 170px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          border-radius: 1.3rem;
          padding: 1.25rem 1.1rem;
          border: 1px solid rgba(255, 255, 255, 0.85);
          box-shadow: var(--shadow-soft);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition:
            transform 0.28s ease,
            box-shadow 0.28s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        .reason-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.28),
            rgba(255, 255, 255, 0)
          );
          pointer-events: none;
        }

        .reason-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-hover);
        }

        .reason-card__number {
          font-size: 2.4rem;
          line-height: 1;
          margin-bottom: 0.65rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--pink), var(--lav));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          z-index: 1;
        }

        .reason-card__text {
          margin: 0;
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--plum);
          position: relative;
          z-index: 1;
        }

        .page-reasons__blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(8px);
        }

        .page-reasons__blob--one {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, #fde89a 0%, transparent 70%);
          bottom: -100px;
          right: -100px;
          opacity: 0.35;
        }

        .page-reasons__blob--two {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #b5ead7 0%, transparent 70%);
          top: -60px;
          left: -40px;
          opacity: 0.35;
        }

        .page-reasons__float {
          position: absolute;
          z-index: 2;
          pointer-events: none;
          user-select: none;
        }

        .page-reasons__float--leaf {
          top: 4%;
          left: 4%;
          font-size: 1.8rem;
          opacity: 0.35;
          animation: leafSway 5s ease-in-out infinite;
        }

        .page-reasons__float--flower {
          top: 6%;
          right: 6%;
          font-size: 1.5rem;
          opacity: 0.35;
          animation: leafSway 4s 1.5s ease-in-out infinite;
        }

        .page-reasons__float--cat {
          bottom: 8%;
          left: 5%;
          font-size: 1.3rem;
          opacity: 0.3;
          animation: floatY 5s 2s ease-in-out infinite;
        }

        .page-reasons__float--paw {
          bottom: 15%;
          right: 4%;
          font-size: 1.2rem;
          opacity: 0.3;
          animation: floatY 6s 1s ease-in-out infinite;
        }

        .reveal {
          animation: fadeUp 0.9s ease both;
        }

        .reveal-scale {
          animation: fadeScale 0.7s ease both;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeScale {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes floatY {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes leafSway {
          0%,
          100% {
            transform: rotate(0deg) translateY(0);
          }
          25% {
            transform: rotate(4deg) translateY(-4px);
          }
          50% {
            transform: rotate(0deg) translateY(-8px);
          }
          75% {
            transform: rotate(-4deg) translateY(-4px);
          }
        }

        @media (max-width: 768px) {
          .page-reasons {
            padding: 4rem 1rem;
          }

          .page-reasons__title {
            margin-bottom: 2.2rem;
          }

          .page-reasons__grid {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 0.85rem;
          }

          .reason-card {
            min-height: 155px;
            padding: 1rem;
            border-radius: 1.1rem;
          }

          .reason-card__number {
            font-size: 2rem;
          }

          .reason-card__text {
            font-size: 0.88rem;
            line-height: 1.55;
          }
        }

        @media (max-width: 480px) {
          .page-reasons {
            padding: 3.5rem 0.9rem;
          }

          .page-reasons__tag {
            font-size: 0.82rem;
          }

          .page-reasons__title {
            font-size: clamp(1.9rem, 9vw, 2.8rem);
          }

          .page-reasons__grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }

          .reason-card {
            min-height: 145px;
            padding: 0.95rem 0.9rem;
          }

          .reason-card__number {
            font-size: 1.8rem;
            margin-bottom: 0.45rem;
          }

          .reason-card__text {
            font-size: 0.82rem;
          }

          .page-reasons__float--leaf,
          .page-reasons__float--flower,
          .page-reasons__float--cat,
          .page-reasons__float--paw {
            transform: scale(0.9);
          }
        }
      `}</style>
    </>
  );
}
