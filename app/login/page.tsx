/**
 * @description
 * 관리자 로그인 페이지
 * 관리자만 사용할 수 있는 기능을 위해 
 * 일반 지원자는 해당 로그인 사용 X
 */

"use client";
import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link"; // 메인으로 가는 링크용

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert("로그인 실패: " + error.message);
        } else {
            router.push("/admin/dashboard");
            router.refresh();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-50 px-4">
            {/* 1. 제목 및 입력 폼 */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4">
                <h1 className="text-black text-2xl font-bold text-center">🔐 관리자 로그인</h1>

                <input
                    className="border p-3 rounded w-full placeholder-gray-400"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="border p-3 rounded w-full placeholder-gray-400"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()} // 엔터키로 로그인
                />
                <button
                    onClick={handleLogin}
                    className="bg-black text-white p-3 rounded font-bold hover:bg-gray-800 transition"
                >
                    로그인
                </button>
            </div>

            {/* 2. 안내 문구 (핵심 추가 사항!) */}
            <div className="text-center space-y-2">
                <p className="text-red-500 font-bold">⚠️ 주의사항</p>
                <p className="text-gray-600 text-sm">
                    이 페이지는 <b>운영진 전용</b> 페이지입니다.<br />
                    지원자분들은 로그인이 필요하지 않습니다.
                </p>

                <div className="pt-2">
                    <Link href="/" className="text-blue-500 hover:underline text-sm font-medium">
                        ← 메인 페이지로 돌아가서 지원하기
                    </Link>
                </div>
            </div>
        </div>
    );
}
