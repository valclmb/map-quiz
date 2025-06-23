import { prisma } from "@/app/lib/prisma";
import { auth } from "@/lib/auth";
import { generateRandomTag } from "@/src/lib/generateTag";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Générer ou récupérer un tag pour l'utilisateur connecté
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const userId = session.user.id;

  // Vérifier si l'utilisateur a déjà un tag
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { tag: true },
  });

  // Si l'utilisateur a déjà un tag, le renvoyer
  if (user?.tag) {
    return NextResponse.json({ tag: user.tag });
  }

  // Sinon, générer un nouveau tag unique
  let isUnique = false;
  let newTag = "";

  while (!isUnique) {
    newTag = generateRandomTag();

    // Vérifier que le tag n'existe pas déjà
    const existingUser = await prisma.user.findUnique({
      where: { tag: newTag },
    });

    if (!existingUser) {
      isUnique = true;
    }
  }

  // Mettre à jour l'utilisateur avec le nouveau tag
  await prisma.user.update({
    where: { id: userId },
    data: { tag: newTag },
  });

  return NextResponse.json({ tag: newTag });
}
