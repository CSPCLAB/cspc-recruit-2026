"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

// 면접 시간 슬롯 정의
const INTERVIEW_DATES = [
    { label: "3/11 (수)", key: "3월 11일 (수)" },
    { label: "3/12 (목)", key: "3월 12일 (목)" },
    { label: "3/13 (금)", key: "3월 13일 (금)" },
];

const INTERVIEW_TIMES = [
    "18:00", "18:20", "18:40",
    "19:00", "19:20", "19:40",
    "20:00", "20:40",
];

export default function AdminDashboard() {
    const router = useRouter();
    const supabase = createClient();

    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    // 탭: "applications" | "interview"
    const [activeTab, setActiveTab] = useState<"applications" | "interview">("applications");
    // 면접 배분 탭에서 선택한 날짜
    const [activeDate, setActiveDate] = useState(INTERVIEW_DATES[0].key);

    const handleDownloadExcel = () => {
        window.location.href = "/api/admin/applications/excel";
    };

    // 관리자 체크
    useEffect(() => {
        const checkAdmin = async () => {
            const { data } = await supabase.auth.getUser();
            if (!data.user) { router.push("/login"); return; }
            if (data.user.email !== "cspc2026gang@sogang.ac.kr") {
                alert("관리자만 접근 가능");
                router.push("/");
                return;
            }
            setIsAdmin(true);
        };
        checkAdmin();
    }, []);

    // 지원자 불러오기
    useEffect(() => {
        if (!isAdmin) return;
        const fetchApplicants = async () => {
            try {
                const res = await fetch("/api/admin/applications");
                const result = await res.json();
                if (!res.ok || !result.applicants) {
                    setApplicants([]);
                    return;
                }
                setApplicants(result.applicants);

            } catch (err) {
                console.error("에러 발생:", err);
                setApplicants([]);
            } finally {
                setLoading(false);
            }
        };
        fetchApplicants();
    }, [isAdmin]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    // 면접 배분: 특정 날짜+시간에 가능한 지원자 목록
    const getAvailableApplicants = (dateKey: string, time: string) => {
        const slot = `2026년 ${dateKey} ${time}`;
        return applicants.filter((app) => {
            const dates: string[] = app.interview_periods ?? [];
            return dates.includes(slot);
        });
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-gray-500">
            로딩 중...
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50" style={{ colorScheme: 'light' }}>
            {/* 헤더 */}
            <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-black">CSPC 관리자</h1>
                <div className="flex gap-3">
                    <button
                        onClick={handleDownloadExcel}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                    >
                        엑셀 다운로드
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                    >
                        로그아웃
                    </button>
                </div>
            </header>

            {/* 탭 네비게이션 */}
            <div className="bg-white border-b px-8">
                <div className="flex gap-0">
                    {[
                        { key: "applications", label: `지원서 확인 (${applicants.length}명)` },
                        { key: "interview", label: "면접 배분" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab.key
                                ? "border-black text-black"
                                : "border-transparent text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 탭 컨텐츠 */}
            <main className="px-8 py-6">
                {/* ──── 탭 1: 지원서 확인 ──── */}
                {activeTab === "applications" && (
                    <div>
                        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-left">
                                        <th className="px-4 py-3 font-medium border-b">이름</th>
                                        <th className="px-4 py-3 font-medium border-b">학번</th>
                                        <th className="px-4 py-3 font-medium border-b">학과</th>
                                        <th className="px-4 py-3 font-medium border-b">전화번호</th>
                                        <th className="px-4 py-3 font-medium border-b">신환회</th>
                                        <th className="px-4 py-3 font-medium border-b">지원일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applicants.map((app) => (
                                        <tr
                                            key={app.id}
                                            className="cursor-pointer hover:bg-gray-50 transition border-b last:border-0"
                                            onClick={() => router.push(`/admin/dashboard/${app.id}`)}
                                        >
                                            <td className="px-4 py-3 font-medium text-black">{app.name}</td>
                                            <td className="px-4 py-3 text-gray-600">{app.student_id}</td>
                                            <td className="px-4 py-3 text-gray-600">{app.department}</td>
                                            <td className="px-4 py-3 text-gray-600">{app.phone}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${app.orientation
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-500"
                                                    }`}>
                                                    {app.orientation ? "참여" : "미참여"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500">
                                                {new Date(app.created_at).toLocaleString("ko-KR")}
                                            </td>
                                        </tr>
                                    ))}
                                    {applicants.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                                                지원자가 없습니다.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ──── 탭 2: 면접 배분 ──── */}
                {activeTab === "interview" && (
                    <div>
                        {/* 날짜 탭 */}
                        <div className="flex gap-2 mb-6">
                            {INTERVIEW_DATES.map((d) => (
                                <button
                                    key={d.key}
                                    onClick={() => setActiveDate(d.key)}
                                    className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition ${activeDate === d.key
                                        ? "bg-black text-white"
                                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {d.label}
                                </button>
                            ))}
                        </div>

                        {/* 시간대별 슬롯 */}
                        <div className="space-y-3">
                            {INTERVIEW_TIMES.map((time) => {
                                const available = getAvailableApplicants(activeDate, time);
                                return (
                                    <div key={time} className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-start gap-5 shadow-sm">
                                        {/* 시간 */}
                                        <div className="w-20 shrink-0">
                                            <span className="text-base font-bold text-black">{time}</span>
                                        </div>

                                        {/* 가능 인원 뱃지 */}
                                        <div className="w-20 shrink-0 pt-0.5">
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${available.length > 0
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-gray-100 text-gray-400"
                                                }`}>
                                                {available.length}명 가능
                                            </span>
                                        </div>

                                        {/* 지원자 목록 */}
                                        <div className="flex flex-wrap gap-2">
                                            {available.length === 0 ? (
                                                <span className="text-sm text-gray-300">가능한 지원자 없음</span>
                                            ) : (
                                                available.map((app) => (
                                                    <button
                                                        key={app.id}
                                                        onClick={() => router.push(`/admin/dashboard/${app.id}`)}
                                                        className="px-3 py-1.5 bg-gray-100 hover:bg-black hover:text-white text-gray-700 text-sm rounded-lg transition font-medium"
                                                    >
                                                        {app.name} ({app.student_id})
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
