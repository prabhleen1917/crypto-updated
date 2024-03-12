
import axios from 'axios';

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


interface ApiResponse {
  status: string;
  data: {
    coins: Coin[];
  };
}

// Define the headers for your crypto API
const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIAPI_KEY,
};

// Fetch coins with generic type for flexibility
export const fetchCoins = async (url: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(url, { headers: cryptoApiHeaders });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch coins:', error);
    throw new Error('Failed to fetch coins');
  }
}
