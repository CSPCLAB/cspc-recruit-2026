"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = {
    src: string;
    alt: string;
    desc: string;
};

const slides: Slide[] = [
    {
        src: "/about-1.jpg",
        alt: "CSPC 활동 1",
        desc: "25학년도 하계 졸업식",
    },
    {
        src: "/about-2.jpg",
        alt: "CSPC 활동 2",
        desc: "CSPC 학회원들과 봄소풍으로 간 롯데월드",
    },
    {
        src: "/about-3.jpg",
        alt: "CSPC 활동 3",
        desc: "스터디 활동 계획 발표",
    },
    {
        src: "/about-4.jpg",
        alt: "CSPC 활동 4",
        desc: "학회원들과 함께하는 스터디 공부",
    },
    {
        src: "/about-5.jpg",
        alt: "CSPC 활동 5",
        desc: "선배님들과 함께한 크리스마스 홈커밍 파티",
    },
];

export default function ImageSliderAbout() {
    const [idx, setIdx] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // 타이머 시작 함수
    const startAutoSlide = () => {
        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setIdx((prev) => (prev + 1) % slides.length);
        }, 3500);
    };

    const nextSlide = () => {
        startAutoSlide(); // 클릭 시 타이머 리셋
        setIdx((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        startAutoSlide(); // 클릭 시 타이머 리셋
        setIdx((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        startAutoSlide();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    return (
        <div className="w-full flex flex-col items-center">

            {/* 슬라이더 (비율 자동) */}
            <div className="relative w-full max-w-5xl">
                <Image
                    src={slides[idx].src}
                    alt={slides[idx].alt}
                    width={1200}   // 아무 숫자여도 됨 (비율용)
                    height={800}   // 1200:800 = 3:2 비율
                    className="w-full h-auto rounded-2xl transition-all duration-700"
                    priority
                />

                {/* 좌우 버튼 */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2
          text-white text-4xl opacity-70 hover:opacity-100 transition cursor-pointer"
                >
                    ‹
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2
          text-white text-4xl opacity-70 hover:opacity-100 transition cursor-pointer"
                >
                    ›
                </button>

                {/* 점 */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, i) => (
                        <span
                            key={i}
                            className={`w-2.5 h-2.5 rounded-full transition-all
              ${i === idx ? "bg-white scale-125" : "bg-white/40"}`}
                        />
                    ))}
                </div>
            </div>

            {/* 설명 */}
            <div className="mt-8 text-semibold text-center text-[clamp(18px,2vw,26px)] text-gray-700 transition-all duration-500">
                {slides[idx].desc}
            </div>
        </div>
    );
}