export default function LoadingSkeleton() {
    return (
      <section className="px-6 py-16 sm:py-24 lg:py-32 bg-gray-800">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="text-center bg-gray-900 p-6 rounded-lg shadow-md animate-pulse">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-700 mb-4"></div>
              <div className="h-4 w-24 mx-auto bg-gray-700 mb-2"></div>
              <div className="h-3 w-20 mx-auto bg-gray-600"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  