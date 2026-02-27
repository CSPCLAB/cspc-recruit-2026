"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function InterviewPage() {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 페이지 로드시 학번 가져오기 (URL 쿼리 또는 로컬스토리지)
  useEffect(() => {
    const id = searchParams.get("student_id") || localStorage.getItem("pending_student_id");
    if (!id) {
      alert("지원자 정보를 찾을 수 없습니다. 다시 시도해주세요.");
      router.push("/apply");
      return;
    }
    setStudentId(id);
  }, [searchParams, router]);

  const interviewDates = [
    "2026년 3월 11일 (수) 18:00", "2026년 3월 11일 (수) 18:20",
    "2026년 3월 11일 (수) 18:40", "2026년 3월 11일 (수) 19:00",
    "2026년 3월 11일 (수) 19:20", "2026년 3월 11일 (수) 19:40",
    "2026년 3월 11일 (수) 20:00", "2026년 3월 11일 (수) 20:40",
    "2026년 3월 12일 (목) 18:00", "2026년 3월 12일 (목) 18:20",
    "2026년 3월 12일 (목) 18:40", "2026년 3월 12일 (목) 19:00",
    "2026년 3월 12일 (목) 19:20", "2026년 3월 12일 (목) 19:40",
    "2026년 3월 12일 (목) 20:00", "2026년 3월 12일 (목) 20:40",
    "2026년 3월 13일 (금) 18:00", "2026년 3월 13일 (금) 18:20",
    "2026년 3월 13일 (금) 18:40", "2026년 3월 13일 (금) 19:00",
    "2026년 3월 13일 (금) 19:20", "2026년 3월 13일 (금) 19:40",
    "2026년 3월 13일 (금) 20:00", "2026년 3월 13일 (금) 20:40",
  ];

  const toggleDate = (date: string) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleSubmit = async () => {
    if (selectedDates.length === 0) {
      alert("면접일을 1개 이상 선택해주세요.");
      return;
    }

    if (!studentId) return;

    const confirmSubmit = confirm("선택하신 면접 시간으로 제출하시겠습니까?");
    if (!confirmSubmit) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/applications/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          selectedDates: selectedDates,
        }),
      });

      if (response.ok) {
        // 성공 시 로컬스토리지 정리 후 이동
        localStorage.removeItem("pending_student_id");
        router.push("/apply/complete");
      } else {
        const error = await response.json();
        alert(error.message || "제출 중 오류가 발생했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("서버 통신 에러가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 md:px-10 py-10">
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[75%] bg-white text-black rounded-2xl shadow-lg p-6 sm:p-8 transition-all">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">면접일 선택</h1>
        <p className="text-gray-500 mb-8">가능한 면접 날짜를 모두 선택해주세요.</p>

        <div className="grid gap-4 mb-10 max-h-[50vh] overflow-y-auto pr-2">
          {interviewDates.map((date) => (
            <button
              key={date}
              onClick={() => toggleDate(date)}
              className={`w-full py-3 sm:py-4 rounded-xl border text-sm sm:text-base font-medium transition-all
                ${selectedDates.includes(date)
                  ? "bg-black text-white border-black scale-[1.01]"
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
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="w-full bg-gray-200 text-black py-3 rounded-xl font-semibold hover:bg-gray-300 disabled:opacity-50"
          >
            ← 뒤로가기
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl active:scale-[0.98] transition-all disabled:bg-gray-400"
          >
            {isSubmitting ? "제출 중..." : "제출하기"}
          </button>
        </div>
      </div>
    </main>
  );
}