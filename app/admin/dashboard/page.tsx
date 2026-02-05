"use client";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminDashboardSimple() {
    const router = useRouter();
    const supabase = createClient();

    // 로그아웃 테스트용
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login"); // 쫓아내기
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            {/* 1. 잘 들어왔는지 확인용 왕글씨 */}
            <h1 className="text-4xl font-bold">📝 메모</h1>

            <p className="text-xl">관리자 로그인 성공! 🎉</p>

            {/* 2. 로그아웃 잘 되나 확인용 버튼 */}
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                로그아웃
            </button>
        </div>
    );
}
