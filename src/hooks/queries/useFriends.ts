import { authClient } from "@/lib/auth-client";
import { toast } from "@/src/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";

type Friend = {
  id: string;
  name: string;
  image: string | null;
  tag: string | null;
  isOnline: boolean;
  lastSeen: string;
};

// Hook pour récupérer la liste des amis
export function useFriendsList() {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    const socket = io("/", {
      auth: {
        userId: session.user.id,
      },
    });

    socket.on("friendStatusChange", ({ friendId, isOnline }) => {
      queryClient.setQueryData(["friends"], (oldData: Friend[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map((friend) => {
          if (friend.id === friendId) {
            return { ...friend, isOnline };
          }
          return friend;
        });
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient, session]);

  return useQuery({
    queryKey: ["friends"],
    queryFn: async (): Promise<Friend[]> => {
      const response = await fetch("/api/friends/list");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des amis");
      }
      const data = await response.json();
      return data.friends || [];
    },
  });
}

// Hook pour supprimer un ami
export function useRemoveFriend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: string) => {
      const response = await fetch("/api/friends/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la suppression de l'ami");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      toast({
        title: "Succès",
        description: "Ami supprimé avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer cet ami",
        variant: "destructive",
      });
    },
  });
}
