import style from './Account.module.css';
import PropTypes from 'prop-types';
import Transaction from './Transaction';
import Open from './Open';
import { Link } from 'react-router-dom';
import { round } from '../../../../utils/roundNumber';

export const Account = ({ accountData }) => {
  const {
    account: id,
    balance,
    date: dateOpen,
    transactions,
  } = accountData;

  let dateTransaction = null;

  if (transactions[0]) {
    dateTransaction = transactions[0].date;
  }

  return (
    <li className={style.card}>
      <Link
        className={style.linkPhoto}
        to={`/crypto/account/${id}`}
      >
        <p className={style.id}>{id}</p>
        <p className={style.balance}>{round(balance)}</p>

        <div className={style.info}>
          {dateOpen && <Open date={dateOpen} />}
          {dateTransaction && <Transaction date={dateTransaction} />}
        </div>
      </Link>
    </li>
  );
};

Account.propTypes = {
  accountData: PropTypes.object,
};
