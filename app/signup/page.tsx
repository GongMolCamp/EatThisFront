"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";

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

interface SignupForm {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  profileImage?: File;
}

interface ValidationErrors {
  email: string;
  password: string;
  passwordConfirm: string;
}

interface TouchedFields {
  email: boolean;
  password: boolean;
  passwordConfirm: boolean;
}

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupForm>({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [touched, setTouched] = useState<TouchedFields>({
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const [imagePreview, setImagePreview] = useState<string>("");

  // 이메일 유효성 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "이메일을 입력해주세요";
    if (!emailRegex.test(email)) return "올바른 이메일 형식이 아닙니다";
    return "";
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password: string) => {
    if (!password) return "비밀번호를 입력해주세요";
    if (password.length < 8) return "비밀번호는 8자 이상이어야 합니다";
    if (!/[A-Z]/.test(password)) return "대문자를 포함해야 합니다";
    if (!/[a-z]/.test(password)) return "소문자를 포함해야 합니다";
    if (!/[0-9]/.test(password)) return "숫자를 포함해야 합니다";
    if (!/[!@#$%^&*]/.test(password))
      return "특수문자(!@#$%^&*)를 포함해야 합니다";
    return "";
  };

  // 비밀번호 확인 검사
  const validatePasswordConfirm = (
    password: string,
    passwordConfirm: string
  ) => {
    if (!passwordConfirm) return "비밀번호 확인을 입력해주세요";
    if (password !== passwordConfirm) return "비밀번호가 일치하지 않습니다";
    return "";
  };

  // 입력값 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // blur 이벤트 처리
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // 실시간 유효성 검사 (touched된 필드만)
  useEffect(() => {
    setErrors({
      email: touched.email ? validateEmail(formData.email) : "",
      password: touched.password ? validatePassword(formData.password) : "",
      passwordConfirm: touched.passwordConfirm
        ? validatePasswordConfirm(formData.password, formData.passwordConfirm)
        : "",
    });
  }, [formData, touched]);

  const toggleAllergy = (allergyId: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergyId)
        ? prev.filter((id) => id !== allergyId)
        : [...prev, allergyId]
    );
  };

  // 이미지 업로드 처리
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (5MB)
    if (file.size > 100 * 1024 * 1024) {
      alert("파일 크기는 100MB 이하여야 합니다.");
      return;
    }

    // 이미지 파일 타입 체크
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 폼 데이터에 이미지 추가
    setFormData((prev) => ({ ...prev, profileImage: file }));

    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 폼 제출 처리 함수 추가
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효성 검사
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const passwordConfirmError = validatePasswordConfirm(
      formData.password,
      formData.passwordConfirm
    );

    if (emailError || passwordError || passwordConfirmError) {
      setTouched({
        email: true,
        password: true,
        passwordConfirm: true,
      });
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("name", formData.nickname);

      // 프로필 이미지가 있는 경우에만 추가
      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      // 알레르기 정보를 쉼표로 구분된 문자열로 변환하여 추가
      if (selectedAllergies.length > 0) {
        formDataToSend.append("allergies", selectedAllergies.join(","));
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          body: formDataToSend,
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "회원가입에 실패했습니다.");
      }
      // 회원가입 성공 시 로그인 페이지로 이동
      router.push("/login");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "회원가입에 실패했습니다."
      );
    }
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
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            {/* 프로필 이미지 업로드 */}
            <div className="flex flex-col items-center w-full">
              <div className="relative w-[120px] h-[120px] mb-2">
                <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="프로필 이미지"
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image
                        src="/images/photoUpload.png"
                        alt="사진 업로드 아이콘"
                        width={120}
                        height={120}
                      />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500">
                프로필 사진을 선택해주세요 (선택사항)
              </p>
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
                  name="nickname"
                  type="text"
                  placeholder="닉네임을 입력해 주세요"
                  className="text-subtitle"
                  value={formData.nickname}
                  onChange={handleChange}
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
                  name="email"
                  type="email"
                  placeholder="이메일을 입력해 주세요"
                  className={`text-subtitle ${
                    touched.email && errors.email ? "border-red-500" : ""
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
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
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력해 주세요"
                  className={`text-subtitle ${
                    touched.password && errors.password ? "border-red-500" : ""
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">
                  비밀번호는 8자 이상, 대소문자, 숫자, 특수문자(!@#$%^&*)를
                  포함해야 합니다
                </p>
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
                  name="passwordConfirm"
                  type="password"
                  placeholder="비밀번호를 다시 입력해 주세요"
                  className={`text-subtitle ${
                    touched.passwordConfirm && errors.passwordConfirm
                      ? "border-red-500"
                      : ""
                  }`}
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.passwordConfirm && errors.passwordConfirm && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.passwordConfirm}
                  </p>
                )}
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
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={
                  !!(
                    errors.email ||
                    errors.password ||
                    errors.passwordConfirm
                  ) ||
                  !formData.email ||
                  !formData.password ||
                  !formData.passwordConfirm ||
                  !formData.nickname
                }
              >
                다음
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
