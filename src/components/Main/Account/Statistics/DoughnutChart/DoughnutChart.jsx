import PropTypes from 'prop-types';
import { formatAmountChart } from '../../../../../utils/formatAmount';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
);

const data = {
  datasets: [
    {
      backgroundColor: ['#933FFE', '#5a105b'],
      borderColor: 'none',
      borderRadius: 50,
      rotation: 60,
      spacing: 1,
    },
  ],
};

const options = {
  responsive: true,
  cutout: '70%',
  plugins: {
    tooltip: {
      displayColors: false,
      titleAlign: 'center',
      bodyFont: {
        size: 12,
        family: 'Nunito',
      },
      callbacks: {
        label: () => null,
      },
    },
    legend: {
      display: true,
      position: 'right',
      labels: {
        font: {
          family: 'Nunito',
          size: 15,
        },
        usePointStyle: true,
        padding: 22,
        boxWidth: 10,
        boxHeight: 10,
      },
    },
  },
};

export const DoughnutChart = ({
  transactions,
  id,
  selectedStat,
  setIncome,
  setExpenses,
}) => {
  // Получение текущего года
  const currentYear = new Date().getFullYear();

  // Получение номера текущего месяца (от 0 до 11)
  const currentMonth = new Date().getMonth();

  let filteredTransactions = [];

  // Фильтрация транзакций в зависимости от выбранного периода
  if (selectedStat === 'year') {
    filteredTransactions = transactions.filter(data => {
      const transactionYear = new Date(data.date).getFullYear();
      return transactionYear === currentYear;
    });
  } else if (selectedStat === 'month') {
    filteredTransactions = transactions.filter(data => {
      const transactionMonth = new Date(data.date).getMonth();
      const transactionYear = new Date(data.date).getFullYear();
      return transactionMonth === currentMonth &&
        transactionYear === currentYear;
    });
  }

  let income = 0;
  let expenses = 0;

  if (filteredTransactions) {
    filteredTransactions.forEach(({ amount, from, to }) => {
      const formattedAmount = formatAmountChart(id, amount, from, to);

      if (formattedAmount < 0) {
        expenses += Math.abs(formattedAmount);
      }

      if (formattedAmount > 0) {
        income += formattedAmount;
      }
    });

    console.log('expenses: ', expenses);
    console.log('income: ', income);
    const roundedIncome = Math.round(income);
    const roundedExpenses = Math.round(expenses);

    data.datasets[0].data = [roundedIncome, roundedExpenses];
    data.labels = [`Доходы ${roundedIncome} ₽`,
      `Расходы ${roundedExpenses} ₽`];
  }

  if (income === 0 && expenses === 0) {
    setIncome(0);
    setExpenses(0);
    return;
  }

  return (
    <Doughnut
      data={data}
      options={options}
    />
  );
};

DoughnutChart.propTypes = {
  transactions: PropTypes.array,
  id: PropTypes.string,
  selectedStat: PropTypes.string,
  setIncome: PropTypes.func,
  setExpenses: PropTypes.func,
};

