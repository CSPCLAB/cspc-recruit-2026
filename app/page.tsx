"use client";

import Link from "next/link";
import ImageSlider from "./components/ImageSlider";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white">

      <section
        className="
          relative w-full 
          min-h-[50vh] 
          flex items-center
          px-6 lg:px-16
          bg-cover bg-center bg-no-repeat
        "
        style={{ backgroundImage: "url('/main_screan.png')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
            CSPCLAB
          </h1>

          <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed">
            <span className="text-blue-600 font-semibold">소수정예</span>를 지향하는<br />
            서강대학교 소프트웨어융합대학 학회
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/apply/about">
              <button
                className="
                  px-6 py-3 
                  sm:px-8 sm:py-4
                  text-lg sm:text-xl
                  font-semibold
                  rounded-full
                  bg-black
                  hover:bg-gray-900
                  active:scale-105
                  transition-all duration-200
                  shadow-lg shadow-gray-500/30
                "
              >
                지원안내
              </button>
            </Link>

            <Link href="/apply">
              <button
                className="
                  px-6 py-3 
                  sm:px-8 sm:py-4
                  text-lg sm:text-xl
                  font-semibold
                  rounded-full
                  bg-black
                  hover:bg-gray-900
                  active:scale-105
                  transition-all duration-200
                  shadow-lg shadow-gray-500/30
                "
              >
                지원하기
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-black py-24">
        <div className="w-full max-w-[1300px] mx-auto px-6 text-center">

          <div className="flex flex-col md:flex-row justify-between gap-12 w-full">

            <div className="md:w-[280px]">
              <h3 className="text-xl font-semibold mb-4 text-white">
                랩실관리
              </h3>
              <p className="text-gray-400 leading-relaxed">
                다산관 104, 105호를 관리합니다.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                스터디/프로젝트
              </h3>
              <p className="text-gray-400 leading-relaxed">
                함께 배우고 싶은 것 무엇이든 응원합니다.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                선배 찬스
              </h3>
              <p className="text-gray-400 leading-relaxed">
                언제든 물어볼 수 있는 선배가 있어 든든합니다.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-white text-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-12">
            소수라서 더 끈끈한
          </h2>
          <div className="max-w-4xl mx-auto">
            <ImageSlider />
          </div>
        </div>
      </section>

      <section className="bg-black text-black py-12 md:py-18">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs sm:text-base md:text-lg text-gray-400 leading-relaxed">
            CSPCLAB은 함께 협력하고 고민하며 성장하는 공동체입니다.
            <br />
            깊이 있는 학습과 프로젝트를 통해 우리의 기반을 단단히 다집니다.
          </p>

          <div className="mt-8">
            <Link href="/about">
              <button
                className="
                  px-8 py-4 
                  sm:px-5 sm:py-3
                  text-lg sm:text-lg
                  font-semibold
                  rounded-full
                  bg-gray-100
                  hover:bg-gray-400
                  active:scale-105
                  transition-all duration-200
                  shadow-lg shadow-gray-300/30
                "
              >
                더 많은 이야기 +
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}