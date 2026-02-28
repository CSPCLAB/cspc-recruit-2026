"use client";

import Link from "next/link";
import ImageSlider from "./components/ImageSlider";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">

      {/* 소개 문구 */}
      <section className="w-full bg-black py-16 lg:py-24 px-6">
        <div className="max-w-7xl mx-auto text-left">
          <p className="text-1xl sm:text-3xl lg:text-4xl tracking-widest text-white font-semibold mb-4 leading-snug">
            CSPCLAB은<br />
            <span className="text-blue-500">소수정예</span>
            를 지향하는<br />서강대학교 소프트웨어융합대학<br />학회입니다.
          </p>
        </div>
      </section>

      {/* 슬라이드 */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-10 lg:mt-14">
        <ImageSlider />
      </div>

      {/* 버튼 */}
      <div className="flex flex-col items-center gap-2 mt-6 mb-16">
        <Link href="/apply">
          <button className="text-white bg-black px-10 py-4 rounded-2xl text-2xl font-semibold
          transition-all duration-150
          hover:bg-gray-800
          active:bg-gray-600
          active:scale-105 cursor-pointer">
            CSPC 지원하기
          </button>
        </Link>
      </div>
    </main>
  );
}