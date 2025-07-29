"use client";

import { Logo } from "@/components/logo";

interface LogoSectionProps {
  showDescription?: boolean;
}

export function LogoSection({ showDescription = true }: LogoSectionProps) {
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* 로고 컨테이너 */}
      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 via-red-400/20 to-yellow-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative">
          <Logo />
        </div>
      </div>

      {/* 메인 타이틀 */}
      <div className="relative">
        <h1 className="font-logo text-[92px] bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm animate-pulse">
          이거무라
        </h1>
        {/* 장식 요소 */}
        <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
          🍽️
        </div>
        <div className="absolute -bottom-1 -left-2 text-xl animate-bounce delay-300">
          ✨
        </div>
      </div>

      {/* 설명 텍스트 */}
      {showDescription && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/30 to-transparent rounded-lg blur-sm"></div>
          <p className="relative text-title font-logo text-center text-gray-dark whitespace-pre-line leading-relaxed px-4 py-2">
            <span className="inline-block">
              맛있는 선택, 이거무라가 도와줄게요.
            </span>
            <br />
            <span className="inline-block">오늘의 메뉴, 고민은 이제 그만.</span>
            <br />
            <span className="inline-block">
              이거무라와 함께라면 한 끼를 즐겁게!
            </span>
            <span className="ml-1 animate-bounce">🎉</span>
          </p>
        </div>
      )}

      {/* 하단 장식 라인 */}
      <div className="flex items-center space-x-2 opacity-60">
        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-orange-300"></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
        <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-orange-300"></div>
      </div>
    </div>
  );
}
