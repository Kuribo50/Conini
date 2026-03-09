"use client";

import { useEffect, useRef, useState } from "react";
import PetalCanvas from "./components/PetalCanvas";
import PageIntro from "./components/PageIntro";
import PageHistory from "./components/PageHistory";
import PagePhotos from "./components/PagePhotos";
import PageReasons from "./components/PageReasons";
import PageLetter from "./components/PageLetter";
import PageFinale from "./components/PageFinale";
import CatWidget from "./components/CatWidget";

const PAGES = ["p1", "p2", "p3", "p4", "p5", "p6"];
const NAV_ITEMS = [
  { icon: "🌸", label: "Inicio" },
  { icon: "📖", label: "Lugares visitados" },
  { icon: "📷", label: "Fotos" },
  { icon: "💌", label: "Razones" },
  { icon: "✉️", label: "Carta" },
  { icon: "🎂", label: "Final" },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const catWrapRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  /* cursor */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
      setTimeout(() => {
        if (ringRef.current) {
          ringRef.current.style.left = e.clientX + "px";
          ringRef.current.style.top = e.clientY + "px";
        }
      }, 90);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* active page detection */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = PAGES.indexOf(e.target.id);
            if (i >= 0) setActive(i);
          }
        });
      },
      { threshold: 0.45 },
    );
    PAGES.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* scroll reveal – también observa elementos añadidos dinámicamente */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    const observe = () =>
      document
        .querySelectorAll(".reveal, .reveal-scale")
        .forEach((el) => obs.observe(el));
    observe();
    // Pequeño delay por si hay hydration tardía
    const t = setTimeout(observe, 300);
    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);

  const goTo = (i: number) => {
    document.getElementById(PAGES[i])?.scrollIntoView({ behavior: "smooth" });
  };

  /* ocultar nav y gato al bajar, mostrar al subir */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastScrollY.current;
      if (Math.abs(diff) > 4) {
        const hide = diff > 0 && y > 60;
        navRef.current?.classList.toggle("nav-hidden", hide);
        if (catWrapRef.current) {
          catWrapRef.current.style.opacity = hide ? "0" : "1";
          catWrapRef.current.style.transform = hide
            ? "translateY(20px)"
            : "translateY(0)";
          catWrapRef.current.style.pointerEvents = hide ? "none" : "auto";
        }
        lastScrollY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      <PetalCanvas />

      {/* Gatito interactivo + stickers */}
      <div
        ref={catWrapRef}
        style={{ transition: "opacity 0.3s ease, transform 0.3s ease" }}
      >
        <CatWidget />
      </div>

      {/* Navegación estilo Animal Crossing */}
      <nav
        ref={navRef}
        className="ac-nav"
        role="navigation"
        aria-label="Navegación de páginas"
      >
        {NAV_ITEMS.map((item, i) => (
          <button
            key={i}
            className={`ac-nav-btn${active === i ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={item.label}
            aria-current={active === i ? "page" : undefined}
          >
            <span className="ac-nav-icon">{item.icon}</span>
            <span className="ac-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <PageIntro />
      <PageHistory />
      <PagePhotos />
      <PageReasons />
      <PageLetter />
      <PageFinale />
    </>
  );
}
