"use client";

import { useAuth } from "@/hooks/use-auth";

export default function MainPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl text-gray-500">{user.name[0]}</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
