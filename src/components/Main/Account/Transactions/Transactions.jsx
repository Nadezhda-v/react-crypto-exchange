import { formatAmount } from '../../../../utils/formatAmount';
import { formatDate } from '../../../../utils/formatDate';
import { getAccount } from '../../../../utils/getAccount';
import style from './Transactions.module.css';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export const Transactions = ({ id, transactions }) => {
  let lastTransactions;

  if (transactions) {
    if (transactions.length > 15) {
      lastTransactions = transactions.slice(-15).reverse();
    } else {
      lastTransactions = transactions.slice(-transactions.length)
        .reverse();
    }
  }

  return (
    <div className={style.history}>
      <h3 className={style.title}>История переводов</h3>

      <div className={style.container}>
        <table className={style.table}>
          <thead className={style.thead}>
            <tr>
              <th className={style.th}>Счет</th>
              <th className={style.th}>Сумма</th>
              <th className={style.th}>Дата</th>
            </tr>
          </thead>
          <tbody className={style.tbody}>
            {lastTransactions && lastTransactions.length ? (
              lastTransactions.map(({ date, amount, from, to }) => {
                const formattedAmount = formatAmount(id, amount, from, to);

                return (
                  <tr key={uuidv4()}>
                    <td className={`${style.td} ${style.account}`}>
                      {getAccount(id, from, to)}
                    </td>
                    <td className={`${style.td} ${style.amount}
                    ${formattedAmount > 0 ?
                      style.positive : style.negative}`}
                    >
                      {formattedAmount}
                    </td>
                    <td className={`${style.td} ${style.date}`}>
                      {formatDate(date)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan='3' className={style.notHistory}>
                  Данных нет
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Transactions.propTypes = {
  id: PropTypes.string,
  transactions: PropTypes.array,
};
