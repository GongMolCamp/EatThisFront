"use client";

import { Logo } from "@/components/logo";
import { useSearchParams } from "next/navigation";
import { fetchWithAuth } from "@/lib/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MapPin, Navigation, History } from "lucide-react";
import { useScrollStore } from "@/store/use-scroll-store";

interface Restaurant {
  id: number;
  name: string;
  menu: string;
  map_url: string;
  image_url: string;
}

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const encodedPlace = searchParams.get("food");
  const placeId = encodedPlace ? atob(encodedPlace) : "추천 메뉴 없음";
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);
  const setIsVisible = useScrollStore((state) => state.setIsVisible);

  useEffect(() => {
    const fetchData = async () => {
      if (placeId) {
        try {
          const response = await fetchWithAuth(`/restaurants/${placeId}`, {
            method: "GET",
          });
          setRestaurantData(response);
        } catch (error) {
          console.error("데이터 로딩 에러:", error);
        }
      }
    };
    fetchData();
  }, [placeId]);

  useEffect(() => {
    setIsVisible(true);
  }, [setIsVisible]);

  const handleBackToMain = () => {
    setIsVisible(true);
    router.push("/main");
  };

  if (!restaurantData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50/30 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex flex-col items-center mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <Logo width={80} height={80} />
            <h1 className="text-2xl font-bold text-gray-800 mt-4">
              오늘의 추천 맛집
            </h1>
            <p className="text-sm text-gray-500">
              AI가 당신을 위해 선택했어요!
            </p>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="relative h-72 w-full">
                <img
                  src={
                    restaurantData.image_url ||
                    "https://via.placeholder.com/800x600"
                  }
                  alt={restaurantData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white/80 text-sm mb-1">추천 메뉴</p>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {restaurantData.name}
                  </h2>
                  <p className="text-white/90 font-medium">
                    {restaurantData.menu}
                  </p>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <a
                  href={restaurantData.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full gap-2 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Navigation className="w-4 h-4" />
                    길찾기
                  </Button>
                </a>

                <Button
                  variant="outline-primary"
                  size="lg"
                  className="w-full gap-2 hover:bg-gray-50 transition-colors"
                  onClick={handleBackToMain}
                >
                  <MapPin className="w-4 h-4" />
                  다시 추천받기
                </Button>
              </div>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-100">
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2 hover:bg-white/80 transition-all text-gray-600 group"
                onClick={() => {
                  setIsVisible(true);
                  router.push("/visits");
                }}
              >
                <History className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span className="group-hover:text-primary transition-colors">
                  방문 기록 보기
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
