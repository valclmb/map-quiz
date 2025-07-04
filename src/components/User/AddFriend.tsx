"use client";

import { useAddFriend } from "@/src/hooks/queries/useAddFriend";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

export const AddFriend = () => {
  const [friendTag, setFriendTag] = useState("");
  const addFriendMutation = useAddFriend();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!friendTag.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un tag d'ami",
        variant: "destructive",
      });
      return;
    }

    try {
      await addFriendMutation.mutateAsync(friendTag);
      // Réinitialiser le formulaire en cas de succès
      setFriendTag("");
    } catch (error) {
      // Les erreurs sont gérées dans le hook useAddFriend
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter un ami</CardTitle>
        <CardDescription>
          Entrez le tag d{"'"}ami de la personne que vous souhaitez ajouter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={friendTag}
            onChange={(e) => setFriendTag(e.target.value)}
            placeholder="Entrez le tag d'ami"
            className="font-mono uppercase"
            maxLength={6}
          />
          <Button type="submit" disabled={addFriendMutation.isPending}>
            {addFriendMutation.isPending ? "Envoi..." : "Ajouter"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
