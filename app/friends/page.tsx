"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/use-auth-store";
import { useScrollStore } from "@/store/use-scroll-store";

interface Friend {
  id: number;
  name: string;
  allergies: string[];
  profileImageUrl: string | null;
}

const allergyTranslation: { [key: string]: string } = {
  CRUSTACEAN: "갑각류",
  FISH: "생선",
  SHELLFISH: "조개류",
  EGG: "계란",
  MILK: "우유",
  SOYBEAN: "대두(콩)",
  WHEAT: "밀",
  NUTS: "견과류",
};

const translateAllergy = (allergies: string[]): string => {
  if (!allergies || allergies.length === 0) {
    return "없음";
  }
  return allergies
      .map((allergy) => allergyTranslation[allergy] || allergy)
      .join(", ");
};

export default function SocialPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const { user } = useAuth();
  const setIsVisible = useScrollStore((state) => state.setIsVisible);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriendIds, setSelectedFriendIds] = useState<number[]>([]);

  useEffect(() => {
    setIsVisible(true);
  }, [setIsVisible]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!user) {
        console.error("로그인된 사용자 정보가 없습니다.");
        return;
      }

      try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/friends/list?userId=${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
        );
        if (!response.ok) {
          throw new Error("친구 목록을 가져오는 데 실패했습니다.");
        }

        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error("친구 목록을 가져오는 중 오류 발생:", error);
      }
    };
    fetchFriends();
  }, [user, token]);

  const handleFriendClick = (id: number) => {
    setSelectedFriendIds((prevSelected) => {
      if (prevSelected.includes(id)) {
        // 이미 선택된 친구라면 -> 선택 해제
        return prevSelected.filter((friendId) => friendId !== id);
      } else {
        // 선택되지 않은 친구라면 -> 선택
        return [...prevSelected, id];
      }
    });
  };

  const Recommendation = async () => {
    try {
      setIsVisible(true);
      const response = await fetchWithAuth("/api/ai/generate", {
        method: "POST",
        body: JSON.stringify({
          members: [...selectedFriendIds],
        }),
      });
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
  <main className="flex flex-col items-center w-full h-screen bg-white">
    <div className="flex flex-col w-full max-w-[640px] h-full">
      <div className="sticky top-0 shadow-md bg-white z-10 px-6 pt-8 pb-4">
        <h1 className="text-title text-gray-dark">소셜</h1>
        <p className="text-subtitle text-gray-default mt-7">친구목록</p>
      </div>


      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <div className="w-full space-y-6 mt-6">
          {friends.map((friend) => {
            const isSelected = selectedFriendIds.includes(friend.id);
            const borderColorClass = isSelected
                ? "border-[#4A90E2]"
                : "border-[#FFA726]";

            return (
                <button
                    key={friend.id}
                    onClick={() => handleFriendClick(friend.id)}
                    className={`w-full flex items-center p-3 rounded-2xl border-2 shadow-md text-sm text-gray-dark hover:border-[#F57C00] ${borderColorClass}`}
                >
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex-shrink-0" />
                  <div className="text-left">
                    <div>이름 : {friend.name}</div>
                    <div>알러지 : {translateAllergy(friend.allergies)}</div>
                  </div>
                </button>
            );
          })}
        </div>
      </div>

      {/*
          하단 버튼 영역
          (모바일 기준에서 항상 아래쪽에 위치)
        */}
      <div className="flex flex-col gap-4 px-6 pb-8">
        <Link href="/find" className="w-full">
          <Button variant="primary" size="lg" className="w-full">
            친구찾기
          </Button>
        </Link>
        <Button
            variant="outline-primary"
            size="lg"
            className="w-full"
            onClick={Recommendation}
        >
          추천받기
        </Button>
      </div>
    </div>
  </main>
);
}
