import Image from "next/image";
import Link from "next/link";

export default function Home(){
  return (
    <main className="min-h-screen bg-white flex flex-col">

      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-1">
          <Image
            src="/logo.png"//public 폴더에 logo.png 넣기!!!
            alt="CSPC Logo"//이미지 대체 텍스트(alternative text)
            width={60}
            height={60}
            className="rounded-full"
          />
          <h1 className="text-gray-900 font-bold tracking-wide text-2xl">
            CSPC
          </h1>
        </div>
      </div>

      <section className="w-full bg-black py-10 px-5">
        <div className="max-w-4xl mx-auto text-left">
          <p className="text-lg tracking-widest text-white font-semibold mb-4 leading-9">
            CSPCLAB은<br />
            <span className="text-blue-500">소수정예</span>
            를 지향하는<br />서강대학교 소프트웨어융합대학<br />학회입니다.
          </p>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-14 px-5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10">
          <p className="w-32 h-32 rounded-full text-lg tracking-normal text-gray-100 font-semibold mb-4 leading-9 bg-blue-600 flex items-center justify-center">
            랩실 관리
          </p>
          <p className="w-32 h-32 rounded-full text-lg tracking-normal text-gray-100 font-semibold mb-4 leading-9 bg-blue-600 flex items-center justify-center">
            다양한 스터디
          </p>
          <p className="w-32 h-32 rounded-full text-lg tracking-normal text-gray-100 font-semibold mb-4 leading-9 bg-blue-600 flex items-center justify-center">
            선배 찬스
          </p>
        </div>
      </section>

      <div className="flex flex-col items-center gap-2 mt-12">
        <Link href="/apply">
          <button className="text-white bg-blue-600 px-6 py-3 rounded-xl text-xl font-semibold">
            CSPC 지원하기
          </button>
        </Link>
      </div>
    </main>
  );
}