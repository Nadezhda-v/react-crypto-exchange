import PropTypes from 'prop-types';
import style from './SortAccountList.module.css';
import Account from '../Account';

export const SortAccountList = ({ accounts, sortOrder }) => {
  // Функция для сравнения дат, учитывая null
  const compareDates = (dateA, dateB) => {
    const a = dateA ? new Date(dateA) : null;
    const b = dateB ? new Date(dateB) : null;

    if (a === null && b === null) {
      return 0;
    } else if (a === null) {
      return 1;
    } else if (b === null) {
      return -1;
    } else {
      return a - b;
    }
  };

  // Функция для получения последней даты транзакции
  const getLastTransactionDate = (account) => {
    if (account.dateTransaction && account.dateTransaction.length > 0) {
      return account.dateTransaction[0].date;
    }
    return null;
  };

  const sortedAccounts = accounts.slice().sort((a, b) => {
    switch (sortOrder) {
      case 'account':
        return a.account.localeCompare(b.account);
      case 'balance':
        return a.balance - b.balance;
      case 'date':
        return compareDates(a.dateOpen, b.dateOpen);
      case 'last':
        return compareDates(
          getLastTransactionDate(a),
          getLastTransactionDate(b)
        );
    }
  });

  return (
    <ul className={style.list}>
      {sortedAccounts.map((data) => (
        <Account key={data.account} accountData={data} />
      ))}
    </ul>
  );
};

SortAccountList.propTypes = {
  accounts: PropTypes.array,
  sortOrder: PropTypes.string,
};
