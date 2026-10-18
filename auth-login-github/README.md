# ระบบเข้าสู่ระบบด้วย Email/Password และ GitHub

โปรเจกต์ตัวอย่าง Next.js + Auth.js (NextAuth v5) + Prisma + SQLite ประกอบด้วยหน้าเข้าสู่ระบบ สมัครสมาชิก หน้าเฉพาะผู้ที่เข้าสู่ระบบแล้ว และปุ่มเข้าสู่ระบบด้วย GitHub OAuth

## สิ่งที่ต้องติดตั้ง

- Node.js รุ่น 20.9 ขึ้นไป
- npm (ติดตั้งมาพร้อม Node.js)
- บัญชี GitHub สำหรับตั้งค่า OAuth หากต้องการใช้ปุ่ม GitHub

## 1. ติดตั้งโปรเจกต์

เปิด Terminal หรือ PowerShell ในโฟลเดอร์โปรเจกต์ แล้วรัน:

```bash
npm install
```

คัดลอกไฟล์ `.env.example` เป็น `.env` แล้วกำหนด `DATABASE_URL` และ `AUTH_SECRET`:

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="ใส่ค่า secret ที่สร้างขึ้น"
AUTH_GITHUB_ID="ใส่ GitHub Client ID"
AUTH_GITHUB_SECRET="ใส่ GitHub Client Secret"
```

สร้าง secret ด้วยคำสั่ง:

```bash
npx auth secret
```

นำค่าที่ได้ไปใส่ใน `AUTH_SECRET` ในไฟล์ `.env` ห้ามเผยแพร่ไฟล์ `.env` หรือ Client Secret

## 2. เตรียมฐานข้อมูล

```bash
npx prisma migrate dev --name init
npx prisma generate
```

คำสั่งนี้จะสร้างฐานข้อมูล SQLite และตาราง User ตาม `prisma/schema.prisma` โดยรหัสผ่านจะถูกแฮชก่อนบันทึก

## 3. ตั้งค่า GitHub Login (ไม่บังคับ แต่จำเป็นสำหรับปุ่ม GitHub)

1. เปิด https://github.com/settings/developers
2. เลือก **OAuth Apps** แล้วกด **New OAuth App**
3. กรอกค่าตอนพัฒนาในเครื่อง:
   - Application name: `Auth Demo`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. สร้าง OAuth App แล้วคัดลอก **Client ID** ใส่ `AUTH_GITHUB_ID`
5. กดสร้าง Client Secret แล้วใส่ `AUTH_GITHUB_SECRET`
6. บันทึกไฟล์ `.env` แล้วหยุด/เริ่มเซิร์ฟเวอร์ใหม่

หากยังไม่ได้ตั้งค่า GitHub OAuth สามารถทดสอบสมัครและเข้าสู่ระบบด้วย Email/Password ได้ แต่ปุ่ม GitHub จะยังใช้งานไม่ได้

## 4. เริ่มใช้งาน

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ http://localhost:3000

- `/` หน้าแรก
- `/signup` สมัครสมาชิก
- `/login` เข้าสู่ระบบด้วย Email/Password หรือ GitHub
- `/admin` หน้าตัวอย่างที่ต้องเข้าสู่ระบบก่อน

สร้างบัญชีผ่านหน้า `/signup` แล้วนำ Email และ Password เดิมไปเข้าสู่ระบบได้ ผู้ใช้ที่สมัครใหม่จะได้รับสิทธิ์ `USER` โดยค่าเริ่มต้น

## คำสั่งที่ใช้บ่อย

```bash
npm run dev       # เปิดโหมดพัฒนา
npm run build     # สร้าง build สำหรับ production
npm run start     # เปิด build ที่สร้างแล้ว
npx prisma studio # เปิดเครื่องมือดูข้อมูลในฐานข้อมูล
```

## โครงสร้างหลัก

```text
app/
  actions.ts                    # Server actions สำหรับ login/logout/signup
  auth.ts                       # การตั้งค่า Auth.js และ providers
  api/auth/[...nextauth]/route.ts
  admin/page.tsx                # หน้าที่ต้องเข้าสู่ระบบ
  login/page.tsx                # หน้าเข้าสู่ระบบ
  signup/page.tsx               # หน้าสมัครสมาชิก
  lib/prisma.ts                 # Prisma client
  layout.tsx
  page.tsx
  style.css
prisma/schema.prisma            # โครงสร้างฐานข้อมูล
.env.example                    # ตัวอย่างตัวแปรแวดล้อม
```

## หมายเหตุด้านความปลอดภัย

- อย่าใส่ Client Secret จริงลงใน Git หรือส่งให้ผู้อื่น
- ในตัวอย่างนี้การสมัครสมาชิกกำหนดบทบาทเป็น `USER` เสมอ อย่าเปลี่ยนให้ผู้สมัครทั่วไปได้ `ADMIN`
- ก่อนใช้งานจริงควรเพิ่มการจำกัดความถี่การ login, การยืนยันอีเมล, การกู้คืนรหัสผ่าน, การตรวจสอบความปลอดภัย และทดสอบ callback/ฐานข้อมูลบนโฮสต์จริง
- หากใช้ฐานข้อมูลอื่น ให้เปลี่ยน provider และการตั้งค่า Prisma ให้ตรงกัน

## ที่มา

ต้นทาง: https://github.com/it-nkc/auth

แพ็กเกจนี้จัดเป็นโปรเจกต์ตัวอย่างเพื่อให้ทดลองติดตั้งในเครื่องได้ โดยมี README สำหรับการตั้งค่าเพิ่มเติม
