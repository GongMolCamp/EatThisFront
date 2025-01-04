"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

const ALLERGIES = [
  { id: "우유", label: "우유" },
  { id: "계란", label: "계란" },
  { id: "갑각류", label: "갑각류" },
  { id: "대두", label: "대두 (콩)" },
  { id: "밀", label: "밀" },
  { id: "견과류", label: "견과류" },
  { id: "조개류", label: "조개류" },
  { id: "생선", label: "생선" },
] as const;

export default function SignupPage() {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const toggleAllergy = (allergyId: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergyId)
        ? prev.filter((id) => id !== allergyId)
        : [...prev, allergyId]
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full max-w-[640px] px-6 py-16">
        <div className="flex flex-col items-start w-full">
          {/* 헤더 */}
          <div className="mb-8">
            <h1 className="text-title text-gray-dark">프로필 입력</h1>
            <p className="text-subtitle text-gray-default mt-1">
              새로운 계정을 만들어 주세요
            </p>
          </div>

          {/* 회원가입 폼 */}
          <form className="w-full space-y-6">
            {/* 프로필 이미지 업로드 */}
            <div className="flex flex-col items-center w-full">
              <div className="relative w-[120px] h-[120px] mb-2">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                  <Image
                    src="/images/photoUpload.png"
                    alt="사진 업로드 아이콘"
                    width={120}
                    height={120}
                  />
                </div>
              </div>
            </div>

            {/* 입력 필드들 */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="nickname"
                  className="text-subtitle text-gray-dark pl-1"
                >
                  닉네임
                </label>
                <Input
                  id="nickname"
                  type="text"
                  placeholder="닉네임을 입력해 주세요"
                  className="text-subtitle"
                />
              </div>
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
              <div className="space-y-2">
                <label
                  htmlFor="passwordConfirm"
                  className="text-subtitle text-gray-dark pl-1"
                >
                  비밀번호 확인
                </label>
                <Input
                  id="passwordConfirm"
                  type="password"
                  placeholder="비밀번호를 다시 입력해 주세요"
                  className="text-subtitle"
                />
              </div>
            </div>

            {/* 알레르기 선택 섹션 */}
            <div className="w-full mt-8">
              <h2 className="text-title text-gray-dark mb-4">
                어떤 음식 알레르기가 있나요?
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {ALLERGIES.map((allergy) => (
                  <button
                    key={allergy.id}
                    type="button"
                    onClick={() => toggleAllergy(allergy.id)}
                    className={`py-3 px-4 rounded-[16px] border-2 text-subtitle text-center transition-colors
                      ${
                        selectedAllergies.includes(allergy.id)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-[#E2E8F0] text-gray-DEFAULT hover:border-primary"
                      }
                    `}
                  >
                    {allergy.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex flex-col w-full gap-4 mt-8">
              <Button variant="primary" size="lg" className="w-full">
                다음
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
