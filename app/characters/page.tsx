"use client";
import React, { useState, useEffect } from "react";

import { fetchData } from "@/app/lib/data";
import CharacterCard from "@/app/components/CharacterCard";
import SkeletonCharacterCard from "@/app/components/SkeletonCharacterCard";

interface House {
  slug: string;
  name: string;
}

interface Character {
  name: string;
  slug: string;
  house: House;
  quotes: string[];
}

const HousePage = () => {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const rawData = await fetchData<Character[]>(`/characters`);

        setCharacters(rawData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    loadCharacters();
  }, []);

  if (error) {
    return (
      <div className="bg-gray-800 text-white py-20 px-10 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">House Not Found</h1>
        <p className="text-lg mt-4">{error}.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white py-20 px-10">
      <h1 className="text-xl md:text-3xl font-bold flex justify-center items-center">
        Characters
      </h1>

      {/* Displaying Members */}
      <div className="mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters && characters?.length > 0
            ? characters.map((character) => (
                <CharacterCard
                  key={character.slug}
                  name={character.name}
                  slug={character.slug}
                  description={character.name}
                />
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <SkeletonCharacterCard key={index} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default HousePage;
