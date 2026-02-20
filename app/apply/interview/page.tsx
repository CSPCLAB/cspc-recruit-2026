"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InterviewPage() {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const router = useRouter();
  // 면접일
  const interviewDates = [
    "2026년 3월 11일 (수) 18:00",
    "2026년 3월 12일 (목) 18:00",
    "2026년 3월 13일 (금) 18:00",
  ];

  const toggleDate = (date: string) =>{
    if(selectedDates.includes(date)){
        setSelectedDates(selectedDates.filter((d) => d !== date));
    }
    else{
        setSelectedDates([...selectedDates, date]);
    }
  };

  const handleSubmit = () => {
    if (selectedDates.length === 0) {
      alert("면접일을 1개 이상 선택해주세요.");
      return;
    }

    alert(`선택한 면접일:\n${selectedDates.join("\n")}`);
    
    // 완료 페이지로 이동
    router.push("/apply/complete");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 md:px-10 py-10">
      <div className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 transition-all">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-black">
          면접일 선택
        </h1>
        <p className="text-gray-500 mb-8 text-sm sm:text-base">
          가능한 면접 날짜를 모두 선택해주세요.
        </p>

        <div className="grid gap-4 mb-10">
          {interviewDates.map((date) => (
            <button
              key={date}
              onClick={() => toggleDate(date)}
              className={`w-full py-3 sm:py-4 rounded-xl border text-sm sm:text-base md:text-lg font-medium transition-all
                ${
                  selectedDates.includes(date)
                    ? "bg-black text-white border-black scale-[1.02]"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {date}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          제출하기
        </button>
      </div>
    </main>
  );
}