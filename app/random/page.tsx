"use client";
import React, { useState, useEffect } from "react";
import { fetchData } from "../lib/data";
import RandomQuote from "../components/RandomQuote";

interface House {
  slug: string;
  name: string;
}

interface Character {
  name: string;
  slug: string;
  house: House;
}

interface Random {
  sentence: string;
  character: Character;
}

function page() {
  const [random, setRandm] = useState<Random | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadRandom = async () => {
    try {
      const rawData = await fetchData<Random>(`/random`);

      setRandm(rawData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  useEffect(() => {
    loadRandom();
  }, []);
  return (
    <div className="bg-gray-800 text-white py-20 px-10 flex flex-col items-center justify-center">
      <RandomQuote
        sentence={`${random?.sentence}`}
        slug={`${random?.character.slug}`}
      />

      <div>
        <button
          onClick={loadRandom}
          className="mt-5 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Get Another Quote
        </button>
      </div>
    </div>
  );
}

export default page;
