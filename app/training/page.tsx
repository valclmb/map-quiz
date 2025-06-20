import { getCountries } from "@/app/lib/data";
import { Game } from "@/src/components/Game/Game";
import { Grid } from "@/src/components/ui-custom/Grid";

export default async function Training() {
  const countries = await getCountries();

  return (
    <Grid>
      <Game countries={countries ?? []} />
    </Grid>
  );
}
