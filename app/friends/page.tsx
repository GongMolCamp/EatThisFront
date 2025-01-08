// app/social/page.tsx
'use client';

import {useState} from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";



interface Friend {
    id: number;
    name: string;
    allergy: string;
}

const dummyFriends: Friend[] = [
    { id: 1, name: '친구1', allergy: '갑각류' },
    { id: 2, name: '친구1', allergy: '갑각류' },
    { id: 3, name: '친구1', allergy: '갑각류' },
    { id: 4, name: '친구1', allergy: '갑각류' },
    { id: 5, name: '친구1', allergy: '갑각류' },
    {id:6, name: '신태일', allergy:'해산물'},
];

export default function SocialPage() {

    const [selectedFriendIds, setSelectedFriendIds] = useState<number[]>([]);

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
                        {dummyFriends.map(friend => {
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
                                    <div>
                                        <div>이름 : {friend.name}</div>
                                        <div>알러지 : {friend.allergy}</div>
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
