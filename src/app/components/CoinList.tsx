// Define an interface for the coin data
interface Coin {
    id: string;
    name: string;
    current_price: number;
    symbol: string;
    market_cap: number;
    total_volume: number;
    image: string;
    price_change_percentage_24h: number;
  }
  
  // Define the props for the CoinList component, which includes an array of Coin objects
  interface CoinListProps {
    filteredCoins: Coin[];
  }
  
  // Import the Coins component (make sure to convert the Coins component to TypeScript as well)
  import Coins from './Coins';
  
  const CoinList: React.FC<CoinListProps> = ({ filteredCoins }) => {
    return (
      <>
        {filteredCoins.map((coin: Coin) => (
          <Coins
            key={coin.id}
            name={coin.name}
            id={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            volume={coin.total_volume}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        ))}
      </>
    );
  };
  
  export default CoinList;
  