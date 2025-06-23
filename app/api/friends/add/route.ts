import { prisma } from "@/app/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Ajouter un ami par son tag
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { tag } = await request.json();

    if (!tag) {
      return NextResponse.json({ error: "Tag requis" }, { status: 400 });
    }

    const currentUserId = session.user.id;

    // Trouver l'utilisateur par son tag
    const friendUser = await prisma.user.findUnique({
      where: { tag },
    });

    if (!friendUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Vérifier qu'on n'essaie pas de s'ajouter soi-même
    if (friendUser.id === currentUserId) {
      return NextResponse.json(
        { error: "Vous ne pouvez pas vous ajouter vous-même" },
        { status: 400 }
      );
    }

    // Vérifier si une relation d'amitié existe déjà
    const existingFriendship = await prisma.friend.findUnique({
      where: {
        userId_friendId: {
          userId: currentUserId,
          friendId: friendUser.id,
        },
      },
    });

    if (existingFriendship) {
      return NextResponse.json(
        { error: "Vous êtes déjà amis avec cet utilisateur" },
        { status: 400 }
      );
    }

    // Vérifier si une demande en attente existe déjà
    const pendingRequest = await prisma.friendRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: friendUser.id,
        status: "pending",
      },
    });

    if (pendingRequest) {
      return NextResponse.json(
        { error: "Une demande est déjà en attente" },
        { status: 400 }
      );
    }

    // Supprimer les anciennes demandes d'amitié entre ces utilisateurs
    await prisma.friendRequest.deleteMany({
      where: {
        OR: [
          { senderId: currentUserId, receiverId: friendUser.id },
          { senderId: friendUser.id, receiverId: currentUserId },
        ],
      },
    });

    // Créer une nouvelle demande d'ami
    await prisma.friendRequest.create({
      data: {
        senderId: currentUserId,
        receiverId: friendUser.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Demande d'ami envoyée",
    });
  } catch (error) {
    // Assurer qu'une réponse JSON valide est toujours renvoyée, même en cas d'erreur
    console.error("Erreur lors de l'ajout d'ami:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'ajout d'ami" },
      { status: 500 }
    );
  }
}
