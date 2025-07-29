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
        setVisits(data);
      } catch {
        setError("방문 기록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  // 로딩 상태
  if (loading) {
    return (
      <>
        <NavBar />
        <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 pt-20 px-4">
          <div className="max-w-md mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-lg w-32 mb-8"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="mb-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>
                      <div className="flex-1 space-y-3">
                        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="flex space-x-2">
                          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <>
        <NavBar />
        <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 pt-20 px-4 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-red-200 shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.982 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                문제가 발생했습니다
              </h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                다시 시도
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 pt-4 px-4 pb-8">
        <div className="max-w-md mx-auto">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              방문 기록
            </h1>
            <p className="text-gray-600 text-sm">
              {visits.length > 0
                ? `총 ${visits.length}개의 방문 기록`
                : "아직 방문 기록이 없습니다"}
            </p>
          </div>

          {/* 방문 기록 리스트 */}
          {visits.length === 0 ? (
            // 빈 상태
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                방문 기록이 없습니다
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                맛집을 탐방하고 첫 번째 방문 기록을 남겨보세요!
              </p>
              <button
                onClick={() => window.history.back()}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                맛집 찾으러 가기
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {visits.map((visit, index) => (
                <div
                  key={visit.id}
                  className="opacity-0 animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <VisitItem visit={visit} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand-scale {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .button-expand-0 {
          animation: expand-scale 0.4s ease-out 0s both;
        }

        .button-expand-1 {
          animation: expand-scale 0.4s ease-out 0.1s both;
        }

        .button-expand-2 {
          animation: expand-scale 0.4s ease-out 0.2s both;
        }
      `}</style>
    </>
  );
}

function VisitItem({ visit }: { visit: Visit }) {
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState(visit.visitStatus);
  const [updating, setUpdating] = useState(false);

  const handleUpdateStatus = async (
    newStatus: "NOT_VISITED" | "LIKE" | "DISLIKE"
  ) => {
    setUpdating(true);
    try {
      await api.visits.updateStatus(visit.restaurantId, {
        visitStatus: newStatus,
      });
      setStatus(newStatus);
      setEditing(false);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center space-x-4 min-h-[80px]">
        {/* Restaurant Image */}
        <div className="flex-shrink-0">
          {visit.imageUrl ? (
            <img
              src={visit.imageUrl}
              alt={visit.restaurantName}
              className="w-20 h-20 rounded-xl object-cover border-2 border-gray-100"
            />
          ) : (
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 border-gray-100">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Restaurant Info */}
        <div className="flex-1 min-w-0">
          <a
            href={visit.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-semibold text-gray-800 hover:text-orange-600 transition-colors duration-200 mb-2 truncate"
          >
            {visit.restaurantName}
          </a>

          <p className="text-xs text-gray-500 mb-4">
            {new Date(visit.createdAt).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "short",
            })}
          </p>

          {/* Status Buttons */}
          <div className="relative h-6 flex items-center">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                disabled={updating}
                className="w-20 h-6 border border-gray-400 text-gray-600 rounded-full text-xs flex items-center justify-center transition-all duration-300 hover:border-orange-400 hover:text-orange-600"
              >
                {status === "NOT_VISITED" && "미방문"}
                {status === "LIKE" && "좋아요"}
                {status === "DISLIKE" && "싫어요"}
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateStatus("NOT_VISITED")}
                  disabled={updating}
                  className={`w-16 h-6 rounded-full text-xs flex items-center justify-center transition-all duration-300 button-expand-0 ${
                    status === "NOT_VISITED"
                      ? "bg-orange-500 text-white shadow-md"
                      : "border border-orange-400 text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  {updating ? "..." : "미방문"}
                </button>
                <button
                  onClick={() => handleUpdateStatus("LIKE")}
                  disabled={updating}
                  className={`w-16 h-6 rounded-full text-xs flex items-center justify-center transition-all duration-300 button-expand-1 ${
                    status === "LIKE"
                      ? "bg-orange-500 text-white shadow-md"
                      : "border border-orange-400 text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  {updating ? "..." : "좋아요"}
                </button>
                <button
                  onClick={() => handleUpdateStatus("DISLIKE")}
                  disabled={updating}
                  className={`w-16 h-6 rounded-full text-xs flex items-center justify-center transition-all duration-300 button-expand-2 ${
                    status === "DISLIKE"
                      ? "bg-orange-500 text-white shadow-md"
                      : "border border-orange-400 text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  {updating ? "..." : "싫어요"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
