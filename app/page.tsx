import HouseCard from "./components/HouseCard";
import CharacterCard from "./components/CharacterCard";
import HouseSection from "./components/HouseSection";
import Link from "next/link";

const Home = () => {
  const characters = [
    { name: "Jon Snow", description: "Loyal Protector", slug: "jon" },
    {
      name: "Daenerys Targaryen",
      description: "Mother of Dragons",
      slug: "daenerys",
    },
    {
      name: "Tyrion Lannister",
      description: "Witty and Clever",
      slug: "tyrion",
    },
  ];

  return (
    <div className="bg-gray-800 text-white py-20 px-10">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">Game of Thrones Quotes</h1>
        <p className="text-lg my-4">
          "Words Are Wind, But These Quotes Are Eternal"
        </p>

        {/* Random Quotes */}
        <Link
          href={"/random"}
          className="mt-6 bg-red-600 px-4 py-2 text-white rounded hover:bg-red-500 transition"
        >
          Generate Random Quote
        </Link>
      </div>

      {/* Houses Section */}
      <HouseSection />

      {/* Characters Section */}
      <section className="mt-20">
        <h2 className="text-3xl font-semibold mb-6">Characters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <CharacterCard key={character.name} {...character} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
