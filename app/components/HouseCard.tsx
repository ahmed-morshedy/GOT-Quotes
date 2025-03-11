import Image from "next/image";

interface HouseCardProps {
  description: string;
  name: string;
}

const HouseCard: React.FC<HouseCardProps> = ({ description, name }) => {
  return (
    <div
      className={`p-6 rounded-sm shadow-md hover:shadow-lg transition bg-${name} flex flex-col justify-between h-80`}
    >
      <h3 className={`text-2xl font-bold name-${name}`}>
        {name.toUpperCase()}
      </h3>
      <div className="flex justify-center items-center my-3">
        <Image
          width={140}
          height={100}
          src={`/${name}.png`}
          alt={`${name} house Logo`}
          className={` rounded-2xl `}
        />
      </div>
      <p className={`mt-2 text-2xl font-bold name-${name}`}>{description}</p>
    </div>
  );
};

export default HouseCard;
