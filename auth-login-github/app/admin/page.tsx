import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { logoutAction } from "@/app/actions";
export default async function AdminPage() { const session = await auth(); if (!session?.user) redirect("/login"); return <main className="shell"><section className="panel"><p className="eyebrow">PRIVATE AREA</p><h1>ยินดีต้อนรับ</h1><p>ผู้ใช้: {session.user.name ?? session.user.email}</p><p>สิทธิ์: {(session.user as typeof session.user & { role?: string }).role ?? "USER"}</p><p className="muted">หน้านี้ต้องเข้าสู่ระบบก่อนจึงจะดูได้</p><form action={logoutAction}><button className="button danger" type="submit">ออกจากระบบ</button></form></section></main>; }
