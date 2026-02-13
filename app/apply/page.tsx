"use client";

import {createClient} from "@/app/lib/supabase/client";
import {useState} from "react";

export default function ApplyPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      student_id: formData.get("student_id") as string,
      department: formData.get("department") as string,
      phone: formData.get("phone") as string,
      intro: formData.get("intro") as string,
      motivation: formData.get("motivation") as string,
      goal: formData.get("goal") as string,
      comment: formData.get("comment") as string,
    };

    const {error} = await supabase
      .from("applicants")
      .insert([data]);

      if(error){
        console.error(error);
        alert("저장 중 오류가 발생하였습니다.");
        setLoading(false);
        return;
      }

      alert("지원이 완료되었습니다.");
      form.reset();
      setLoading(false);
  }

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
              자기소개 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="intro"
              minLength={200}
              required
              rows={5}
              className="w-full border border-gray-300 bg-white text-black rounded-lg px-4 py-2 resize-none"
            />
            <p className="text-sm text-gray-400 mt-1">
              최소 200자 이상 작성해주세요.
            </p>
          </div>

          {/* 지원 동기 */}
          <div>
            <label className="block font-medium mb-1 text-black">
              지원 동기 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="motivation"
              minLength={100}
              required
              rows={4}
              className="w-full border border-gray-300 bg-white text-black rounded-lg px-4 py-2 resize-none"
            />
            <p className="text-sm text-gray-400 mt-1">
              최소 100자 이상 작성해주세요.
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

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "제출 중..." : "지원하기"}
          </button>
        </form>
      </div>
    </main>
  );
}
