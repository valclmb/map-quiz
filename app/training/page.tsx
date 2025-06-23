import { getCountries } from "@/app/lib/data";
import { Game } from "@/src/components/Game/Game";

export default async function Training() {
  const countries = await getCountries();

  return <Game countries={countries ?? []} />;
}
