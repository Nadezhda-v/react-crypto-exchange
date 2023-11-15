import style from './Logout.module.css';
/* import { deleteToken } from '../../../store/tokenReducer';
import { useDispatch } from 'react-redux';*/
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LogoutIcon } from './img/logout.svg';

export const Logout = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(deleteToken());
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
