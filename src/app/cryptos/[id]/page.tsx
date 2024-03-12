"use client"
import Head from 'next/head';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { BsFillBookmarkPlusFill, BsFillBookmarkDashFill } from 'react-icons/bs';
import HTMLReactParser, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import millify from 'millify';
import  Loader  from '@/app/components/Loader';
import { useAuth } from '@/app/contexts/AuthContext';
import { fetchCoins } from '@/app/services/cryptoService';
 
interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  color: string | null;
  iconUrl: string;
  marketCap: string;
  price: string;
  listedAt: number;
  tier: number;
  change: string;
  rank: string;
  sparkline: Array<string | null>;
  lowVolume: boolean;
  coinrankingUrl: string;
  btcPrice: string;
  contractAddresses?: Array<{
    network: string;
    address: string;
  }>;
}

 
interface CoinDetailResponse {
  data: {
    coin: Coin;
  };
}
 
interface CoinHistory {
  // Define the structure of coin history data
}
 
const CoinDetailPage: React.FC = () => {
  const [timeperiod, setTimeperiod] = useState<string>('7d');
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
 
  const { user, watchlist, removeFromWatchList, addtoWatchList, getUserwatchlist } = useAuth();
 
  const router = useRouter();
  const { id } = router.query;
 
  const cryptoUrl = `https://coinranking1.p.rapidapi.com/coin/${id}`;
  const cryptoHistoryUrl = `https://coinranking1.p.rapidapi.com/coin/${id}/history?timePeriod=${timeperiod}`;
 
  // Ensure fetchCoins exactly matches what SWR expects
  const fetcher = (url: string) => fetchCoins(url).then(res => res.data);

  const { data: coinDetail } = useSWR<CoinDetailResponse>(cryptoUrl);
  const { data: coinHistory } = useSWR<CoinHistory>(cryptoHistoryUrl, fetchCoins);
  const coin = coinDetail?.data?.coin;
 
  useEffect(() => {
    if (watchlist.length === 0) {
      getUserwatchlist();
    }
  }, [user]);
 
  // Add TypeScript types for stats and options
  const periods = ['24h', '7d', '30d', '1y', '5y'];
 
  if (!coin) return <Loader page="Details" />;
 
  // Continue with the component's return statement and JSX
  // Note: You need to adjust or add TypeScript typings where necessary for the rest of the component.
};
 
export default CoinDetailPage;