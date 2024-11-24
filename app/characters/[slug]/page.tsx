"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchData } from "@/app/lib/data";
import QuoteCard from "@/app/components/QuoteCard";

interface Params {
  slug?: string;
}

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

function Page() {
  const { slug } = useParams() as Params;

  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCharacter = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const rawData = await fetchData<Character[]>(`/character/${slug}`);

        if (Array.isArray(rawData) && rawData.length > 0) {
          setCharacter(rawData[0]);
        } else {
          setError("Character data is not valid or not found.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadCharacter();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-gray-800 text-white py-20 px-10 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 text-white py-20 px-10 flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="bg-gray-800 text-white py-20 px-10 flex justify-center items-center">
        <p>No character data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white py-20 px-10">
      {/* Character Name */}
      <h1
        className={`text-xl md:text-3xl font-bold my-5 flex justify-center items-center name-${character.house.slug}`}
      >
        {character.name}
      </h1>

      {/* Character Image */}
      <div className="flex justify-center items-center">
        <img
          src={`/characters/${character.slug}.png`}
          alt={`${character.slug} Photo`}
          className="rounded-xl"
        />
      </div>

      {/* Character House Name */}
      <div className="mt-10">
        <p className={`text-2xl font-bold name-${character.house.slug}`}>
          {character.house.name}
        </p>
      </div>

      {/* Quotes Section Title */}
      <div className="my-10">
        <p className={`text-2xl name-${character.house.slug}`}>Quotes:</p>
      </div>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {character.quotes.map((quote) => (
          <QuoteCard quote={quote} author={character.name} key={quote} />
        ))}
      </div>
    </div>
  );
}

export default Page;
