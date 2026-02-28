import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSPC 지원",
  description: "CSPC 지원 페이지입니다.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased
      min-h-screen flex flex-col`}>
        <Header />

        <main className="flex-1">
          {children}
        </main>

        {/*footer*/}
        <footer className="bg-gray-100 mt-20 py-10">
          <div className="max-w-5xl mx-auto text-left px-10">
            <h2 className="text-xl font-semibold mb-5">
              Contact
            </h2>
            <div className="flex gap-10 text-gray-700">
              <div>
                <p className="text-lg leading-8">
                  다산관 104, 105
                </p>
                <p className="text-lg leading-8">문의 | 서현수 010-7349-1204</p>
                <p className="text-lg leading-8">instagram | @sgu_cspc</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html >
  );
}
