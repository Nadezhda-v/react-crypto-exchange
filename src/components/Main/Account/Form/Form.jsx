import { useForm } from 'react-hook-form';
import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { transferPostAsync } from '../../../../store/account/accountAction';

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  let transactionError = useSelector(state => state.account.error);
  console.log('transactionError: ', transactionError);

  if (transactionError === 'Overdraft prevented') {
    transactionError = 'Недостаточно средств';
  }

  const onSubmit = (data) => {
    dispatch(transferPostAsync(data));
    reset();
  };

  const handleInputAccount = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
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
      <h3 className={style.title}>Перевод</h3>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.wrapper}>
          {errors.to && <span className={style.error}>
            {errors.to.message}
          </span>}

          <label className={style.label} htmlFor='to'>Счет</label>
          <input
            {...register('to', {
              required: 'Заполните поле',
              pattern: {
                value: /^[0-9]{12,}$/,
                message: 'Счет некорректный',
              },
            })}
            className={style.input}
            id='to'
            onInput={handleInputAccount}
          />
        </div>

        <div className={style.wrapper}>
          {errors.amount && <span className={style.error}>
            {errors.amount.message}
          </span>}

          <label className={style.label} htmlFor='amount'>Сумма</label>
          <input
            {...register('amount', {
              required: 'Заполните поле',
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: 'Неверный формат',
              },
            })}
            className={style.input}
            id='amount'
            onInput={handleInputSum}
          />
        </div>

        <div className={style.buttonWrap}>
          {transactionError && (
            <p className={style.errorSubmit}>{transactionError}</p>
          )}

          <button className={style.button}>Перевести</button>
        </div>
      </form >
    </div >
  );
};
