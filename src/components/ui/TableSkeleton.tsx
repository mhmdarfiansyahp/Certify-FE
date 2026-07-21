export default function TableSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 rounded animate-pulse"
          />
        ))}
      </div>

      <div className="space-y-4">
        {[...Array(6)].map((_, row) => (
          <div
            key={row}
            className="grid grid-cols-6 gap-4"
          >
            {[...Array(6)].map((_, col) => (
              <div
                key={col}
                className="h-10 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}