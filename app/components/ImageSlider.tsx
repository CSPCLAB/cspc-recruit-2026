"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const slides=[
    { src: "/slide1.jpg", alt: "cspc 활동 1" },
    { src: "/slide2.jpg", alt: "cspc 활동 2" },
    { src: "/slide3.jpg", alt: "cspc 활동 3" },
    { src: "/slide4.jpg", alt: "cspc 활동 4" },
];

const loopSlides = [...slides, slides[0]];

export default function ImageSlider() {
    const [idx, setIdx] = useState(0);
    const [transitionOn, setTransitionOn] = useState(true);
    const timeRef = useRef<number | null>(null);
    
    const nextSlide = () => {
        setIdx((prev) => prev+1);
    };

    const prevSlide = () => {
        if (idx===0) return;
        setIdx((prev) => prev-1);
    };

    const startAuto = () => {
        //중복 방지
        if (timeRef.current !== null) return;
        timeRef.current = window.setInterval(nextSlide, 3000);
    };

    const stopAuto = () => {
        if (timeRef.current === null) return;
        clearInterval(timeRef.current);
        timeRef.current = null;
    };

    //자동 슬라이드
    useEffect(() => {
        if (idx === slides.length) {
            setTimeout(() => {
                setTransitionOn(false);
                setIdx(0);
            }, 700);
        }
    }, [idx]);

    useEffect(() => {
        if (!transitionOn) {
            requestAnimationFrame(() => {
                setTransitionOn(true);
            });
        }
    }, [transitionOn]);

    return (
        <div className="w-full relative">
            {/*슬라이드*/}
            <div className="relative w-full overflow-hidden bg-gray-800 h-[240px] sm:h-[320px] md:h-[360px] lg:h-[420px]">
                
                <div
                    className="flex w-full"
                    style={{
                        transform: `translate3d(-${idx*100}%, 0, 0)`,
                        transition: transitionOn ? "transform 700ms ease-in-out" : "none",
                    }}
                >
                    {loopSlides.map((slide, i) => (
                        <div key={i} className="basis-full shrink-0">
                            <Image
                                src={slide.src}
                                alt={slide.alt}
                                width={1600}
                                height={900}
                                sizes="100vw"
                                className="w-full h-full object-cover pointer-events-none"
                                priority={ i===0 }
                            />
                        </div>
                    ))}
                </div>

                {/*점*/}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                                i === idx % slides.length
                                    ? "bg-whit scale-125" : "bg-black/40"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/*왼쪽 버튼*/}
            <button
                onClick={() => {
                    stopAuto();
                    prevSlide();
                    startAuto();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                bg-black/40 text-white w-10 h-10 rounded-full
                flex items-center justify-center cursor-pointer"
            >
                ‹
            </button>

            {/*오른쪽 버튼*/}
            <button
                onClick={() => {
                    stopAuto();
                    nextSlide();
                    startAuto();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                bg-black/40 text-white w-10 h-10 rounded-full
                flex items-center justify-center cursor-pointer"
            >
                ›
            </button>
        </div>
    );
}