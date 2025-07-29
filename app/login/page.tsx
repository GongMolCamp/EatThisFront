"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/use-auth-store";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  profileImageUrl?: string;
  allergies: string[];
}

interface LoginResponse {
  result: string;
  message: string;
  data: {
    accessToken: string;
    tokenType: string;
    user: User;
  };
}

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // 페이지 로드시 저장된 로그인 정보 불러오기
  useEffect(() => {
    const savedLoginData = localStorage.getItem("rememberMe");
    if (savedLoginData) {
      try {
        const { email, password } = JSON.parse(savedLoginData);
        setFormData((prev) => ({
          ...prev,
          email,
          password,
          rememberMe: true,
        }));
      } catch (error) {
        console.error("저장된 로그인 정보를 불러오는 중 오류:", error);
        localStorage.removeItem("rememberMe");
      }
    }
  }, []);

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
          },
          body: JSON.stringify(formData),
        }
      );

      const data: LoginResponse = await response.json();
      console.log(data);
      if (!response.ok || data.result !== "SUCCESS") {
        throw new Error(data.message || "로그인에 실패했습니다.");
      }

      if (!data.data.accessToken) {
        throw new Error("토큰이 없습니다.");
      }

      // 자동 로그인 정보 저장/삭제
      if (formData.rememberMe) {
        localStorage.setItem(
          "rememberMe",
          JSON.stringify({
            email: formData.email,
            password: formData.password,
          })
        );
      } else {
        localStorage.removeItem("rememberMe");
      }

      // 서버에서 받은 유저 정보와 토큰으로 로그인
      login(
        {
          id: String(data.data.user.id), // store의 User 인터페이스는 id가 string이므로 변환
          email: data.data.user.email,
          name: data.data.user.name,
          profileImage: data.data.user.profileImageUrl,
        },
        data.data.accessToken
      );

      // replace: true를 추가하여 히스토리 스택에 쌓이지 않도록 함
      router.replace("/main");
      // 또는
      window.location.href = "/main"; // 강제로 페이지 새로고침
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
    <main className="flex flex-col items-center bg-white relative">
      <div className="w-full max-w-[640px] px-6 py-16 flex-1 flex flex-col items-center justify-center pb-32">
        <div className="flex flex-col items-center gap-8 w-full">
          <Logo />

          <form
            id="login-form"
            onSubmit={handleSubmit}
            className="w-full space-y-4"
          >
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

            {/* 자동 로그인 체크박스 */}
            <div className="flex items-center justify-between pt-4 px-1">
              <label
                htmlFor="rememberMe"
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        rememberMe: e.target.checked,
                      }))
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                      formData.rememberMe
                        ? "bg-orange-500 border-orange-500"
                        : "bg-white border-gray-300 group-hover:border-orange-400"
                    }`}
                  >
                    {formData.rememberMe && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-200">
                  자동 로그인
                </span>
              </label>

              {formData.rememberMe && (
                <div className="flex items-center space-x-1 text-xs text-orange-600 animate-pulse">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>안전하게 저장</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* 하단 고정 버튼 영역 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 pb-8 md:pb-6">
        <div className="w-full max-w-[640px] mx-auto space-y-4">
          <Button
            variant="primary"
            size="lg"
            className="w-full mb-4"
            type="submit"
            form="login-form"
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
      </div>
    </main>
  );
}
