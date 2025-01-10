"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useScrollStore } from "@/store/use-scroll-store";

// 뒤로가기가 필요한 경로들
const BACK_ROUTES = ["/signup", "/login", "/result", "/friends", "/visits"];

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const isVisible = useScrollStore((state) => state.isVisible);

  // 현재 경로가 뒤로가기가 필요한 경로인지 확인
  const needsBackButton = BACK_ROUTES.some((route) => {
    if (route.includes("[id]")) {
      return pathname.startsWith(route.split("[id]")[0]);
    }
    return pathname === route;
  });

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 h-16 bg-white z-50
        transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="w-10">
          {needsBackButton && (
            <button
              onClick={() => router.push("/main")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/mainLogo.png"
            alt="메인 로고"
            width={40}
            height={40}
          />
        </div>
        <div className="w-10" /> {/* 좌우 균형을 위한 빈 공간 */}
      </div>
    </nav>
  );
}
