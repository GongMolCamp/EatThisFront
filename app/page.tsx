import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoSection } from "@/components/logo-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full max-w-[640px] px-6 py-16 md:max-w-[768px]">
        <div className="flex flex-col items-center justify-center gap-8">
          <LogoSection />

          {/* 버튼 그룹 */}
          <div className="flex flex-col w-full gap-4 mt-4">
            <Link href="/login" className="w-full">
              <Button variant="primary" size="lg" className="w-full">
                로그인
              </Button>
            </Link>
            <Button variant="outline-primary" size="lg" className="w-full">
              구글로 로그인
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
