import { useState } from 'react';
import style from './Graph.module.css';
import PropTypes from 'prop-types';
import { BalanceChart } from './BalanceChart/BalanceChart';
import { v4 as uuidv4 } from 'uuid';

export const Graph = ({ transactions, id }) => {
  console.log('transactions: ', transactions);
  const years = [...new Set(transactions.map(data =>
    new Date(data.date).getFullYear()))];

  const [selectYear, setSelectYear] = useState(years[years.length - 1]);

  const handleSelectChange = (e) => {
    setSelectYear(+e.target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h3 className={style.title}>Динамика</h3>
        <span className={style.year}>{selectYear}</span>

        <select
          className={style.select}
          value={selectYear}
          onChange={handleSelectChange}
        >
          {
            years.map((year) => <option key={uuidv4()}>{year}</option>)
          }
        </select>
      </div>

      {transactions.length ? (
        <BalanceChart
          year={selectYear}
          transactions={transactions}
          id={id}
          years={years}
        />
      ) : (
        <p className={style.notTransactions}>Данных нет</p>
      )}
    </div>
  );
};

Graph.propTypes = {
  transactions: PropTypes.array,
  id: PropTypes.string,
};

