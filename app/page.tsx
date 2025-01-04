import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full max-w-[640px] px-6 py-16 md:max-w-[768px]">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* 로고 섹션 */}
          <div className="relative w-[240px] h-[240px]">
            <Image
              src="/images/logoBackground.png"
              alt="로고 배경"
              fill
              priority
              className="object-contain scale-125"
            />
            <Image
              src="/images/mainLogo.png"
              alt="메인 로고"
              fill
              priority
              className="object-contain scale-125"
            />
            <div className="absolute bottom-2 left-2 w-[24px] h-[24px]">
              <Image
                src="/images/logoStar.png"
                alt="로고 별"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="absolute top-2 right-2 w-[24px] h-[24px]">
              <Image
                src="/images/logoStar.png"
                alt="로고 별"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* 서비스명 */}
          <h1 className="font-logo text-[92px] text-primary">이거무라</h1>

          {/* 설명 텍스트 */}
          <p className="text-title font-logo text-center text-gray-dark whitespace-pre-line leading-relaxed">
            {`맛있는 선택, 이거무라가 도와줄게요.
오늘의 메뉴, 고민은 이제 그만.
이거무라와 함께라면 한 끼를 즐겁게!`}
          </p>

          {/* 버튼 그룹 */}
          <div className="flex flex-col w-full gap-4 mt-4">
            <Button variant="primary" size="lg" className="w-full">
              로그인
            </Button>
            <Button variant="outline-primary" size="lg" className="w-full">
              구글로 로그인
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
