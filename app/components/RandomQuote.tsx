"use client";
import React, { useState, useEffect } from "react";
import { fetchData } from "../lib/data";
import Image from "next/image";

interface RandomQuoteProps {
  slug: string;
  sentence: string;
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

const RandomQuote: React.FC<RandomQuoteProps> = ({ slug, sentence }) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [currentQuote, setCurrentQuote] = useState<string>(sentence);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch character data
  const loadCharacter = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData<Character[]>(`/character/${slug}`);
      const characterData = data[0];
      setCharacter(characterData);
      // Pick a random quote from the character
      if (characterData?.quotes?.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * characterData.quotes.length
        );
        setCurrentQuote(characterData.quotes[randomIndex]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacter();
  }, [slug]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || !character) {
    return (
      <div className="flex justify-center items-center flex-col animate-pulse">
        {/* Title Skeleton */}
        <div className="h-8 w-48 bg-gray-300 rounded-sm mb-4"></div>

        {/* Name Skeleton */}
        <div className="h-6 w-32 bg-gray-300 rounded-sm my-3"></div>

        {/* Image Skeleton */}
        <div className="shadow-lg my-3">
          <div className="w-[300px] h-[100px] bg-gray-300 rounded-lg"></div>
        </div>

        {/* Quote Skeleton */}
        <div className="shadow-lg rounded-lg border border-white w-80 h-20 bg-gray-300"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold text-red-600">Random Quote</h1>
      <p className="text-2xl font-bold my-3">{character?.name}</p>
      <div className="shadow-lg my-3">
        <Image
          src={`/characters/${slug}.png`}
          alt={`${slug}`}
          className="rounded-lg"
          width={300}
          height={100}
        />
      </div>

      <div className="shadow-lg rounded-lg border border-white">
        <div className="px-6 py-4">
          <p className="text-lg font-semibold mb-2">" {currentQuote} "</p>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;
