"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoSection } from "@/components/logo-section";
import { NavBar } from "@/components/nav-bar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden relative">
      <NavBar />

      {/* 다이나믹 배경 */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-transparent to-red-100/30"></div>

        {/* 부드럽게 움직이는 그라데이션 배경들 */}
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute w-96 h-96 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-3xl animate-float-1"
            style={{ top: "10%", left: "10%" }}
          ></div>
          <div
            className="absolute w-80 h-80 bg-gradient-to-r from-red-400 to-orange-400 rounded-full blur-3xl animate-float-2"
            style={{ top: "60%", right: "10%" }}
          ></div>
          <div
            className="absolute w-72 h-72 bg-gradient-to-r from-orange-300 to-yellow-400 rounded-full blur-3xl animate-float-3"
            style={{ bottom: "20%", left: "20%" }}
          ></div>
        </div>

        {/* 애니메이션 파티클들 */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-orange-400/40 rounded-full animate-twinkle`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        {/* 히어로 섹션 - 풀스크린 */}
        <section className="min-h-screen flex flex-col justify-center items-center px-4 relative pt-16">
          <div className="text-center space-y-8 max-w-sm mx-auto">
            {/* 로고 섹션 */}
            <div className="transform hover:scale-105 transition-transform duration-500">
              <LogoSection showDescription={false} />
            </div>

            {/* 메인 헤드라인 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent leading-tight">
                고민 끝.
                <br />
                <span className="text-3xl">오늘 뭐 먹지?</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                AI가 당신만을 위한 맛집을 찾아드려요
                <br />
                친구들과 함께 맛있는 순간을 만들어보세요
              </p>
            </div>

            {/* 메인 CTA */}
            <div className="pt-4">
              <Link href="/login" className="block">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-6 px-8 rounded-2xl text-lg shadow-2xl shadow-orange-500/25 transform hover:-translate-y-1 hover:shadow-3xl hover:shadow-orange-500/40 transition-all duration-300 border-0">
                  <span className="flex items-center justify-center space-x-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
                    </svg>
                    <span>지금 시작하기</span>
                  </span>
                </Button>
              </Link>

              <div className="flex items-center justify-center mt-4 space-x-4 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>무료</span>
                </span>
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>1분 가입</span>
                </span>
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>바로 사용</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 기능 섹션 */}
        <section className="py-20 px-4">
          <div className="max-w-sm mx-auto space-y-12">
            <h2 className="text-2xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              <svg
                className="w-8 h-8 mx-auto mb-4 text-orange-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
              </svg>
              왜 이거무라일까요?
            </h2>

            {/* 기능 카드들 */}
            <div className="space-y-8">
              {[
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 12l2 2 4-4" />
                      <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" />
                      <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" />
                      <path d="M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" />
                      <path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" />
                    </svg>
                  ),
                  title: "AI 맞춤 추천",
                  desc: "당신의 취향을 학습해서\n딱 맞는 메뉴를 찾아드려요",
                  gradient: "from-blue-500 to-purple-600",
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  title: "친구와 함께",
                  desc: "맛집을 공유하고\n함께 맛있는 추억을 쌓아가요",
                  gradient: "from-green-500 to-teal-600",
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  title: "부산대 맛집",
                  desc: "부산대학교 근처의\n최고의 맛집을 추천해요",
                  gradient: "from-orange-500 to-red-600",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 hover:bg-white/90 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg`}
                    >
                      <div className="w-8 h-8 text-white">{feature.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 최종 CTA 섹션 */}
        <section className="py-20 px-4 relative">
          <div className="max-w-sm mx-auto text-center">
            <div className="bg-white/90 backdrop-blur-2xl border border-gray-200 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                맛있는 모험 시작!
              </h3>
              <p className="text-gray-600 mb-8 text-sm">
                지금 바로 가입하고
                <br />
                <span className="text-orange-600 font-semibold">
                  AI 맞춤 맛집 추천
                </span>
                을 받아보세요
              </p>

              <Link href="/login" className="block">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-6 px-8 rounded-2xl text-lg shadow-2xl shadow-orange-500/30 transform hover:-translate-y-1 hover:shadow-3xl hover:shadow-orange-500/50 transition-all duration-300 border-0 relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <span className="relative flex items-center justify-center space-x-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
                    </svg>
                    <span>무료로 시작하기</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
                    </svg>
                  </span>
                </Button>
              </Link>

              <p className="text-xs text-gray-500 mt-4">
                이메일만으로 30초 만에 가입 완료
              </p>
            </div>
          </div>
        </section>

        <div className="h-12"></div>
      </div>

      {/* 플로팅 푸드 아이콘들 */}
      {[
        {
          icon: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
              <path d="M8.5 8.5v.01" />
              <path d="M16 15.5v.01" />
              <path d="M12 12v.01" />
            </svg>
          ),
          top: "20%",
          left: "10%",
          delay: "0s",
          duration: "6s",
        },
        {
          icon: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
          ),
          top: "40%",
          right: "15%",
          delay: "2s",
          duration: "8s",
        },
        {
          icon: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
              <path d="M8.5 8.5v.01" />
              <path d="M16 15.5v.01" />
              <path d="M12 12v.01" />
            </svg>
          ),
          bottom: "30%",
          left: "8%",
          delay: "4s",
          duration: "7s",
        },
        {
          icon: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          ),
          bottom: "20%",
          right: "12%",
          delay: "1s",
          duration: "9s",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="fixed w-6 h-6 text-orange-400/30 pointer-events-none animate-bounce"
          style={{
            ...item,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          {item.icon}
        </div>
      ))}

      {/* 커스텀 애니메이션 스타일 */}
      <style jsx>{`
        @keyframes float-1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes float-2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-40px, -20px) rotate(180deg);
          }
        }

        @keyframes float-3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -40px) rotate(90deg);
          }
          75% {
            transform: translate(-30px, 10px) rotate(270deg);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5);
          }
        }

        .animate-float-1 {
          animation: float-1 20s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 25s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float-3 30s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
