import { useAuthStore } from "@/store/use-auth-store";

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function fetchWithAuth(url: string, options: FetchOptions = {}) {
  const token = useAuthStore.getState().token;

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = "API request failed";

    try {
      // Content-Type이 JSON인지 확인
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } else {
        // HTML 응답인 경우 (404 페이지 등)
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
    } catch {
      // JSON 파싱 실패 시 기본 에러 메시지 사용
      errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

export const api = {
  // 리뷰 관련
  reviews: {
    list: (params?: { userId?: string }) =>
      fetchWithAuth(
        `/api/reviews${params?.userId ? `?userId=${params.userId}` : ""}`
      ),
    get: (id: string) => fetchWithAuth(`/api/reviews/${id}`),
    create: (data: FormData) =>
      fetchWithAuth("/api/reviews", {
        method: "POST",
        body: data,
      }),
    update: (id: string, data: FormData) =>
      fetchWithAuth(`/api/reviews/${id}`, {
        method: "PUT",
        body: data,
      }),
    delete: (id: string) =>
      fetchWithAuth(`/api/reviews/${id}`, {
        method: "DELETE",
      }),
  },

  // 프로필 관련
  profile: {
    get: () => fetchWithAuth("/api/profile"),
    update: (data: FormData) =>
      fetchWithAuth("/api/profile", {
        method: "PUT",
        body: data,
      }),
  },

  // 방문 기록 관련
  visits: {
    list: () => fetchWithAuth("/api/visits"),
    updateStatus: async (
      placeId: string | number,
      body: { visitStatus: string }
    ) => {
      console.log("API Call to:", `/api/visits/${placeId}`); // ✅ 추가
      console.log("Request Body:", body); // ✅ 추가

      return fetchWithAuth(`/api/visits/${placeId}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
    },
  },
};
