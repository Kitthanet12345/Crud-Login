import Link from "next/link";
export default function UnauthorizedPage() { return <main className="shell"><section className="panel"><h1>ไม่มีสิทธิ์เข้าถึง</h1><p>บัญชีนี้ไม่มีสิทธิ์เข้าถึงหน้านี้</p><Link href="/">กลับหน้าแรก</Link></section></main>; }
