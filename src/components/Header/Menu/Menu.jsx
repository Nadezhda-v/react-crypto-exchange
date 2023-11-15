import style from './Menu.module.css';

export const Menu = () => (
  <div className={style.wrapper}>
    <ul className={style.list}>
      <li className={style.item}>Счета</li>
      <li className={style.item}>Обмен</li>
    </ul>
  </div>
);
