import { prisma } from "@/app/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Récupérer la liste des amis
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const userId = session.user.id;

  // Récupérer les amis avec leurs informations
  const friends = await prisma.friend.findMany({
    where: {
      userId: userId,
    },
    include: {
      friend: {
        select: {
          id: true,
          name: true,
          image: true,
          tag: true,
          isOnline: true,
          lastSeen: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({
    friends: friends.map((f) => f.friend),
  });
}
