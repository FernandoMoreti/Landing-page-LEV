'use client';
import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, OrbitControls } from '@react-three/drei';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

gsap.registerPlugin(ScrollTrigger);

// Importa o teclado dinamicamente para rodar apenas no navegador (evita erros de SSR)
const Lev = dynamic(() => import('../components/Object3D/Lev').then(m => m.Model), { ssr: false });

export default function Home() {
  const container = useRef(null);

  useEffect(() => {
    // 1. Inicializa o Scroll Suave (Lenis)
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Animação de Scroll (GSAP)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: ".canvas-wrapper",
      }
    });

    tl.to(".canvas-wrapper", { opacity: 0, ease: "power2.inOut" });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={container} className="relative w-full bg-white">
      <div className="canvas-wrapper w-full h-screen fixed top-0 left-0 z-0 bg-linear-to-tr from-[#EC7661] to-[#5e499c]">
        <Canvas camera={{ position: [0, 0, 8], fov: 20 }}>
          <Environment preset="city" />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Lev />
          </Float>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <section className="bg-white h-screen flex items-center justify-center relative z-10">
        <h1 className="text-8xl font-black text-black uppercase tracking-tighter">Lev Negócios</h1>
      </section>

      <section className="h-screen flex items-center justify-center relative z-10 bg-transparent">
        <h2 className="text-6xl font-bold">Desenvolvedor Frontend Criativo</h2>
      </section>

      <section className="min-h-screen p-20 bg-white text-black relative z-10 rounded-t-[40px]">
        <h2 className="text-5xl mb-12 font-bold uppercase">Projetos Selecionados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-96 bg-gray-100 rounded-3xl border border-gray-200 hover:scale-[1.02] transition-transform duration-300" />
          ))}
        </div>
      </section>

    </main>
  );
}