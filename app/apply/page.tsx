"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplyPage() {
  const [loading, setLoading] = useState(false);
  const [intro, setIntro] = useState("");
  const [motivation, setMotivation] = useState("");
  const [introTouched, setIntroTouched] = useState(false);
  const [motivationTouched, setMotivationTouched] = useState(false);
  const router = useRouter();


  const introMin = 200;
  const motivationMin = 100;

  const isValid = intro.trim().length >= introMin && motivation.trim().length >= motivationMin;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!isValid){
      alert("글자 수 조건을 충족해주세요.");
      return;
    }

    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      student_id: formData.get("student_id"),
      department: formData.get("department"),
      phone: formData.get("phone"),
      intro: formData.get("intro"),
      motivation: formData.get("motivation"),
      goal: formData.get("goal"),
      comment: formData.get("comment"),
    };

    try {
      const res = await fetch("/api/applications/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "오류가 발생했습니다.");
        setLoading(false);
        return;
      }

      router.push("/apply/interview");
      
    } catch (error) {
      console.error(error);
      alert("서버 오류가 발생했습니다.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-black">2026 CSPC 학회원 모집</h1>
        <p className="text-gray-500 mb-8">
          아래 항목을 정확하게 작성해 주세요.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이름 */}
          <div>
            <label className="block font-medium mb-1 text-black">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full border border-gray-300 bg-white text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* 학번 */}
          <div>
            <label className="block font-medium mb-1 text-black">
              학번 <span className="text-red-500">*</span>
            </label>
            <input
              name="student_id"
              type="text"
              placeholder="20261234"
              required
              className="w-full border border-gray-300 bg-white text-black rounded-lg px-4 py-2"
            />
            <p className="text-sm text-gray-400 mt-1">
              중복 지원은 불가능합니다.
            </p>
          </div>

          {/* 학과 */}
          <div>
            <label className="block font-medium mb-1 text-black">
              학과 <span className="text-red-500">*</span>
            </label>
            <input
              name="department"
              type="text"
              required
              className="w-full border border-gray-300 bg-white text-black rounded-lg px-4 py-2"
            />
          </div>

          {/* 전화번호 */}
          <div>
            <label className="block font-medium mb-1 text-black">
              전화번호 <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              type="text"
              placeholder="010-1234-5678"
              required
              className="w-full border border-gray-300 bg-white text-black rounded-lg px-4 py-2"
            />
          </div>

          {/* 자기소개 */}
          <div>
            <label className="block font-medium mb-1 text-black">
              자기소개(200자 이상) <span className="text-red-500">*</span>
            </label>
            <textarea
              name="intro"
              value={intro}
              onChange={(e)=>setIntro(e.target.value)}
              onBlur={()=> setIntroTouched(true)}
              rows={5}
              className={`w-full border rounded-lg px-4 py-2 resize-none ${
                introTouched && intro.trim().length < introMin
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
            />
            <p
              className={`text-sm mt-1 ${
                introTouched && intro.trim().length < introMin
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {intro.trim().length} / {introMin}자
            </p>
          </div>

          {/* 지원 동기 */}
          <div>
            <label className="block font-medium mb-1 text-black">
              지원 동기(100자 이상) <span className="text-red-500">*</span>
            </label>
            <textarea
              name="motivation"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              onBlur={()=>setMotivationTouched(true)}
              rows={4}
              className={`w-full border rounded-lg px-4 py-2 resize-none ${
                motivationTouched && motivation.trim().length < motivationMin
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
            />
            <p
              className={`text-sm mt-1 ${
                motivationTouched && motivation.trim().length < motivationMin
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {motivation.trim().length} / {motivationMin}자
            </p>
          </div>

          {/* 목표 */}
          <div>
            <label className="block font-medium mb-1 text-black">
              하고 싶은 것 / 배우고 싶은 것 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="goal"
              required
              rows={3}
              className="w-full border border-gray-300 bg-white text-black rounded-lg px-4 py-2 resize-none"
            />
          </div>

          {/* 코멘트 */}
          <div>
            <label className="block font-medium mb-1 text-black">
              하고 싶은 말 <span className="text-gray-400">(선택)</span>
            </label>
            <textarea
              name="comment"
              rows={3}
              className="w-full border border-gray-300 bg-white text-black rounded-lg px-4 py-2 resize-none"
            />
          </div>

          {/* 면접 페이지 넘어가는 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "..." : "면접일 선택하기"}
          </button>
        </form>
      </div>
    </main>
  );
}
