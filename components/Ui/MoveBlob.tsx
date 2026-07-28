'use client';
import { useRef, type MouseEvent } from 'react';
import gsap from 'gsap';

export function MoveBlob() {
    const navRef1 = useRef<HTMLDivElement | null>(null);
    const blobRef1 = useRef<HTMLDivElement | null>(null);

    const navRef2 = useRef<HTMLDivElement | null>(null);
    const blobRef2 = useRef<HTMLDivElement | null>(null);

    const moveBlob1 = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!navRef1.current || !blobRef1.current) return;
        const targetRect = e.currentTarget.getBoundingClientRect();
        const navRect = navRef1.current.getBoundingClientRect();

        gsap.to(blobRef1.current, {
            left: targetRect.left - navRect.left,
            width: targetRect.width,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const hideBlob1 = () => {
        gsap.to(blobRef1.current, { opacity: 0, duration: 0.3 });
    };

    const moveBlob2 = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!navRef2.current || !blobRef2.current) return;
        const targetRect = e.currentTarget.getBoundingClientRect();
        const navRect = navRef2.current.getBoundingClientRect();

        gsap.to(blobRef2.current, {
            left: targetRect.left - navRect.left,
            width: targetRect.width,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const hideBlob2 = () => {
        gsap.to(blobRef2.current, { opacity: 0, duration: 0.3 });
    };

    return (
        <div className='flex items-center gap-10 w-full justify-between'>
            <nav
                ref={navRef1}
                onMouseLeave={hideBlob1}
                className="relative flex items-center p-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-100 pointer-events-auto"
            >
                <div
                    ref={blobRef1}
                    className="absolute h-full top-0 py-1.5 opacity-0 pointer-events-none"
                    style={{ width: '0px', left: '0px' }}
                >
                    <div className="w-full h-full bg-linear-to-r from-[#EC7661] to-[#5e499c] rounded-full" />
                </div>

                {['Sobre', 'Produtos', 'Área do parceiro', 'Trabalhe conosco', 'Produtos por indicação'].map((item, index) => (
                    <a
                        key={index}
                        href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                        onMouseEnter={moveBlob1}
                        className="relative z-10 px-5 py-2 text-sm font-semibold text-gray-700 hover:text-white transition-colors duration-300 whitespace-nowrap"
                    >
                        {item}
                    </a>
                ))}
            </nav>

            <nav
                ref={navRef2}
                onMouseLeave={hideBlob2}
                className="relative flex items-center p-1.5 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-100 pointer-events-auto"
            >
                <div
                    ref={blobRef2}
                    className="absolute h-full top-0 py-1.5 opacity-0 pointer-events-none"
                    style={{ width: '0px', left: '0px' }}
                >
                    <div className="w-full h-full bg-linear-to-r from-[#EC7661] to-[#5e499c] rounded-lg" />
                </div>

                {['Seja Parceiro Lev', 'Fale Agora'].map((item, index) => (
                    <a
                        key={index}
                        href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                        onMouseEnter={moveBlob2}
                        className="relative z-10 px-5 py-2 text-sm font-semibold text-gray-700 hover:text-white transition-colors duration-300 whitespace-nowrap"
                    >
                        {item}
                    </a>
                ))}
            </nav>
        </div>
    );
}