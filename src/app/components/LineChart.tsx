import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components required for the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CoinHistory {
  data: {
    history: { price: string; timestamp: number }[];
  };
}

// Define props type
interface LineChartProps {
  coinHistory: CoinHistory;
}

export default function LineChart({ coinHistory }: LineChartProps) {
  const coinPrice: string[] = [];
  const coinTimestamp: string[] = [];

  coinHistory.data.history.forEach((item) => {
    coinPrice.push(item.price);
    coinTimestamp.push(new Date(item.timestamp * 1000).toLocaleDateString());
  });

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: "PRICE IN USD",
        data: coinPrice.reverse(),
        fill: true,
        backgroundColor: "#241F4C",
        borderColor: "#6366F1",
        borderWidth: 1,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}
