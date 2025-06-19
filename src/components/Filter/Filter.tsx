"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const continents = [
  "Africa",
  "North America",
  "South America",
  "Asia",
  "Europe",
  "Oceania",
];

type FilterProps = {
  filter: string[];
  setFilter: any;
};

export const Filter = ({ setFilter }: FilterProps) => {
  const handleChange = (continent: string) => {
    setFilter((curr: string[]) => {
      if (curr.includes(continent)) {
        return curr.filter((c) => c !== continent);
      }
      return [...curr, continent];
    });
  };

  const signUp = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const session = authClient.useSession();
  console.log(session);
  return (
    <nav className="flex gap-3 z-50 p-2 absolute right-1/2 top-5 translate-x-1/2 border border-background bg-background/50 rounded-sm backdrop-blur-md ">
      <Button onClick={signUp}>Sign up</Button>
      {continents.map((continent) => (
        <div key={continent} className="flex items-center gap-1">
          <Checkbox
            defaultChecked
            value={continent}
            onCheckedChange={() => handleChange(continent)}
          />
          <Label>{continent}</Label>
        </div>
      ))}
    </nav>
  );
};
