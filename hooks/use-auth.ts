import { useEffect } from "react";
import { useAuthStore } from "@/store/use-auth-store";

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, login, logout, setLoading } =
    useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!token) {
          throw new Error("No token");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Not authenticated");
        }

        const userData = await response.json();
        login(userData, token);
      } catch (error) {
        console.error("Auth check failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    if (isLoading && token) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [isLoading, token, login, logout, setLoading]);

  return { user, token, isAuthenticated, isLoading, logout };
}
