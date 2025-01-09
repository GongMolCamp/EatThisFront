// app/social/page.tsx
'use client';

import {useState , useEffect} from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {useAuthStore} from "@/store/use-auth-store";



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
    NUTS: "견과류"
};

const translateAllergy = (allergies: string[]): string => {
    if (!allergies || allergies.length === 0) {
        return "없음"; // 알러지가 없는 경우 기본값
    }
    return allergies
        .map((allergy) => allergyTranslation[allergy] || allergy) // 한글로 변환
        .join(", "); // 쉼표로 구분된 문자열로 변환
};


export default function SocialPage() {
    const token = useAuthStore((state)=> state.token);
    const { user } = useAuth();
    const [friends, setFriends] = useState<Friend[]>([]);
    const [selectedFriendIds, setSelectedFriendIds] = useState<number[]>([]);

    useEffect(() => {
        const fetchFriends = async () => {
            if (!user) {
                console.error('로그인된 사용자 정보가 없습니다.');
                return;
            }

            try {
                // API 호출: 로그인된 사용자 ID 사용
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/friends/list?userId=${user.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // 토큰 가져오기
                    },
                });
                if (!response.ok) {
                    throw new Error('친구 목록을 가져오는 데 실패했습니다.');
                }

                const data = await response.json(); // JSON 데이터 파싱
                setFriends(data);
            } catch (error) {
                console.error('친구 목록을 가져오는 중 오류 발생:', error);
            }
        };
        fetchFriends();
    }, [user]);


    const handleFriendClick = (id: number) => {
        setSelectedFriendIds((prevSelected) => {
            if (prevSelected.includes(id)) {
                // 이미 선택된 친구라면 -> 선택 해제 (배열에서 제거)
                return prevSelected.filter((friendId) => friendId !== id);
            } else {
                // 아직 선택되지 않은 친구라면 -> 선택 (배열에 추가)
                return [...prevSelected, id];
            }
        });
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
                    {/* 상단 제목 */}
                    <div className="mb-8">
                        <h1 className="text-title text-gray-dark">소셜</h1>
                        {/* 친구목록 제목 */}
                        <p className="text-subtitle text-gray-default mt-7">친구목록</p>
                    </div>
                    {/* 친구 목록 */}
                    <div className="w-full space-y-6">
                        {friends.map(friend => {
                            const isSelected = selectedFriendIds.includes(friend.id);
                            const borderColorClass = isSelected ? 'border-[#4A90E2]' : 'border-[#FFA726]';

                            return (
                                <button
                                    key={friend.id}
                                    onClick={()=> handleFriendClick(friend.id)}
                                    className={`w-full flex items-center p-3 rounded-2xl border-2  text-sm text-gray-dark hover:border-[#F57C00] ${borderColorClass}`}
                                >
                                    {/* 프로필 이미지(원형) 자리 */}
                                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex-shrink-0"/>

                                    {/* 이름 / 알레르기 */}
                                    <div className="text-left">
                                        <div>이름 : {friend.name}</div>
                                        <div>알러지 : {translateAllergy(friend.allergies)}</div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* 버튼 영역 */}
                    <div className="flex flex-col w-full gap-4 mt-8">
                        <Link href="/find" className={ "w-full"}>
                            <Button variant = "primary" size="lg" className={ "w-full"}>
                                친구찾기
                            </Button>
                        </Link>
                        <Button variant = "outline-primary" size="lg" className={ "w-full"}>
                            파티추가
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
