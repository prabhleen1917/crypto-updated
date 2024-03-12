import Image from "next/image";
import millify from "millify";
import Link from "next/link";
import {
  BsFillBookmarkPlusFill,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";

// Define the type for a single coin
interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  change: string;
}

// Define the props expected by the Cryptocurrencies component
interface CryptocurrenciesProps {
  coins: Coin[];
}

const Cryptocurrencies: React.FC<CryptocurrenciesProps> = ({ coins }) => {
  const {
    user,
    watchlist,
    removeFromWatchList,
    addtoWatchList,
    getUserwatchlist,
  } = useAuth();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const handleAdd = async (uuid: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setBtnLoading(true);
    e.stopPropagation();
    await addtoWatchList(uuid);
    setBtnLoading(false);
  };

  const handleRemove = async (uuid: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setBtnLoading(true);
    e.stopPropagation();
    await removeFromWatchList(uuid);
    setBtnLoading(false);
  };

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (watchlist.length === 0) {
        await getUserwatchlist();
      }
    };
    
    fetchWatchlist();
  }, [user, getUserwatchlist, watchlist.length]);

  return (
    <div className="block md:grid md:grid-cols-2 lg:grid-cols-4 gap-3">
      {coins.map((coin) => (
        <Link key={coin.uuid} href={`/cryptos/${coin.uuid}`}>
          <div className="relative w-72 mx-auto md:mx-0 md:w-auto mb-3 md:mb-0 bg-white h-48 rounded-md px-4 py-6 hover:shadow-lg cursor-pointer">

            {/* WATCHLIST */}
            {user ? (
              watchlist.map((item) => item.uuid).includes(coin.uuid) ? (
                <button
                  disabled={btnLoading}
                  onClick={(e) => handleRemove(coin.uuid, e)}
                  className="absolute right-5 top-5 text-emerald-500 flex items-center justify-center bg-indigo-50 h-5 w-5 rounded-full hover:bg-indigo-50/70"
                >
                  <BsFillBookmarkCheckFill size={12} />
                </button>
              ) : (
                <button
                  disabled={btnLoading}
                  onClick={(e) => handleAdd(coin.uuid, e)}
                  className="absolute right-5 top-5 text-indigo-500 flex items-center justify-center bg-indigo-50 h-5 w-5 rounded-full hover:bg-indigo-50/70"
                >
                  <BsFillBookmarkPlusFill size={12} />
                </button>
              )
            ) : (
              ""
            )}

            <div className="flex items-center">
              {/* <Image src={coin.iconUrl} width={30} height={30} alt={coin.name} /> */}
              <p className="text-xl ml-3 font-bold text-black">{coin.name}</p>
            </div>
            <div className="py-6 text-black-50/70 text-black">
              <p>
                Price:{" "}
                <span className="text-black-50 text-black">${millify(parseFloat(coin.price))}</span>
              </p>
              <p>
                Market cap:{" "}
                <span className="text-black-50 text-black">
                  ${millify(parseFloat(coin.marketCap))}
                </span>
              </p>
              <p>
                Change: <span className="text-black-50">{coin.change}%</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cryptocurrencies;
