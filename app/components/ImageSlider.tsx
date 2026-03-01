"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = {
  src: string;
  alt: string;
  desc: string;
};

const slides: Slide[] = [
  { src: "/about-1.jpg", alt: "CSPC 활동 1", desc: "25학년도 하계 졸업식" },
  { src: "/about-2.jpg", alt: "CSPC 활동 2", desc: "CSPC 학회원들과 봄소풍으로 간 롯데월드" },
  { src: "/about-3.jpg", alt: "CSPC 활동 3", desc: "스터디 활동 계획 발표" },
  { src: "/about-4.jpg", alt: "CSPC 활동 4", desc: "학회원들과 함께하는 스터디 공부" },
  { src: "/about-5.jpg", alt: "CSPC 활동 5", desc: "선배님들과 함께한 크리스마스 홈커밍 파티" },
];

// 마지막에 첫 장 추가해서 자연스럽게 무한루프
const loopSlides = [...slides, slides[0]];

export default function ImageSliderAbout() {
  const [idx, setIdx] = useState(0);
  const [transitionOn, setTransitionOn] = useState(true);
  const timeRef = useRef<number | null>(null);

  const nextSlide = () => setIdx((prev) => prev + 1);

  // 메인과 똑같이: 0에서 이전 누르면 막아둠
  const prevSlide = () => {
    if (idx === 0) return;
    setIdx((prev) => prev - 1);
  };

  const startAuto = () => {
    if (timeRef.current !== null) return;
    timeRef.current = window.setInterval(nextSlide, 3500);
  };

  const stopAuto = () => {
    if (timeRef.current === null) return;
    clearInterval(timeRef.current);
    timeRef.current = null;
  };

  // 마지막(복제 슬라이드) 도달 시, transition 끄고 0으로 순간이동
  useEffect(() => {
    if (idx === slides.length) {
      setTimeout(() => {
        setTransitionOn(false);
        setIdx(0);
      }, 700); // transition duration과 맞추기
    }
  }, [idx]);

  // transitionOff로 순간이동 후 다음 프레임에 transition 다시 켜기
  useEffect(() => {
    if (!transitionOn) {
      requestAnimationFrame(() => setTransitionOn(true));
    }
  }, [transitionOn]);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full relative">
      {/* 슬라이드 영역 (메인과 동일: 고정 비율) */}
      <div className="relative w-full overflow-hidden bg-black aspect-[16/9] rounded-2xl">
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
                {/* blur 배경 */}
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  className="object-cover blur-2xl scale-110"
                  priority={i === 0}
                />
                {/* 본 이미지 */}
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-contain pointer-events-none"
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 점(클릭 X) */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === idx % slides.length ? "bg-white scale-125" : "bg-black/40"
              }`}
            />
          ))}
        </div>

        {/* 왼쪽 버튼 */}
        <button
          onClick={() => {
            stopAuto();
            prevSlide();
            startAuto();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30
          text-white drop-shadow text-4xl font-bold
          hover:scale-110 transition cursor-pointer"
          aria-label="이전 사진"
        >
          ‹
        </button>

        {/* 오른쪽 버튼 */}
        <button
          onClick={() => {
            stopAuto();
            nextSlide();
            startAuto();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30
          text-white drop-shadow text-4xl font-bold
          hover:scale-110 transition cursor-pointer"
          aria-label="다음 사진"
        >
          ›
        </button>
      </div>

      {/* 설명 */}
      <div className="mt-8 text-semibold text-center text-[clamp(18px,2vw,26px)] text-gray-700 transition-all duration-500">
        {slides[idx % slides.length].desc}
      </div>
    </div>
  );
}