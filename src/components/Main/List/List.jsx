import style from './List.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { accountsRequestAsync } from '../../../store/accounts/accountsAction';
import SortAccountList from './SortAccountList';

export const List = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const accounts = useSelector((state) => state.accounts.data);
  const [sortOrder, setSortOrder] = useState('account');

  useEffect(() => {
    if (token) {
      dispatch(accountsRequestAsync());
    }
  }, [token]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.buttonWrapper}>
        <button
          className={style.button}
        >
          Новый счет
        </button>
      </div>

      <div className={style.accounts}>
        <div className={style.wrapper}>
          <h3 className={style.title}>Мои счета</h3>

          <div className={style.sort}>
            <span className={style.sortTitle}>Сортировка:</span>
            <select className={style.select}
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value='account'>Номер счёта</option>
              <option value='balance'>Баланс</option>
              <option value='date'>Дата открытия</option>
              <option value='last'>Дата последней транзакции</option>
            </select>
          </div>
        </div>

        {accounts &&
          <SortAccountList accounts={accounts} sortOrder={sortOrder} />
        }
      </div>
    </div>
  );
};
