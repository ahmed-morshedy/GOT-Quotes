"use client";
import React, { useState, useEffect } from "react";
import { fetchData } from "../lib/data";
import HouseCard from "./HouseCard";
import SkeletonCard from "./SkeletonCard";
import Link from "next/link";

interface House {
  slug: string;
  name: string;
}

const transformData = (apiData: any[]): House[] => {
  return apiData.map((item) => ({
    slug: item.slug,
    name: item.name,
  }));
};

function HouseSection() {
  const [houses, setHouses] = useState<House[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHouses = async () => {
      try {
        const rawData = await fetchData<any[]>("/houses");

        const transformedData = transformData(rawData);

        setHouses(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    loadHouses();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-semibold mb-6">Houses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses
          ? houses.map((house) => (
              <Link key={house.slug} href={`/houses/${house.slug}`}>
                <HouseCard description={house.name} name={house.slug} />
              </Link>
            ))
          : // Render Skeletons when houses are null (loading)
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
      </div>
    </div>
  );
}

export default HouseSection;
