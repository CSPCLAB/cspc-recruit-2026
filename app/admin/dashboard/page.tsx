"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminDashboardSimple() {
    const router = useRouter();
    const supabase = createClient();

    const [applicants, setApplicants]=useState<any[]>([]);
    const [loading, setLoading]=useState(true);

    const [isAdmin, setIsAdmin] = useState(false);

    const handleDownloadExcel = () => {
        window.location.href = "/api/admin/applications/excel";
    };

    //관리자 체크
    useEffect(() => {
        const checkAdmin = async () => {
            const { data } = await supabase.auth.getUser();
            
            if (!data.user) {
                router.push("/login");
                return;
            }
            
            if (data.user.email !== "cspc2026gang@sogang.ac.kr"){
                alert("관리자만 접근 가능");
                router.push("/");
                return;
            }
            setIsAdmin(true);
        };

        checkAdmin();
    }, []);

    //지원자 불러오기
    useEffect(() => {
        if (!isAdmin) return;

        const fetchApplicants = async () => {
            try {
                const res=await fetch("/api/admin/applications");
                const result=await res.json();

                console.log("API 결과:", result);

                if (!res.ok || !result.applicants) {
                    console.error("지원자 불러오기 실패:",result);
                    setApplicants([]);
                    return;
                }

                setApplicants(result.applicants);
            } catch (err) {
                console.error("에러 발생:",err);
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

    if (loading) return <p className="p-10">로딩중...</p>;

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-6">
                지원자 목록 ({applicants?.length ?? 0}명)
            </h1>
            
            <table className="w-full border border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">이름</th>
                        <th className="border p-2">학번</th>
                        <th className="border p-2">학과</th>
                        <th className="border p-2">전화번호</th>
                        <th className="border p-2">지원일</th>
                    </tr>
                </thead>
                <tbody>
                    {(applicants ?? []).map((app) => (
                        <tr
                            key={app.id}
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => router.push(`/admin/dashboard/${app.id}`)}
                        >
                            <td className="border p-2">{app.name}</td>
                            <td className="border p-2">{app.student_id}</td>
                            <td className="border p-2">{app.department}</td>
                            <td className="border p-2">{app.phone}</td>
                            <td className="border p-2">
                                {new Date(app.created_at).toLocaleString("ko-KR")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={handleLogout}
                className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
            >
                로그아웃
            </button>

            <button
                onClick={handleDownloadExcel}
                className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
            >
                엑셀 다운로드
            </button>
        </div>
    );
}
