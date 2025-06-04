"use client";

import { useEffect, useState } from "react";

interface ImageInfo {
  thumbnail: string;
  thumbnailProxied: string;
}

interface SubNewsItem {
  timestamp: string;
  title: string;
  snippet: string;
  images: ImageInfo;
  newsUrl: string;
  publisher: string;
}

interface NewsItem {
  timestamp: string;
  title: string;
  snippet: string;
  images: ImageInfo;
  subnews?: SubNewsItem[];
  hasSubnews?: boolean;
  newsUrl?: string;
  publisher?: string;
}

interface ApiResponse {
  status: string;
  items: NewsItem[];
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/google-news/latest");
        const data: ApiResponse = await res.json();
        if (data.status === "success") {
          setNews(data.items);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading news...</p>;

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Business News</h1>
      {news.length === 0 && <p>No news available.</p>}
      <ul className="space-y-6">
        {news.map(({ timestamp, title, snippet, images, subnews, newsUrl, publisher }) => (
          <li key={timestamp} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <a href={newsUrl || "#"} target="_blank" rel="noopener noreferrer" className="flex space-x-4">
              <img
                src={images?.thumbnailProxied || images?.thumbnail}
                alt={title}
                className="w-40 h-24 object-cover rounded-md flex-shrink-0"
                loading="lazy"
              />
              <div>
                <h2 className="font-semibold text-lg">{title}</h2>
                <p className="text-gray-600 mt-1">{snippet}</p>
                {publisher && <p className="text-sm text-gray-400 mt-2">Source: {publisher}</p>}
              </div>
            </a>
            {subnews && subnews.length > 0 && (
              <ul className="mt-4 ml-6 border-l-2 border-gray-200 pl-4">
                {subnews.map(({ timestamp: st, title: stitle, snippet: ssnippet, newsUrl: sUrl, publisher: spub }) => (
                  <li key={st} className="mb-3">
                    <a href={sUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      {stitle}
                    </a>
                    <p className="text-gray-600">{ssnippet}</p>
                    {spub && <p className="text-xs text-gray-400">Source: {spub}</p>}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
