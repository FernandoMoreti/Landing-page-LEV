'use client';
import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, OrbitControls } from '@react-three/drei';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import Video from '@/components/Ui/Video';
import { InfiniteCarousel } from '@/components/Carrosel'

gsap.registerPlugin(ScrollTrigger);

// Importa o teclado dinamicamente para rodar apenas no navegador (evita erros de SSR)
const Lev = dynamic(() => import('../components/Object3D/Lev-logo-3d').then(m => m.Model), { ssr: false });

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
        scrub: 2,
        pin: ".canvas-wrapper",
      }
    });

    tl.to(".canvas-wrapper", { opacity: 0, ease: "power2.inOut" });

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".animate-text", {
      x: -50, opacity: 0,
      scrollTrigger: {
        trigger: ".section-parceiros",
        start: "top 50%",
        toggleActions: "play none none none"
      }
    });

    gsap.from(".line", {
      y: 40,            // Começam 40px abaixo
      opacity: 0,       // Invisíveis inicialmente
      duration: 0.8,
      stagger: 0.1,     // Um elemento aparece logo após o outro em cascata
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".section-sobre",
        start: "top 25%", // Dispara quando o topo da seção atingir 75% da altura da tela
        toggleActions: "play none none none" // Toca apenas uma vez quando você chega nela
      }
    });

    return () => {
      lenis.destroy();
    };
  }, []);


  return (
    <main ref={container} className="relative w-full bg-linear-to-b from-[#EC7661] to-[#221255]">
      <Header />
      <div className="flex canvas-wrapper w-full h-screen fixed top-0 left-0 z-0 bg-linear-to-tr from-[#EC7661] to-[#221255]">
        <div className='flex flex-col justify-center p-8 md:p-12 max-w-xl bg-white/80 backdrop-blur-md rounded-r-3xl border border-gray-100 shadow-2xl shadow-gray-200/50'>

          <div className='flex items-center gap-3 mb-20'>
            <div className='h-px w-8 bg-[#5e499c]' />
            <span className='text-xs font-semibold tracking-widest text-[#5e499c] uppercase'>
              Bem Vindo a Lev Negócios
            </span>
          </div>

          <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6'>
            Ainda não é parceiro Lev?
          </h1>

          <p className='text-gray-600 text-lg font-normal leading-relaxed mb-8'>
            Estruture suas operações de crédito com agilidade, segurança jurídica e rentabilidade diferenciada para o seu negócio.
          </p>

          <div className='flex flex-wrap items-center gap-4'>
            <button className='px-8.5 py-4 rounded-xl bg-gray-900 text-white font-medium text-sm tracking-wide transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'>
              Cadastrar Empresa
            </button>

            <button className='px-6 py-4 rounded-xl text-gray-700 font-medium text-sm transition-all duration-300 hover:bg-gray-50 hover:text-gray-900'>
              Falar com Especialista &rarr;
            </button>
          </div>

          <div className='mt-10 pt-6 border-t border-gray-100 flex items-center gap-6 text-xs text-gray-400 font-medium'>
            <span>✓ Atendimento Humano</span>
            <span>✓ Numero 1 do mercado</span>
          </div>
        </div>
        <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
          <Environment preset="city" />
          <Float speed={2} rotationIntensity={3} floatIntensity={30}>
            <Lev scale={5} position={[1.5, -3.5, 0]}/>
          </Float>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <section className="section-sobre h-screen flex flex-col gap-30 items-center justify-center relative z-0">
        <h1 className="text-8xl font-black uppercase tracking-tighter">Somos Lev</h1>
        <div className='w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>

          <div className='lg:col-span-7 w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black'>
            <Video />
          </div>

          <div className='lg:col-span-5 flex flex-col justify-center text-right text-white'>

            <div className='flex flex-col gap-2 text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight mb-10 text-white/90'>
              <p className='line'>encantamento</p>
              <p className='line'>compromisso</p>
              <p className='line'>simplicidade</p>
              <p className='line'>inovação</p>
              <p className='line'>empatia</p>
              <p className='line'>união</p>
              <p className='line'>ética</p>
            </div>

            <div>
              <a
                href="#Sobrenos"
                className='inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-[#EC7661] to-[#ff8e7b] text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'
              >
                <span>Conheça nossa história</span>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M14 5l7 7m0 0l-7 7m7-7H3'></path>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </section>

      <section className="section-parceiros h-screen flex flex-col gap-12 items-center justify-center relative z-10 bg-transparent">
        <h2 className="text-6xl font-black uppercase tracking-tighter">Bancos parceiros</h2>
        <p className='animate-text text-white/80 w-4xl text-center text-lg font-normal'>Acreditamos no poder da transparência e no relacionamento de confiança. É assim que crescemos mais rápido, valorizando quem cresce com a gente todos os dias. Conheça nossos parceiros:</p>
        <InfiniteCarousel />
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