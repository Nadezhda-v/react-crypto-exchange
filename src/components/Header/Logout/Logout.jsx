import style from './Logout.module.css';
import { deleteToken } from '../../../store/tokenReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LogoutIcon } from './img/logout.svg';
import { authLogout } from '../../../store/auth/authAction';
import { accountsSlice } from '../../../store/accounts/accountsSlice';

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(deleteToken());
    dispatch(authLogout());
    dispatch(accountsSlice.actions.clearAccounts());
    navigate('/');
  };

  return (
    <div className={style.container} onClick={handleLogout}>
      <button
        className={style.logout}
      >
        {'Выйти'}
      </button>

      <LogoutIcon className={style.svg} />
    </div>
  );
};
