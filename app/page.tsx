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

          <div className="mt-10">
            <Link href="/apply">
              <button
                className="
                  px-8 py-4 
                  sm:px-10 sm:py-5
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
                지원하기 →
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-black py-24">
        <div className="w-full max-w-[1800px] mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-16">
            Why CSPCLAB?
          </h2>

          <div className="flex flex-col md:flex-row justify-between gap-12 w-full">

            <div className="md:w-[280px]">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">
                Deep Study
              </h3>
              <p className="text-gray-400 leading-relaxed">
                알고리즘, 시스템, 백엔드 등
                깊이 있는 학습을 지향합니다.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">
                Small Elite
              </h3>
              <p className="text-gray-400 leading-relaxed">
                소수 인원 운영으로
                밀도 높은 성장 환경을 만듭니다.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">
                Real Project
              </h3>
              <p className="text-gray-400 leading-relaxed">
                실전 프로젝트를 통해
                문제 해결 능력을 기릅니다.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-white text-black py-24">
        <div className="max-w-[1600px] mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center">
            Our Activities
          </h2>
          <ImageSlider />
        </div>
      </section>

      <section className="bg-black text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-2xl sm:text-3xl font-bold mb-10">
            About CSPCLAB
          </h2>

          <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
            CSPCLAB은 함께 협력하고 고민하며 성장하는 공동체입니다.
            <br />
            깊이 있는 학습과 프로젝트를 통해 우리의 기반을 단단히 다집니다.
          </p>

          <div className="w-20 h-1 bg-blue-900 mx-auto mt-12 rounded-full"></div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mt-16">
            <p className="text-lg sm:text-xl text-black">
              지금, CSPCLAB과 함께 성장하세요.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}