import { PrismaClient } from "@/generated/prisma";

// Déclaration pour éviter les problèmes avec le rechargement à chaud en développement
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Exporter une instance unique de PrismaClient
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
