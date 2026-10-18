import type { Metadata } from "next";
import "./style.css";
export const metadata: Metadata = { title: "ระบบเข้าสู่ระบบ", description: "Login with email/password or GitHub" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="th"><body>{children}</body></html>; }
