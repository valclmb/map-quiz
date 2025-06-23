import { prisma } from "@/app/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { friendId } = await request.json();

  if (!friendId) {
    return NextResponse.json({ error: "ID d'ami requis" }, { status: 400 });
  }

  const userId = session.user.id;

  try {
    // Supprimer la relation d'amitié dans les deux sens
    await prisma.$transaction([
      // Supprimer l'entrée où l'utilisateur actuel est l'utilisateur principal
      prisma.friend.deleteMany({
        where: {
          userId: userId,
          friendId: friendId,
        },
      }),
      // Supprimer l'entrée où l'utilisateur actuel est l'ami
      prisma.friend.deleteMany({
        where: {
          userId: friendId,
          friendId: userId,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Ami supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'ami:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'ami" },
      { status: 500 }
    );
  }
}
