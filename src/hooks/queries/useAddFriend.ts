import { toast } from "@/src/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

// Hook pour ajouter un ami
export function useAddFriend() {
  return useMutation({
    mutationFn: async (tag: string) => {
      const response = await fetch("/api/friends/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag: tag.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Une erreur est survenue");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Succès",
        description: data.message || "Demande d'ami envoyée avec succès",
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
