'use client';

import { useState } from 'react';
import { useAuth } from "@/hooks/use-auth";
import { useAuthStore} from "@/store/use-auth-store";

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
            setError(''); // 초기화
            setSearchResult(null); // 초기화

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/search?email=${searchEmail}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // 토큰 가져오기
                    },
                }
            );
            if (!response.ok) {
                throw new Error('사용자를 찾을 수 없습니다.');
            }

            const data = await response.json();
            setSearchResult(data); // 검색 결과 저장
        } catch (err) {
            console.error("error!", err); // 에러 메시지 설정
        }
    };
    const handleAddFriend = async (friendId: number, userId: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/friends/request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ friendId, userId }),
            });

            if (!response.ok) {
                alert(user?.id);
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
                <div className="flex flex-col items-start w-full">
                    <div className="mb-8">
                        <h1 className="text-title text-grey-dark">친구찾기</h1>
                    </div>
                    <input
                        type="text"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                        placeholder="검색할 친구의 이메일을 입력하세요"
                        className="w-full p-3 rounded-[16px] border-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        className="mt-4 px-4 py-2 bg-[#4A90E2] text-white rounded-md hover:bg-[#1976D2] transition-colors"
                    >
                        검색
                    </button>
                </div>

                {/* 검색 결과 표시 */}
                {error && (
                    <div className="mt-4 text-red-500 text-sm">
                        {error}
                    </div>
                )}

                {searchResult && (
                    <div className="mt-6 w-full p-4 bg-gray-100 rounded-lg shadow">
                        <div className="flex items-center">
                            <div>
                                <p className="text-lg font-medium">{searchResult.name}</p>
                                <p className="text-sm text-gray-600">{searchResult.email}</p>
                            </div>
                            <button
                                onClick={() => handleAddFriend(searchResult?.id, parseInt(user?.id))}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                친구 추가
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
