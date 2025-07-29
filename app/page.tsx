import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoSection } from "@/components/logo-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white relative">
      <div className="w-full max-w-[640px] px-6 py-16 md:max-w-[768px] flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <LogoSection />
        </div>
      </div>

      {/* 하단 고정 버튼 영역 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 pb-8 md:pb-6">
        <div className="w-full max-w-[640px] mx-auto md:max-w-[768px]">
          <Link href="/login" className="w-full">
            <Button variant="primary" size="lg" className="w-full">
              로그인
            </Button>
          </Link>
          {/* <Button variant="outline-primary" size="lg" className="w-full mt-3">
            구글로 로그인
          </Button> */}
        </div>
      </div>
    </main>
  );
}
