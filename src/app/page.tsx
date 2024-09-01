"use client";

import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center flex-col md:py-20 md:px-10 px-4 gap-4">
      <h1 className="text-6xl font-semibold font-poppins">Sky Scan</h1>
      <SearchForm />
      <div className="flex flex-col items-center">
        <div className="flex space-x-2 mb-6">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded shadow">
            Weather Search
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded shadow">
            I'm Feeling Lucky
          </button>
        </div>
        <div className="text-center">
          <p className="text-gray-700">
            Google offered in:
            <a href="#" className="text-blue-600 hover:underline mx-1">
              हिन्दी
            </a>
            <a href="#" className="text-blue-600 hover:underline mx-1">
              বাংলা
            </a>
            <a href="#" className="text-blue-600 hover:underline mx-1">
              తెలుగు
            </a>
            <a href="#" className="text-blue-600 hover:underline mx-1">
              मराठी
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
