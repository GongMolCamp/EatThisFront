"use client";

import { useAuth } from "@/hooks/use-auth";
import Lottie from "lottie-react";
import cookingAnimation from "@/public/lottie/cookingLottie.json";
import desertAnimation from "@/public/lottie/desertLottie.json";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useScrollStore } from "@/store/use-scroll-store";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/api";
import { History } from "lucide-react";

export default function MainPage() {
  const { user } = useAuth();
  const setIsVisible = useScrollStore((state) => state.setIsVisible);
  const isVisible = useScrollStore((state) => state.isVisible);
  const router = useRouter();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";

      if (direction === "down" && currentScrollY > 100) {
        // 100px 이상 스크롤 했을 때만 숨김
        setIsVisible(false);
      } else if (direction === "up") {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsVisible]); // lastScrollY를 의존성 배열에서 제거

  const handleSoloEat = async () => {
    try {
      const response = await fetchWithAuth("/api/ai/generate", {
        method: "POST",
        body: JSON.stringify({
          members: [user?.id],
        }),
      });
      // AI 응답에서 text 부분만 추출해서 출력
      const recommendedFood = response.placeId;
      console.log("AI 추천 식당ID: ", recommendedFood);

      router.push(`/result?food=${btoa(recommendedFood)}`);
    } catch (error) {
      console.error("AI 추천 에러:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* 프로필 카드 */}
      <div
        className={`
          fixed top-16 left-0 right-0 z-10 bg-white
          transition-transform duration-300 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex flex-col">
              {/* 프로필 정보 */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {user.name[0]}
                    </span>
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-bold mb-0.5 text-gray-800">
                    {user.name}
                  </h1>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* 구분선 */}
              <div className="border-t border-gray-100 my-3" />

              {/* 방문 기록 버튼 */}
              <button
                onClick={() => {
                  setIsVisible(true);
                  router.push("/visits");
                }}
                className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors group w-full justify-center text-sm"
              >
                <History className="w-4 h-4" />
                <span className="font-medium">방문 기록 보기</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 프로필 카드의 높이만큼 여백 추가 */}
      <div className="h-48" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 혼자 먹기 카드 */}
        <div
          className="group relative bg-gradient-to-br from-orange-50 to-white rounded-3xl 
            shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-orange-100/50
            animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-forwards"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex flex-col items-center relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 group-hover:text-primary transition-colors">
              혼자 먹기
            </h2>
            <div className="w-64 h-64 mb-8">
              <Lottie
                animationData={cookingAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full max-w-xs transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={handleSoloEat}
            >
              시작하기
            </Button>
          </div>
        </div>

        {/* 같이 먹기 카드 */}
        <div
          className="group relative bg-gradient-to-br from-blue-50 to-white rounded-3xl 
            shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-blue-100/50
            animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex flex-col items-center relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 group-hover:text-primary transition-colors">
              같이 먹기
            </h2>
            <div className="w-64 h-64 mb-8">
              <Lottie
                animationData={desertAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full max-w-xs transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => router.push("/friends")}
            >
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
