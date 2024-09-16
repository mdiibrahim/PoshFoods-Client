"use client"; // Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
      <p className="text-lg text-gray-600">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Retry
      </button>
    </div>
  );
}
