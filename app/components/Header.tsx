"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="border-b bg-white">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-6">

                {/* 로고 */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="CSPC Logo"
                        width={60}
                        height={60}
                        className="rounded-full"
                    />
                    <h1 className="text-gray-900 font-bold text-2xl">
                        CSPC
                    </h1>
                </Link>

                {/* 메뉴 */}
                <nav className="flex items-center gap-10 font-semibold text-lg">
                    <Link href="/about" className="hover:text-blue-600 transition">
                        소개
                    </Link>
                    <Link href="/apply/about" className="hover:text-blue-600 transition">
                        지원 안내
                    </Link>
                    <Link
                        href="/apply"
                        className="bg-black text-white px-5 py-2 rounded-xl
                        hover:bg-gray-800 transition"
                    >
                        지원하기
                    </Link>
                </nav>

            </div>
        </header>
    );
}