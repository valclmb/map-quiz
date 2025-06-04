import { Game } from "@/src/components/Game/Game";
import { getCountries } from "./lib/data";

export default async function Home() {
  const countries = await getCountries();
  return (
    <main className="flex max-h-screen overflow-hidden flex-col items-center justify-between p-10">
      <Game countries={countries} />;
    </main>
  );
}
