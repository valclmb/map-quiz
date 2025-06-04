"use client";

import { GameContext } from "@/src/context/GameContext";
import { useFilter } from "@/src/hooks/useFilter";
import { useMap } from "@/src/hooks/useMap";
import { GeoJsonProperties } from "geojson";
import { Filter } from "../Filter/Filter";
import { Form } from "../Form/Form";
import { Map } from "../Map/Map";
import { Score } from "../Score/Score";

type GameProps = {
  countries: GeoJsonProperties[];
};

export const Game = ({ countries }: GameProps) => {
  const { filteredCountries, filter, setFilter } = useFilter(countries);
  const map = useMap(filteredCountries);

  return (
    <GameContext.Provider value={map}>
      <Filter filter={filter} setFilter={setFilter} />
      <Map />
      <Form />
      <Score />
    </GameContext.Provider>
  );
};
