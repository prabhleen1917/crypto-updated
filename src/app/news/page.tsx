// pages/news.tsx
"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
// Define the structure for the news articles
interface Article {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  // Add any additional fields you need
}

// Define the structure for the API response
interface NewsApiResponse {
  results: Article[];
  // Add any additional fields from the response you might use
}

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsApiResponse>('https://newsdata.io/api/1/news', {
          params: {
            apikey: 'pub_39574d85dc08497617dcfd588d2ed7d39c0a8',
            q: 'pegasus',
            language: 'en',
          },
        });
        setArticles(response.data.results);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news articles.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return <div>Loading news articles...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
    <div>
      <h1 className="text-2xl font-bold my-4">Latest News on Pegasus</h1>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={index} className="border-b pb-4">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <h2 className="text-xl font-semibold">{article.title}</h2>
            </a>
            <p>{article.description}</p>
            <p className="text-sm text-gray-600">Published on: {new Date(article.pubDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default NewsPage;
