import { useForm } from 'react-hook-form';
import style from './Form.module.css';
// import { useDispatch } from 'react-redux';

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const dispatch = useDispatch();

  const onSubmit = (data) => {
    // dispatch(transferRequestAsync(data));
  };

  const handleInputAccount = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const handleInputSum = (e) => {
    const inputValue = e.target.value;
    const match = inputValue.match(/^\d+(\.\d{1,2})?/);

    e.target.value = match ? match[0] : '';
  };

  return (
    <div className={style.container}>
      <h3 className={style.title}>Перевод</h3>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.wrapper}>
          {errors.account && <span className={style.error}>
            {errors.account.message}
          </span>}

          <label className={style.label} htmlFor='account'>Счет</label>
          <input
            {...register('account', {
              required: 'Заполните поле',
              pattern: {
                value: /^[0-9]{12,}$/,
                message: 'Счет некорректный',
              },
            })}
            className={style.input}
            id='account'
            onInput={handleInputAccount}
          />
        </div>

        <div className={style.wrapper}>
          {errors.sum && <span className={style.error}>
            {errors.sum.message}
          </span>}

          <label className={style.label} htmlFor='sum'>Сумма</label>
          <input
            {...register('sum', {
              required: 'Заполните поле',
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: 'Некорректная сумма',
              },
            })}
            className={style.input}
            id='sum'
            onInput={handleInputSum}
          />
        </div>

        <button className={style.button}>Перевести</button>
      </form>
    </div>
  );
};
