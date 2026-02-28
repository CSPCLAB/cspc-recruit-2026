"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ApplicantDetail() {
    const router = useRouter();
    const params = useParams();
    const rawId = (params as any)?.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    const [applicant, setApplicant] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id || id === "undefined") return;
        const fetchApplicant = async () => {
            try {
                const res = await fetch(`/api/admin/applications/${id}`);
                const result = await res.json();
                if (!res.ok) { setApplicant(null); return; }
                setApplicant(result.applicant);
            } catch (e) {
                setApplicant(null);
            } finally {
                setLoading(false);
            }
        };
        fetchApplicant();
    }, [id]);

    if (!id) return <div className="min-h-screen flex items-center justify-center text-gray-500" style={{ colorScheme: 'light' }}>잘못된 접근</div>;
    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400" style={{ colorScheme: 'light' }}>로딩 중...</div>;
    if (!applicant) return <div className="min-h-screen flex items-center justify-center text-gray-500" style={{ colorScheme: 'light' }}>해당 지원자를 찾을 수 없습니다.</div>;

    const sections = [
        { title: "자기소개", content: applicant.intro },
        { title: "지원 동기", content: applicant.motivation },
        { title: "하고 싶은 것 / 배우고 싶은 것", content: applicant.goal },
        { title: "하고 싶은 말", content: applicant.comment },
    ];

    return (
        <div className="min-h-screen bg-gray-50" style={{ colorScheme: 'light' }}>
            {/* 헤더 */}
            <header className="bg-white border-b px-8 py-4 flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="text-gray-400 hover:text-black transition text-lg"
                >
                    ←
                </button>
                <h1 className="text-lg font-bold text-black">지원서 상세</h1>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-8 space-y-5">
                {/* 기본 정보 카드 */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-black">{applicant.name}</h2>
                            <p className="text-gray-400 text-sm mt-0.5">
                                {new Date(applicant.created_at).toLocaleString("ko-KR")} 지원
                            </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${applicant.orientation
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-400"
                            }`}>
                            신환회 {applicant.orientation ? "참여" : "미참여"}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        {[
                            { label: "학번", value: applicant.student_id },
                            { label: "학과", value: applicant.department },
                            { label: "전화번호", value: applicant.phone },
                        ].map(({ label, value }) => (
                            <div key={label} className="bg-gray-50 rounded-xl px-4 py-3">
                                <p className="text-gray-400 text-xs mb-0.5">{label}</p>
                                <p className="text-black font-medium">{value || "-"}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 면접 가능 시간 */}
                {applicant.interview_periods && applicant.interview_periods.length > 0 && (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">면접 가능 시간</h3>
                        <div className="flex flex-wrap gap-2">
                            {applicant.interview_periods.map((d: string) => (
                                <span key={d} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium">
                                    {d}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* 서술형 섹션 */}
                {sections.map(({ title, content }) => (
                    <div key={title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">{title}</h3>
                        <p className="text-black whitespace-pre-line leading-relaxed text-sm">
                            {content || <span className="text-gray-300">-</span>}
                        </p>
                    </div>
                ))}
            </main>
        </div>
    );
}