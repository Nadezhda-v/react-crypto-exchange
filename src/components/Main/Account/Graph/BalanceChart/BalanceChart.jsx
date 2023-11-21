/* import PropTypes from 'prop-types';
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
};*/

export const BalanceChart = ({ year, transactions, id, years }) => {
  // data.labels = [];

  // Объект для хранения балансов по годам
  // const yearBalances = {};

  // Объект для хранения всех транзакций по годам
  // const allTransfers = {};

  /* years.forEach((year) => {
    const transfersOfYear = {};
    for (let i = 0; i < 12; i++) {
      const lastTransferMonth = transactions
        .filter((data) => new Date(data.date).getFullYear() === year)
        .filter((data) => new Date(data.date).getMonth() === i);

      if (lastTransferMonth.length !== undefined) {
        transfersOfYear[i] = lastTransferMonth;
      }
    }

    allTransfers[year] = transfersOfYear;


    console.log('allTransfers: ', allTransfers);

    if (allTransfers.length > 0) {
      const incomes = allTransfers.map(transfers => {
        let balance = 0;
        transfers.forEach(({ amount, from, to }) => {
          const formattedAmount = formatAmountChart(id, amount, from, to);
          balance += formattedAmount;
          console.log('balance: ', balance);
        });

        return Math.round(balance);
      });

      // Функция для вычисления баланса на счету за каждый месяц
      const calculateBalance = (incomes) => {
        let balance = 0;
        const balances = [];

        for (let i = 0; i < incomes.length; i++) {
          balance += incomes[i];
          balances.push(balance);
        }

        return balances;
      };

      yearBalances[year] = calculateBalance(incomes);
    }
  });

  console.log('lastTransfers: ', allTransfers);
  console.log('yearBalances:', yearBalances);


  /* const months = ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь',
    'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];*/

  /* data.datasets[0].data = balances.map((balance, index) => ({
    x: months[index],
    y: balance,
  }));*/

  // console.log('incomes: ', incomes);
  // console.log('balances: ', balances);*/
};

/* BalanceChart.propTypes = {
  year: PropTypes.number,
  transactions: PropTypes.array,
  id: PropTypes.string,
  years: PropTypes.array,
};*/
