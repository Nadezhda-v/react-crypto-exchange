import { useEffect } from 'react';
import style from './Currencies.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  currenciesRequestAsync,
} from '../../../../store/currencies/currenciesAction';
import { round } from '../../../../utils/roundNumber';

export const Currencies = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token.token);
  const currencies = useSelector(state => state.currencies.data);

  useEffect(() => {
    if (token) dispatch(currenciesRequestAsync());
  }, [token]);

  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th className={style.title} colSpan='2'>Мои валюты</th>
        </tr>
      </thead>
      <tbody>
        {currencies && (
          Object.entries(currencies).map(([key, { code, amount }]) => (
            <tr key={key}>
              <td className={style.code}>{code}</td>
              <td className={style.amount}>{round(amount)}</td>
            </tr>
          )))}
      </tbody>
    </table>
  );
};
