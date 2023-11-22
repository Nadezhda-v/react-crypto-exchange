import { Link } from 'react-router-dom';
import style from './Menu.module.css';

export const Menu = () => (
  <div className={style.wrapper}>
    <ul className={style.list}>
      <Link to='/crypto'>
        <li className={style.item}>Счета</li>
      </Link>

      <Link to='/exchange'>
        <li className={style.item}>Обмен</li>
      </Link>
    </ul>
  </div>
);
