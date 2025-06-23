import { prisma } from "@/app/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Accepter ou refuser une demande d'amitié
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { action } = await request.json();
  const requestId = params.id;
  const userId = session.user.id;

  // Vérifier que la demande existe et appartient à l'utilisateur
  const friendRequest = await prisma.friendRequest.findFirst({
    where: {
      id: requestId,
      receiverId: userId,
      status: "pending",
    },
  });

  if (!friendRequest) {
    return NextResponse.json(
      { error: "Demande d'ami non trouvée" },
      { status: 404 }
    );
  }

  if (action === "accept") {
    // Créer une relation d'amitié bidirectionnelle
    await prisma.$transaction([
      // Mettre à jour le statut de la demande
      prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: "accepted" },
      }),
      // Créer la relation d'amitié (utilisateur -> ami)
      prisma.friend.create({
        data: {
          userId: userId,
          friendId: friendRequest.senderId,
        },
      }),
      // Créer la relation d'amitié inverse (ami -> utilisateur)
      prisma.friend.create({
        data: {
          userId: friendRequest.senderId,
          friendId: userId,
        },
      }),
    ]);

    return NextResponse.json({ message: "Demande d'ami acceptée" });
  } else if (action === "reject") {
    // Mettre à jour le statut de la demande
    await prisma.friendRequest.update({
      where: { id: requestId },
      data: { status: "rejected" },
    });

    return NextResponse.json({ message: "Demande d'ami refusée" });
  }

  return NextResponse.json({ error: "Action non valide" }, { status: 400 });
}
