import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 400 }
    );
  }

  const hashedPassword = await hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name },
  });
}
