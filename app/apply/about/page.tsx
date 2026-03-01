"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function ApplyInfoPage() {
  const router = useRouter();

  const targets = [
    {text : "좁고 깊은 관계를 추구하는 사람", img : "/face2.png"},
    {text : "할 땐 하고 놀 땐 노는 사람", img : "/face1.png"},
    {text : "랩실에 자주 나올 수 있는 사람", img : "/face4.png"},
    {text : "같이 눈사람 만들어 줄 사람", img : "/face3.png"},
    {text : "배우고자 하는 의지가 있는 사람", img : "/face6.png"},
    {text : "이걸 모두 읽고 있는 당신", img : "/face5.png"},
  ];

  const slides = [targets[targets.length-1], ...targets, targets[0]];
  const [current, setCurrent] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  //모바일 지원 대상 자동 슬라이드
  useEffect(()=>{
    timerRef.current = setInterval(()=>{
      setCurrent((prev) => (prev+1));
      setIsTransitioning(true);
    }, 2500);
    return () => {
      if(timerRef.current) clearInterval(timerRef.current);
    }
  }, []);

  const handleTransitionEnd=()=>{
    if(current >= slides.length-1){
      setIsTransitioning(false);
      setCurrent(1);
    }
    else if(current <= 0){
      setIsTransitioning(false);
      setCurrent(slides.length-2);
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* 상단 헤더 */}
      <div className="bg-black text-white py-[clamp(16px,3vw,28px)] text-center text-[clamp(18px,2.5vw,28px)] font-semibold">
        지원 안내
      </div>

      <div className="max-w-[1400px] mx-auto px-[clamp(16px,5vw,80px)] py-[clamp(40px,8vw,120px)]">
        
        {/* 소개 */}
        <section className="mb-[clamp(40px,6vw,100px)]">
          <h2 className="text-[clamp(16px,2vw,22px)] font-bold mb-3">
            CSPC 모집
          </h2>
          <p className="text-gray-600 text-[clamp(14px,1.5vw,18px)] mb-6">
            CSPC는 이런 분들과 잘 어울립니다.
          </p>
          <div className="border-b-2 border-black w-full" />
        </section>

        {/* 지원 대상 */}
        <section className="mb-[clamp(60px,8vw,140px)]">
          
          {/*모바일*/}
          <div className="sm:hidden relative overflow-hidden w-full">
            <div
              onTransitionEnd={handleTransitionEnd}
              className="flex"
              style={{
                transition: isTransitioning ? "transform 500ms ease-in-out" : "none",
                width: `${slides.length * 100}%`,
                transform: `translateX(-${(current * 100) / slides.length}%)`,
              }}
            >
              {slides.map((item, index) => (
                <div
                  key={index}
                  style={{width: `${100/slides.length}%`}}
                  className="flex-shrink-0 px-2"
                >
                  <div
                    className="border border-gray-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                    <div className="relative w-30 h-30 rounded-full border border-gray-500 overflow-hidden mb-4 bg-gray-50 flex items-center justify-center">
                      <div className="relative w-24 h-24">
                        <Image
                          src={item.img}
                          alt={item.text}
                          fill
                          sizes="96px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <p className="text-base font-semibold">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {targets.map((_, i) => {
                const isActive = (current === 0 ? targets.length-1 : (current-1)%targets.length) === i;
                return(  
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all ${isActive ? "w-4 bg-black" : "w-1.5 bg-gray-300"}`}
                  />
                );
              })}
            </div>
          </div>

          {/*데스트탑*/}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[clamp(16px,3vw,40px)]">
            {targets.map((item, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-2xl p-[clamp(20px,3vw,40px)] 
                flex flex-col items-center justify-center text-center 
                transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 cursor-pointer"
              >
                <div className="relative w-[clamp(100px,15vw,120px)] h-[clamp(100px,15vw,120px)] rounded-full border border-gray-700 overflow-hidden mb-4 bg-gray-50 flex items-center justify-center">
                  <div className="relative w-[clamp(80px,10vw,100px)] h-[clamp(80px,10vw,100px)]">  
                    <Image
                      src={item.img}
                      alt={item.text}
                      fill
                      sizes="(max-width:768px) 100vw, 120px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-[clamp(13px,1.5vw,18px)] font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 지원 절차 */}
        <section className="mb-[clamp(60px,8vw,140px)]">
          <h3 className="text-[clamp(16px,2vw,22px)] font-bold mb-4">
            지원 절차
          </h3>
          <div className="border-b-2 border-black w-full mb-[clamp(20px,3vw,50px)]" />

          <div className="flex flex-row md:flex-row items-center justify-center gap-[clamp(20px,4vw,60px)]">
            
            {/* 단계 */}
            {[
              { title: "서류", sub: "3/3 ~ 3/9", color: "bg-teal-400" },
              { title: "면접", sub: "3/11 ~ 3/13", color: "bg-teal-500" },
              { title: "합격", sub: "추후 개별 연락", color: "bg-teal-600" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-[clamp(20px,4vw,60px)]">
                
                <div
                  className={`w-[clamp(90px,15vw,170px)] h-[clamp(90px,15vw,170px)] 
                  rounded-full ${step.color} text-white 
                  flex flex-col items-center justify-center text-center 
                  text-[clamp(12px,1.5vw,18px)] font-semibold`}
                >
                  {step.title}
                  <br />
                  {step.sub}
                </div>

                {i < 2 && (
                  <span className="hidden md:block text-[clamp(20px,4vw,40px)] text-gray-400">
                    ›
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/apply")}
            className="bg-black text-white 
            px-[clamp(30px,6vw,80px)] 
            py-[clamp(10px,2vw,18px)] 
            text-[clamp(14px,1.5vw,18px)] 
            rounded-xl font-semibold 
            hover:bg-gray-800 transition-all duration-300"
          >
            지원하기
          </button>
        </div>
      </div>
    </main>
  );
}