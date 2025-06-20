"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Earth, LogOut } from "lucide-react";
import { toast } from "../ui/use-toast";
export const Nav = () => {
  const { data, isPending } = authClient.useSession();

  const signIn = () => {
    authClient.signIn.social({
      provider: "google",
    });
  };

  const signOut = () => {
    authClient.signOut().then((res) => {
      if (res.data?.success) {
        toast({
          title: "Déconnexion réussie",
        });
      }
    });
  };
  return (
    <nav className="absolute top-2 left-1/2  -translate-x-1/2 z-50 w-11/12   flex items-center justify-between px-5 py-2 border border-secondary rounded-xl bg-background/50 backdrop-blur-md">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Earth /> Map-quiz
      </h1>
      {data ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-between gap-2 p-5" variant="ghost">
              <Image
                src={data.user.image ?? ""}
                alt={data.user.name}
                width={35}
                height={35}
                className="rounded-full"
              />
              {data.user.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={signOut}>
              <LogOut />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={signIn} disabled={isPending}>
          Se connecter
        </Button>
      )}
    </nav>
  );
};
