// CandleStickChart.tsx
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface LineChartData {
  x: Date;
  y: number;
}

interface CandleStickChartProps {
  id: string;
  days: number;
}

const CandleStickChart: React.FC<CandleStickChartProps> = ({ id, days }) => {
  const [series, setSeries] = useState<{ name: string; data: LineChartData[] }[]>([
    { name: 'Price', data: [] },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
            params: {
              vs_currency: 'usd',
              days: days.toString(), // Ensure days is converted to string
             // interval: days > 1 ? 'daily' : 'minute', // Adjust the interval based on the days
            }
          };
  
          const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, config);
        const prices = response.data.prices;

        // Process the data into ApexCharts format
        const processedData: LineChartData[] = prices.map((price: [number, number]) => ({
          x: new Date(price[0]),
          y: [price[1], price[1], price[1], price[1]],
        }));

        console.log('pp',processedData)
        setSeries([{ name: 'Price', data: processedData }]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, days]); // Dependency array includes id and days to re-run on change

  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    yaxis: {
      opposite: false,
    },
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default CandleStickChart;
