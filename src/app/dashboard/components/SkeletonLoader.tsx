export const SkeletonLoader = () => (
    <div className="w-full h-64 animate-pulse">
      <div className="mb-4 bg-gray-300 h-6 rounded"></div>
      <div className="flex space-x-4">
        <div className="bg-gray-300 h-6 w-1/4 rounded"></div>
        <div className="bg-gray-300 h-6 w-1/4 rounded"></div>
        <div className="bg-gray-300 h-6 w-1/4 rounded"></div>
      </div>
      <div className="mt-4 bg-gray-300 h-6 rounded"></div>
    </div>
  );
  