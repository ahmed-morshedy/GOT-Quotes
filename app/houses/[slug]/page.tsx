"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchData } from "@/app/lib/data";
import CharacterCard from "@/app/components/CharacterCard";
import SkeletonCharacterCard from "@/app/components/SkeletonCharacterCard";
import Image from "next/image";

interface Params {
  slug?: string;
}

interface Member {
  name: string;
  slug: string;
}

interface House {
  slug: string;
  name: string;
  members: Member[];
}

const HousePage = () => {
  const { slug } = useParams() as Params;

  const [house, setHouse] = useState<House | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHouse = async () => {
      if (!slug) return;

      try {
        // setLoading(true);

        const rawData = await fetchData<House[]>(`/house/${slug}`);

        if (Array.isArray(rawData) && rawData.length > 0) {
          setHouse(rawData[0]);
        } else {
          setError("House data is not valid or not found.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    loadHouse();
  }, [slug]);

  if (error) {
    return (
      <div className="bg-gray-800 text-white py-20 px-10 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">House Not Found</h1>
        <p className="text-lg mt-4">{error}.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white py-20 px-10 flex flex-col items-center justify-center">
      {/* Display House Name and Slug */}
      <h1 className="text-xl md:text-3xl font-bold flex justify-center items-center">
        House
        <span className={`bg-${house?.slug} p-2 name-${house?.slug} rounded-sm`}>
          {house?.slug.toUpperCase()}
        </span>
      </h1>

      {/* House Image */}
      <div>
        <Image
          src={`/${house?.slug}.png`}
          alt={`House ${house?.name}`}
          className="rounded-sm mt-5"
          width={300}
          height={100}
        />
      </div>

      <div>
        <p className="text-xl my-2">{house?.name}</p>
      </div>

      {/* Displaying Members */}
      <div className="mt-5 items-center justify-center flex flex-col">
        <h2 className="text-3xl my-7 font-bold">Characters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {house?.members && house?.members?.length > 0
            ? house.members.map((member) => (
                <CharacterCard
                  key={member.slug}
                  name={member.name}
                  slug={member.slug}
                  description={house.name}
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
