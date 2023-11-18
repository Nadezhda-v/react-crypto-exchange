import { useNavigate, useParams } from 'react-router-dom';
import style from './Account.module.css';
import { ReactComponent as BackIcon } from './img/back.svg';
import Graphic from './Graphic';
import Transactions from './Transactions';
import Statistics from './Statistics';
import Form from './Form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accountRequestAsync } from '../../../store/account/accountAction';

export const Account = () => {
  const { id } = useParams();
  console.log('id: ', id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transactions } = useSelector((state) => state.account.data);
  console.log('transactions: ', transactions);

  useEffect(() => {
    dispatch(accountRequestAsync(id));
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
          >
            <BackIcon className={style.svg} />
            Назад
          </button>
        </div>
      </div>

      <Graphic />
      <Transactions transactions={transactions} id={id} />
      <Statistics />
      <Form />
    </div>
  );
};
