export default function ClosedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black px-6">
      <div className="text-center space-y-6 max-w-xl">

        <h1 className="text-3xl sm:text-4xl font-bold text-red-500">
          지원이 마감되었습니다
        </h1>

        <p className="text-gray-400 text-base sm:text-lg">
          많은 관심을 가져주셔서 감사합니다.
        </p>

        <div className="pt-6">
          <a
            href="/"
            className="
              inline-flex items-center justify-center
              px-6 py-3
              rounded-full
              bg-black text-white
              font-semibold
              hover:bg-gray-800
              transition
            "
          >
            메인으로 돌아가기
          </a>
        </div>

      </div>
    </main>
  );
}