import style from './Account.module.css';
import PropTypes from 'prop-types';
import Transaction from './Transaction';
import Open from './Open';

export const Account = ({ accountData }) => {
  const {
    account: id,
    balance,
    date: dateOpen,
    transactions,
  } = accountData;

  const { date: dateTransaction } = transactions[0];

  return (
    <li className={style.card}>
      <p className={style.id}>{id}</p>
      <p className={style.balance}>{balance}</p>

      <div className={style.info}>
        {dateOpen && <Open date={dateOpen} />}
        <Transaction date={dateTransaction} />
      </div>
    </li>
  );
};

Account.propTypes = {
  accountData: PropTypes.object,
};
