import style from './BalanceChart.module.css';
console.log('style: ', style);
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { v4 as uuidv4 } from 'uuid';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

const options = {
  responsive: true,
  plugins: {
    tooltip: {
      xAlign: 'center',
      yAlign: 'bottom',
      displayColors: false,
      bodyFont: {
        family: 'Nunito',
        weight: '700',
        size: 15,
      },
      callbacks: {
        title: () => null,
        label: context => context.formattedValue + ' ₽',
      },
    }
  },
};

const data = {
  labels: [],
  datasets: [{
    borderColor: '#933FFE',
  }]
};

export const BalanceChart = ({ year, transactions }) => {
  data.labels = [];

  // Массив для хранения последних транзакций каждого месяца
  const lastTransfers = [];

  for (let i = 0; i < 12; i++) {
    const lastTransferMonth =
      transactions
        .filter(data => new Date(data.date).getFullYear() === year)
        .filter(data => new Date(data.date).getMonth() === i)
        .at(-1);
    console.log('lastTransferMonth: ', lastTransferMonth);

    if (lastTransferMonth !== undefined) {
      lastTransfers.push(lastTransferMonth);
    }
  }

  data.datasets[0].data = lastTransfers
    .map(data => {
      const amount = Math.round(data.amount);
      const month = new Date(data.date)
        .toLocaleString('default', { month: 'short' });

      return { x: month, y: amount };
    });

  return (
    <Line
      key={uuidv4()}
      options={options}
      data={data}
    />
  );
};

BalanceChart.propTypes = {
  year: PropTypes.number,
  transactions: PropTypes.array,
};
