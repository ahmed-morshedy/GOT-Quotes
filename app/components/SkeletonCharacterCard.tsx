const SkeletonCharacterCard = () => {
  return (
    <div className="rounded shadow-md hover:shadow-lg transition bg-gray-700 text-white flex justify-between flex-col animate-pulse">
      {/* Image Placeholder */}
      <div className="rounded rounded-b-none w-full h-48 bg-gray-600"></div>
      {/* Content Placeholder */}
      <div className="p-3 space-y-2">
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-600 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default SkeletonCharacterCard;
