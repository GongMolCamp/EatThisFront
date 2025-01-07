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
    const error = await response.json();
    throw new Error(error.message || "API request failed");
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
};
