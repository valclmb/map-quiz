import { toast } from "@/src/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type FriendRequest = {
  id: string;
  sender: {
    id: string;
    name: string;
    image: string | null;
    tag: string | null;
  };
  createdAt: string;
};

// Hook pour récupérer les demandes d'amitié
export function useFriendRequests() {
  return useQuery({
    queryKey: ["friendRequests"],
    queryFn: async (): Promise<FriendRequest[]> => {
      const response = await fetch("/api/friends/requests");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des demandes");
      }
      const data = await response.json();
      return data.friendRequests || [];
    },
  });
}

// Hook pour gérer les demandes d'amitié (accepter/refuser)
export function useHandleFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      requestId,
      action,
    }: {
      requestId: string;
      action: "accept" | "reject";
    }) => {
      const response = await fetch(`/api/friends/requests/${requestId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Une erreur est survenue");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      // Si l'action est "accept", on invalide aussi la liste des amis
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      toast({
        title: "Succès",
        description: data.message,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
