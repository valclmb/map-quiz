"use server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    return client;
  } catch (error) {
    console.log("Erreur de connexion à la base de données:", error);
    throw error; // Relance l'erreur pour la gérer ailleurs si nécessaire
  }
};

export const getCountries = async (filter?: string[]) => {
  let client;
  try {
    client = await connectToDatabase();
    const db = client.db("map-quiz");
    const collection = db.collection("map");

    if (filter && filter.length > 0) {
      const data = await collection
        .find({
          "properties.continent": { $nin: filter },
        })
        .toArray();
      return JSON.parse(JSON.stringify(data));
    }
    const data = await collection.find().toArray();

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log("Erreur lors de la récupération des données:", error);
    throw error; // Relance l'erreur pour la gérer ailleurs si nécessaire
  } finally {
    if (client) {
      client.close();
    }
  }
};
