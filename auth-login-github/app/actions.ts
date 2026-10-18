"use server";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", { email: String(formData.get("email") ?? ""), password: String(formData.get("password") ?? ""), redirectTo: "/admin" });
  } catch (error) {
    if (error instanceof AuthError) redirect("/login?error=credentials");
    throw error;
  }
}
export async function githubLoginAction() {
  await signIn("github", { redirectTo: "/admin" });
}
export async function logoutAction() { await signOut({ redirectTo: "/login" }); }
export async function signupAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");
  if (!name || !email || password.length < 6 || password !== confirm) redirect("/signup?error=invalid");
  if (await prisma.user.findUnique({ where: { email } })) redirect("/signup?error=exists");
  await prisma.user.create({ data: { name, email, passwordHash: await bcrypt.hash(password, 12), role: "USER" } });
  redirect("/login?registered=1");
}
