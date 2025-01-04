import { Logo } from "@/components/logo";

interface LogoSectionProps {
  showDescription?: boolean;
}

export function LogoSection({ showDescription = true }: LogoSectionProps) {
  return (
    <>
      <Logo />
      <h1 className="font-logo text-[92px] text-primary">이거무라</h1>
      {showDescription && (
        <p className="text-title font-logo text-center text-gray-dark whitespace-pre-line leading-relaxed">
          {`맛있는 선택, 이거무라가 도와줄게요.
오늘의 메뉴, 고민은 이제 그만.
이거무라와 함께라면 한 끼를 즐겁게!`}
        </p>
      )}
    </>
  );
}
