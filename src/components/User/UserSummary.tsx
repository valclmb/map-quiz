"use client";

import { useFriendRequests } from "@/src/hooks/queries/useFriendRequests";
import { useFriendsList } from "@/src/hooks/queries/useFriends";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const UserSummary = () => {
  const { data: friends = [], isLoading: isLoadingFriends } = useFriendsList();
  const { data: requests = [], isLoading: isLoadingRequests } =
    useFriendRequests();

  return (
    <Card className="bg-white h-fit">
      <CardHeader>
        <CardTitle className="text-2xl">Social</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Amis</h3>
          {isLoadingFriends ? (
            <p>Chargement...</p>
          ) : friends.length === 0 ? (
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Vous n{"'"}avez pas encore d{"'"}amis
              </p>
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  Ajouter des amis
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {friends.slice(0, 3).map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-2 bg-muted p-2 rounded-lg"
                >
                  <div className="relative">
                    {friend.image ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={friend.image}
                          alt={friend.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        {friend.name.charAt(0)}
                      </div>
                    )}
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        friend.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{friend.name}</span>
                    {!friend.isOnline && (
                      <span className="text-xs text-gray-500">
                        Vu {new Date(friend.lastSeen).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {friends.length > 3 && (
                <p className="text-sm text-muted-foreground">
                  +{friends.length - 3} autres amis
                </p>
              )}
              <Link href="/profile">
                <Button variant="outline" size="sm" className="mt-2 gap-1">
                  <Plus size={20} /> Ajouter des amis
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Demandes d{"'"}amitié</h3>
          {isLoadingRequests ? (
            <p>Chargement...</p>
          ) : (
            <div className="flex items-center gap-2 bg-muted p-2 rounded-lg">
              <span className="font-medium">
                {requests.length} demande{requests.length !== 1 ? "s" : ""} en
                attente
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/profile">
          <Button variant="outline" className="w-full">
            Voir le profil complet
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
