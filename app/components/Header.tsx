"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <header className="border-b bg-white">
            <div className="flex justify-between items-center p-6">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"//public 폴더에 logo.png 넣기!!!
                        alt="CSPC Logo"//이미지 대체 텍스트(alternative text)
                        width={60}
                        height={60}
                        className="rounded-full"
                    />
                    <h1 className="text-gray-900 font-bold text-2xl">
                        CSPC
                    </h1>
                </Link>

                <button
                    onClick={() => setOpen(!open)}
                    className="text-3xl cursor-pointer"
                >
                    ☰
                </button>
            </div>

            {open && (
                <div className="flex flex-col items-center gap-4 pb-6 font-semibold text-lg">
                    <Link href="/about">소개</Link>
                </div>
            )}
        </header>
    );
}