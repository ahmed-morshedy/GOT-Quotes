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

function page() {
  const { slug } = useParams() as Params;

  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHouse = async () => {
      if (!slug) return;

      try {
        const rawData = await fetchData<Character[]>(`/character/${slug}`);

        if (Array.isArray(rawData) && rawData.length > 0) {
          setCharacter(rawData[0]);
        } else {
          setError("House data is not valid or not found.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    loadHouse();
  }, [slug]);

  return (
    <div className="bg-gray-800 text-white py-20 px-10">
      {" "}
      <h1
        className={`text-xl md:text-3xl font-bold my-5  flex justify-center items-center name-${character?.house.slug}`}
      >
        {character?.name}
      </h1>
      <div className=" flex justify-center items-center">
        <img
          src={`/characters/${character?.slug}.png`}
          alt={`${character?.slug} Photo`}
          className=" rounded-xl"
        />
      </div>
      <div className="mt-10 ">
        <p className={`text-2xl font-bold name-${character?.house.slug} `}>
          {character?.house.name}
        </p>
      </div>
      <div className="my-10">
        <p className={`text-2xl name-${character?.house.slug}`}>Quotes : </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {character?.quotes.map((quote) => {
          return (
            <QuoteCard quote={quote} author={character.name} key={quote} />
          );
        })}
      </div>
    </div>
  );
}

export default page;
