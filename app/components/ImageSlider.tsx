"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const slides = [
    { src: "/slide-1.jpg", alt: "cspc 활동 1" },
    { src: "/slide-2.jpg", alt: "cspc 활동 2" },
    { src: "/slide-3.jpg", alt: "cspc 활동 3" },
    { src: "/slide-4.jpg", alt: "cspc 활동 4" },
];

const loopSlides = [...slides, slides[0]];

export default function ImageSlider() {
    const [idx, setIdx] = useState(0);
    const [transitionOn, setTransitionOn] = useState(true);
    const timeRef = useRef<number | null>(null);

    const nextSlide = () => {
        setIdx((prev) => prev + 1);
    };

    const prevSlide = () => {
        if (idx === 0) return;
        setIdx((prev) => prev - 1);
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

    useEffect(() => {
        startAuto();
        return () => stopAuto();
    }, []);

    return (
        <div className="w-full relative">
            {/*슬라이드*/}
            <div className="relative w-full overflow-hidden bg-black
                min-h-[300px] sm:min-h-[400px] lg:min-h-[520px]"
                style={{ aspectRatio: "16 / 9" }}
            >

                <div
                    className="flex w-full h-full"
                    style={{
                        transform: `translate3d(-${idx * 100}%, 0, 0)`,
                        transition: transitionOn ? "transform 700ms ease-in-out" : "none",
                    }}
                >
                    {loopSlides.map((slide, i) => (
                        <div key={i} className="relative basis-full shrink-0 h-full">
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.src}
                                    alt=""
                                    fill
                                    className="object-cover blur-2xl scale-110"
                                />
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    className="object-contain pointer-events-none"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/*점*/}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${i === idx % slides.length
                                ? "bg-white scale-125" : "bg-black/40"
                                }`}
                        />
                    ))}
                </div>

                {/*왼쪽 버튼*/}
                <button
                    onClick={() => {
                        stopAuto();
                        prevSlide();
                        startAuto();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30
                text-white drop-shadow text-4xl font-bold
                hover:scale-110 transition cursor-pointer"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30
                text-white drop-shadow text-4xl font-bold
                hover:scale-110 transition cursor-pointer"
                >
                    ›
                </button>
            </div>
        </div>
    );
}