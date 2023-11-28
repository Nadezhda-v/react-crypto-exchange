import { useForm } from 'react-hook-form';
import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import {
  currenciesBuyAsync,
  currenciesRequestAsync,
} from '../../../../store/currencies/currenciesAction';
import {
  allCurrenciesRequestAsync,
} from '../../../../store/allCurrencies/allCurrenciesAction';

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const from = watch('from');
  const to = watch('to');

  const dispatch = useDispatch();
  const token = useSelector(state => state.token.token);
  const currencies = useSelector(state => state.currencies.data);
  const allCurrencies = useSelector(state => state.allCurrencies.data);
  let buyError = useSelector(state => state.currencies.error);

  if (buyError === 'Overdraft prevented') {
    buyError = 'Недостаточно средств';
  }

  useEffect(() => {
    if (token) {
      dispatch(allCurrenciesRequestAsync());
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      dispatch(currenciesRequestAsync());
    }
  }, []);

  const onSubmit = (data) => {
    dispatch(currenciesBuyAsync(data));
    reset();
  };

  const handleInputSum = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');

    const parts = e.target.value.split('.');

    if (parts.length > 1 && parts[1].length > 2) {
      e.target.value = parts[0] + '.' + parts[1].slice(0, 2);
    }
  };

  return (
    <div className={style.container}>
      <h3 className={style.title}>Обмен валюты</h3>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.wrapper}>
          <div className={style.inputWrap}>
            <label className={style.label}>Откуда</label>
            <select
              className={style.input}
              {...register('from')}
              value={from}
            >
              {allCurrencies &&
                ([...allCurrencies]
                  .sort()
                  .map(currency =>
                    <option value={currency} key={uuidv4()}>
                      {currency}
                    </option>
                  ))
              }
            </select>
          </div>

          <div className={style.inputWrap}>
            <label className={style.label}>Куда</label>
            <select
              className={style.input}
              {...register('to')}
              value={to}
            >
              {currencies && (
                Object.entries(currencies).map(([key, { code, amount }]) => (
                  <option value={code} key={key}>
                    {code}
                  </option>
                )))}
            </select>
          </div>

          <div className={style.inputWrap}>
            {errors.amount && (
              <span className={style.error}>
                {errors.amount.message}
              </span>
            )}
            <label className={style.label}>Сумма</label>
            <input
              {...register('amount', {
                required: 'Заполните поле',
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: 'Неверный формат',
                }
              })}
              id='sum-exchange'
              className={style.input}
              type='text'
              onInput={handleInputSum}
            />
          </div>
        </div>

        <div className={style.buttonWrap}>
          {buyError && (
            <p className={style.errorSubmit}>{buyError}</p>
          )}

          <button className={style.button} disabled={to === from} type='submit'>
            Обменять
          </button>
        </div>
      </form>
    </div>
  );
};
