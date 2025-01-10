"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/use-auth-store";

// 예: 돋보기 아이콘 (react-icons 설치 후 사용 가능)
import { AiOutlineSearch } from "react-icons/ai";

interface User {
  id: number;
  name: string;
  email: string;
  profileImageUrl?: string;
}

export default function FindPage() {
  const token = useAuthStore((state) => state.token);
  const { user } = useAuth();
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResult, setSearchResult] = useState<User | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setError("");
      setSearchResult(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/search?email=${searchEmail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }

      const data = await response.json();
      setSearchResult(data);
    } catch (err) {
      console.error("error!", err);
      setError("사용자를 찾을 수 없습니다.");
    }
  };

  const handleAddFriend = async (friendId: number, userId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/friends/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ friendId, userId }),
        }
      );

      if (!response.ok) {
        throw new Error("친구 요청에 실패했습니다.");
      }

      alert("친구 요청이 전송되었습니다!");
    } catch (error) {
      console.error(error);
      alert("친구 요청 중 문제가 발생했습니다.");
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
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-orange-50/30">
      <div className="w-full max-w-[640px] px-6 py-8">
        {/* 상단 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">친구찾기</h1>
          <p className="text-sm text-gray-500 mt-2">
            이메일로 친구를 검색해보세요
          </p>
        </div>

        {/* 검색 영역 */}
        <div className="relative w-full mb-8">
          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="친구 이메일 입력"
            className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-gray-100 
              focus:border-primary/30 focus:outline-none transition-colors
              placeholder:text-gray-400 shadow-sm"
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5
              text-gray-400 hover:text-primary rounded-full
              hover:bg-primary/5 transition-all duration-200"
          >
            <AiOutlineSearch size={22} />
          </button>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="text-center py-4 px-6 bg-red-50 rounded-2xl text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* 검색 결과 */}
        {searchResult && (
          <div
            className="bg-white rounded-2xl p-4 border-2 border-gray-100
              hover:border-primary/30 transition-all duration-200 group
              animate-in fade-in-0 slide-in-from-bottom-8 duration-500"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-br 
                  from-primary/20 to-primary/5 flex items-center justify-center"
                >
                  <span className="text-lg font-medium text-gray-600">
                    {searchResult.name[0]}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-medium text-gray-800 group-hover:text-primary 
                    transition-colors"
                  >
                    {searchResult.name}
                  </h3>
                  <p className="text-sm text-gray-500">{searchResult.email}</p>
                </div>
              </div>
              <button
                onClick={() =>
                  handleAddFriend(searchResult.id, parseInt(user?.id))
                }
                className="px-4 py-2 rounded-xl border-2 border-primary 
                  text-primary hover:bg-primary hover:text-white
                  transition-all duration-200 text-sm font-medium"
              >
                친구추가
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
