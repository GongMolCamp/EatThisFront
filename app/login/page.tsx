import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full max-w-[640px] px-6 py-16">
        <div className="flex flex-col items-center gap-8">
          <Logo />

          {/* 로그인 폼 */}
          <form className="w-full space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-subtitle text-gray-dark pl-1"
              >
                이메일
              </label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력해 주세요"
                className="text-subtitle"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-subtitle text-gray-dark pl-1"
              >
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                className="text-subtitle"
              />
            </div>
            <div className="flex flex-col w-full gap-4 mt-4">
              <Button variant="primary" size="lg" className="w-full">
                로그인
              </Button>
              <Link href="/signup" className="w-full">
                <Button variant="outline-primary" size="lg" className="w-full">
                  회원가입
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
