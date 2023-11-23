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

export const BalanceChart = ({ year, transactions, id, years }) => {
  data.labels = [];

  const calculateBalance = (allIncomes) => {
    const balancesByYear = {};

    let previousBalance = 0;

    for (const year in allIncomes) {
      if (Object.prototype.hasOwnProperty.call(allIncomes, year)) {
        const balances = [];
        let balance = previousBalance;

        allIncomes[year].forEach((value) => {
          balance += value;
          balances.push(balance);
        });

        balancesByYear[year] = balances;
        previousBalance = balances[balances.length - 1];
      }
    }

    return balancesByYear;
  };

  const balancesByYear = (years) => {
    const allIncomes = {};

    years.forEach((year) => {
      const transfersOfYear = [];
      for (let i = 0; i < 12; i++) {
        const transferOfMonth =
          transactions
            .filter(data => new Date(data.date).getFullYear() === year)
            .filter(data => new Date(data.date).getMonth() === i);

        if (transferOfMonth !== undefined) {
          transfersOfYear[i] = transferOfMonth;
        }
      }

      if (transfersOfYear.length > 0) {
        const incomes = transfersOfYear.map(transfers => {
          let balance = 0;
          transfers.forEach(({ amount, from, to }) => {
            const formattedAmount = formatAmountChart(id, amount, from, to);
            balance += formattedAmount;
          });

          return Math.round(balance);
        });

        allIncomes[year] = incomes;
      }
    });

    const balances = calculateBalance(allIncomes);
    return balances;
  };

  const months = ['Янв', 'Фев', 'Март', 'Апр', 'Май',
    'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

  const resultBalances = balancesByYear(years);
  const selectedYear = resultBalances[year];

  data.datasets[0].data = selectedYear
    .map((balance, index) => ({
      x: months[index],
      y: balance,
    }));

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
  years: PropTypes.array,
};
