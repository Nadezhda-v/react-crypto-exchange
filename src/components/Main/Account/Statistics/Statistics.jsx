import { useEffect, useState } from 'react';
import DoughnutChart from './DoughnutChart';
import style from './Statistics.module.css';
import PropTypes from 'prop-types';

export const Statistics = ({ transactions, id }) => {
  const [selectedStat, setSelectedStat] = useState('month');
  const [chartLabel, setChartLabel] = useState('');

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString('ru', { month: 'long' });

  const handleStatChange = (newStat) => {
    setSelectedStat(newStat);
  };

  useEffect(() => {
    if (selectedStat === 'month') {
      setChartLabel(currentMonth);
    } else if (selectedStat === 'year') {
      setChartLabel(currentYear);
    }
  }, [selectedStat]);

  return (
    <div className={style.statistics}>
      <h3 className={style.title}>Доходы</h3>

      {transactions.length ? (
        <div className={style.wrappper}>
          <div className={style.buttonsWrap}>
            <button
              className={`${style.button}
              ${selectedStat === 'month' ? style.selected : ''}`
              }
              onClick={() => handleStatChange('month')}
            >
              Месяц
            </button>
            <button
              className={`${style.button}
              ${selectedStat === 'year' ? style.selected : ''}`
              }
              onClick={() => handleStatChange('year')}
            >
              Год
            </button>
          </div>

          <div className={style.сhart}>
            <div className={style.insideText}>
              {chartLabel}
            </div>

            <DoughnutChart
              key={selectedStat}
              transactions={transactions}
              id={id}
              selectedStat={selectedStat}
            />
          </div>
        </div>
      ) : <p className={style.notStat}>Статистики нет</p>}
    </div>
  );
};

Statistics.propTypes = {
  transactions: PropTypes.array,
  balance: PropTypes.number,
  id: PropTypes.string,
};
