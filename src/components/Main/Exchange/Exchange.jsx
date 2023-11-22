import style from './Exchange.module.css';
import Currencies from './Currencies';
import Form from './Form';
import Rates from './Rates';
import { useSelector } from 'react-redux';

export const Exchange = () => {
  const accounts = useSelector((state) => state.accounts.data);

  return (
    <div className={style.container}>
      <h2 className={style.title}>Обмен валюты</h2>

      <div className={style.wrapper}>
        <div className={style.accountInfo}>
          <div className={style.accounts}>
            <h3 className={style.text}>Мои счета</h3>
            <div className={style.accountsWrap}>
              {accounts.length && (
                accounts.map(({ account, balance }) => (
                  balance > 0 && (
                    <div key={account}>
                      <p className={style.account}>
                        <span className={style.label}>Счет </span>
                        №{account}
                      </p>
                      <span className={style.balance}>
                        <span className={style.label}>Баланс </span>
                        {balance}
                      </span>
                    </div>
                  )
                ))
              )}
            </div>
          </div>

          <Currencies />
        </div>

        <Rates />
      </div>

      <div className={style.form}>
        <Form />
      </div>
    </div>
  );
};
