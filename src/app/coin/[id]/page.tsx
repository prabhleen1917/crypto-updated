"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import CoinInfo from '../../components/CoinInfo';

// Define the structure of the coin data expected from the API
interface CoinData {
  image: { large: string };
  name: string;
  symbol: string;
  market_data: { current_price: { usd: number } };
  subreddit_url: string;
  market_cap_rank: number;
  id: string;
  days: number
}

const CoinPage: React.FC = () => {
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Extract `id` from the URL
    const id = window.location.pathname.split('/').pop();

    const fetchCoinData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<CoinData>(`https://api.coingecko.com/api/v3/coins/${id}`);
        console.log("rrr",response.data);
        setCoin(response.data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setError('Failed to load data.');
      }
      setIsLoading(false);
    };

    if (id) {
      fetchCoinData();
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!coin) return <div>No coin data available.</div>;
 
  return (
    <Layout>
    <div className="flex flex-row justify-center items-start gap-8 p-8">
      <div className="border border-[#000000] rounded-lg p-8 w-full max-w-xs">
        <img
          src={coin.image.large}
          alt={coin.name}
          className="w-32 h-32 mb-4 mx-auto" // Adjust size as needed
        />
        <h1 className="text-xl mb-4">Name : {coin.name}</h1>
        <p className="text-xl mb-4">Symbol: {coin.symbol.toUpperCase()}</p>
        <p className="text-xl mb-4">Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</p>
        <p className="text-xl mb-4">Rank: {coin.market_cap_rank}</p>
      </div>

      {/* The CoinInfo component already contains the chart so we will just pass the coin data */}
      <CoinInfo coin={coin} />
    </div>
  </Layout>
  );
};

export default CoinPage;
