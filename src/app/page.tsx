"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Coins from './components/Coins';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import Layout from './components/Layout';

type Coin = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  image: string;
  price_change_percentage_24h: number;
};

const Page: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // New API request options
        const options = {
          method: 'GET',
          url: 'https://coinranking1.p.rapidapi.com/coins',
          params: {
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '24h',
            tiers: '1',
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

        const response = await axios.request(options);
        const fetchedCoins = response.data.data.coins.map((coin: any) => ({
          id: coin.symbol,
          symbol: coin.symbol,
          name: coin.name,
          current_price: parseFloat(coin.price),
          market_cap: coin.marketCap,
          total_volume: coin['24hVolume'],
          image: coin.iconUrl,
          price_change_percentage_24h: coin.change,
        }));
        
        setCoins(fetchedCoins);
      } catch (err) {
        setError('An error occurred while fetching data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoins = coins.filter(
    (coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <br/>
      <br/>
      <SearchBar searchQuery={searchTerm} handleSearchChange={handleSearch} />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        filteredCoins.map((coin) => (
          <Coins
            key={coin.id}
            id={coin.name}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            volume={coin.total_volume} // Note: Adapt or omit according to actual API response
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        ))
      )}
    </Layout>
  );
};

export default Page;