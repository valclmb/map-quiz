import { prisma } from "@/app/lib/prisma";
import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";

export const initSocket = (server: NetServer) => {
  const io = new SocketIOServer(server);

  io.on("connection", async (socket) => {
    const userId = socket.handshake.auth.userId;

    if (userId) {
      // Mettre à jour le statut en ligne
      await prisma.user.update({
        where: { id: userId },
        data: { isOnline: true, lastSeen: new Date() },
      });

      // Rejoindre une room personnelle pour les notifications
      socket.join(`user:${userId}`);

      // Informer les amis du changement de statut
      const friends = await prisma.friend.findMany({
        where: { userId: userId },
        select: { friendId: true },
      });

      friends.forEach(({ friendId }: { friendId: string }) => {
        io.to(`user:${friendId}`).emit("friendStatusChange", {
          friendId: userId,
          isOnline: true,
        });
      });
    }

    socket.on("disconnect", async () => {
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { isOnline: false, lastSeen: new Date() },
        });

        // Informer les amis du changement de statut
        const friends = await prisma.friend.findMany({
          where: { userId: userId },
          select: { friendId: true },
        });

        friends.forEach(({ friendId }: { friendId: string }) => {
          io.to(`user:${friendId}`).emit("friendStatusChange", {
            friendId: userId,
            isOnline: false,
          });
        });
      }
    });
  });

  return io;
};
