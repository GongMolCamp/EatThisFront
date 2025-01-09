"use client";

import Image from "next/image";
import { Logo } from "@/components/logo";
import {useSearchParams} from "next/navigation";
import { fetchWithAuth } from "@/lib/api";
import { useEffect, useState } from "react";

interface Restaurant {
    id: number;
    name: string;
    menu: string;
    map_url: string;
    image_url: string;
}


export default function Home() {
  const searchParams = useSearchParams();
  const encodedPlace = searchParams.get("food");
  const placeId = encodedPlace ? atob(encodedPlace) : "추천 메뉴 없음";
  console.log(placeId);

  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null); // 백엔드에서 가져온 데이터
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (placeId) {
        try {
          const response = await fetchWithAuth(`/restaurants/${placeId}`, {
            method: "GET",
          });
          // 가져온 데이터를 상태에 저장
          setRestaurantData(response);
          console.log(response);
        } catch (error) {
          console.error("AI 추천 에러:", error);
        }
      }
    };
    fetchData(); // 비동기 함수 호출
  }, [placeId]);

  if (!restaurantData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-600">데이터를 가져올 수 없습니다.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center font-sans">
      {/* 상단 아이스크림 이미지 */}
      <div className="mt-4">
        <Logo width={190} height={190}></Logo>
      </div>
      

      {/* 제목 */}
      <h1 className="mt-4 font-logo text-[70px] text-primary">{restaurantData.name}</h1>

      {/* 이미지가 들어갈 네모 */}
      <div className="w-72 h-72 border border-gray-300 rounded-lg overflow-hidden">
        <img
            src={restaurantData.image_url || "https://via.placeholder.com/300"} // 데이터베이스에서 가져온 URL
            alt={restaurantData.name}
            className="w-full h-full object-cover"
        />
    </div>

      {/* 하단 링크 */}
      <div className="mt-4">
        <a
            href={restaurantData.map_url || "#"} // 원하는 URL
            className="font-logo text-[43px] text-primary"
            target="_blank" // 새 창에서 열기
            rel="noopener noreferrer" // 보안 설정
        >
            {restaurantData.menu|| "실패"}
        </a>
        </div>
    </div>
  );
}
