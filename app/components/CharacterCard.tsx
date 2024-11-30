import Image from "next/image";
import Link from "next/link";

interface CharacterCardProps {
  name: string;
  description: string;
  slug: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  description,
  slug,
}) => {
  return (
    <Link href={`/characters/${slug}`}>
      <div className=" rounded shadow-md hover:shadow-lg transition bg-gray-700 text-white flex justify-between flex-col">
        <Image
          src={`/characters/${slug}.png`}
          alt={description}
          className="rounded rounded-b-none w-full h-[28rem] "
          width={300}
          height={100}
        />
        <div className="p-3">
          <h3 className="text-2xl font-bold">{name}</h3>
        </div>
      </div>{" "}
    </Link>
  );
};

export default CharacterCard;
