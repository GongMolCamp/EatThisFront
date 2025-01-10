"use client"; // 클라이언트 컴포넌트로 선언

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface Visit {
  id: string;
  restaurantId: string;
  restaurantName: string;
  visitStatus: "NOT_VISITED" | "LIKE" | "DISLIKE";
  createdAt: string;
}

export default function VisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const data = await api.visits.list();
        setVisits(data);
        setLoading(false);
      } catch {
        setError("방문 기록을 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="flex flex-col items-center bg-white p-4">
      <h1 className="text-2xl font-bold mb-4">방문 기록</h1>
      <div className="w-full max-w-xl">
        {visits.map((visit) => (
          <VisitItem key={visit.id} visit={visit} />
        ))}
      </div>
    </main>
  );
}

function VisitItem({ visit }: { visit: Visit }) {
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState(visit.visitStatus);

  const handleUpdateStatus = async (
    newStatus: "NOT_VISITED" | "LIKE" | "DISLIKE"
  ) => {
    try {
      await api.visits.updateStatus(visit.restaurantId, {
        visitStatus: newStatus,
      });
      setStatus(newStatus);
      setEditing(false);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="flex items-center gap-4 border-b border-gray-300 p-4">
      {/* Place Info */}
      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-bold">{visit.restaurantName}</h3>
        <p className="text-gray-500 text-sm">
          {new Date(visit.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Status Buttons */}
      {!editing ? (
        <button
          onClick={() => setEditing(true)}
          className="border border-[#4A90E2] text-[#4A90E2] px-4 py-2 rounded-md"
        >
          {status === "NOT_VISITED" && "미방문"}
          {status === "LIKE" && "좋아요"}
          {status === "DISLIKE" && "싫어요"}
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => handleUpdateStatus("NOT_VISITED")}
            className={`px-4 py-2 rounded-md ${
              status === "NOT_VISITED"
                ? "bg-[#FFA726] text-white"
                : "border border-[#FFA726] text-[#FFA726]"
            }`}
          >
            미방문
          </button>
          <button
            onClick={() => handleUpdateStatus("LIKE")}
            className={`px-4 py-2 rounded-md ${
              status === "LIKE"
                ? "bg-[#FFA726] text-white"
                : "border border-[#FFA726] text-[#FFA726]"
            }`}
          >
            좋아요
          </button>
          <button
            onClick={() => handleUpdateStatus("DISLIKE")}
            className={`px-4 py-2 rounded-md ${
              status === "DISLIKE"
                ? "bg-[#FFA726] text-white"
                : "border border-[#FFA726] text-[#FFA726]"
            }`}
          >
            싫어요
          </button>
        </div>
      )}
    </div>
  );
}
