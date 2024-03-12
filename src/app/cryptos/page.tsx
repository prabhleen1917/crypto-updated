'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Cryptocurrencies from "@/app/components/Cryptocurrencies";
import Loader from '@/app/components/Loader';
import Navbar from '@/app/components/Navbar';

// Ensure to add this CSS file that defines styles for your components.
import '@/app/styles/globals.css';

interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  change: string;
}

const CryptosPage: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const options = {
          method: 'GET',
          url: 'https://coinranking1.p.rapidapi.com/coins',
          params: {
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '24h',
            'tiers[0]': '1',
            orderBy: 'marketCap',
            orderDirection: 'desc',
            limit: '50',
            offset: '0'
          },
          headers: {
            'X-RapidAPI-Key': '23084697ffmsh66891a17478cb86p1778a1jsne0902ba87745',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
          }
        };
        
        const { data } = await axios.request(options);
        setCoins(data.data.coins);
      } catch (error) {
        console.error('Error fetching coins:', error);
        setError('Failed to load the data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loader page="Cryptocurrencies" />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <section className="main-content py-8 px-10 bg-black text-white">
        <Head>
          <title>CryptoPlace - Cryptocurrencies</title>
        </Head>
        <h1 className="text-2xl font-bold uppercase">
          <span className="border-b-4 border-indigo-400">Crypto</span>currencies
        </h1>
        <div className="my-8">
          <input
            type="text"
            placeholder="Search for a crypto..."
            onChange={handleSearchChange}
            className="w-64 py-2 px-4 bg-indigo-50 text-secondary rounded-md font-sans font-bold"
          />
        </div>
        <Cryptocurrencies coins={filteredCoins} />
      </section>
    </>
  );
};

export default CryptosPage;
