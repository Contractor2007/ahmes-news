'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  'general',
  'business',
  'technology',
  'science',
  'health',
  'sports',
  'entertainment'
];

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    router.push(`/${category}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-blue-800 mb-4">Ahmes News Hub</h1>
        <p className="text-xl text-gray-600">
          Discover the latest stories from around the world
        </p>
      </header>

      <section className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Browse News Categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-3 rounded-lg transition-all ${selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Select a category to view the latest news
            </p>
          </div>
        </div>
      </section>

      <footer className="max-w-4xl mx-auto mt-16 pt-6 border-t border-gray-200 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Ahmes News. All rights reserved.</p>
      </footer>
    </main>
  );
}