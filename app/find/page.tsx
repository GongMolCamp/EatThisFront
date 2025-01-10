'use client';

import { useState } from 'react';
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
    const token = useAuthStore((state)=> state.token);
    const { user } = useAuth();
    const [searchEmail, setSearchEmail] = useState('');
    const [searchResult, setSearchResult] = useState<User | null>(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            setError('');
            setSearchResult(null);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/search?email=${searchEmail}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('사용자를 찾을 수 없습니다.');
            }

            const data = await response.json();
            setSearchResult(data);
        } catch (err) {
            console.error("error!", err);
            setError('사용자를 찾을 수 없습니다.');
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
        <main className="flex min-h-screen flex-col items-center bg-white">
            <div className="w-full max-w-[640px] px-6 py-16">
                <div className="mb-8">
                    <h1 className="text-title text-grey-dark">친구찾기</h1>
                </div>

                {/* 인풋 + 내부 아이콘 영역 */}
                <div className="relative w-full">
                    <input
                        type="text"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                        placeholder="검색할 친구의 이메일을 입력하세요"
                        className="
                            w-full
                            p-3
                            pr-12              /* 오른쪽에 아이콘 자리 확보 */
                            rounded-[16px]
                            border-2
                            text-sm
                            text-gray-700
                            placeholder:text-gray-400
                            focus:outline-none
                        "
                    />
                    {/* 돋보기 아이콘 (버튼 역할) */}
                    <button
                        onClick={handleSearch}
                        className="
                            absolute
                            top-1/2
                            right-4
                            -translate-y-1/2
                            text-gray-500
                            hover:text-gray-700
                            focus:outline-none
                        "
                    >
                        <AiOutlineSearch size={20} />
                    </button>
                </div>

                {/* 에러 메시지 */}
                {error && (
                    <div className="mt-4 text-red-500 text-sm">
                        {error}
                    </div>
                )}

                {/* 검색 결과 */}
                {searchResult && (
                    <div className="w-full flex p-3 rounded-2xl border-2 text-sm text-gray-dark border-primary mt-6">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0" />
                                <div className="text-left ml-4">
                                    <p className="text-lg font-medium">{searchResult.name}</p>
                                    <p className="text-sm text-gray-600">{searchResult.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleAddFriend(searchResult.id, parseInt(user?.id))}
                                className="
                                    px-4 py-2
                                    border-2
                                    bg-primary
                                    text-white
                                    rounded-md
                                    hover:bg-[#F57C00]
                                "
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
