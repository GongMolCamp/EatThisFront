"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { NavBar } from "@/components/nav-bar";

interface Visit {
  id: string;
  restaurantId: string;
  restaurantName: string;
  visitStatus: "NOT_VISITED" | "LIKE" | "DISLIKE";
  createdAt: string;
  mapUrl: string;
  imageUrl: string;
}

export default function VisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const data = await api.visits.list();
        setVisits(data.reverse()); // ✅ 방문 기록 순서를 역순으로 변경
        setLoading(false);
      } catch (err: any) {
        setError("방문 기록을 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  return (
    <>
      <NavBar />
      <main className="flex flex-col max-w-[640px] items-start bg-white p-[4vw]">
        {/* ✅ 상단 안내 문구는 고정 */}
        <h1 className="mt-[4vw] mb-[2vw] text-title font-sans text-grey-dark">방문 기록</h1>
        <div className="w-full max-w-xl">
          {/* ✅ VisitItem 부분에 로딩 및 에러 상태 반영 */}
          {loading ? <div>로딩 중...</div> : error ? <div>{error}</div> : visits.map((visit) => <VisitItem key={visit.id} visit={visit} />)}
        </div>
      </main>
    </>
  );
}

function VisitItem({ visit }: { visit: Visit }) {
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState(visit.visitStatus);

  const handleUpdateStatus = async (newStatus: "NOT_VISITED" | "LIKE" | "DISLIKE") => {
    try {
      await api.visits.updateStatus(visit.restaurantId, { visitStatus: newStatus });
      setStatus(newStatus);
      setEditing(false);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="flex items-center w-[92vw] h-[32vw] border-t border-gray DEFAULT">
      {/* Restaurant Image */}
      {visit.imageUrl ? <img src={visit.imageUrl} alt={visit.restaurantName} className="w-[20vw] h-[20vw] rounded-lg object-cover border border-secondary-light" /> : <div className="w-[20vw] h-[20vw] rounded-lg bg-gray-lightest flex items-center justify-center text-gray text-caption border border-secondary-light">사진 없음</div>}

      {/* Restaurant Info */}
      <div className="ml-[4vw] flex flex-col justify-between h-[20vw]">
        <a href={visit.mapUrl} target="_blank" rel="noopener noreferrer" className="text-title font-medium text-gray-dark hover:underline">
          {visit.restaurantName}
        </a>
        <p className="text-caption text-gray DEFAULT">{new Date(visit.createdAt).toLocaleString()}</p>

        {/* Status Buttons */}
        <div className="flex items-center gap-[4vw]">
          {!editing ? (
            <button onClick={() => setEditing(true)} className="w-[21vw] h-[24px] mt-1 border border-secondary DEFAULT text-secondary DEFAULT rounded-full text-caption flex items-center justify-center">
              {status === "NOT_VISITED" && "미방문"}
              {status === "LIKE" && "좋아요"}
              {status === "DISLIKE" && "싫어요"}
            </button>
          ) : (
            <div className="flex gap-[2.5vw]">
              {["NOT_VISITED", "LIKE", "DISLIKE"].map((type) => (
                <button key={type} onClick={() => handleUpdateStatus(type as "NOT_VISITED" | "LIKE" | "DISLIKE")} className={`w-[21vw] h-[24px] mt-1 rounded-full text-caption flex items-center justify-center ${status === type ? "bg-primary DEFAULT text-white" : "border border-primary DEFAULT text-primary DEFAULT"}`}>
                  {type === "NOT_VISITED" && "미방문"}
                  {type === "LIKE" && "좋아요"}
                  {type === "DISLIKE" && "싫어요"}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
