import React, { useState } from "react";
import CandleStickChart from "./CandleStickChart";

interface Coin {
  id: string;
  days: number;
  symbol: string;
  name: string;
  market_data: {
    current_price: {
      usd: number;
    };
  };
}

interface CoinInfoProps {
  coin: Coin;
}

const timePeriods = [
  { label: "1D", value: 1 },
  { label: "1W", value: 7 },
  { label: "1M", value: 30 },
];

const CoinInfo: React.FC<CoinInfoProps> = ({ coin }) => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(timePeriods[1].value); // Default to 1 week

  const handleTimePeriodChange = (days: number) => {
    console.log('jjj', days);
    setSelectedTimePeriod(days);
  };

  return (
    <div className="bg-black flex flex-col rounded-[15px] w-[851px] p-8">
      <div className="flex justify-between items-start">
        <div className="flex justify-between w-1/3">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white">{coin.symbol.toUpperCase()}USDT</h1>
            <p className="text-white">{coin.name}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-white">${coin.market_data.current_price.usd.toLocaleString()}</h1>
            <p className="text-white">+23.6%</p> {/* Placeholder for percentage change */}
          </div>
        </div>

        <div className="flex gap-4">
          {timePeriods.map((period) => (
            <button
              key={period.value}
              className={`bg-gray-100 text-black rounded-md font-bold text-sm p-2 ${selectedTimePeriod === period.value ? 'bg-[#262C30] text-white' : 'bg-black text-white'}`}
              onClick={() => handleTimePeriodChange(period.value)}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full pt-8">
        <CandleStickChart id={coin.name.toLowerCase()} days={selectedTimePeriod} />
      </div>
    </div>
  );
};

export default CoinInfo;
