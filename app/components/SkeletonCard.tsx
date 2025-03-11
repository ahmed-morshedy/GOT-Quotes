import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="p-6 rounded-sm shadow-md bg-gray-200 animate-pulse flex flex-col justify-between">
      {/* Skeleton for the title */}
      <div className="h-6 bg-gray-300 rounded-sm w-3/4 mb-4"></div>

      {/* Skeleton for the image */}
      <div className="flex justify-center items-center my-3">
        <div className="h-32 w-32 bg-gray-300 rounded-2xl"></div>
      </div>

      {/* Skeleton for the description */}
      <div className="h-6 bg-gray-300 rounded-sm w-full mt-2"></div>
      <div className="h-6 bg-gray-300 rounded-sm w-4/5 mt-2"></div>
    </div>
  );
};

export default SkeletonCard;
