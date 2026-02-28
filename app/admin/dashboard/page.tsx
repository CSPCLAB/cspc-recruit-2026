"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";


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

const ADMIN_EMAILS = [
    "cspc2026gang@sogang.ac.kr",
    "102030@sogang.ac.kr",
];

export default function AdminDashboard() {
    const router = useRouter();
    const supabase = createClient();

    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeTab, setActiveTab] = useState<"applications" | "interview" | "timetable">("applications");
    const [activeDate, setActiveDate] = useState(INTERVIEW_DATES[0].key);
    const [assigning, setAssigning] = useState<string | null>(null); // 진행 중인 배정 applicant id

    const handleDownloadExcel = () => {
        window.location.href = "/api/admin/applications/excel";
    };

    useEffect(() => {
        const checkAdmin = async () => {
            const { data } = await supabase.auth.getUser();
            if (!data.user) { router.push("/login"); return; }
            if (!ADMIN_EMAILS.includes(data.user.email ?? "")) {
                alert("관리자만 접근 가능");
                router.push("/");
                return;
            }
            setIsAdmin(true);
        };
        checkAdmin();
    }, []);

    const fetchApplicants = async () => {
        try {
            const res = await fetch("/api/admin/applications");
            const result = await res.json();
            if (!res.ok || !result.applicants) { setApplicants([]); return; }
            setApplicants(result.applicants);
        } catch { setApplicants([]); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        if (!isAdmin) return;
        fetchApplicants();
    }, [isAdmin]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    // 특정 슬롯에 배정
    const assignSlot = async (applicantId: string, slot: string) => {
        setAssigning(applicantId);
        try {
            const res = await fetch(`/api/admin/applications/${applicantId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ assigned_interview: slot }),
            });
            if (!res.ok) { alert("배정 실패"); return; }
            await fetchApplicants(); // 목록 새로고침
        } finally {
            setAssigning(null);
        }
    };

    // 배정 취소
    const cancelAssignment = async (applicantId: string) => {
        setAssigning(applicantId);
        try {
            const res = await fetch(`/api/admin/applications/${applicantId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ assigned_interview: null }),
            });
            if (!res.ok) { alert("취소 실패"); return; }
            await fetchApplicants();
        } finally {
            setAssigning(null);
        }
    };

    const getAvailableApplicants = (dateKey: string, time: string) => {
        const slot = `2026년 ${dateKey} ${time}`;
        return applicants.filter((app) => {
            const dates: string[] = app.interview_periods ?? [];
            return dates.includes(slot);
        });
    };

    const assignedApplicants = applicants.filter(a => a.assigned_interview);
    const unassignedApplicants = applicants.filter(a => !a.assigned_interview);


    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-gray-400" style={{ colorScheme: 'light' }}>
            로딩 중...
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50" style={{ colorScheme: 'light' }}>
            {/* 헤더 */}
            <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-black">CSPC 관리자</h1>
                <div className="flex gap-3">
                    <button onClick={handleDownloadExcel} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition">
                        엑셀 다운로드
                    </button>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition">
                        로그아웃
                    </button>
                </div>
            </header>

            {/* 탭 */}
            <div className="bg-white border-b px-8">
                <div className="flex">
                    {[
                        { key: "applications", label: `지원서 확인 (${applicants.length}명)` },
                        { key: "interview", label: `면접 배분 (배정완료 ${assignedApplicants.length} / 미배정 ${unassignedApplicants.length})` },
                        { key: "timetable", label: "시간표" },
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

            <main className="px-8 py-6">
                {/* ──── 탭 1: 지원서 확인 ──── */}
                {activeTab === "applications" && (
                    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-left">
                                    <th className="px-4 py-3 font-medium border-b">이름</th>
                                    <th className="px-4 py-3 font-medium border-b">학번</th>
                                    <th className="px-4 py-3 font-medium border-b">학과</th>
                                    <th className="px-4 py-3 font-medium border-b">전화번호</th>
                                    <th className="px-4 py-3 font-medium border-b">신환회</th>
                                    <th className="px-4 py-3 font-medium border-b">배정 면접</th>
                                    <th className="px-4 py-3 font-medium border-b">지원일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applicants.map((app) => (
                                    <tr key={app.id} className="cursor-pointer hover:bg-gray-50 transition border-b last:border-0"
                                        onClick={() => router.push(`/admin/dashboard/${app.id}`)}>
                                        <td className="px-4 py-3 font-medium text-black">{app.name}</td>
                                        <td className="px-4 py-3 text-gray-600">{app.student_id}</td>
                                        <td className="px-4 py-3 text-gray-600">{app.department}</td>
                                        <td className="px-4 py-3 text-gray-600">{app.phone}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${app.orientation ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                                {app.orientation ? "참여" : "미참여"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 text-xs">
                                            {app.assigned_interview
                                                ? <span className="text-blue-600 font-medium">{app.assigned_interview}</span>
                                                : <span className="text-gray-300">미배정</span>
                                            }
                                        </td>
                                        <td className="px-4 py-3 text-gray-400 text-xs">
                                            {new Date(app.created_at).toLocaleString("ko-KR")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ──── 탭 2: 면접 배분 ──── */}
                {activeTab === "interview" && (
                    <div className="space-y-6">

                        {/* 미배정 목록 */}
                        {unassignedApplicants.length > 0 && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                                <h3 className="text-sm font-semibold text-amber-700 mb-3">
                                    ⚠️ 미배정 지원자 ({unassignedApplicants.length}명)
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {unassignedApplicants.map((app) => (
                                        <span key={app.id} className="px-3 py-1.5 bg-white border border-amber-200 text-amber-800 text-sm rounded-lg font-medium">
                                            {app.name} ({app.student_id})
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {unassignedApplicants.length === 0 && applicants.length > 0 && (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                <p className="text-green-700 text-sm font-semibold">✅ 모든 지원자 배정 완료!</p>
                            </div>
                        )}

                        {/* 날짜 탭 */}
                        <div className="flex gap-2">
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
                                const slot = `2026년 ${activeDate} ${time}`;
                                const available = getAvailableApplicants(activeDate, time);
                                const assignedHere = applicants.filter(a => a.assigned_interview === slot);

                                return (
                                    <div key={time} className="bg-white rounded-xl border border-gray-200 px-5 py-4 shadow-sm">
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="text-base font-bold text-black w-16 shrink-0">{time}</span>
                                            {assignedHere.length > 0 ? (
                                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                                    배정됨: {assignedHere.map(a => a.name).join(", ")}
                                                </span>
                                            ) : (
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${available.length > 0 ? "bg-gray-100 text-gray-500" : "bg-gray-50 text-gray-300"}`}>
                                                    {available.length}명 가능
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {available.length === 0 ? (
                                                <span className="text-sm text-gray-300">가능한 지원자 없음</span>
                                            ) : (
                                                available.map((app) => {
                                                    const isAssignedHere = app.assigned_interview === slot;
                                                    const isAssignedElsewhere = app.assigned_interview && app.assigned_interview !== slot;
                                                    const isLoading = assigning === app.id;

                                                    if (isAssignedElsewhere) {
                                                        // 다른 슬롯에 이미 배정된 사람 → 회색 비활성
                                                        return (
                                                            <span key={app.id} className="px-3 py-1.5 bg-gray-100 text-gray-300 text-sm rounded-lg line-through cursor-not-allowed">
                                                                {app.name}
                                                            </span>
                                                        );
                                                    }

                                                    if (isAssignedHere) {
                                                        // 이 슬롯에 배정됨 → 파란색 + 취소 버튼
                                                        return (
                                                            <div key={app.id} className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg font-semibold">
                                                                <span>{app.name}</span>
                                                                <button
                                                                    onClick={() => cancelAssignment(app.id)}
                                                                    disabled={isLoading}
                                                                    className="ml-1 hover:text-blue-200 transition text-base leading-none"
                                                                    title="배정 취소"
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        );
                                                    }

                                                    // 미배정 → 클릭으로 배정
                                                    return (
                                                        <button
                                                            key={app.id}
                                                            onClick={() => assignSlot(app.id, slot)}
                                                            disabled={isLoading}
                                                            className="px-3 py-1.5 bg-gray-100 hover:bg-black hover:text-white text-gray-700 text-sm rounded-lg transition font-medium disabled:opacity-50"
                                                        >
                                                            {isLoading ? "..." : `${app.name} (${app.student_id})`}
                                                        </button>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </main>

            {/* ──── 탭 3: 시간표 ──── */}
            {activeTab === "timetable" && (
                <div className="px-8 pb-8">
                    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-3 text-left font-semibold text-gray-500 border-b border-r w-20">시간</th>
                                    {INTERVIEW_DATES.map((d) => (
                                        <th key={d.key} className="px-4 py-3 text-center font-semibold text-gray-700 border-b min-w-[160px]">
                                            {d.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {INTERVIEW_TIMES.map((time, i) => (
                                    <tr key={time} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                                        <td className="px-4 py-3 font-bold text-black border-r text-center">{time}</td>
                                        {INTERVIEW_DATES.map((d) => {
                                            const slot = `2026년 ${d.key} ${time}`;
                                            const assigned = applicants.filter(a => a.assigned_interview === slot);
                                            const available = getAvailableApplicants(d.key, time);
                                            return (
                                                <td key={d.key} className="px-3 py-2 text-center border-l border-gray-100">
                                                    {assigned.length > 0 ? (
                                                        assigned.map(a => (
                                                            <button
                                                                key={a.id}
                                                                onClick={() => router.push(`/admin/dashboard/${a.id}`)}
                                                                className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg font-semibold hover:bg-blue-700 transition w-full"
                                                            >
                                                                {a.name}
                                                                <span className="block text-blue-200 text-[10px] font-normal">{a.student_id}</span>
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <span className={`text-xs ${available.length > 0 ? "text-gray-400" : "text-gray-200"}`}>
                                                            {available.length > 0 ? `${available.length}명 가능` : "—"}
                                                        </span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 범례 */}
                    <div className="flex gap-4 mt-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded bg-blue-600"></div>
                            <span>배정 완료</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded bg-gray-200"></div>
                            <span>가능 인원 있음 (미배정)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded bg-gray-50 border"></div>
                            <span>가능 인원 없음</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
