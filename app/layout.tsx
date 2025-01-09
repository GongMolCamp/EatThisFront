import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { NavBar } from "@/components/nav-bar";

export const metadata: Metadata = {
  title: "EatThis",
  description: "그냥 이거 무라.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <NavBar />
          <div className="pt-16">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
