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

    useEffect (() => {
        if (!id || id === "undefined") return;
        console.log("현재 id:", id);
        const fetchApplicant = async() => {
            try {
                const res = await fetch(`/api/admin/applications/${id}`);
                const result = await res.json();

                if (!res.ok) {
                    console.error("상세 불러오기 실패:",result);
                    setApplicant(null);
                    return;
                }

                setApplicant(result.applicant);
            } catch (e) {
                console.error("상세 fetch 에러:",e);
                setApplicant(null);
            } finally {
                setLoading(false);
            }
        };

        fetchApplicant();
    }, [id]);

    if (!id) return <p className="p-10">잘못된 접근</p>;
    if (loading) return <p className="p-10">로딩중...</p>;
    if (!applicant) return <p className="p-10">해당 지원자를 찾을 수 없음</p>;

    return (
        <div className="p-10 space-y-6">
            <button className="underline" onClick={() => router.back()}>
                ← 목록으로
            </button>

            <h1 className="text-3xl font-bold">지원서 상세</h1>

            <div className="space-y-2">
                <p><strong>이름:</strong> {applicant.name}</p>
                <p><strong>학번:</strong> {applicant.student_id}</p>
                <p><strong>학과:</strong> {applicant.department}</p>
                <p><strong>전화번호:</strong> {applicant.phone}</p>
                <p><strong>지원일:</strong> {new Date(applicant.created_at).toLocaleString("ko-KR")}</p>
                <section className="space-y-2">
                    <h2 className="text-xl font-semibold">면접 가능 일자</h2>

                    {Array.isArray(applicant.interview_dates)&&applicant.interview_dates.length>0 ? (
                        <ul className="list-disc pl-5 border p-4 rounded bg-gray-50 space-y-1">
                            {applicant.interview_dates.map((d: string) => (
                                <li key={d}>{d}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="border p-4 rounded bg-gray-50 text-gray-500">
                            선택된 면접일이 없습니다.
                        </p>
                    )}
                </section>
            </div>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">자기소개</h2>
                <p className="whitespace-pre-line border p-4 rounded bg-gray-50">
                    {applicant.intro || "-"}
                </p>
            </section>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">지원동기</h2>
                <p className="whitespace-pre-line border p-4 rounded bg-gray-50">
                    {applicant.motivation || "-"}
                </p>
            </section>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">하고 싶은 것 / 배우고 싶은 것</h2>
                <p className="whitespace-pre-line border p-4 rounded bg-gray-50">
                    {applicant.goal || "-"}
                </p>
            </section>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">하고 싶은 말</h2>
                <p className="whitespace-pre-line border p-4 rounded bg-gray-50">
                    {applicant.comment || "-"}
                </p>
            </section>
        </div>
    );
}