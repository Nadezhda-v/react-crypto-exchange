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
import { formatAmountChart } from '../../../../../utils/formatAmount';

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
    },
    legend: {
      display: false,
    },
  },
};

const data = {
  labels: [],
  datasets: [{
    borderColor: '#933FFE',
  }]
};

export const BalanceChart = ({ year, transactions, id }) => {
  data.labels = [];

  // Массив для хранения транзакций каждого месяца
  const lastTransfers = [];

  for (let i = 0; i < 12; i++) {
    const lastTransferMonth =
      transactions
        .filter(data => new Date(data.date).getFullYear() === year)
        .filter(data => new Date(data.date).getMonth() === i);

    if (lastTransferMonth !== undefined) {
      lastTransfers.push(lastTransferMonth);
    }
  }

  console.log(' lastTransfers: ', lastTransfers);

  if (lastTransfers.length > 0) {
    const balances = lastTransfers.map(transfers => {
      let balance = 0;
      transfers.forEach(({ amount, from, to }) => {
        const formattedAmount = formatAmountChart(id, amount, from, to);
        balance += formattedAmount;
        console.log('balance: ', balance);
      });

      return Math.round(balance);
    });

    console.log('balances: ', balances);
  }

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
  id: PropTypes.string,
};
