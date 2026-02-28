"use client";

import { useRouter } from "next/navigation";

export default function ApplyInfoPage() {
  const router = useRouter();

  const targets = [
    "좁고 깊은 관계를 추구하는 사람",
    "할 땐 하고 놀 땐 노는 사람",
    "랩실에 자주 나올 수 있는 사람",
    "같이 눈사람 만들어 줄 사람",
    "배우고자 하는 의지가 있는 사람",
    "이걸 모두 읽고 있는 당신",
  ];

  return (
    <main className="min-h-screen bg-gray-100 text-black">
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
            CSPC는 개발과 성장을 지향합니다.
          </p>
          <div className="border-b-2 border-black w-full" />
        </section>

        {/* 지원 대상 */}
        <section className="mb-[clamp(60px,8vw,140px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[clamp(16px,3vw,40px)]">
            {targets.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-2xl p-[clamp(20px,3vw,40px)] 
                flex flex-col items-center justify-center text-center 
                transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 cursor-pointer"
              >
                <div className="w-[clamp(60px,8vw,100px)] h-[clamp(60px,8vw,100px)] rounded-full border flex items-center justify-center mb-[clamp(10px,2vw,20px)] text-[clamp(18px,3vw,32px)]">
                  👤
                </div>
                <p className="text-[clamp(13px,1.5vw,18px)] font-medium">
                  {item}
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

          <div className="flex flex-col md:flex-row items-center justify-center gap-[clamp(20px,4vw,60px)]">
            
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