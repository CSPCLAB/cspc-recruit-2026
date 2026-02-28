"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar(){
    const [open, setOpen] = useState(false);

    return (
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50"> {/* ✅ NEW */}
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
            
            {/* 로고 */}
            <Link href="/">
            <span className="text-xl font-bold text-blue-600 cursor-pointer">
                CSPCLAB
            </span>
            </Link>

            {/* 데스크탑 메뉴 */}
            <nav className="hidden md:flex gap-8 text-lg font-medium">
            <Link href="#about" className="hover:text-blue-600">소개</Link>
            <Link href="#info" className="hover:text-blue-600">지원안내</Link>
            <Link href="/apply" className="hover:text-blue-600">지원하기</Link>
            </nav>

            {/* 모바일 바 */}
            <button
            className="md:hidden flex flex-col gap-1"
            onClick={() => setOpen(!open)}
            >
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
            </button>
        </div>

        {/* 모바일 메뉴 */}
        {open && (
            <div className="md:hidden bg-white shadow-md px-6 pb-4 flex flex-col gap-4 text-lg font-medium">
            <Link href="#about" onClick={() => setOpen(false)}>소개</Link>
            <Link href="#info" onClick={() => setOpen(false)}>지원안내</Link>
            <Link href="/apply" onClick={() => setOpen(false)}>지원하기</Link>
            </div>
        )}
      </header>  
    );
}