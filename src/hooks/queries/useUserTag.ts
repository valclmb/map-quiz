import { useQuery } from "@tanstack/react-query";

// Hook pour récupérer le tag de l'utilisateur
export function useUserTag() {
  return useQuery({
    queryKey: ["userTag"],
    queryFn: async (): Promise<string> => {
      const response = await fetch("/api/user/tag");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du tag");
      }
      const data = await response.json();
      return data.tag || "";
    },
  });
}
