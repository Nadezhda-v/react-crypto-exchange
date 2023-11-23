import style from './Auth.module.css';
import { useForm } from 'react-hook-form';
import { ReactComponent as LogoIcon } from '../../Header/Logo/img/logo.svg';
import { authRequestAsync } from '../../../store/auth/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../../UI/Preloader';

export const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.token);
  const dataAuth = useSelector((state) => state.auth.data);
  const loading = useSelector((state) => state.auth.loading);

  const handleInput = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
  };

  const onSubmit = (data) => {
    dispatch(authRequestAsync(data));
  };

  useEffect(() => {
    if (token) {
      navigate('/crypto');
    }
  }, [token]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.title}>
          <LogoIcon className={style.logo} />
          <span className={style.text}>CryptoSwift</span>
        </div>

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputWrapper}>
            {errors.login && <span className={style.error}>
              {errors.login.message}
            </span>}

            <label className={style.label} htmlFor='login'>Логин</label>
            <input
              {...register('login', {
                required: 'Введите логин',
                pattern: {
                  value: /^[A-Za-z]{6,}$/,
                  message: 'Логин некорректный',
                },
              })}
              className={style.input}
              type='text'
              id='login'
              aria-invalid={!!errors.login}
              onInput={handleInput}
            />
          </div>

          <div className={style.inputWrapper}>
            {errors.password && <span className={style.error}>
              {errors.password.message}
            </span>}

            <label className={style.label} htmlFor='password'>Пароль</label>
            <input
              {...register('password', {
                required: 'Введите пароль',
                pattern: {
                  value: /^[A-Za-z]{6,}$/,
                  message: 'Пароль некорректный',
                },
              })}
              className={style.input}
              type='password'
              id='password'
              aria-invalid={!!errors.password}
              onInput={handleInput}
            />
          </div>

          {loading ? (<Preloader color='#FF29C3'/>) : (
            <button className={style.submit} type='submit'>
              Войти
            </button>
          )}
          {dataAuth.error &&
            <span className={style.errorSubmit}>
              Неверный логин или пароль
            </span>
          }
        </form>
      </div>
    </div>
  );
};
