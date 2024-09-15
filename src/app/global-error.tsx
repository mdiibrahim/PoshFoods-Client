// src/app/error.js
"use client";

export default function GlobalError({
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
