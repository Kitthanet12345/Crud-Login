import Link from "next/link";
import { auth } from "@/app/auth";
export default async function Home() { const session = await auth(); return <main className="shell"><section className="panel"><p className="eyebrow">AUTH DEMO</p><h1>ระบบเข้าสู่ระบบ</h1><p className="muted">ตัวอย่าง Next.js + Auth.js</p>{session?.user ? <><p>เข้าสู่ระบบแล้ว: {session.user.email}</p><Link className="button" href="/admin">ไปหน้า Admin</Link></> : <Link className="button" href="/login">เข้าสู่ระบบ</Link>}<p><Link href="/signup">สร้างบัญชีใหม่</Link></p></section></main>; }
