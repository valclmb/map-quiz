import { prisma } from "@/app/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Récupérer les demandes d'amitié reçues
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const userId = session.user.id;

  // Récupérer les demandes d'amitié reçues avec les informations de l'expéditeur
  const friendRequests = await prisma.friendRequest.findMany({
    where: {
      receiverId: userId,
      status: "pending",
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          image: true,
          tag: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ friendRequests });
}
