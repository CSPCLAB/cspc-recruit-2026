"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ApplyPage() {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");
  const [comment, setComment] = useState("");


  //글자수 표기
  const [intro, setIntro] = useState("");
  const [motivation, setMotivation] = useState("");
  const [introTouched, setIntroTouched] = useState(false);
  const [motivationTouched, setMotivationTouched] = useState(false);

  //전화번호, 학번 형식
  const [studentIdError, setStudentIdError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  //신환회 참여 여부
  const [orientation, setOrientation] = useState(false);

  const router = useRouter();

  //지원 시간
  const APPLY_START = new Date("2026-03-03T00:00:00");
  const APPLY_END = new Date("2026-03-09T23:59:59");

  /*
  useEffect(()=>{
    const now = new Date();
    if(now < APPLY_START){
      router.replace("/apply/not-open");
    }
    else if(now > APPLY_END){
      router.replace("/apply/closed");
    }
  }, [router]);
  */


  const introMin = 200;
  const motivationMin = 100;

  const isFirstRender = useRef(true);

  useEffect(() => {
    const saved = localStorage.getItem("applyForm");
    if (saved) {
      const data = JSON.parse(saved);
      setName(data.name || "");
      setStudentId(data.student_id || "");
      setDepartment(data.department || "");
      setPhone(data.phone || "");
      setGoal(data.goal || "");
      setComment(data.comment || "");
      setIntro(data.intro || "");
      setMotivation(data.motivation || "");
      setOrientation(data.orientation || false);
    }
  }, []);//

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const data = {
      name,
      student_id: studentId,
      department,
      phone,
      goal,
      comment,
      intro,
      motivation,
      orientation,
    };
    localStorage.setItem("applyForm", JSON.stringify(data));
  }, [
    name,
    studentId,
    department,
    phone,
    goal,
    comment,
    intro,
    motivation,
    orientation,
  ]);

  //글자수 확인
  const isValid = intro.trim().length >= introMin && motivation.trim().length >= motivationMin;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) {
      alert("글자 수 조건을 충족해주세요.");
      return;
    }

    setLoading(true);

    const studentIdValid = /^\d{8}$/.test(studentId);
    const phoneValid = /^010-\d{4}-\d{4}$/.test(phone);

    if (!studentIdValid) {
      setStudentIdError(true);
      alert("학번을 올바르게 입력해주세요.");
      setLoading(false);
      return;
    }

    if (!phoneValid) {
      setPhoneError(true);
      alert("전화번호를 010-1234-5678 형식으로 입력해주세요.");
      setLoading(false);
      return;
    }

    router.push("/apply/interview");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[75%] bg-white text-black rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">2026 CSPC 학회원 모집</h1>
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
              value={name}
              name="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
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
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                setStudentIdError(false);
              }}
              className={`w-full border bg-white text-black rounded-lg px-4 py-2 ${studentIdError ? "border-red-400" : "border-gray-300"
                }`}
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
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
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
              value={phone}
              name="phone"
              type="text"
              placeholder="010-1234-5678"
              required
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError(false);
              }}
              className={`w-full border bg-white text-black rounded-lg px-4 py-2 ${phoneError ? "border-red-400" : "border-gray-300"
                }`}
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
              onChange={(e) => setIntro(e.target.value)}
              onBlur={() => setIntroTouched(true)}
              rows={5}
              className={`w-full border rounded-lg px-4 py-2 resize-none ${introTouched && intro.trim().length < introMin
                  ? "border-red-400"
                  : "border-gray-300"
                }`}
            />
            <p
              className={`text-sm mt-1 ${introTouched && intro.trim().length < introMin
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
              onBlur={() => setMotivationTouched(true)}
              rows={4}
              className={`w-full border rounded-lg px-4 py-2 resize-none ${motivationTouched && motivation.trim().length < motivationMin
                  ? "border-red-400"
                  : "border-gray-300"
                }`}
            />
            <p
              className={`text-sm mt-1 ${motivationTouched && motivation.trim().length < motivationMin
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
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              name="comment"
              rows={3}
              className="w-full border border-gray-300 bg-white text-black rounded-lg px-4 py-2 resize-none"
            />
          </div>

          {/* 신환회 참여 여부 */}
          <div>
            <label className="block font-medium mb-2 text-black">
              3월 19일(목) 신입생 환영회는 필참 입니다!
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={orientation}
                onChange={(e) => setOrientation(e.target.checked)}
                className="w-5 h-5"
              />
              <span className="text-black">
                참여 가능합니다.
              </span>
            </label>
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
