export default function NotOpenPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black px-6">
      <div className="text-center space-y-6 max-w-xl">

        <h1 className="text-3xl sm:text-4xl font-bold">
          아직 지원 기간이 아닙니다
        </h1>

        <p className="text-gray-400 text-base sm:text-lg">
          지원 기간에 다시 방문해주세요.
          <br />
          자세한 일정은 공지를 참고해주세요.
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