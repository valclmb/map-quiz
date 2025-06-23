import { auth } from "@/lib/auth";
import { AddFriend } from "@/src/components/User/AddFriend";
import { FriendRequests } from "@/src/components/User/FriendRequests";
import { FriendTag } from "@/src/components/User/FriendTag";
import { FriendsList } from "@/src/components/User/FriendsList";
import { Grid } from "@/src/components/ui-custom/Grid";
import Typography from "@/src/components/ui-custom/Typography";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (!session?.user) {
    redirect("/");
  }

  return (
    <Grid>
      <div className="w-full max-w-4xl mx-auto p-6">
        <Typography variant="h1" className="mb-10 text-center">
          Profil
        </Typography>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <FriendTag />
          <AddFriend />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FriendRequests />
          <FriendsList />
        </div>
      </div>
    </Grid>
  );
}
