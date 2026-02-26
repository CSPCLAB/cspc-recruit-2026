"use client";

import Image from "next/image";
import Link from "next/link";
import ImageSlider from "./components/ImageSlider";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white flex flex-col">

      <section className="w-full bg-black py-10 px-5">
        <div className="max-w-4xl mx-auto text-left">
          <p className="text-lg tracking-widest text-white font-semibold mb-4 leading-9">
            CSPCLAB은<br />
            <span className="text-blue-500">소수정예</span>
            를 지향하는<br />서강대학교 소프트웨어융합대학<br />학회입니다.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto">
        <ImageSlider />
      </div>

      <section className="w-full py-8 px-5">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-10">
          <p className="w-[25vw] h-[25vw] max-w-[160px] max-h-[160px]
              rounded-full text-lg tracking-normal text-gray-100 font-semibold mb-4 leading-relaxed bg-blue-600 flex items-center justify-center text-center">
            지원 기간<br />3/3~3/10
          </p>
          <p className="w-[25vw] h-[25vw] max-w-[160px] max-h-[160px] 
              rounded-full text-lg tracking-normal text-gray-100 font-semibold mb-4 leading-relaxed bg-blue-600 flex items-center justify-center text-center">
            면접 기간<br />3/11~3/13
          </p>
          <p className="w-[25vw] h-[25vw] max-w-[160px] max-h-[160px]
              rounded-full text-lg tracking-normal text-gray-100 font-semibold mb-4 leading-relaxed bg-blue-600 flex items-center justify-center text-center">
            합류<br />3월 중 예정
          </p>
        </div>
      </section>

      <div className="flex flex-col items-center gap-2 mt-8">
        <Link href="/apply">
          <button className="text-white bg-blue-600 px-6 py-3 rounded-xl text-xl font-semibold">
            CSPC 지원하기
          </button>
        </Link>
      </div>
    </main>
  );
}