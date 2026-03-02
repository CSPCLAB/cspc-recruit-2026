"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 w-full border-b bg-white z-50">
            <div className="w-full flex justify-between items-center px-8 py-1">

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

                {/* 데스크탑 메뉴 */}
                <nav className="hidden md:flex items-center gap-10 font-semibold text-lg">
                    <Link href="/about" className="hover:text-blue-600 transition">
                        소개
                    </Link>
                    <Link href="/apply/about" className="hover:text-blue-600 transition">
                        지원안내
                    </Link>
                    <Link
                        href="/apply"
                        className="bg-black text-white px-5 py-2 rounded-xl
                        hover:bg-gray-500 transition"
                    >
                        지원하기
                    </Link>
                </nav>

                {/* 모바일 헤더 버튼 */}
                <button
                    className="md:hidden flex flex-col gap-1"
                    onClick={() => setOpen(!open)}
                >
                    <span className="w-6 h-0.5 bg-black"></span>
                    <span className="w-6 h-0.5 bg-black"></span>
                    <span className="w-6 h-0.5 bg-black"></span>
                </button>
            </div>

            {/* 모바일 드롭다운 메뉴 */}
            {open && (
                <div className="md:hidden bg-white border-t px-8 py-6 flex flex-col gap-6 font-semibold text-lg">
                    <Link href="/about" onClick={() => setOpen(false)}>
                        소개
                    </Link>
                    <Link href="/apply/about" onClick={() => setOpen(false)}>
                        지원안내
                    </Link>
                    <Link
                        href="/apply" onClick={() => setOpen(false)}>
                        지원하기
                    </Link>
                </div>
            )}

        </header>
    );
}