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
    } else {
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
    "2026년 3월 11일 (수) 20:20",
    "2026년 3월 11일 (수) 20:40",
    "2026년 3월 12일 (목) 18:00",
    "2026년 3월 12일 (목) 18:20",
    "2026년 3월 12일 (목) 18:40",
    "2026년 3월 12일 (목) 19:00",
    "2026년 3월 12일 (목) 19:20",
    "2026년 3월 12일 (목) 19:40",
    "2026년 3월 12일 (목) 20:00",
    "2026년 3월 12일 (목) 20:20",
    "2026년 3월 12일 (목) 20:40",
    "2026년 3월 13일 (금) 18:00",
    "2026년 3월 13일 (금) 18:20",
    "2026년 3월 13일 (금) 18:40",
    "2026년 3월 13일 (금) 19:00",
    "2026년 3월 13일 (금) 19:20",
    "2026년 3월 13일 (금) 19:40",
    "2026년 3월 13일 (금) 20:00",
    "2026년 3월 13일 (금) 20:20",
    "2026년 3월 13일 (금) 20:40",
  ];

  // 날짜별 그룹화
  const groupedDates = interviewDates.reduce((acc: any, date) => {
    const parts = date.split(" ");
    const day = `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`; 
    // 예: 2026년 3월 11일 (수)

    if (!acc[day]) acc[day] = [];
    acc[day].push(date);
    return acc;
  }, {});

  const toggleDate = (date: string) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    } else {
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
      selectedDates: selectedDates,
    };

    const res = await fetch("/api/applications/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "알 수 없는 오류" }));
      alert("저장 실패: " + (err.message || "서버 오류"));
      return;
    }

    localStorage.removeItem("applyForm");
    router.push("/apply/complete");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 md:px-10 py-10">
      <div className="w-full sm:w-[90%] md:w-[85%] lg:w-[80%] bg-white text-black rounded-2xl shadow-lg p-6 sm:p-8 transition-all">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          면접일 선택
        </h1>
        <p className="text-gray-500 mb-10 text-sm sm:text-base">
          가능한 면접 날짜를 모두 선택해주세요.
        </p>

        {/* 날짜별 배치 (데스크탑 3열, 모바일 1열) */}
        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-8 mb-10">
          {Object.entries(groupedDates).map(([day, dates]: any) => (
            <div key={day}>
              <h2 className="text-lg sm:text-xl font-bold mb-4 border-b pb-2">
                {day}
              </h2>

              <div className="space-y-3">
                {dates.map((date: string) => {
                  const time = date.split(" ").pop(); // 시간만 표시

                  return (
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
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
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
            className="w-full bg-black text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            제출하기
          </button>
        </div>
      </div>
    </main>
  );
}