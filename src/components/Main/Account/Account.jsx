import { useNavigate, useParams } from 'react-router-dom';
import style from './Account.module.css';
import { ReactComponent as BackIcon } from './img/back.svg';
import Graph from './Graph';
import Transactions from './Transactions';
import Statistics from './Statistics';
import Form from './Form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accountRequestAsync } from '../../../store/account/accountAction';
import Preloader from '../../../UI/Preloader';

export const Account = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.token.token);
  const loading = useSelector(state => state.account.loading);
  const { transactions } = useSelector((state) => state.account.data);

  useEffect(() => {
    if (token) dispatch(accountRequestAsync(id));
  }, [id]);

  const handleBack = () => {
    navigate('/crypto');
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.titleWrapper}>
          <h2 className={style.title}>{`Счет №${id}`}</h2>
        </div>

        <div className={style.buttonWrapper}>
          <button
            className={style.button}
            onClick={handleBack}
            id='back'
          >
            <BackIcon className={style.svg} />
            Назад
          </button>
        </div>
      </div>

      {loading || !transactions ?
        <Preloader color='#FF29C3' /> : (
          <>
            <Transactions transactions={transactions} id={id} />
            <Graph transactions={transactions} id={id} />
            <Statistics transactions={transactions} id={id} />
            <Form />
          </>
        )
      }
    </div>
  );
};
