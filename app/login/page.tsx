"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "로그인에 실패했습니다.");
      }

      // 로그인 성공 시 메인 페이지로 이동
      router.push("/");
      router.refresh(); // 전역 상태 갱신을 위한 새로고침
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error instanceof Error ? error.message : "로그인에 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full max-w-[640px] px-6 py-16">
        <div className="flex flex-col items-center gap-8">
          <Logo />

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {error}
              </div>
            )}
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
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
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
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
              />
            </div>
            <div className="flex flex-col w-full gap-4 mt-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "로그인 중..." : "로그인"}
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
