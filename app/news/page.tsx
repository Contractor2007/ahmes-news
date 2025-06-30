'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type Article = {
  title: string;
  link: string;
  snippet: string;
  thumbnail_url?: string;
  photo_url?: string;
  published_datetime_utc: string;
  source_name: string;
  authors?: string[];
};

export default function TopicHeadlines() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news'); // adjust endpoint if needed
        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setArticles(data.data || []);
        }
      } catch (err) {
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (error) {
    return (
      <div className="text-red-600 text-center py-8">
        <p className="text-lg font-semibold">⚠️ {error}</p>
        <p className="text-sm">Please try refreshing the page or check back later.</p>
      </div>
    );
  }

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-6">🌍 Latest Headlines</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {(loading ? Array.from({ length: 8 }) : articles).map((article: Article | undefined, index: number) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden flex flex-col"
          >
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-40 w-full" />
            ) : (
              <Image
                src={article?.thumbnail_url || article?.photo_url || '/placeholder.jpg'}
                alt={article?.title || 'Thumbnail'}
                width={400}
                height={200}
                className="w-full h-40 object-cover"
                unoptimized // you can optimize it if all images are from same host
              />
            )}

            <div className="p-4 flex flex-col flex-1">
              {loading ? (
                <>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
                </>
              ) : (
                <>
                  <a href={article!.link} target="_blank" rel="noopener noreferrer">
                    <h3 className="text-lg font-semibold text-blue-700 hover:underline line-clamp-2">
                      {article!.title}
                    </h3>
                  </a>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{article!.snippet}</p>
                  <div className="text-xs text-gray-500 mt-auto pt-4">
                    {article!.source_name} •{' '}
                    {new Date(article!.published_datetime_utc).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                    {article!.authors?.length ? ` • ${article!.authors.join(', ')}` : ''}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
