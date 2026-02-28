"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function InterviewPage() {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const router = useRouter();
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("applyForm");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
    else {
      alert("지원서 정보가 없습니다.");
      router.push("/apply");
    }
  }, []);

  // 면접일
  const interviewDates = [
    "2026년 3월 11일 (수) 18:00",
    "2026년 3월 11일 (수) 18:20",
    "2026년 3월 11일 (수) 18:40",
    "2026년 3월 11일 (수) 19:00",
    "2026년 3월 11일 (수) 19:20",
    "2026년 3월 11일 (수) 19:40",
    "2026년 3월 11일 (수) 20:00",
    "2026년 3월 11일 (수) 20:40",
    "2026년 3월 12일 (목) 18:00",
    "2026년 3월 12일 (목) 18:20",
    "2026년 3월 12일 (목) 18:40",
    "2026년 3월 12일 (목) 19:00",
    "2026년 3월 12일 (목) 19:20",
    "2026년 3월 12일 (목) 19:40",
    "2026년 3월 12일 (목) 20:00",
    "2026년 3월 12일 (목) 20:40",
    "2026년 3월 13일 (금) 18:00",
    "2026년 3월 13일 (금) 18:20",
    "2026년 3월 13일 (금) 18:40",
    "2026년 3월 13일 (금) 19:00",
    "2026년 3월 13일 (금) 19:20",
    "2026년 3월 13일 (금) 19:40",
    "2026년 3월 13일 (금) 20:00",
    "2026년 3월 13일 (금) 20:40",
  ];

  const toggleDate = (date: string) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    }
    else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleSubmit = async () => {
    if (!formData) return;

    if (selectedDates.length === 0) {
      alert("면접일을 1개 이상 선택해주세요.");
      return;
    }

    const confirmSubmit = confirm("제출하시겠습니까?");
    if (!confirmSubmit) return;

    const data = {
      ...formData,
      //interview_dates: selectedDates,
    };

    const res = await fetch("/api/applications/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert("저장 중 오류 발생");
      return;
    }

    localStorage.removeItem("applyForm");

    // 완료 페이지로 이동
    router.push("/apply/complete");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 md:px-10 py-10">
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[75%] bg-white text-black rounded-2xl shadow-lg p-6 sm:p-8 transition-all">
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
                ${selectedDates.includes(date)
                  ? "bg-black text-white border-black scale-[1.02]"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {date}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => router.push("/apply")}
            className="w-full bg-gray-200 text-black py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
          >
            ← 뒤로가기
          </button>

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] trasition-all duration-200"
          >
            제출하기
          </button>
        </div>
      </div>
    </main>
  );
}