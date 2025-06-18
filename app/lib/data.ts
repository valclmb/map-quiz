"use server";
import fs from "fs";
import path from "path";

// Cache pour éviter de relire le fichier à chaque requête
let countriesCache: any[] | null = null;

export const getCountries = async (filter?: string[]) => {
  try {
    // Utiliser le cache si disponible
    if (!countriesCache) {
      const filePath = path.join(process.cwd(), "data", "countries.json");
      const fileContents = fs.readFileSync(filePath, "utf8");
      countriesCache = JSON.parse(fileContents);
    }

    // Appliquer le filtre si nécessaire
    if (filter && filter.length > 0) {
      return countriesCache?.filter(
        (country: any) => !filter.includes(country.properties.continent)
      );
    }

    return countriesCache;
  } catch (error) {
    console.log("Erreur lors de la récupération des données:", error);
    throw error;
  }
};
