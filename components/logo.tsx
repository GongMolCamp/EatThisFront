import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
}

export function Logo({ width = 240, height = 240 }: LogoProps) {
  return (
    <div className="relative" style={{ width, height }}>
      <Image
        src="/images/logoBackground.png"
        alt="로고 배경"
        fill
        priority
        loading="eager"
        sizes="(max-width: 768px) 240px, 240px"
        className="object-contain scale-125"
      />
      <Image
        src="/images/mainLogo.png"
        alt="메인 로고"
        fill
        priority
        loading="eager"
        sizes="(max-width: 768px) 240px, 240px"
        className="object-contain scale-125"
      />
      <div className="absolute top-2 right-2 w-[24px] h-[24px]">
        <Image
          src="/images/logoStar.png"
          alt="로고 별"
          fill
          priority
          loading="eager"
          sizes="24px"
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-2 left-2 w-[24px] h-[24px]">
        <Image
          src="/images/logoStar.png"
          alt="로고 별"
          fill
          priority
          loading="eager"
          sizes="24px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
