"use client";

import { useRouter } from "next/navigation";

export default function ApplyCompletePage(){
    const router = useRouter();

    return(
        <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-10 rounded-3xl shadow-2xl p-16 text-center space-y-10">

                <h1 className="text-4xl md:text-5xl font-bold text-black">
                    지원이 완료되었습니다!
                </h1>

                <p className="text-lg md:text-xl text-gray-500">
                    검토 후 개별 연락드리겠습니다.
                </p>

                <div className="flex gap-6 justify-center pt-6">
                    <button
                        onClick={()=>router.push("/")}
                        className="px-10 py-4 text-lg font-semibold bg-black text-white rounded-xl hover:bg-gray-800 transition duratsion-200"
                    >
                        CSPC 더 알아보기
                    </button>

                </div>
            </div>
        </main>
    )   
}