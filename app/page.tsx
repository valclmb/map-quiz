import { Grid } from "@/src/components/ui-custom/Grid";
import Typography from "@/src/components/ui-custom/Typography";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Link from "next/link";
import { getCountries } from "./lib/data";

export default async function Home() {
  const countries = await getCountries();

  return (
    <main className="flex w-11/12 m-auto pt-24 flex-grow min-w-screen h-full overflow-hidden flex-col items-center justify-between">
      <Grid>
        <Typography variant="h1" className="mb-10 text-center">
          Tableau de bord
        </Typography>
        <div className="flex gap-5">
          <Card className="w-1/3 bg-white">
            <CardHeader>
              <CardTitle>Mode Entrainement</CardTitle>
              <CardDescription>
                Entrainez-vous à identifier les pays et leurs capitales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="training">
                <Button>Lancer</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="w-1/3 bg-white">
            <CardHeader>
              <CardTitle>Mode Quiz</CardTitle>
              <CardDescription>
                Défiez-vous sur les pays et leurs capitales !
                <br /> Connectez-vous pour suivre votre progression et conserver
                l{"'"}historique de vos scores.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="quiz">
                <Button>Lancer</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </main>
  );
}
